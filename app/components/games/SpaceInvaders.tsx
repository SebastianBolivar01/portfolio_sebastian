"use client";

import React, { useEffect, useRef } from "react";

interface SpaceInvadersProps {
  onClose: () => void;
  onGameOver?: (score: number) => void;
}

const SpaceInvaders: React.FC<SpaceInvadersProps> = ({ onClose, onGameOver }) => {
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

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Player (centered)
    const player = {
      x: canvas.width / 2,
      y: canvas.height - 120,
      w: 60,
      h: 35,
      dx: 0,
      speed: 12
    };

    let bullets: { x: number; y: number; speed: number }[] = [];
    let alienBullets: { x: number; y: number; speed: number }[] = [];
    let particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];

    const ALIEN_COLS = 11;
    const ALIEN_ROWS = 5;
    let aliens: { x: number; y: number; type: number; alive: boolean }[] = [];
    
    const initAliens = () => {
      aliens = [];
      const colWidth = Math.min(80, canvas.width * 0.07);
      const rowHeight = Math.min(60, canvas.height * 0.08);
      const startX = (canvas.width - (ALIEN_COLS * colWidth)) / 2;
      const startY = 150;

      for (let r = 0; r < ALIEN_ROWS; r++) {
        for (let c = 0; c < ALIEN_COLS; c++) {
          aliens.push({
            x: startX + c * colWidth + colWidth/2,
            y: startY + r * rowHeight,
            type: r === 0 ? 2 : (r < 3 ? 1 : 0),
            alive: true
          });
        }
      }
    };
    initAliens();

    let alienDirection = 1;
    let alienMoveCounter = 0;
    let alienStepTime = 40;

    const drawSprite = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, type: number, color: string) => {
      ctx.fillStyle = color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      const s = size / 11;
      const sprites = [
        ["00011000","01111110","11111111","11011011","11111111","00100100","01011010","10100101"],
        ["001000100","000101000","011111110","110111011","111111111","101111101","101000101","000111000"],
        ["0000110000","0011111100","0111111110","1101111011","1111111111","0010110100","0101001010","1010000101"]
      ];
      const sprite = sprites[type];
      for (let r = 0; r < sprite.length; r++) {
        for (let c = 0; c < sprite[r].length; c++) {
          if (sprite[r][c] === "1") ctx.fillRect(x - size/2 + c * s, y - size/2 + r * s, s, s);
        }
      }
      ctx.shadowBlur = 0;
    };

    const update = () => {
      if (gameOver || gameWon) return;
      player.x += player.dx;
      if (player.x < 50) player.x = 50;
      if (player.x > canvas.width - 50) player.x = canvas.width - 50;

      bullets.forEach((b, i) => { b.y -= b.speed; if (b.y < 0) bullets.splice(i, 1); });
      alienBullets.forEach((b, i) => {
        b.y += b.speed; if (b.y > canvas.height) alienBullets.splice(i, 1);
        if (Math.abs(b.x - player.x) < 30 && Math.abs(b.y - player.y) < 20) {
          gameOver = true;
          if (onGameOver) onGameOver(score);
        }
      });

      alienMoveCounter++;
      if (alienMoveCounter > alienStepTime) {
        let edge = false;
        aliens.forEach(a => { if (a.alive) { a.x += 20 * alienDirection; if (a.x < 100 || a.x > canvas.width - 100) edge = true; } });
        if (edge) {
          alienDirection *= -1;
          aliens.forEach(a => { 
            a.y += 30; 
            if (a.y > player.y - 50) {
              gameOver = true;
              if (onGameOver) onGameOver(score);
            }
          });
          alienStepTime = Math.max(5, alienStepTime - 1);
        }
        alienMoveCounter = 0;
        if (Math.random() < 0.1) {
          const alive = aliens.filter(a => a.alive);
          if (alive.length > 0) {
            const a = alive[Math.floor(Math.random() * alive.length)];
            alienBullets.push({ x: a.x, y: a.y, speed: 6 });
          }
        }
      }

      bullets.forEach((b, bi) => {
        aliens.forEach(a => {
          if (a.alive && Math.abs(b.x - a.x) < 25 && Math.abs(b.y - a.y) < 20) {
            a.alive = false; bullets.splice(bi, 1); score += 100;
            if (aliens.every(al => !al.alive)) {
              gameWon = true;
              if (onGameOver) onGameOver(score + 1000); // Bonus for winning
            }
          }
        });
      });
    };

    const draw = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Neon Grid
      ctx.strokeStyle = "rgba(0, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 100) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
      for (let i = 0; i < canvas.height; i += 100) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }

      if (gameOver || gameWon) {
        ctx.fillStyle = "white"; ctx.textAlign = "center"; ctx.font = "bold 60px monospace";
        ctx.fillText(gameOver ? "MISSION FAILED" : "SYSTEM SECURED", canvas.width/2, canvas.height/2);
        ctx.font = "30px monospace"; ctx.fillText(`Final Score: ${score}`, canvas.width/2, canvas.height/2 + 80);
        ctx.restore(); return;
      }

      // Player
      ctx.fillStyle = "#00ff88"; ctx.shadowBlur = 20; ctx.shadowColor = "#00ff88";
      ctx.fillRect(player.x - player.w/2, player.y - player.h/2, player.w, player.h);
      ctx.fillRect(player.x - 5, player.y - player.h, 10, 10);

      // Aliens
      aliens.forEach(a => { if (a.alive) drawSprite(ctx, a.x, a.y, 45, a.type, ["#ff00ff", "#00ffff", "#ffff00"][a.type]); });

      // Bullets
      bullets.forEach(b => { ctx.fillStyle = "#fff"; ctx.fillRect(b.x - 2, b.y - 15, 4, 20); });
      alienBullets.forEach(b => { ctx.fillStyle = "#ff4444"; ctx.fillRect(b.x - 2, b.y, 4, 20); });

      // HUD
      ctx.fillStyle = "white"; ctx.font = "bold 24px monospace"; ctx.textAlign = "left";
      ctx.fillText(`SCORE: ${score.toString().padStart(6, '0')}`, 60, 100);
    };

    const loop = () => { update(); draw(); animationFrameId = requestAnimationFrame(loop); };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") player.dx = -player.speed;
      if (e.key === "ArrowRight" || e.key === "d") player.dx = player.speed;
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w") if (bullets.length < 5) bullets.push({ x: player.x, y: player.y - 20, speed: 15 });
      if (e.key === "r" && (gameOver || gameWon)) { score = 0; gameOver = false; gameWon = false; bullets = []; alienBullets = []; initAliens(); }
      if (e.key === "Escape") onClose();
    };
    const handleKeyUp = (e: KeyboardEvent) => { if (["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key)) player.dx = 0; };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    loop();
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener("keydown", handleKeyDown); window.removeEventListener("keyup", handleKeyUp); window.removeEventListener('resize', updateCanvasSize); };
  }, [onClose, onGameOver]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-black cursor-none" />
  );
};

export default SpaceInvaders;
