"use client";

import React, { useEffect, useRef } from "react";

interface DonkeyKongProps {
  onClose: () => void;
  onGameOver?: (score: number) => void;
}

const DonkeyKong: React.FC<DonkeyKongProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let score = 0;
    let gameOver = false;
    let gameWon = false;
    let frame = 0;
    let spawnRate = 85;
    let barrelSpeed = 3.8;

    const BASE_W = 800;
    const BASE_H = 750;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const getScale = () => Math.min(canvas.width / BASE_W, canvas.height / BASE_H) * 0.95;
    const getOffset = () => ({
      x: (canvas.width - (BASE_W * getScale())) / 2,
      y: (canvas.height - (BASE_H * getScale())) / 2
    });

    const player = {
      x: 380, y: 650, w: 25, h: 35, vx: 0, vy: 0, 
      speed: 4.8, jumpForce: 10, grounded: false, climbing: false
    };

    // Pyramid Platform Layout (Progressive width)
    const platforms = [
      { x: 0, y: 700, w: 800, h: 15, dir: 1 },    // Base (Full)
      { x: 50, y: 580, w: 700, h: 15, dir: -1 },  // L1 (Wide)
      { x: 100, y: 460, w: 600, h: 15, dir: 1 },  // L2
      { x: 150, y: 340, w: 500, h: 15, dir: -1 }, // L3
      { x: 200, y: 220, w: 400, h: 15, dir: 1 },  // L4 (Shortest)
      { x: 40, y: 150, w: 220, h: 15, dir: 1 },   // DK
      { x: 350, y: 100, w: 100, h: 15, dir: 0 },  // Goal
    ];

    const ladders = [
      { x: 720, y: 580, h: 120 }, // Base to L1
      { x: 130, y: 460, h: 120 }, // L1 to L2
      { x: 670, y: 340, h: 120 }, // L2 to L3
      { x: 180, y: 220, h: 120 }, // L3 to L4
      { x: 400, y: 100, h: 120 }, // L4 to Goal
    ];

    let barrels: { x: number; y: number; vx: number; vy: number; r: number; color: string }[] = [];
    const gravity = 0.72;

    const spawnBarrel = () => {
      const isFast = Math.random() < 0.2;
      barrels.push({ 
        x: 100, y: 130,
        vx: barrelSpeed * (isFast ? 1.5 : 1), 
        vy: 0, r: 12,
        color: isFast ? "#ff0000" : "#aa5500"
      });
    };

    const update = () => {
      if (gameOver || gameWon) return;
      frame++;

      if (frame % 900 === 0) {
        spawnRate = Math.max(30, spawnRate - 5);
        barrelSpeed += 0.2;
      }

      if (player.climbing) {
        player.y += player.vy;
        player.vx = 0;
        let onLadder = false;
        ladders.forEach(l => {
          if (Math.abs(player.x + player.w/2 - l.x) < 20 && player.y + player.h > l.y - 15 && player.y < l.y + l.h + 15) onLadder = true;
        });
        if (!onLadder) player.climbing = false;
      } else {
        player.vy += gravity;
        player.y += player.vy;
        player.x += player.vx;
      }

      player.grounded = false;
      platforms.forEach(p => {
        if (player.vy >= 0 && player.x + player.w > p.x && player.x < p.x + p.w && 
            player.y + player.h >= p.y && player.y + player.h <= p.y + p.h + 10) {
          player.y = p.y - player.h; player.vy = 0; player.grounded = true; player.climbing = false;
        }
      });

      if (frame % spawnRate === 0) spawnBarrel();
      barrels.forEach((b, i) => {
        b.vy += gravity; b.y += b.vy; b.x += b.vx;
        
        let barrelOnGround = false;
        platforms.forEach(p => {
          if (b.x + b.r > p.x && b.x - b.r < p.x + p.w && b.y + b.r >= p.y && b.y + b.r <= p.y + p.h + 8) {
            b.y = p.y - b.r; b.vy = 0; barrelOnGround = true;
            if (p.dir !== 0) b.vx = Math.abs(b.vx) * p.dir;
          }
        });

        // Bouncing walls logic - separate from platforms to allow falling
        if (b.x > 790) { b.vx = -Math.abs(b.vx); b.x = 790; }
        if (b.x < 10) { b.vx = Math.abs(b.vx); b.x = 10; }

        if (Math.hypot(b.x - (player.x + player.w/2), b.y - (player.y + player.h/2)) < b.r + 12) {
          gameOver = true;
          if (onGameOver) onGameOver(score);
        }
        
        if (b.y > 800) barrels.splice(i, 1);
        if (barrelOnGround && b.y > 650 && (b.x < 20 || b.x > 780)) { barrels.splice(i, 1); score += 100; }
      });

      if (player.y < 110 && Math.abs(player.x + player.w/2 - 400) < 50) {
        gameWon = true;
        if (onGameOver) onGameOver(score + 1000); // Bonus for winning
      }
    };

    const draw = () => {
      ctx.fillStyle = "black"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      const sc = getScale(); const off = getOffset();
      ctx.save(); ctx.translate(off.x, off.y); ctx.scale(sc, sc);

      // Draw Walls (Aesthetic/Gameplay boundaries)
      ctx.strokeStyle = "#333"; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(5, 0); ctx.lineTo(5, 750); ctx.moveTo(795, 0); ctx.lineTo(795, 750); ctx.stroke();

      platforms.forEach(p => {
        ctx.fillStyle = "#ff2244"; ctx.shadowBlur = 10; ctx.shadowColor = "#ff2244";
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.strokeStyle = "rgba(0,0,0,0.4)"; ctx.lineWidth = 1;
        for(let x=p.x; x<p.x+p.w; x+=15) { ctx.beginPath(); ctx.moveTo(x, p.y); ctx.lineTo(x+15, p.y+p.h); ctx.stroke(); }
      });

      ladders.forEach(l => {
        ctx.fillStyle = "#00ffff"; ctx.shadowBlur = 5; ctx.shadowColor = "#00ffff";
        ctx.fillRect(l.x - 10, l.y, 4, l.h); ctx.fillRect(l.x + 6, l.y, 4, l.h);
        for(let y=l.y; y<l.y+l.h; y+=12) { ctx.fillRect(l.x-10, y, 20, 2); }
      });

      // DK
      ctx.fillStyle = "#884400"; ctx.shadowBlur = 20; ctx.fillRect(50, 70, 80, 80);
      ctx.fillStyle = "#ffccaa"; ctx.fillRect(60, 80, 50, 30);

      // Player
      ctx.fillStyle = "#ff0000"; ctx.shadowBlur = 10; ctx.shadowColor = "#ff0000";
      ctx.fillRect(player.x, player.y + 8, player.w, player.h - 8);
      ctx.fillStyle = "#ffccaa"; ctx.fillRect(player.x + 5, player.y, player.w - 10, 15);

      // Barrels
      barrels.forEach(b => {
        ctx.fillStyle = b.color; ctx.shadowBlur = 15; ctx.shadowColor = b.color;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(b.x, b.y, b.r-3, 0, Math.PI*2); ctx.stroke();
      });

      if (gameOver || gameWon) {
        ctx.fillStyle = "rgba(0,0,0,0.85)"; ctx.fillRect(0, 0, BASE_W, BASE_H);
        ctx.fillStyle = "white"; ctx.font = "bold 50px monospace"; ctx.textAlign = "center";
        ctx.fillText(gameOver ? "TRY AGAIN" : "ARCADE MASTER", 400, 350);
        ctx.restore(); return;
      }
      ctx.restore();

      ctx.fillStyle = "white"; ctx.font = "bold 24px monospace";
      ctx.fillText(`SCORE: ${score.toString().padStart(6, '0')}`, 60, 100);
      for(let i=0; i<canvas.height; i+=4) { ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.fillRect(0, i, canvas.width, 2); }
    };

    const loop = () => { update(); draw(); animationFrameId = requestAnimationFrame(loop); };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || gameWon) if (e.key === "r") { score = 0; gameOver = false; gameWon = false; barrels = []; player.x = 380; player.y = 650; player.vx = 0; player.vy = 0; barrelSpeed = 3.8; spawnRate = 85; }
      if (e.key === "ArrowLeft" || e.key === "a") if (!player.climbing) player.vx = -player.speed;
      if (e.key === "ArrowRight" || e.key === "d") if (!player.climbing) player.vx = player.speed;
      if (e.key === "ArrowUp" || e.key === "w") {
        let onLadder = false;
        ladders.forEach(l => { if (Math.abs(player.x + player.w/2 - l.x) < 20 && player.y + player.h > l.y && player.y < l.y + l.h) onLadder = true; });
        if (onLadder) { player.climbing = true; player.vy = -3.5; }
        else if (player.grounded) { player.vy = -player.jumpForce; player.grounded = false; }
      }
      if (e.key === "ArrowDown" || e.key === "s") {
        let onLadder = false;
        ladders.forEach(l => { if (Math.abs(player.x + player.w/2 - l.x) < 20 && player.y + player.h > l.y - 10 && player.y < l.y + l.h + 10) onLadder = true; });
        if (onLadder) { player.climbing = true; player.vy = 3.5; }
      }
      if (e.key === " " && player.grounded) { player.vy = -player.jumpForce; player.grounded = false; }
      if (e.key === "Escape") onClose();
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key)) player.vx = 0;
      if (["ArrowUp", "ArrowDown", "w", "s"].includes(e.key) && player.climbing) player.vy = 0;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    loop();
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener("keydown", handleKeyDown); window.removeEventListener("keyup", handleKeyUp); window.removeEventListener('resize', updateCanvasSize); };
  }, [onClose]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-black cursor-none" />
  );
};

export default DonkeyKong;
