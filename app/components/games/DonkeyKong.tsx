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

    const WIDTH = 600;
    const HEIGHT = 400;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const player = {
      x: 50,
      y: HEIGHT - 60,
      w: 30,
      h: 40,
      dy: 0,
      jumpForce: 12,
      grounded: true,
      color: "#ff0000"
    };

    let barrels: { x: number; y: number; w: number; h: number; speed: number }[] = [];
    let frameCount = 0;

    const gravity = 0.6;

    const drawPlatforms = () => {
      ctx.fillStyle = "#ff00ff"; // Retro magenta
      ctx.fillRect(0, HEIGHT - 20, WIDTH, 20); // Ground
      
      // Some simple platforms
      ctx.fillRect(100, HEIGHT - 120, 200, 15);
      ctx.fillRect(350, HEIGHT - 200, 200, 15);
      ctx.fillRect(50, HEIGHT - 280, 250, 15);
    };

    const drawPlayer = () => {
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.w, player.h);
      // Head
      ctx.fillStyle = "#ffccaa";
      ctx.fillRect(player.x + 5, player.y - 15, 20, 20);
    };

    const drawBarrels = () => {
      ctx.fillStyle = "#aa5500";
      barrels.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x + b.w / 2, b.y + b.h / 2, b.w / 2, 0, Math.PI * 2);
        ctx.fill();
        // Barrel lines
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    const update = () => {
      if (gameOver) return;

      // Player physics
      player.dy += gravity;
      player.y += player.dy;

      // Platform collisions
      player.grounded = false;
      const platforms = [
        { x: 0, y: HEIGHT - 60, w: WIDTH, h: 20 },
        { x: 100, y: HEIGHT - 160, w: 200, h: 15 },
        { x: 350, y: HEIGHT - 240, w: 200, h: 15 },
        { x: 50, y: HEIGHT - 320, w: 250, h: 15 }
      ];

      platforms.forEach(p => {
        if (
          player.dy > 0 &&
          player.x < p.x + p.w &&
          player.x + player.w > p.x &&
          player.y + player.h > p.y &&
          player.y + player.h < p.y + p.h + 10
        ) {
          player.y = p.y - player.h;
          player.dy = 0;
          player.grounded = true;
        }
      });

      // Spawn barrels
      frameCount++;
      if (frameCount % 100 === 0) {
        barrels.push({
          x: WIDTH,
          y: HEIGHT - 50,
          w: 30,
          h: 30,
          speed: 4 + Math.random() * 2
        });
      }

      // Update barrels
      barrels = barrels.filter(b => b.x + b.w > 0);
      barrels.forEach(b => {
        b.x -= b.speed;
        
        // Collision with player
        if (
          player.x < b.x + b.w &&
          player.x + player.w > b.x &&
          player.y < b.y + b.h &&
          player.y + player.h > b.y
        ) {
          gameOver = true;
        }

        if (b.x + b.w < player.x && ! (b as any).passed) {
          (b as any).passed = true;
          score += 50;
        }
      });
    };

    const loop = () => {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "30px 'Press Start 2P', monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", WIDTH / 2, HEIGHT / 2);
        ctx.font = "20px monospace";
        ctx.fillText(`Score: ${score}`, WIDTH / 2, HEIGHT / 2 + 50);
        return;
      }

      drawPlatforms();
      drawPlayer();
      drawBarrels();
      update();
      
      // Score
      ctx.fillStyle = "white";
      ctx.font = "16px monospace";
      ctx.fillText(`Score: ${score}`, 20, 30);
      
      animationFrameId = requestAnimationFrame(loop);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp") {
        if (player.grounded) {
          player.dy = -player.jumpForce;
        }
      }
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-3xl font-bold text-red-500 mb-2">DONKEY KONG</h2>
      <div className="relative border-4 border-red-500/30 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(239,68,68,0.3)] bg-black">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
      <p className="text-gray-400 text-sm mt-4">
        Use SPACE or Arrow Up to jump • ESC to exit
      </p>
    </div>
  );
};

export default DonkeyKong;
