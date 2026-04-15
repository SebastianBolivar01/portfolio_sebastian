"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import { translations, Lang } from "./i18n";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Freelance from "./components/Freelance";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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
        <Freelance t={t} />
        <Contact t={t} />
      </main>

      <Footer text={t.footerText} />
    </>
  );
}
