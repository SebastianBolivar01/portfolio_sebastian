"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Lang } from "../types";
import { GameType } from "../hooks/useEasterEggs";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  t: any;
  lang: Lang;
  handleLangChange: (lang: Lang) => void;
  toggleTheme: () => void;
  onLaunchGame: (game: GameType) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  t,
  lang,
  handleLangChange,
  toggleTheme,
  onLaunchGame
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    { id: "home", title: t.navHome, category: "Navigation", icon: "🏠", action: () => { router.push("#"); onClose(); } },
    { id: "about", title: t.navAbout, category: "Navigation", icon: "👤", action: () => { router.push("#about"); onClose(); } },
    { id: "skills", title: t.navSkills, category: "Navigation", icon: "🛠️", action: () => { router.push("#skills"); onClose(); } },
    { id: "projects", title: t.navPortfolios, category: "Navigation", icon: "🚀", action: () => { router.push("#portfolios"); onClose(); } },
    { id: "contact", title: t.navContact, category: "Navigation", icon: "✉️", action: () => { router.push("#contact"); onClose(); } },
    { id: "cv", title: t.btnCV, category: "Actions", icon: "📄", action: () => { router.push("/cv"); onClose(); } },
    { id: "theme", title: "Toggle Theme", category: "Actions", icon: "🌓", action: () => { toggleTheme(); onClose(); } },
    { id: "lang-es", title: "Change to Spanish", category: "Language", icon: "🇪🇸", action: () => { handleLangChange("es" as Lang); onClose(); } },
    { id: "lang-en", title: "Change to English", category: "Language", icon: "🇺🇸", action: () => { handleLangChange("en" as Lang); onClose(); } },
    { id: "game-dk", title: "Play Donkey Kong", category: "Games", icon: "🦍", action: () => { onLaunchGame("donkey-kong"); onClose(); } },
    { id: "game-pm", title: "Play Pacman", category: "Games", icon: "🍕", action: () => { onLaunchGame("pacman"); onClose(); } },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(search.toLowerCase()) || 
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-[8px] z-[9999] flex items-start justify-center pt-[15vh]" 
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[600px] bg-bg-secondary border border-white/8 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden animate-pop-in" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-5 py-4 border-b border-white/8 gap-3">
          <span className="text-[1.2rem] opacity-50">🔍</span>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Type a command or search..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none text-text-primary text-[1.1rem] outline-none font-inherit"
          />
          <kbd className="text-[0.7rem] bg-bg-matte px-2 py-1 rounded border border-white/8 text-text-muted">ESC</kbd>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => (
              <div 
                key={cmd.id} 
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-[10px] cursor-pointer transition-all duration-200 group
                  ${idx === selectedIndex ? "bg-accent text-bg-matte" : ""}
                `}
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={cmd.action}
              >
                <span className={`
                  text-[1.4rem] w-10 h-10 flex items-center justify-center bg-bg-matte rounded-lg transition-all duration-200
                  ${idx === selectedIndex ? "bg-black/20 scale-110" : ""}
                `}>
                  {cmd.icon}
                </span>
                <div className="flex flex-col flex-1">
                  <span className="font-semibold text-[0.95rem]">{cmd.title}</span>
                  <span className={`text-[0.75rem] ${idx === selectedIndex ? "opacity-80" : "opacity-60"}`}>
                    {cmd.category}
                  </span>
                </div>
                {idx === selectedIndex && <span className="text-[1.2rem] opacity-50">↩</span>}
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-text-muted italic">No commands found...</div>
          )}
        </div>

        <div className="px-5 py-3 bg-bg-matte border-t border-white/8">
          <div className="flex gap-5 text-[0.7rem] text-text-muted">
            <span className="flex items-center gap-1">
              <kbd className="bg-bg-secondary px-1.5 py-0.5 rounded border border-white/8">↑↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-bg-secondary px-1.5 py-0.5 rounded border border-white/8">Enter</kbd> to select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-bg-secondary px-1.5 py-0.5 rounded border border-white/8">ESC</kbd> to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
