"use client";

import PortfolioCard from "./PortfolioCard";

interface PortfolioProps {
  t: any;
}

export default function Portfolio({ t }: PortfolioProps) {
  const projects = [
    {
      image: "/unishop.png",
      title: t.proj1Title,
      desc: t.proj1Desc,
      github: "https://github.com/Whatfck/UniShop-frontend",
      demo: "https://uni-shop-frontend.vercel.app/"
    },
    {
      image: "/mercadolibre.png",
      title: t.proj2Title,
      desc: t.proj2Desc,
      github: "https://github.com/valeriaucc/mercadolibre-clon/tree/dev",
      demo: "https://mercadolibre-clon-5.vercel.app/"
    },
    {
      image: "/facade.png",
      title: t.proj3Title,
      desc: t.proj3Desc,
      github: "https://github.com/SebastianBolivar01/frontend_facade",
      demo: "https://frontend-facade.vercel.app/"
    },
    {
      image: "/cicd.png",
      title: t.proj4Title,
      desc: t.proj4Desc,
      github: "https://github.com/SebastianBolivar01/integracion-continua",
      demo: "https://integracion-continua-t7c1.vercel.app/"
    },
    {
      image: "/calculator.png",
      title: t.proj5Title,
      desc: t.proj5Desc,
      github: "https://github.com/SebastianBolivar01/Calculadora17proMax/tree/main/calculo-visual",
      demo: "https://calculadora17pro-max.vercel.app/"
    },
    {
      image: "/landing.png",
      title: t.proj6Title,
      desc: t.proj6Desc,
      github: "https://github.com/SebastianBolivar01/landing_page",
      demo: "https://landing-page-blue-three-45.vercel.app/"
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
            image={proj.image}
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
