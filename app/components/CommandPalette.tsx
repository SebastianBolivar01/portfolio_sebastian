"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Lang } from "../types";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  t: any;
  lang: Lang;
  handleLangChange: (lang: Lang) => void;
  toggleTheme: () => void;
  onLaunchGame: (game: string) => void;
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
    <div className="cmd-overlay" onClick={onClose}>
      <div className="cmd-dialog animate-pop-in" onClick={e => e.stopPropagation()}>
        <div className="cmd-search-box">
          <span className="cmd-search-icon">🔍</span>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Type a command or search..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="cmd-input"
          />
          <kbd className="cmd-esc-tag">ESC</kbd>
        </div>

        <div className="cmd-results">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => (
              <div 
                key={cmd.id} 
                className={`cmd-item ${idx === selectedIndex ? "active" : ""}`}
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={cmd.action}
              >
                <span className="cmd-item-icon">{cmd.icon}</span>
                <div className="cmd-item-info">
                  <span className="cmd-item-title">{cmd.title}</span>
                  <span className="cmd-item-cat">{cmd.category}</span>
                </div>
                {idx === selectedIndex && <span className="cmd-item-enter">↩</span>}
              </div>
            ))
          ) : (
            <div className="cmd-no-results">No commands found...</div>
          )}
        </div>

        <div className="cmd-footer">
          <div className="cmd-help">
            <span><kbd>↑↓</kbd> to navigate</span>
            <span><kbd>Enter</kbd> to select</span>
            <span><kbd>ESC</kbd> to close</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cmd-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 15vh;
        }

        .cmd-dialog {
          width: 100%;
          max-width: 600px;
          background: var(--bg-secondary);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
          overflow: hidden;
        }

        .cmd-search-box {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--card-border);
          gap: 12px;
        }

        .cmd-search-icon { font-size: 1.2rem; opacity: 0.5; }

        .cmd-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 1.1rem;
          outline: none;
          font-family: inherit;
        }

        .cmd-esc-tag {
          font-size: 0.7rem;
          background: var(--bg-color);
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid var(--card-border);
          color: var(--text-muted);
        }

        .cmd-results {
          max-height: 400px;
          overflow-y: auto;
          padding: 8px;
        }

        .cmd-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cmd-item.active {
          background: var(--accent-primary);
          color: var(--bg-color);
        }

        .cmd-item-icon {
          font-size: 1.4rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-color);
          border-radius: 8px;
          transition: 0.2s;
        }

        .cmd-item.active .cmd-item-icon {
          background: rgba(0, 0, 0, 0.2);
          transform: scale(1.1);
        }

        .cmd-item-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .cmd-item-title {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .cmd-item-cat {
          font-size: 0.75rem;
          opacity: 0.6;
        }

        .cmd-item.active .cmd-item-cat { opacity: 0.8; }

        .cmd-item-enter {
          font-size: 1.2rem;
          opacity: 0.5;
        }

        .cmd-no-results {
          padding: 40px;
          text-align: center;
          color: var(--text-muted);
          font-style: italic;
        }

        .cmd-footer {
          padding: 12px 20px;
          background: var(--bg-color);
          border-top: 1px solid var(--card-border);
        }

        .cmd-help {
          display: flex;
          gap: 20px;
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .cmd-help kbd {
          background: var(--bg-secondary);
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid var(--card-border);
        }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .animate-pop-in {
          animation: popIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
