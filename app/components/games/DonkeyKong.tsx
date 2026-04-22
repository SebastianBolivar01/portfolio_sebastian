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
    let gameWon = false;
    let frame = 0;

    const BASE_W = 800;
    const BASE_H = 700;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Scaling
    const getScale = () => Math.min(canvas.width / BASE_W, canvas.height / BASE_H) * 0.9;
    const getOffset = () => ({
      x: (canvas.width - (BASE_W * getScale())) / 2,
      y: (canvas.height - (BASE_H * getScale())) / 2
    });

    // Game state
    const player = {
      x: 100,
      y: 600,
      w: 30,
      h: 40,
      vx: 0,
      vy: 0,
      speed: 4,
      jumpForce: 13,
      grounded: false,
      climbing: false,
      facing: 1, // 1: right, -1: left
      animFrame: 0
    };

    const platforms = [
      { x: 0, y: 650, w: 800, h: 20, type: "ground" },
      { x: 50, y: 530, w: 650, h: 15, type: "girder" },
      { x: 100, y: 410, w: 650, h: 15, type: "girder" },
      { x: 50, y: 290, w: 650, h: 15, type: "girder" },
      { x: 100, y: 170, w: 400, h: 15, type: "girder" },
    ];

    const ladders = [
      { x: 650, y: 530, h: 120 },
      { x: 120, y: 410, h: 120 },
      { x: 680, y: 290, h: 120 },
      { x: 150, y: 170, h: 120 },
    ];

    let barrels: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const gravity = 0.6;

    const spawnBarrel = () => {
      barrels.push({ x: 450, y: 140, vx: 3, vy: 0, r: 12 });
    };

    const drawSprite = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, type: string) => {
      ctx.save();
      if (type === "player") {
        ctx.fillStyle = "#ff0000";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ff0000";
        // Simple pixel man
        ctx.fillRect(x, y + 10, w, h - 10); // Body
        ctx.fillStyle = "#ffccaa";
        ctx.fillRect(x + 5, y, 20, 15); // Head
        ctx.fillStyle = "blue";
        ctx.fillRect(x + 5, y + 20, 20, 5); // Overalls
      } else if (type === "dk") {
        ctx.fillStyle = "#884400";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#884400";
        ctx.fillRect(x, y, w, h); // Big block for DK
        ctx.fillStyle = "#ffccaa";
        ctx.fillRect(x + 10, y + 10, 60, 40); // Face area
      }
      ctx.restore();
    };

    const update = () => {
      if (gameOver || gameWon) return;
      frame++;

      // Gravity & Physics
      if (!player.climbing) {
        player.vy += gravity;
        player.y += player.vy;
        player.x += player.vx;
      } else {
        player.y += player.vy;
      }

      // Platform Collision
      player.grounded = false;
      platforms.forEach(p => {
        if (player.vy >= 0 && player.x + player.w > p.x && player.x < p.x + p.w && 
            player.y + player.h >= p.y && player.y + player.h <= p.y + p.h + 10) {
          player.y = p.y - player.h;
          player.vy = 0;
          player.grounded = true;
          player.climbing = false;
        }
      });

      // Ladder Collision
      ladders.forEach(l => {
        if (player.x + player.w/2 > l.x - 10 && player.x + player.w/2 < l.x + 10 && 
            player.y + player.h > l.y && player.y < l.y + l.h) {
          // Can climb
          if (player.climbing) {
            player.vx = 0;
            if (player.y + player.h < l.y + 5) {
              player.climbing = false;
              player.y = l.y - player.h;
            }
          }
        } else if (player.climbing) {
          // player.climbing = false;
        }
      });

      // Barrels
      if (frame % 120 === 0) spawnBarrel();
      barrels.forEach((b, i) => {
        b.vy += gravity;
        b.y += b.vy;
        b.x += b.vx;

        let onGround = false;
        platforms.forEach(p => {
          if (b.x + b.r > p.x && b.x - b.r < p.x + p.w && 
              b.y + b.r >= p.y && b.y + b.r <= p.y + p.h + 5) {
            b.y = p.y - b.r;
            b.vy = 0;
            onGround = true;
          }
        });

        if (onGround) {
          // Change direction at edges
          if (b.x > 750) b.vx = -4;
          if (b.x < 50) b.vx = 4;
        }

        // Player Collision
        if (Math.hypot(b.x - (player.x + player.w/2), b.y - (player.y + player.h/2)) < b.r + 15) {
          gameOver = true;
        }

        if (b.y > 800) { barrels.splice(i, 1); score += 100; }
      });

      // Victory
      if (player.y < 150) gameWon = true;
    };

    const draw = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const sc = getScale();
      const off = getOffset();
      ctx.save();
      ctx.translate(off.x, off.y);
      ctx.scale(sc, sc);

      // Girders
      ctx.shadowBlur = 10;
      platforms.forEach(p => {
        ctx.fillStyle = "#ff2244";
        ctx.shadowColor = "#ff2244";
        ctx.fillRect(p.x, p.y, p.w, p.h);
        // Girder detail
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        for(let x = p.x; x < p.x + p.w; x += 20) {
          ctx.beginPath(); ctx.moveTo(x, p.y); ctx.lineTo(x + 20, p.y + p.h); ctx.stroke();
        }
      });

      // Ladders
      ctx.shadowBlur = 5;
      ladders.forEach(l => {
        ctx.fillStyle = "#00ffff";
        ctx.shadowColor = "#00ffff";
        ctx.fillRect(l.x - 12, l.y, 4, l.h);
        ctx.fillRect(l.x + 8, l.y, 4, l.h);
        for(let y = l.y; y < l.y + l.h; y += 15) {
          ctx.fillRect(l.x - 12, y, 24, 3);
        }
      });

      // DK
      drawSprite(ctx, 400, 70, 80, 100, "dk");

      // Player
      drawSprite(ctx, player.x, player.y, player.w, player.h, "player");

      // Barrels
      barrels.forEach(b => {
        ctx.fillStyle = "#aa5500";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#aa5500";
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        // Barrel stripes
        ctx.strokeStyle = "rgba(0,0,0,0.4)";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(b.x - b.r, b.y); ctx.lineTo(b.x + b.r, b.y); ctx.stroke();
      });

      if (gameOver || gameWon) {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, BASE_W, BASE_H);
        ctx.fillStyle = "white";
        ctx.font = "bold 60px monospace";
        ctx.textAlign = "center";
        ctx.fillText(gameOver ? "GAME OVER" : "VICTORY!", 400, 350);
        ctx.font = "20px monospace";
        ctx.fillText("Press [R] to Restart", 400, 420);
      }

      ctx.restore();

      // HUD
      ctx.fillStyle = "white";
      ctx.font = "bold 24px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`P1_SCORE: ${score.toString().padStart(6, '0')}`, 60, 80);

      // CRT Scanlines
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      for(let i = 0; i < canvas.height; i += 4) ctx.fillRect(0, i, canvas.width, 2);
    };

    const loop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || gameWon) {
        if (e.key === "r") {
          score = 0; gameOver = false; gameWon = false; barrels = [];
          player.x = 100; player.y = 600; player.vx = 0; player.vy = 0;
        }
      }
      
      if (e.key === "ArrowLeft" || e.key === "a") player.vx = -player.speed;
      if (e.key === "ArrowRight" || e.key === "d") player.vx = player.speed;
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w") {
        // Jump or Climb
        let onLadder = false;
        ladders.forEach(l => {
          if (player.x + player.w/2 > l.x - 15 && player.x + player.w/2 < l.x + 15 && 
              player.y + player.h > l.y && player.y < l.y + l.h) {
            onLadder = true;
          }
        });

        if (onLadder) {
          player.climbing = true;
          player.vy = -3;
        } else if (player.grounded) {
          player.vy = -player.jumpForce;
          player.grounded = false;
        }
      }
      if (e.key === "ArrowDown" || e.key === "s") {
        let onLadder = false;
        ladders.forEach(l => {
          if (player.x + player.w/2 > l.x - 15 && player.x + player.w/2 < l.x + 15 && 
              player.y + player.h > l.y - 10 && player.y < l.y + l.h) {
            onLadder = true;
          }
        });
        if (onLadder) {
          player.climbing = true;
          player.vy = 3;
        }
      }
      if (e.key === "Escape") onClose();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key)) player.vx = 0;
      if (["ArrowUp", "ArrowDown", "w", "s", " "].includes(e.key)) {
        if (player.climbing) player.vy = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [onClose]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-black cursor-none" />
  );
};

export default DonkeyKong;
