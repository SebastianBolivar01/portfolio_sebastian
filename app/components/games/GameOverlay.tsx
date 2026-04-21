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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl p-8 flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-4 p-2 text-gray-400 hover:text-white transition-colors text-2xl"
          aria-label="Close Game"
        >
          ✕
        </button>

        {/* Game Container */}
        <div className="w-full flex justify-center">
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
