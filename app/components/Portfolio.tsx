"use client";

import PortfolioCard from "./PortfolioCard";

interface PortfolioProps {
  t: any;
}

export default function Portfolio({ t }: PortfolioProps) {
  const projects = [
    { 
      emoji: "📊", 
      title: t.proj1Title, 
      desc: t.proj1Desc, 
      github: "https://github.com/SebastianBolivar01/dashboard",
      demo: "https://sebastian-dashboard.vercel.app"
    },
    { 
      emoji: "🎵", 
      title: t.proj2Title, 
      desc: t.proj2Desc, 
      github: "https://github.com/SebastianBolivar01/Reproductor-Musica",
      demo: "https://sebastian-music.vercel.app"
    },
    { 
      emoji: "⚔️", 
      title: t.proj3Title, 
      desc: t.proj3Desc, 
      github: "https://github.com/SebastianBolivar01/patron-decorator",
      demo: "https://sebastian-rpg.vercel.app"
    },
    { 
      emoji: "💳", 
      title: t.proj4Title, 
      desc: t.proj4Desc, 
      github: "https://github.com/SebastianBolivar01/checkout",
      demo: "https://sebastian-checkout.vercel.app"
    },
    { 
      emoji: "🚀", 
      title: t.proj5Title, 
      desc: t.proj5Desc, 
      github: "https://github.com/SebastianBolivar01/landing_page",
      demo: "https://sebastian-landing.vercel.app"
    },
    { 
      emoji: "🐍", 
      title: t.proj6Title, 
      desc: t.proj6Desc, 
      github: "https://github.com/SebastianBolivar01/ejercicioDjango",
      demo: "https://sebastian-django.vercel.app"
    },
  ];

  return (
    <section id="portfolios" className="section">
      <div className="section-head">
        <span className="section-subtitle">{t.portfolioSubtitle}</span>
        <h2 className="section-title">{t.portfolioTitle}</h2>
        <p className="section-desc">{t.portfolioDesc}</p>
        <div className="section-divider"></div>
      </div>

      <div className="portfolio-grid container">
        {projects.map((proj, idx) => (
          <PortfolioCard 
            key={idx} 
            emoji={proj.emoji} 
            title={proj.title} 
            desc={proj.desc} 
            github={proj.github} 
            demo={proj.demo}
            sourceCodeText={t.sourceCode} 
            liveDemoText={t.btnLiveDemo}
          />
        ))}
      </div>
      <div className="section-divider"></div>
    </section>
  );
}
