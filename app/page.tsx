"use client";

import "./globals.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Freelance from "./components/Freelance";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useTheme } from "./hooks/useTheme";
import { useLanguage } from "./hooks/useLanguage";

export default function Home() {
  const { theme, mounted, toggleTheme } = useTheme();
  const { lang, t, handleLangChange } = useLanguage();

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
