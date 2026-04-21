"use client";

import React from "react";
import SpaceInvaders from "./SpaceInvaders";
import PacMan from "./PacMan";
import DonkeyKong from "./DonkeyKong";
import { GameType } from "../../hooks/useEasterEggs";

interface GameOverlayProps {
  activeGame: GameType;
  onClose: () => void;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ activeGame, onClose }) => {
  if (!activeGame) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black animate-fade-in overflow-hidden">
      <div className="relative w-full max-w-5xl h-full p-4 flex flex-col items-center justify-center">
        {/* Close Button - More prominent for full screen */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 px-4 py-2 bg-red-600/20 hover:bg-red-600 border border-red-600 text-white rounded transition-all font-mono text-sm uppercase tracking-wider z-10"
          aria-label="Exit Game"
        >
          Exit Game (ESC)
        </button>

        {/* Game Container */}
        <div className="flex-1 w-full flex items-center justify-center">
          {activeGame === "space-invaders" && <SpaceInvaders onClose={onClose} />}
          {activeGame === "pacman" && <PacMan onClose={onClose} />}
          {activeGame === "donkey-kong" && <DonkeyKong onClose={onClose} />}
        </div>

        {/* Arcade Instructions overlay style */}
        <div className="mt-8 px-6 py-3 border-2 border-dashed border-gray-700 rounded-full text-gray-500 font-mono text-sm">
          INSERT COIN • 1P START • READY?
        </div>
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
