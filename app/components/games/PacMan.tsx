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

    const BASE_CELL = 20;
    const ROWS = 19;
    const COLS = 19;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Scaling
    const getScale = () => Math.min(canvas.width / (COLS * BASE_CELL), canvas.height / (ROWS * BASE_CELL)) * 0.9;
    const getOffset = () => ({
      x: (canvas.width - (COLS * BASE_CELL * getScale())) / 2,
      y: (canvas.height - (ROWS * BASE_CELL * getScale())) / 2
    });

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
    const player = { x: 9 * BASE_CELL, y: 15 * BASE_CELL, dir: { x: 0, y: 0 }, nextDir: { x: 0, y: 0 }, speed: 2 };
    const ghosts = [
      { x: 9 * BASE_CELL, y: 9 * BASE_CELL, color: "red", dir: { x: 1, y: 0 } },
      { x: 8 * BASE_CELL, y: 9 * BASE_CELL, color: "pink", dir: { x: -1, y: 0 } },
      { x: 10 * BASE_CELL, y: 9 * BASE_CELL, color: "cyan", dir: { x: 0, y: 1 } },
    ];

    const draw = () => {
      ctx.fillStyle = "black"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      const sc = getScale(); const off = getOffset();
      ctx.save(); ctx.translate(off.x, off.y); ctx.scale(sc, sc);

      if (gameOver) {
        ctx.fillStyle = "white"; ctx.font = "bold 30px monospace"; ctx.textAlign = "center";
        ctx.fillText("SYSTEM CRASH", (COLS * BASE_CELL) / 2, (ROWS * BASE_CELL) / 2);
        ctx.restore(); return;
      }

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (currentMaze[r][c] === 1) { ctx.fillStyle = "#2222bb"; ctx.fillRect(c * BASE_CELL + 2, r * BASE_CELL + 2, BASE_CELL - 4, BASE_CELL - 4); }
          else if (currentMaze[r][c] === 2) { ctx.fillStyle = "#ffb8ae"; ctx.beginPath(); ctx.arc(c * BASE_CELL + BASE_CELL / 2, r * BASE_CELL + BASE_CELL / 2, 2, 0, Math.PI * 2); ctx.fill(); }
        }
      }
      ctx.fillStyle = "yellow"; ctx.beginPath(); ctx.arc(player.x + BASE_CELL/2, player.y + BASE_CELL/2, BASE_CELL/2 - 2, 0.2 * Math.PI, 1.8 * Math.PI); ctx.lineTo(player.x + BASE_CELL/2, player.y + BASE_CELL/2); ctx.fill();
      ghosts.forEach(g => { ctx.fillStyle = g.color; ctx.beginPath(); ctx.arc(g.x + BASE_CELL/2, g.y + BASE_CELL/2, BASE_CELL/2 - 2, Math.PI, 0); ctx.lineTo(g.x + BASE_CELL - 2, g.y + BASE_CELL - 2); ctx.lineTo(g.x + 2, g.y + BASE_CELL - 2); ctx.fill(); });
      ctx.restore();

      // HUD
      ctx.fillStyle = "white"; ctx.font = "bold 24px monospace"; ctx.textAlign = "left";
      ctx.fillText(`SCORE: ${score.toString().padStart(6, '0')}`, 60, 100);
    };

    const update = () => {
      if (gameOver) return;
      const canMove = (x: number, y: number, dx: number, dy: number) => {
        const nx = x + dx; const ny = y + dy;
        const r = Math.floor(ny / BASE_CELL); const c = Math.floor(nx / BASE_CELL);
        const r2 = Math.floor((ny + BASE_CELL - 1) / BASE_CELL); const c2 = Math.floor((nx + BASE_CELL - 1) / BASE_CELL);
        return currentMaze[r][c] !== 1 && currentMaze[r2][c2] !== 1 && currentMaze[r][c2] !== 1 && currentMaze[r2][c] !== 1;
      };
      if (player.nextDir.x !== 0 || player.nextDir.y !== 0) if (canMove(player.x, player.y, player.nextDir.x * player.speed, player.nextDir.y * player.speed)) player.dir = { ...player.nextDir };
      if (canMove(player.x, player.y, player.dir.x * player.speed, player.dir.y * player.speed)) { player.x += player.dir.x * player.speed; player.y += player.dir.y * player.speed; }
      const r = Math.floor((player.y + BASE_CELL/2) / BASE_CELL); const c = Math.floor((player.x + BASE_CELL/2) / BASE_CELL);
      if (currentMaze[r][c] === 2) { currentMaze[r][c] = 0; score += 10; }
      ghosts.forEach(g => {
        if (canMove(g.x, g.y, g.dir.x, g.dir.y)) { g.x += g.dir.x; g.y += g.dir.y; } else { const dirs = [{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}]; g.dir = dirs[Math.floor(Math.random()*4)]; }
        if (Math.abs(g.x - player.x) < 15 && Math.abs(g.y - player.y) < 15) gameOver = true;
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
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-black cursor-none" />
  );
};

export default PacMan;
