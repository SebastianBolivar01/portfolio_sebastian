"use client";

import { useEffect, useState } from "react";
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
import { useEasterEggs } from "./hooks/useEasterEggs";
import CursorFollower from "./components/CursorFollower";
import Reveal from "./components/Reveal";
import GameOverlay from "./components/games/GameOverlay";
import CommandPalette from "./components/CommandPalette";
import GitHubActivity from "./components/GitHubActivity";

export default function Home() {
  const { theme, mounted, toggleTheme } = useTheme();
  const { lang, t, handleLangChange } = useLanguage();
  const { activeGame, closeGame, handleLogoClick, triggerGame: launchGame } = useEasterEggs();
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCmdOpen(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <CommandPalette 
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        t={t}
        lang={lang}
        handleLangChange={(l) => {
          // Wrap handleLangChange to match component's expected signature if needed
          const e = { target: { value: l } } as any;
          handleLangChange(e);
        }}
        toggleTheme={toggleTheme}
        onLaunchGame={launchGame}
      />
      {activeGame ? (
        <GameOverlay activeGame={activeGame} onClose={closeGame} />
      ) : (
        <>
          <CursorFollower />
          <Header 
            t={t} 
            mounted={mounted} 
            theme={theme} 
            lang={lang} 
            toggleTheme={toggleTheme} 
            handleLangChange={handleLangChange} 
            onLogoClick={handleLogoClick}
          />

          <main>
            <Hero t={t} />
            
            <Reveal>
              <About t={t} />
            </Reveal>

            <Reveal>
              <Skills t={t} />
            </Reveal>

            <Reveal>
              <Services t={t} />
            </Reveal>

            <Reveal>
              <Methodology t={t} />
            </Reveal>

            <Reveal>
              <Experience t={t} />
            </Reveal>

            <GitHubActivity t={t} />

            <Reveal>
              <Portfolio t={t} />
            </Reveal>

            <Reveal>
              <Testimonials t={t} /> 
            </Reveal>

            <Reveal>
              <Contact t={t} />
            </Reveal>
          </main>

          <Footer text={t.footerText} />
          <ScrollToTop />
        </>
      )}
    </>
  );
}
