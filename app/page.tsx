"use client";

import "./globals.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Methodology from "./components/Methodology";
import Experience from "./components/Experience";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
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

      <main>
        <Hero t={t} />
        <About t={t} />
        <Skills t={t} />
        <Services t={t} />
        <Methodology t={t} />
        <Experience t={t} />
        <Portfolio t={t} />
        <Testimonials t={t} /> 
        <Contact t={t} />
      </main>

      <Footer text={t.footerText} />
      <ScrollToTop />
    </>
  );
}
