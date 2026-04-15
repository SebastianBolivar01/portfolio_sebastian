"use client";

import PortfolioCard from "./PortfolioCard";

interface PortfolioProps {
  t: any;
}

export default function Portfolio({ t }: PortfolioProps) {
  const projects = [
    { emoji: "📊", title: t.proj1Title, desc: t.proj1Desc, link: "https://github.com/SebastianBolivar01/dashboard" },
    { emoji: "🎵", title: t.proj2Title, desc: t.proj2Desc, link: "https://github.com/SebastianBolivar01/Reproductor-Musica" },
    { emoji: "⚔️", title: t.proj3Title, desc: t.proj3Desc, link: "https://github.com/SebastianBolivar01/patron-decorator" },
    { emoji: "💳", title: t.proj4Title, desc: t.proj4Desc, link: "https://github.com/SebastianBolivar01/checkout" },
    { emoji: "🚀", title: t.proj5Title, desc: t.proj5Desc, link: "https://github.com/SebastianBolivar01/landing_page" },
    { emoji: "🐍", title: t.proj6Title, desc: t.proj6Desc, link: "https://github.com/SebastianBolivar01/ejercicioDjango" },
  ];

  return (
    <section id="portfolios" className="section">
      <div className="section-head">
        <span className="section-subtitle">{t.portfolioSubtitle}</span>
        <h2 className="section-title">{t.portfolioTitle}</h2>
        <p className="section-desc">{t.portfolioDesc}</p>
        <div className="section-divider"></div>
      </div>

      <div className="portfolio-grid">
        {projects.map((proj, idx) => (
          <PortfolioCard 
            key={idx} 
            emoji={proj.emoji} 
            title={proj.title} 
            desc={proj.desc} 
            link={proj.link} 
            sourceCodeText={t.sourceCode} 
          />
        ))}
      </div>
      <div className="section-divider"></div>
    </section>
  );
}
