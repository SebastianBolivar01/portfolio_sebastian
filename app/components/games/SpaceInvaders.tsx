"use client";

import React, { useEffect, useRef } from "react";

interface SpaceInvadersProps {
  onClose: () => void;
}

const SpaceInvaders: React.FC<SpaceInvadersProps> = ({ onClose }) => {
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
    
    // Scale factor for responsive design
    let scale = 1;

    // Game state
    const updateCanvasSize = () => {
      // We want the game to be large but leave room for UI
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.8;
      const baseWidth = 800;
      const baseHeight = 600;
      
      const ratio = Math.min(maxWidth / baseWidth, maxHeight / baseHeight);
      canvas.width = baseWidth * ratio;
      canvas.height = baseHeight * ratio;
      scale = ratio;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    // Player
    const player = {
      x: 400, // base units
      y: 550,
      w: 50,
      h: 30,
      speed: 8,
      dx: 0,
    };

    // Bullets
    let bullets: { x: number; y: number; speed: number; color: string }[] = [];
    let alienBullets: { x: number; y: number; speed: number }[] = [];
    let particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];

    // Aliens
    const ALIEN_ROWS = 5;
    const ALIEN_COLS = 11;
    let aliens: { x: number; y: number; type: number; alive: boolean; frame: number }[] = [];
    
    const initAliens = () => {
      aliens = [];
      for (let r = 0; r < ALIEN_ROWS; r++) {
        for (let c = 0; c < ALIEN_COLS; c++) {
          aliens.push({
            x: 100 + c * 50,
            y: 100 + r * 45,
            type: r === 0 ? 2 : (r < 3 ? 1 : 0),
            alive: true,
            frame: 0
          });
        }
      }
    };
    initAliens();

    let alienDirection = 1;
    let alienMoveCounter = 0;
    let alienStepTime = 40;
    let alienMoveY = 0;

    const createParticles = (x: number, y: number, color: string) => {
      for (let i = 0; i < 15; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          life: 1.0,
          color
        });
      }
    };

    const drawSprite = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, type: number, frame: number, color: string) => {
      ctx.fillStyle = color;
      ctx.shadowBlur = 10 * scale;
      ctx.shadowColor = color;
      
      const s = w / 11; // pixel size in sprite
      
      // Alien shapes represented by simple pixel grids
      const sprites = [
        // Type 0
        [
          "00011000",
          "01111110",
          "11111111",
          "11011011",
          "11111111",
          "00100100",
          "01011010",
          "10100101"
        ],
        // Type 1
        [
          "001000100",
          "000101000",
          "011111110",
          "110111011",
          "111111111",
          "101111101",
          "101000101",
          "000111000"
        ],
        // Type 2
        [
          "0000110000",
          "0011111100",
          "0111111110",
          "1101111011",
          "1111111111",
          "0010110100",
          "0101001010",
          "1010000101"
        ]
      ];

      const sprite = sprites[type];
      for (let r = 0; r < sprite.length; r++) {
        for (let c = 0; c < sprite[r].length; c++) {
          if (sprite[r][c] === "1") {
            ctx.fillRect(x + c * s, y + r * s, s, s);
          }
        }
      }
      ctx.shadowBlur = 0;
    };

    const update = () => {
      if (gameOver || gameWon) return;

      // Player
      player.x += player.dx;
      if (player.x < 25) player.x = 25;
      if (player.x > 775) player.x = 775;

      // Bullets
      bullets.forEach((b, i) => {
        b.y -= b.speed;
        if (b.y < 0) bullets.splice(i, 1);
      });

      alienBullets.forEach((b, i) => {
        b.y += b.speed;
        if (b.y > 600) alienBullets.splice(i, 1);
        
        // Player hit
        if (b.x > player.x - player.w/2 && b.x < player.x + player.w/2 && b.y > player.y - player.h/2 && b.y < player.y + player.h/2) {
          gameOver = true;
          createParticles(player.x, player.y, "#00ff00");
        }
      });

      // Particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        if (p.life <= 0) particles.splice(i, 1);
      });

      // Aliens
      alienMoveCounter++;
      if (alienMoveCounter > alienStepTime) {
        let edge = false;
        aliens.forEach(a => {
          if (a.alive) {
            a.x += 15 * alienDirection;
            if (a.x < 50 || a.x > 750) edge = true;
          }
        });

        if (edge) {
          alienDirection *= -1;
          aliens.forEach(a => {
            a.y += 20;
            if (a.y > 500) gameOver = true;
          });
          alienStepTime = Math.max(5, alienStepTime - 2);
        }
        alienMoveCounter = 0;

        // Alien fire
        if (Math.random() < 0.1) {
          const alive = aliens.filter(a => a.alive);
          if (alive.length > 0) {
            const a = alive[Math.floor(Math.random() * alive.length)];
            alienBullets.push({ x: a.x, y: a.y, speed: 5 });
          }
        }
      }

      // Collision
      bullets.forEach((b, bi) => {
        aliens.forEach(a => {
          if (a.alive && b.x > a.x - 20 && b.x < a.x + 20 && b.y > a.y - 20 && b.y < a.y + 20) {
            a.alive = false;
            bullets.splice(bi, 1);
            score += 100;
            createParticles(a.x, a.y, "#ff00ff");
            
            if (aliens.every(al => !al.alive)) gameWon = true;
          }
        });
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(scale, scale);

      // Background Grid
      ctx.strokeStyle = "rgba(0, 100, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 800; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 600); ctx.stroke();
      }
      for (let i = 0; i < 600; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(800, i); ctx.stroke();
      }

      if (gameOver || gameWon) {
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "bold 60px monospace";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "white";
        ctx.fillText(gameOver ? "GAME OVER" : "YOU WIN", 400, 300);
        ctx.font = "20px monospace";
        ctx.fillText(`Final Score: ${score}`, 400, 350);
        ctx.fillText("Press [R] to Restart", 400, 400);
        ctx.restore();
        return;
      }

      // Player
      ctx.fillStyle = "#00ff88";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#00ff88";
      ctx.fillRect(player.x - player.w/2, player.y - player.h/2, player.w, player.h);
      ctx.fillRect(player.x - 5, player.y - player.h, 10, 10);
      ctx.shadowBlur = 0;

      // Aliens
      aliens.forEach(a => {
        if (a.alive) {
          const colors = ["#ff00ff", "#00ffff", "#ffff00"];
          drawSprite(ctx, a.x - 15, a.y - 10, 30, 25, a.type, 0, colors[a.type]);
        }
      });

      // Bullets
      bullets.forEach(b => {
        ctx.fillStyle = "#fff";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#fff";
        ctx.fillRect(b.x - 2, b.y - 10, 4, 15);
      });
      
      alienBullets.forEach(b => {
        ctx.fillStyle = "#ff4444";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ff4444";
        ctx.fillRect(b.x - 2, b.y, 4, 15);
      });

      // Particles
      particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
      });
      ctx.globalAlpha = 1.0;

      // HUD
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`SCORE: ${score.toString().padStart(6, '0')}`, 40, 50);
      
      // CRT Scanlines
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      for(let i=0; i<600; i+=4) {
        ctx.fillRect(0, i, 800, 2);
      }

      ctx.restore();
    };

    const loop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") player.dx = -player.speed;
      if (e.key === "ArrowRight" || e.key === "d") player.dx = player.speed;
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w") {
        if (bullets.length < 3) {
          bullets.push({ x: player.x, y: player.y - 20, speed: 12, color: "#fff" });
        }
      }
      if (e.key === "r" && (gameOver || gameWon)) {
        score = 0; gameOver = false; gameWon = false;
        bullets = []; alienBullets = []; particles = [];
        initAliens();
      }
      if (e.key === "Escape") onClose();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key)) player.dx = 0;
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
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="relative group p-4">
        {/* Glow behind canvas */}
        <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative border border-white/20 rounded bg-black/40 backdrop-blur-sm shadow-2xl overflow-hidden">
          {/* Header Bar */}
          <div className="w-full bg-white/5 border-b border-white/10 px-4 py-2 flex justify-between items-center">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">
              Terminal :: Space Invaders v2.4
            </div>
          </div>
          
          <canvas ref={canvasRef} className="block shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
        </div>
      </div>
      
      {/* Controls Legend */}
      <div className="mt-6 flex gap-10 items-center">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">Movement</span>
          <div className="flex gap-1">
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">A</kbd>
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">D</kbd>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">Fire</span>
          <kbd className="px-4 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono italic">SPACE</kbd>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">Exit</span>
          <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">ESC</kbd>
        </div>
      </div>
    </div>
  );
};

export default SpaceInvaders;
