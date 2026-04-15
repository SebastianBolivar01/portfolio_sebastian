"use client";

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
  return (
    <header className="nav-header">
      <div className="nav-container">
        <a href="#" className="nav-logo">SB<span className="dot">.</span></a>

        <nav className="nav-links">
          <a href="#">{t.navHome}</a>
          <a href="#services">{t.navServices}</a>
          <a href="#portfolios">{t.navPortfolios}</a>
          <a href="#freelance">{t.navFreelance}</a>
          <a href="#contact">{t.navContact}</a>

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
        </nav>
      </div>
    </header>
  );
}
