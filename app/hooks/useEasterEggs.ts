"use client";

import { useState, useEffect, useCallback } from "react";

export type GameType = "space-invaders" | "pacman" | "donkey-kong" | null;

export function useEasterEggs() {
  const [activeGame, setActiveGame] = useState<GameType>(null);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  const spaceSequence = ["s", "p", "a", "c", "e"];

  const closeGame = useCallback(() => setActiveGame(null), []);

  const triggerGame = useCallback((game: GameType) => {
    setActiveGame(game);
  }, []);

  const handleLogoClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClickTime < 1000) {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      if (newCount === 5) {
        setActiveGame("pacman");
        setClickCount(0);
      }
    } else {
      setClickCount(1);
    }
    setLastClickTime(now);
  }, [clickCount, lastClickTime]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...keySequence, e.key].slice(-10);
      setKeySequence(newSequence);

      // Check Konami Code
      if (newSequence.join(",").includes(konamiCode.join(","))) {
        setActiveGame("donkey-kong");
        setKeySequence([]);
      }

      // Check "space"
      const last5 = newSequence.slice(-5).join("").toLowerCase();
      if (last5 === "space") {
        setActiveGame("space-invaders");
        setKeySequence([]);
      }

      // Check "pacman"
      const last6 = newSequence.slice(-6).join("").toLowerCase();
      if (last6 === "pacman") {
        setActiveGame("pacman");
        setKeySequence([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keySequence]);

  useEffect(() => {
    if (activeGame) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeGame]);

  return {
    activeGame,
    closeGame,
    handleLogoClick,
    triggerGame
  };
}
