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
    <header className="fixed top-0 left-0 right-0 py-6 z-100 bg-bg-matte/95 backdrop-blur-[5px] border-b border-white/8">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto px-6 gap-5">
        <Magnetic strength={0.3}>
          <a 
            href="#" 
            className="flex items-center no-underline shrink-0 group" 
            aria-label="Home" 
            onClick={handleLogoInternalClick}
          >
            <div className="w-[42px] h-[42px] flex items-center justify-center transition-all duration-250 group-hover:scale-110 group-hover:rotate-5">
              <svg viewBox="0 0 40 40" className="w-full h-full [filter:drop-shadow(0_0_8px_var(--aurora-glow))]">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent-primary)" />
                    <stop offset="100%" stopColor="#FFF" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path 
                  d="M20 2 L37.3 11 L37.3 29 L20 38 L2.7 29 L2.7 11 Z" 
                  className="[stroke-dasharray:120] [stroke-dashoffset:0] transition-[stroke-dashoffset] duration-1000 group-hover:[stroke-dashoffset:240]"
                  fill="none" 
                  stroke="url(#logoGradient)" 
                  strokeWidth="2"
                />
                <text 
                  x="50%" 
                  y="50%" 
                  dominantBaseline="central" 
                  textAnchor="middle" 
                  className="fill-text-primary font-outfit font-extrabold text-[14px] tracking-[-0.5px]"
                >SB</text>
              </svg>
            </div>
          </a>
        </Magnetic>

        <div className={`
          flex items-center gap-3 min-w-0 transition-all duration-300
          max-md:fixed max-md:top-0 max-md:h-screen max-md:w-[250px] max-md:bg-bg-matte/95 max-md:backdrop-blur-xl max-md:flex-col max-md:justify-center max-md:z-99
          ${isMenuOpen ? 'max-md:right-0' : 'max-md:-right-full'}
          xl:gap-6
        `}>
          {[
            { href: "#", label: t.navHome },
            { href: "#about", label: t.navAbout },
            { href: "#skills", label: t.navSkills },
            { href: "#services", label: t.navServices },
            { href: "#process", label: t.navProcess },
            { href: "#experience", label: t.navExperience },
            { href: "#portfolios", label: t.navPortfolios },
            { href: "#testimonials", label: t.navTestimonials },
            { href: "#contact", label: t.navContact },
          ].map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-[0.7rem] xl:text-[0.8rem] font-bold font-outfit uppercase tracking-[0.5px] text-text-primary no-underline transition-all duration-250 hover:text-accent whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {mounted && (
            <>
              <Magnetic strength={0.2}>
                <button
                  onClick={toggleTheme}
                  className="bg-transparent border border-white/8 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-text-primary text-base transition-all duration-250 hover:text-accent hover:border-accent"
                  aria-label="Toggle Theme"
                  title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
              </Magnetic>
              <select 
                value={lang} 
                onChange={handleLangChange} 
                className="bg-transparent border-none text-text-primary cursor-pointer text-[0.85rem] font-semibold font-outfit uppercase tracking-[1px] focus:outline-none" 
                aria-label="Change Language"
              >
                <option value="en" className="bg-bg-matte">EN</option>
                <option value="es" className="bg-bg-matte">ES</option>
                <option value="it" className="bg-bg-matte">IT</option>
                <option value="pt" className="bg-bg-matte">PT</option>
              </select>
            </>
          )}
          <button 
            className="md:hidden bg-transparent border-none text-text-primary text-[1.8rem] cursor-pointer z-101" 
            onClick={toggleMenu} 
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
