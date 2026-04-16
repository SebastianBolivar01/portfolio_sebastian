"use client";

import { cvLink } from "../i18n";

interface HeroProps {
  t: any;
}

export default function Hero({ t }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-col hero-col-left animate-fade-in-up">
        <h1 className="hero-main-title">Sebastian<br />Bolivar<span className="dot">.</span></h1>
        <p className="hero-social-text">Instagram | Facebook<br />WhatsApp | Telegram.</p>
        <div className="hero-btns">
          <a href="#contact" className="btn btn-primary">{t.btnContact}</a>
          <a 
            href={cvLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline-gold"
          >
            {t.btnCV}
          </a>
        </div>
      </div>

      <div className="hero-col hero-col-center animate-fade-in-up delay-1">
        <div className="hero-image-box" title="Place your image at /profile.jpg">
          <div className="hero-image-circle"></div>
          <img 
            src="/profile.jpg" 
            alt="Sebastian" 
            onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"} 
          />
        </div>
      </div>

      <div className="hero-col hero-col-right animate-fade-in-up delay-2">
        <h4 className="hero-intro-label">{t.introLabel}</h4>
        <h2 className="hero-intro-title">{t.heroTitleHighlight}</h2>
        <p className="hero-intro-desc">
          {t.heroSubtitle}
        </p>
      </div>
    </section>
  );
}
