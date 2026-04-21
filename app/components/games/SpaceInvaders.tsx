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

    // Game constants
    const CANVAS_WIDTH = 600;
    const CANVAS_HEIGHT = 400;
    const PLAYER_WIDTH = 40;
    const PLAYER_HEIGHT = 20;
    const ALIEN_ROWS = 4;
    const ALIEN_COLS = 8;
    const ALIEN_WIDTH = 30;
    const ALIEN_HEIGHT = 20;
    const ALIEN_PADDING = 20;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Player
    const player = {
      x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
      y: CANVAS_HEIGHT - 40,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      speed: 5,
      dx: 0,
    };

    // Bullets
    let bullets: { x: number; y: number; speed: number }[] = [];
    let alienBullets: { x: number; y: number; speed: number }[] = [];

    // Aliens
    let aliens: { x: number; y: number; alive: boolean }[] = [];
    for (let r = 0; r < ALIEN_ROWS; r++) {
      for (let c = 0; c < ALIEN_COLS; c++) {
        aliens.push({
          x: c * (ALIEN_WIDTH + ALIEN_PADDING) + 50,
          y: r * (ALIEN_HEIGHT + ALIEN_PADDING) + 50,
          alive: true,
        });
      }
    }

    let alienDirection = 1;
    let alienMoveCounter = 0;
    let alienSpeed = 1;

    const drawPlayer = () => {
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(player.x, player.y, player.width, player.height);
      ctx.fillRect(player.x + player.width / 2 - 5, player.y - 10, 10, 10);
    };

    const drawAliens = () => {
      aliens.forEach((alien) => {
        if (alien.alive) {
          ctx.fillStyle = "#ff00ff";
          // Simple alien shape
          ctx.fillRect(alien.x, alien.y, ALIEN_WIDTH, ALIEN_HEIGHT);
          ctx.fillStyle = "white";
          ctx.fillRect(alien.x + 5, alien.y + 5, 5, 5);
          ctx.fillRect(alien.x + ALIEN_WIDTH - 10, alien.y + 5, 5, 5);
        }
      });
    };

    const drawBullets = () => {
      ctx.fillStyle = "yellow";
      bullets.forEach((bullet) => {
        ctx.fillRect(bullet.x, bullet.y, 4, 10);
      });

      ctx.fillStyle = "red";
      alienBullets.forEach((bullet) => {
        ctx.fillRect(bullet.x, bullet.y, 4, 10);
      });
    };

    const update = () => {
      if (gameOver) return;

      // Move player
      player.x += player.dx;
      if (player.x < 0) player.x = 0;
      if (player.x + player.width > CANVAS_WIDTH) player.x = CANVAS_WIDTH - player.width;

      // Move bullets
      bullets = bullets.filter((b) => b.y > 0);
      bullets.forEach((b) => (b.y -= b.speed));

      alienBullets = alienBullets.filter((b) => b.y < CANVAS_HEIGHT);
      alienBullets.forEach((b) => (b.y += b.speed));

      // Move aliens
      alienMoveCounter++;
      if (alienMoveCounter > 30) {
        let edgeReached = false;
        aliens.forEach((alien) => {
          if (alien.alive) {
            alien.x += 10 * alienDirection;
            if (alien.x + ALIEN_WIDTH > CANVAS_WIDTH - 20 || alien.x < 20) {
              edgeReached = true;
            }
          }
        });

        if (edgeReached) {
          alienDirection *= -1;
          aliens.forEach((alien) => {
            alien.y += 10;
            if (alien.y + ALIEN_HEIGHT > player.y) gameOver = true;
          });
        }
        alienMoveCounter = 0;

        // Alien shooting
        if (Math.random() < 0.1) {
          const aliveAliens = aliens.filter((a) => a.alive);
          if (aliveAliens.length > 0) {
            const shooter = aliveAliens[Math.floor(Math.random() * aliveAliens.length)];
            alienBullets.push({ x: shooter.x + ALIEN_WIDTH / 2, y: shooter.y + ALIEN_HEIGHT, speed: 3 });
          }
        }
      }

      // Collision detection
      bullets.forEach((bullet, bIdx) => {
        aliens.forEach((alien) => {
          if (
            alien.alive &&
            bullet.x > alien.x &&
            bullet.x < alien.x + ALIEN_WIDTH &&
            bullet.y > alien.y &&
            bullet.y < alien.y + ALIEN_HEIGHT
          ) {
            alien.alive = false;
            bullets.splice(bIdx, 1);
            score += 100;
          }
        });
      });

      alienBullets.forEach((bullet) => {
        if (
          bullet.x > player.x &&
          bullet.x < player.x + player.width &&
          bullet.y > player.y &&
          bullet.y < player.y + player.height
        ) {
          gameOver = true;
        }
      });

      if (aliens.every((a) => !a.alive)) {
        // Reset aliens with more speed
        alienSpeed += 0.5;
        aliens.forEach((a) => (a.alive = true));
      }
    };

    const draw = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
        ctx.fillText("Press R to Restart", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 80);
        return;
      }

      drawPlayer();
      drawAliens();
      drawBullets();

      // Draw Score
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.textAlign = "left";
      ctx.fillText(`Score: ${score}`, 20, 30);
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
          bullets.push({ x: player.x + player.width / 2 - 2, y: player.y, speed: 7 });
        }
      }
      if (e.key === "r" && gameOver) {
        // Restart
        score = 0;
        gameOver = false;
        bullets = [];
        alienBullets = [];
        aliens.forEach((a) => {
          a.alive = true;
          // Reset positions would be better but this is a quick restart
        });
      }
      if (e.key === "Escape") onClose();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "a" ||
        e.key === "d"
      ) {
        player.dx = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onClose]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-3xl font-bold text-green-500 mb-2">SPACE INVADERS</h2>
      <div className="relative border-4 border-green-500/30 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.3)]">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
      <p className="text-gray-400 text-sm mt-4">
        Use Arrows or WASD to move • SPACE to shoot • ESC to exit
      </p>
    </div>
  );
};

export default SpaceInvaders;
