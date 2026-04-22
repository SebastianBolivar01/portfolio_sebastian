"use client";

import { useState } from "react";
import { Lang } from "../i18n";
import Magnetic from "./Magnetic";

interface HeaderProps {
  t: any;
  mounted: boolean;
  theme: string;
  lang: Lang;
  toggleTheme: () => void;
  handleLangChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onLogoClick?: () => void;
}

export default function Header({
  t,
  mounted,
  theme,
  lang,
  toggleTheme,
  handleLangChange,
  onLogoClick
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogoInternalClick = (e: React.MouseEvent) => {
    if (onLogoClick) {
      e.preventDefault();
      onLogoClick();
    }
  };

  return (
    <header className="nav-header">
      <div className="nav-container">
        <Magnetic strength={0.3}>
          <a href="#" className="nav-logo" aria-label="Home" onClick={handleLogoInternalClick}>
            <div className="logo-box">
              <svg viewBox="0 0 40 40" className="logo-svg">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent-primary)" />
                    <stop offset="100%" stopColor="#FFF" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path 
                  d="M20 2 L37.3 11 L37.3 29 L20 38 L2.7 29 L2.7 11 Z" 
                  className="logo-hexagon"
                  fill="none" 
                  stroke="url(#logoGradient)" 
                  strokeWidth="2"
                />
                <text 
                  x="50%" 
                  y="50%" 
                  dominantBaseline="central" 
                  textAnchor="middle" 
                  className="logo-text"
                >SB</text>
              </svg>
            </div>
          </a>
        </Magnetic>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#" onClick={() => setIsMenuOpen(false)}>{t.navHome}</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>{t.navAbout}</a>
          <a href="#skills" onClick={() => setIsMenuOpen(false)}>{t.navSkills}</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)}>{t.navServices}</a>
          <a href="#process" onClick={() => setIsMenuOpen(false)}>{t.navProcess}</a>
          <a href="#experience" onClick={() => setIsMenuOpen(false)}>{t.navExperience}</a>
          <a href="#portfolios" onClick={() => setIsMenuOpen(false)}>{t.navPortfolios}</a>
          <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>{t.navTestimonials}</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>{t.navContact}</a>
        </div>

        <div className="nav-actions">
          {mounted && (
            <>
              <Magnetic strength={0.2}>
                <button
                  onClick={toggleTheme}
                  className="theme-toggle"
                  aria-label="Toggle Theme"
                  title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
              </Magnetic>
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
