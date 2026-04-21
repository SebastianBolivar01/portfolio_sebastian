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

    const BASE_W = 600;
    const BASE_H = 400;
    let scale = 1;

    const updateCanvasSize = () => {
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.8;
      scale = Math.min(maxWidth / BASE_W, maxHeight / BASE_H);
      canvas.width = BASE_W * scale;
      canvas.height = BASE_H * scale;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const player = { x: 50, y: 340, w: 30, h: 40, dy: 0, jumpForce: 12, grounded: true };
    let barrels: { x: number; y: number; w: number; h: number; speed: number }[] = [];
    let frameCount = 0;
    const gravity = 0.6;

    const update = () => {
      if (gameOver) return;
      player.dy += gravity;
      player.y += player.dy;

      const platforms = [{ x: 0, y: 380, w: 600, h: 20 }, { x: 100, y: 280, w: 200, h: 15 }, { x: 350, y: 200, w: 200, h: 15 }, { x: 50, y: 120, w: 250, h: 15 }];
      player.grounded = false;
      platforms.forEach(p => {
        if (player.dy > 0 && player.x < p.x + p.w && player.x + player.w > p.x && player.y + player.h > p.y && player.y + player.h < p.y + p.h + 10) {
          player.y = p.y - player.h; player.dy = 0; player.grounded = true;
        }
      });

      frameCount++;
      if (frameCount % 100 === 0) barrels.push({ x: 600, y: 350, w: 30, h: 30, speed: 4 + Math.random() * 2 });
      barrels.forEach((b, i) => {
        b.x -= b.speed;
        if (player.x < b.x + b.w && player.x + player.w > b.x && player.y < b.y + b.h && player.y + player.h > b.y) gameOver = true;
        if (b.x + b.w < 0) { barrels.splice(i, 1); score += 50; }
      });
    };

    const draw = () => {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(scale, scale);

      if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "30px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", 300, 200);
        ctx.restore();
        return;
      }

      ctx.fillStyle = "#ff00ff";
      ctx.fillRect(0, 380, 600, 20);
      ctx.fillRect(100, 280, 200, 15);
      ctx.fillRect(350, 200, 200, 15);
      ctx.fillRect(50, 120, 250, 15);

      ctx.fillStyle = "#ff0000";
      ctx.fillRect(player.x, player.y, player.w, player.h);

      ctx.fillStyle = "#aa5500";
      barrels.forEach(b => { ctx.beginPath(); ctx.arc(b.x+15, b.y+15, 15, 0, Math.PI*2); ctx.fill(); });

      ctx.fillStyle = "white";
      ctx.font = "16px monospace";
      ctx.fillText(`Score: ${score}`, 20, 30);
      ctx.restore();
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
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-3xl font-bold text-red-500 mb-6 italic tracking-widest">DONKEY KONG</h2>
      <div className="relative border-4 border-red-500/20 rounded shadow-[0_0_50px_rgba(239,68,68,0.1)]">
        <canvas ref={canvasRef} className="block bg-black" />
      </div>
      <div className="mt-8 text-gray-500 font-mono text-[10px] tracking-widest uppercase">
        Ready Player One • High Score: {score}
      </div>
    </div>
  );
};

export default DonkeyKong;
