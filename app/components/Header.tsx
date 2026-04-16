"use client";

import { useState } from "react";
import { Lang } from "../i18n";

interface HeaderProps {
  t: any;
  mounted: boolean;
  theme: string;
  lang: Lang;
  toggleTheme: () => void;
  handleLangChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Header({
  t,
  mounted,
  theme,
  lang,
  toggleTheme,
  handleLangChange
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="nav-header">
      <div className="nav-container">
        <a href="#" className="nav-logo">SB<span className="dot">.</span></a>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#" onClick={() => setIsMenuOpen(false)}>{t.navHome}</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>{t.navAbout}</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)}>{t.navServices}</a>
          <a href="#experience" onClick={() => setIsMenuOpen(false)}>{t.navExperience}</a>
          <a href="#portfolios" onClick={() => setIsMenuOpen(false)}>{t.navPortfolios}</a>
          <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>{t.navTestimonials}</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>{t.navContact}</a>
        </div>

        <div className="nav-actions">
          {mounted && (
            <>
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label="Toggle Theme"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <select value={lang} onChange={handleLangChange} className="lang-select" aria-label="Change Language">
                <option value="en">EN</option>
                <option value="es">ES</option>
                <option value="it">IT</option>
                <option value="pt">PT</option>
              </select>
            </>
          )}
          <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
