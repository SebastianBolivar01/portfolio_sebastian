"use client";

import React, { useState } from "react";
import SpaceInvaders from "./SpaceInvaders";
import PacMan from "./PacMan";
import DonkeyKong from "./DonkeyKong";
import HighScores from "./HighScores";
import { GameType } from "../../hooks/useEasterEggs";

interface GameOverlayProps {
  activeGame: GameType;
  onClose: () => void;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ activeGame, onClose }) => {
  const [finalScore, setFinalScore] = useState<number | null>(null);

  if (!activeGame) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black animate-fade-in overflow-hidden cursor-none select-none">
      {/* Background Deep Black Force */}
      <style jsx global>{`
        body { background-color: black !important; overflow: hidden !important; }
        #__next, main { display: none !important; }
      `}</style>
      
      {/* Arcade Bezel / Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,100,255,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,1)]" />
      
      {/* UI Elements - Fixed at top for better visibility */}
      <div className="absolute top-10 left-10 right-10 flex justify-between items-start pointer-events-none z-[10000]">
        <div className="flex flex-col gap-2">
          <div className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase opacity-60">
            SYSTEM_OVERRIDE_0421
          </div>
          <div className="text-white font-mono text-sm tracking-widest uppercase flex items-center gap-3">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
            ARCADE_LAYER_ACTIVE
          </div>
        </div>
        <button
          onClick={onClose}
          className="pointer-events-auto px-8 py-3 bg-red-600/10 hover:bg-red-600 border border-red-600/50 hover:border-red-600 text-red-500 hover:text-white rounded-full transition-all font-mono text-xs uppercase tracking-[0.2em] shadow-lg backdrop-blur-sm"
        >
          [ ESC ] TERMINATE_SESSION
        </button>
      </div>

      {/* Main Game Surface */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {activeGame === "space-invaders" && <SpaceInvaders onClose={onClose} onGameOver={setFinalScore} />}
        {activeGame === "pacman" && <PacMan onClose={onClose} onGameOver={setFinalScore} />}
        {activeGame === "donkey-kong" && <DonkeyKong onClose={onClose} onGameOver={setFinalScore} />}
      </div>

      {/* High Scores Overlay */}
      {finalScore !== null && (
        <div className="absolute inset-0 z-[10001] flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto">
          <div className="flex flex-col items-center gap-6">
            <HighScores 
              gameId={activeGame} 
              currentScore={finalScore} 
              onSave={() => setFinalScore(null)} 
            />
            <button 
              onClick={() => setFinalScore(null)}
              className="text-white/50 hover:text-white font-mono text-sm uppercase tracking-widest transition-all"
            >
              [ RESTART_OR_QUIT ]
            </button>
          </div>
        </div>
      )}

      {/* Subtle Footer */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20 pointer-events-none">
        <div className="text-white font-mono text-[10px] tracking-[0.6em] uppercase">
          Neural Link • Ready Player One
        </div>
        <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GameOverlay;
