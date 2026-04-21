"use client";

import React, { useEffect, useRef } from "react";

interface DonkeyKongProps {
  onClose: () => void;
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

    const BASE_W = 800;
    const BASE_H = 600;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const getScale = () => Math.min(canvas.width / BASE_W, canvas.height / BASE_H) * 0.9;
    const getOffset = () => ({
      x: (canvas.width - (BASE_W * getScale())) / 2,
      y: (canvas.height - (BASE_H * getScale())) / 2
    });

    const player = { x: 50, y: 540, w: 30, h: 40, dy: 0, jumpForce: 15, grounded: true };
    let barrels: { x: number; y: number; w: number; h: number; speed: number }[] = [];
    let frameCount = 0;
    const gravity = 0.8;

    const update = () => {
      if (gameOver) return;
      player.dy += gravity;
      player.y += player.dy;

      const platforms = [{ x: 0, y: 580, w: 800, h: 20 }, { x: 100, y: 450, w: 300, h: 15 }, { x: 450, y: 350, w: 250, h: 15 }, { x: 50, y: 220, w: 350, h: 15 }];
      player.grounded = false;
      platforms.forEach(p => {
        if (player.dy > 0 && player.x < p.x + p.w && player.x + player.w > p.x && player.y + player.h > p.y && player.y + player.h < p.y + p.h + 10) {
          player.y = p.y - player.h; player.dy = 0; player.grounded = true;
        }
      });

      frameCount++;
      if (frameCount % 80 === 0) barrels.push({ x: 800, y: 550, w: 30, h: 30, speed: 5 + Math.random() * 3 });
      barrels.forEach((b, i) => {
        b.x -= b.speed;
        if (player.x < b.x + b.w && player.x + player.w > b.x && player.y < b.y + b.h && player.y + player.h > b.y) gameOver = true;
        if (b.x + b.w < 0) { barrels.splice(i, 1); score += 50; }
      });
    };

    const draw = () => {
      ctx.fillStyle = "black"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      const sc = getScale(); const off = getOffset();
      ctx.save(); ctx.translate(off.x, off.y); ctx.scale(sc, sc);

      if (gameOver) {
        ctx.fillStyle = "white"; ctx.font = "bold 40px monospace"; ctx.textAlign = "center";
        ctx.fillText("SESSION TERMINATED", 400, 300);
        ctx.restore(); return;
      }

      ctx.fillStyle = "#ff00ff"; ctx.fillRect(0, 580, 800, 20); ctx.fillRect(100, 450, 300, 15); ctx.fillRect(450, 350, 250, 15); ctx.fillRect(50, 220, 350, 15);
      ctx.fillStyle = "#ff0000"; ctx.fillRect(player.x, player.y, player.w, player.h);
      ctx.fillStyle = "#aa5500"; barrels.forEach(b => { ctx.beginPath(); ctx.arc(b.x+15, b.y+15, 15, 0, Math.PI*2); ctx.fill(); });

      ctx.restore();
      // HUD
      ctx.fillStyle = "white"; ctx.font = "bold 24px monospace"; ctx.textAlign = "left";
      ctx.fillText(`SCORE: ${score.toString().padStart(6, '0')}`, 60, 100);
    };

    const loop = () => { update(); draw(); animationFrameId = requestAnimationFrame(loop); };
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === " " || e.key === "ArrowUp") && player.grounded) player.dy = -player.jumpForce;
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    loop();
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener("keydown", handleKeyDown); window.removeEventListener('resize', updateCanvasSize); };
  }, [onClose]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-black cursor-none" />
  );
};

export default DonkeyKong;
