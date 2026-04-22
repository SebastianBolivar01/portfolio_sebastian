"use client";

import React, { useEffect, useRef } from "react";

interface PacManProps {
  onClose: () => void;
  onGameOver?: (score: number) => void;
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
    let gameWon = false;
    let mouthOpen = 0;
    let mouthDir = 0.1;

    const BASE_CELL = 24;
    const maze = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1],
      [1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1],
      [1, 1, 1, 1, 2, 1, 0, 1, 1, 3, 1, 1, 0, 1, 2, 1, 1, 1, 1],
      [0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0],
      [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
      [1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1],
      [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
      [1, 2, 2, 1, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 1, 2, 2, 1],
      [1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1],
      [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const ROWS = maze.length;
    const COLS = maze[0].length;

    let currentMaze = maze.map(row => [...row]);
    
    const player = { x: 9 * BASE_CELL, y: 15 * BASE_CELL, dir: { x: 0, y: 0 }, nextDir: { x: 0, y: 0 }, speed: 3, angle: 0 };
    const ghosts = [
      { x: 9 * BASE_CELL, y: 9 * BASE_CELL, color: "#FF0000", dir: { x: 0, y: -1 }, type: "chase" },
      { x: 8 * BASE_CELL, y: 9 * BASE_CELL, color: "#FFB8FF", dir: { x: 0, y: -1 }, type: "random" },
      { x: 10 * BASE_CELL, y: 9 * BASE_CELL, color: "#00FFFF", dir: { x: 0, y: -1 }, type: "random" },
    ];

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const canMove = (x: number, y: number, dx: number, dy: number, isGhost: boolean) => {
      const margin = 4;
      const points = [
        { x: x + dx + margin, y: y + dy + margin },
        { x: x + dx + BASE_CELL - margin, y: y + dy + margin },
        { x: x + dx + margin, y: y + dy + BASE_CELL - margin },
        { x: x + dx + BASE_CELL - margin, y: y + dy + BASE_CELL - margin }
      ];
      return points.every(p => {
        const r = Math.floor(p.y / BASE_CELL);
        const c = Math.floor(p.x / BASE_CELL);
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return true;
        const cell = currentMaze[r][c];
        if (cell === 1) return false;
        if (cell === 3) return isGhost;
        return true;
      });
    };

    const update = () => {
      if (gameOver || gameWon) return;
      mouthOpen += mouthDir;
      if (mouthOpen > 0.4 || mouthOpen < 0) mouthDir *= -1;

      if (player.nextDir.x !== 0 || player.nextDir.y !== 0) {
        if (canMove(player.x, player.y, player.nextDir.x * player.speed, player.nextDir.y * player.speed, false)) {
          player.dir = { ...player.nextDir };
          player.angle = player.dir.x > 0 ? 0 : player.dir.x < 0 ? Math.PI : player.dir.y > 0 ? Math.PI/2 : -Math.PI/2;
        }
      }
      if (canMove(player.x, player.y, player.dir.x * player.speed, player.dir.y * player.speed, false)) {
        player.x += player.dir.x * player.speed;
        player.y += player.dir.y * player.speed;
      }

      if (player.x < -BASE_CELL) player.x = COLS * BASE_CELL;
      if (player.x > COLS * BASE_CELL) player.x = -BASE_CELL;

      const pr = Math.floor((player.y + BASE_CELL/2) / BASE_CELL);
      const pc = Math.floor((player.x + BASE_CELL/2) / BASE_CELL);
        if (currentMaze[pr] && currentMaze[pr][pc] === 2) {
          currentMaze[pr][pc] = 0; score += 10;
          if (!currentMaze.some(row => row.includes(2))) {
            gameWon = true;
            if (onGameOver) onGameOver(score + 2000);
          }
        }

        ghosts.forEach(g => {
          if (canMove(g.x, g.y, g.dir.x * 2, g.dir.y * 2, true)) { g.x += g.dir.x * 2; g.y += g.dir.y * 2; }
          else {
            const dirs = [{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}];
            const valid = dirs.filter(d => (d.x !== -g.dir.x || d.y !== -g.dir.y) && canMove(g.x, g.y, d.x * 2, d.y * 2, true));
            if (valid.length > 0) {
              if (g.type === "chase") {
                valid.sort((a, b) => Math.hypot((g.x+a.x*20)-player.x, (g.y+a.y*20)-player.y) - Math.hypot((g.x+b.x*20)-player.x, (g.y+b.y*20)-player.y));
                g.dir = valid[0];
              } else g.dir = valid[Math.floor(Math.random() * valid.length)];
            } else g.dir = { x: -g.dir.x, y: -g.dir.y };
          }
          if (Math.hypot(g.x - player.x, g.y - player.y) < BASE_CELL * 0.7) {
            gameOver = true;
            if (onGameOver) onGameOver(score);
          }
        });
      };

    const draw = () => {
      ctx.fillStyle = "black"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      const sc = Math.min(canvas.width / (COLS * BASE_CELL), canvas.height / (ROWS * BASE_CELL)) * 0.9;
      const ox = (canvas.width - (COLS * BASE_CELL * sc)) / 2;
      const oy = (canvas.height - (ROWS * BASE_CELL * sc)) / 2;
      ctx.save(); ctx.translate(ox, oy); ctx.scale(sc, sc);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = currentMaze[r][c];
          if (cell === 1) { ctx.strokeStyle = "#3333ff"; ctx.lineWidth = 2; ctx.strokeRect(c * BASE_CELL + 4, r * BASE_CELL + 4, BASE_CELL - 8, BASE_CELL - 8); }
          else if (cell === 2) { ctx.fillStyle = "#ffb8ae"; ctx.beginPath(); ctx.arc(c * BASE_CELL + BASE_CELL/2, r * BASE_CELL + BASE_CELL/2, 2, 0, Math.PI * 2); ctx.fill(); }
          else if (cell === 3) { ctx.fillStyle = "white"; ctx.fillRect(c * BASE_CELL, r * BASE_CELL + BASE_CELL/2 - 1, BASE_CELL, 2); }
        }
      }

      ctx.save(); ctx.translate(player.x + BASE_CELL/2, player.y + BASE_CELL/2); ctx.rotate(player.angle); ctx.fillStyle = "yellow"; ctx.beginPath();
      const op = Math.abs(Math.sin(mouthOpen)) * 0.2; ctx.arc(0, 0, BASE_CELL/2 - 2, op * Math.PI, (2 - op) * Math.PI); ctx.lineTo(0, 0); ctx.fill(); ctx.restore();

      ghosts.forEach(g => {
        ctx.fillStyle = g.color; ctx.beginPath(); ctx.arc(g.x + BASE_CELL/2, g.y + BASE_CELL/2 - 2, BASE_CELL/2 - 2, Math.PI, 0); ctx.lineTo(g.x + BASE_CELL - 2, g.y + BASE_CELL + BASE_CELL/2 - 2); ctx.lineTo(g.x + 2, g.y + BASE_CELL + BASE_CELL/2 - 2); ctx.fill();
        ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(g.x + BASE_CELL/2 - 4, g.y + BASE_CELL/2 - 4, 3, 0, Math.PI*2); ctx.arc(g.x + BASE_CELL/2 + 4, g.y + BASE_CELL/2 - 4, 3, 0, Math.PI*2); ctx.fill();
      });

      if (gameOver || gameWon) {
        ctx.fillStyle = "white"; ctx.font = "bold 40px monospace"; ctx.textAlign = "center";
        ctx.fillText(gameOver ? "GAME OVER" : "YOU WIN!", (COLS * BASE_CELL)/2, (ROWS * BASE_CELL)/2);
      }
      ctx.restore();
      ctx.fillStyle = "white"; ctx.font = "bold 24px monospace"; ctx.fillText(`SCORE: ${score}`, 60, 80);
    };

    const loop = () => { update(); draw(); animationFrameId = requestAnimationFrame(loop); };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "w"].includes(e.key)) player.nextDir = { x: 0, y: -1 };
      if (["ArrowDown", "s"].includes(e.key)) player.nextDir = { x: 0, y: 1 };
      if (["ArrowLeft", "a"].includes(e.key)) player.nextDir = { x: -1, y: 0 };
      if (["ArrowRight", "d"].includes(e.key)) player.nextDir = { x: 1, y: 0 };
      if (e.key === "r" && (gameOver || gameWon)) { score = 0; gameOver = false; gameWon = false; currentMaze = maze.map(row => [...row]); player.x = 9 * BASE_CELL; player.y = 15 * BASE_CELL; }
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
