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
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black animate-fade-in overflow-hidden cursor-none select-none">
      {/* Background Deep Black Force */}
      <style jsx global>{`
        body { background-color: black !important; overflow: hidden !important; }
        #__next, main { display: none !important; }
      `}</style>
      
      {/* Arcade Bezel / Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,100,255,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,1)]" />
      
      {/* UI Elements */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center pointer-events-none z-50">
        <div className="flex flex-col gap-1">
          <div className="text-blue-500 font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
            System Protocol 0421
          </div>
          <div className="text-white font-mono text-xs tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Arcade Link Established
          </div>
        </div>
        <button
          onClick={onClose}
          className="pointer-events-auto px-6 py-2 bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 text-gray-400 hover:text-white rounded-full transition-all font-mono text-[10px] uppercase tracking-widest z-[100]"
        >
          Terminate Process [ESC]
        </button>
      </div>

      {/* Main Container */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="w-full h-full flex items-center justify-center">
          {activeGame === "space-invaders" && <SpaceInvaders onClose={onClose} />}
          {activeGame === "pacman" && <PacMan onClose={onClose} />}
          {activeGame === "donkey-kong" && <DonkeyKong onClose={onClose} />}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="text-white font-mono text-[9px] tracking-[0.5em] uppercase">
          Ready Player One • Insert Coin
        </div>
        <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
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
