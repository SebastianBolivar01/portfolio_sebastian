"use client";

import React, { useEffect, useRef } from "react";

interface PacManProps {
  onClose: () => void;
}

const PacMan: React.FC<PacManProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let score = 0;
    let gameOver = false;

    const SIZE = 20;
    const ROWS = 19;
    const COLS = 19;
    canvas.width = COLS * SIZE;
    canvas.height = ROWS * SIZE;

    // 0: empty, 1: wall, 2: dot, 3: power pill (not implemented yet)
    const maze = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1],
      [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
      [1, 1, 1, 1, 2, 1, 0, 1, 1, 0, 1, 1, 0, 1, 2, 1, 1, 1, 1],
      [0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0],
      [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
      [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
      [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
      [1, 2, 2, 1, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 1, 2, 2, 1],
      [1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1],
      [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    let currentMaze = maze.map(row => [...row]);

    const player = {
      x: 9 * SIZE,
      y: 15 * SIZE,
      dir: { x: 0, y: 0 },
      nextDir: { x: 0, y: 0 },
      speed: 2,
    };

    const ghosts = [
      { x: 9 * SIZE, y: 9 * SIZE, color: "red", dir: { x: 1, y: 0 } },
      { x: 8 * SIZE, y: 9 * SIZE, color: "pink", dir: { x: -1, y: 0 } },
      { x: 10 * SIZE, y: 9 * SIZE, color: "cyan", dir: { x: 0, y: 1 } },
    ];

    const drawMaze = () => {
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (currentMaze[r][c] === 1) {
            ctx.fillStyle = "#1a1a7a";
            ctx.fillRect(c * SIZE, r * SIZE, SIZE, SIZE);
          } else if (currentMaze[r][c] === 2) {
            ctx.fillStyle = "#ffb8ae";
            ctx.beginPath();
            ctx.arc(c * SIZE + SIZE / 2, r * SIZE + SIZE / 2, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const drawPlayer = () => {
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      const centerX = player.x + SIZE / 2;
      const centerY = player.y + SIZE / 2;
      ctx.arc(centerX, centerY, SIZE / 2 - 2, 0.2 * Math.PI, 1.8 * Math.PI);
      ctx.lineTo(centerX, centerY);
      ctx.fill();
    };

    const drawGhosts = () => {
      ghosts.forEach(g => {
        ctx.fillStyle = g.color;
        ctx.beginPath();
        ctx.arc(g.x + SIZE / 2, g.y + SIZE / 2, SIZE / 2 - 2, Math.PI, 0);
        ctx.lineTo(g.x + SIZE - 2, g.y + SIZE - 2);
        ctx.lineTo(g.x + 2, g.y + SIZE - 2);
        ctx.fill();
      });
    };

    const canMove = (x: number, y: number, dx: number, dy: number) => {
      const nextX = x + dx;
      const nextY = y + dy;
      const r = Math.floor(nextY / SIZE);
      const c = Math.floor(nextX / SIZE);
      const r2 = Math.floor((nextY + SIZE - 1) / SIZE);
      const c2 = Math.floor((nextX + SIZE - 1) / SIZE);
      
      return currentMaze[r][c] !== 1 && currentMaze[r2][c2] !== 1 &&
             currentMaze[r][c2] !== 1 && currentMaze[r2][c] !== 1;
    };

    const update = () => {
      if (gameOver) return;

      // Try to turn
      if (player.nextDir.x !== 0 || player.nextDir.y !== 0) {
        if (canMove(player.x, player.y, player.nextDir.x * player.speed, player.nextDir.y * player.speed)) {
          player.dir = { ...player.nextDir };
        }
      }

      // Move
      if (canMove(player.x, player.y, player.dir.x * player.speed, player.dir.y * player.speed)) {
        player.x += player.dir.x * player.speed;
        player.y += player.dir.y * player.speed;
      }

      // Collect dots
      const r = Math.floor((player.y + SIZE / 2) / SIZE);
      const c = Math.floor((player.x + SIZE / 2) / SIZE);
      if (currentMaze[r][c] === 2) {
        currentMaze[r][c] = 0;
        score += 10;
      }

      // Ghost logic
      ghosts.forEach(g => {
        if (canMove(g.x, g.y, g.dir.x * player.speed, g.dir.y * player.speed)) {
          g.x += g.dir.x * (player.speed / 2);
          g.y += g.dir.y * (player.speed / 2);
        } else {
          const dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
          g.dir = dirs[Math.floor(Math.random() * dirs.length)];
        }

        // Collision
        const dist = Math.sqrt(Math.pow(g.x - player.x, 2) + Math.pow(g.y - player.y, 2));
        if (dist < SIZE - 5) gameOver = true;
      });
    };

    const loop = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
        return;
      }

      drawMaze();
      drawPlayer();
      drawGhosts();
      update();
      animationFrameId = requestAnimationFrame(loop);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") player.nextDir = { x: 0, y: -1 };
      if (e.key === "ArrowDown") player.nextDir = { x: 0, y: 1 };
      if (e.key === "ArrowLeft") player.nextDir = { x: -1, y: 0 };
      if (e.key === "ArrowRight") player.nextDir = { x: 1, y: 0 };
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
      <h2 className="text-3xl font-bold text-yellow-400 mb-2 italic">PAC-MAN</h2>
      <div className="relative border-4 border-yellow-400/30 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(250,204,21,0.3)] bg-black">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
      <p className="text-gray-400 text-sm mt-4">
        Use Arrow keys to move • ESC to exit
      </p>
    </div>
  );
};

export default PacMan;
