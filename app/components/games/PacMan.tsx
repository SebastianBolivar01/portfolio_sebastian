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

    const BASE_SIZE = 20;
    const ROWS = 19;
    const COLS = 19;
    
    let scale = 1;
    const updateCanvasSize = () => {
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.8;
      const baseDim = ROWS * BASE_SIZE;
      
      scale = Math.min(maxWidth / baseDim, maxHeight / baseDim);
      canvas.width = baseDim * scale;
      canvas.height = baseDim * scale;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // 0: empty, 1: wall, 2: dot
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
      x: 9 * BASE_SIZE,
      y: 15 * BASE_SIZE,
      dir: { x: 0, y: 0 },
      nextDir: { x: 0, y: 0 },
      speed: 2,
    };

    const ghosts = [
      { x: 9 * BASE_SIZE, y: 9 * BASE_SIZE, color: "red", dir: { x: 1, y: 0 } },
      { x: 8 * BASE_SIZE, y: 9 * BASE_SIZE, color: "pink", dir: { x: -1, y: 0 } },
      { x: 10 * BASE_SIZE, y: 9 * BASE_SIZE, color: "cyan", dir: { x: 0, y: 1 } },
    ];

    const draw = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.save();
      ctx.scale(scale, scale);

      if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "20px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", (COLS * BASE_SIZE) / 2, (ROWS * BASE_SIZE) / 2);
        ctx.restore();
        return;
      }

      // Draw Maze
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (currentMaze[r][c] === 1) {
            ctx.fillStyle = "#2222bb";
            ctx.fillRect(c * BASE_SIZE + 2, r * BASE_SIZE + 2, BASE_SIZE - 4, BASE_SIZE - 4);
          } else if (currentMaze[r][c] === 2) {
            ctx.fillStyle = "#ffb8ae";
            ctx.beginPath();
            ctx.arc(c * BASE_SIZE + BASE_SIZE / 2, r * BASE_SIZE + BASE_SIZE / 2, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw Player
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(player.x + BASE_SIZE/2, player.y + BASE_SIZE/2, BASE_SIZE/2 - 2, 0.2 * Math.PI, 1.8 * Math.PI);
      ctx.lineTo(player.x + BASE_SIZE/2, player.y + BASE_SIZE/2);
      ctx.fill();

      // Draw Ghosts
      ghosts.forEach(g => {
        ctx.fillStyle = g.color;
        ctx.beginPath();
        ctx.arc(g.x + BASE_SIZE/2, g.y + BASE_SIZE/2, BASE_SIZE/2 - 2, Math.PI, 0);
        ctx.lineTo(g.x + BASE_SIZE - 2, g.y + BASE_SIZE - 2);
        ctx.lineTo(g.x + 2, g.y + BASE_SIZE - 2);
        ctx.fill();
      });

      ctx.restore();
    };

    const update = () => {
      if (gameOver) return;

      const canMove = (x: number, y: number, dx: number, dy: number) => {
        const nx = x + dx; const ny = y + dy;
        const r = Math.floor(ny / BASE_SIZE); const c = Math.floor(nx / BASE_SIZE);
        const r2 = Math.floor((ny + BASE_SIZE - 1) / BASE_SIZE); const c2 = Math.floor((nx + BASE_SIZE - 1) / BASE_SIZE);
        return currentMaze[r][c] !== 1 && currentMaze[r2][c2] !== 1 && currentMaze[r][c2] !== 1 && currentMaze[r2][c] !== 1;
      };

      if (player.nextDir.x !== 0 || player.nextDir.y !== 0) {
        if (canMove(player.x, player.y, player.nextDir.x * player.speed, player.nextDir.y * player.speed)) {
          player.dir = { ...player.nextDir };
        }
      }

      if (canMove(player.x, player.y, player.dir.x * player.speed, player.dir.y * player.speed)) {
        player.x += player.dir.x * player.speed;
        player.y += player.dir.y * player.speed;
      }

      const r = Math.floor((player.y + BASE_SIZE/2) / BASE_SIZE);
      const c = Math.floor((player.x + BASE_SIZE/2) / BASE_SIZE);
      if (currentMaze[r][c] === 2) { currentMaze[r][c] = 0; score += 10; }

      ghosts.forEach(g => {
        if (canMove(g.x, g.y, g.dir.x, g.dir.y)) { g.x += g.dir.x; g.y += g.dir.y; }
        else { const dirs = [{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}]; g.dir = dirs[Math.floor(Math.random()*4)]; }
        if (Math.abs(g.x - player.x) < 10 && Math.abs(g.y - player.y) < 10) gameOver = true;
      });
    };

    const loop = () => { update(); draw(); animationFrameId = requestAnimationFrame(loop); };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") player.nextDir = { x: 0, y: -1 };
      if (e.key === "ArrowDown") player.nextDir = { x: 0, y: 1 };
      if (e.key === "ArrowLeft") player.nextDir = { x: -1, y: 0 };
      if (e.key === "ArrowRight") player.nextDir = { x: 1, y: 0 };
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    loop();
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener("keydown", handleKeyDown); window.removeEventListener('resize', updateCanvasSize); };
  }, [onClose]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 italic tracking-tighter">PAC-MAN</h2>
      <div className="relative border-4 border-yellow-400/20 rounded shadow-[0_0_50px_rgba(250,204,0,0.1)]">
        <canvas ref={canvasRef} className="block bg-black" />
      </div>
      <div className="mt-8 text-gray-500 font-mono text-[10px] tracking-widest uppercase">
        Ready Player One • High Score: {score}
      </div>
    </div>
  );
};

export default PacMan;
