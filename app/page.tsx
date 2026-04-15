"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import { translations, Lang } from "./i18n";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";

export default function Home() {
  const [lang, setLang] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedLang = localStorage.getItem('lang') as Lang;
    if (savedLang && translations[savedLang]) {
      setLang(savedLang);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Lang;
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = translations[lang];

  return (
    <>
      <Header 
        t={t} 
        mounted={mounted} 
        theme={theme} 
        lang={lang} 
        toggleTheme={toggleTheme} 
        handleLangChange={handleLangChange} 
      />

      <main className="container">
        <Hero t={t} />
        <Services t={t} />
        <Portfolio t={t} />

        {/* FREELANCE SECTION */}
        <section id="freelance" className="section-dark">
          <div className="section-head">
            <span className="section-subtitle">{t.freelanceSubtitle}</span>
            <h2 className="section-title">{t.freelanceTitle}</h2>
            <p className="section-desc">{t.freelanceDesc}</p>
          </div>

          <div className="freelance-bars">
            <div className="freelance-item">
              <h3 className="freelance-title">FIVERR</h3>
              <a href="#contact" className="btn btn-outline-gold">{t.btnHireMe}</a>
            </div>
            <div className="freelance-item">
              <h3 className="freelance-title">UPWORK</h3>
              <a href="#contact" className="btn btn-outline-gold">{t.btnHireMe}</a>
            </div>
            <div className="freelance-item">
              <h3 className="freelance-title">GURU</h3>
              <a href="#contact" className="btn btn-outline-gold">{t.btnHireMe}</a>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section">
          <div className="section-head">
            <span className="section-subtitle">{t.contactSubtitle}</span>
            <h2 className="section-title">{t.contactTitle}</h2>
            <p className="section-desc">{t.contactDesc2}</p>
          </div>

          <div className="contact-grid">
            <a href="tel:+573000000000" className="contact-item">
              <span className="contact-icon">📞</span>
              +57 321 726 3018, +57 316 055 5707
            </a>
            <a href="mailto:tu@email.com" className="contact-item">
              <span className="contact-icon">✉️</span>
              bolivarsebas9@gmail.com
            </a>
            <a href="https://linkedin.com/in/tu-usuario" target="_blank" className="contact-item">
              <span className="contact-icon">🌐</span>
              www.linkedin.com/in/sebastian
            </a>
            <a href="https://github.com/SebastianBolivar01" target="_blank" className="contact-item">
              <span className="contact-icon">💻</span>
              www.github.com/SebastianBolivar01
            </a>
          </div>
        </section>
      </main>

      <footer>
        {t.footerText}
      </footer>
    </>
  );
}
