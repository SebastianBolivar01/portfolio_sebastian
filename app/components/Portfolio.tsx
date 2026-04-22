"use client";

import React, { useState } from "react";
import PortfolioCard from "./PortfolioCard";
import ProjectModal from "./ProjectModal";

interface PortfolioProps {
  t: any;
}

export default function Portfolio({ t }: PortfolioProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      image: "/unishop.png",
      title: t.proj1Title,
      desc: t.proj1Desc,
      github: "https://github.com/Whatfck/UniShop-frontend",
      demo: "https://uni-shop-frontend.vercel.app/",
      tags: ["React", "State Management", "E-commerce"],
      challenge: "Building a complex e-commerce filtering and cart system that maintains state across page refreshes while ensuring high performance.",
      solution: "Implemented Redux for global state and optimized image loading with Next.js, resulting in a 40% faster load time for product catalogs."
    },
    {
      image: "/mercadolibre.png",
      title: t.proj2Title,
      desc: t.proj2Desc,
      github: "https://github.com/valeriaucc/mercadolibre-clon/tree/dev",
      demo: "https://mercadolibre-clon-5.vercel.app/",
      tags: ["Next.js", "Cloning", "UI/UX"],
      challenge: "Replicating the intricate layout and responsive design of one of Latin America's largest platforms.",
      solution: "Utilized CSS Grid and Flexbox for high-fidelity replication, ensuring pixel-perfect layout across all device breakpoints."
    },
    {
      image: "/facade.png",
      title: t.proj3Title,
      desc: t.proj3Desc,
      github: "https://github.com/SebastianBolivar01/frontend_facade",
      demo: "https://frontend-facade.vercel.app/",
      tags: ["Design Patterns", "Clean Code", "Frontend Architecture"],
      challenge: "Simplifying complex underlying system interactions into a clean, easy-to-use developer interface.",
      solution: "Applied the Facade structural pattern to decouple the UI from complex logic, making the codebase 30% easier to maintain."
    },
    {
      image: "/cicd.png",
      title: t.proj4Title,
      desc: t.proj4Desc,
      github: "https://github.com/SebastianBolivar01/integracion-continua",
      demo: "https://integracion-continua-t7c1.vercel.app/",
      tags: ["DevOps", "CI/CD", "Automation"],
      challenge: "Setting up a seamless pipeline that automates testing and deployment to reduce manual errors.",
      solution: "Configured GitHub Actions and Vercel deployments, ensuring that every merge to main is automatically verified and pushed to production."
    },
    {
      image: "/calculator.png",
      title: t.proj5Title,
      desc: t.proj5Desc,
      github: "https://github.com/SebastianBolivar01/Calculadora17proMax/tree/main/calculo-visual",
      demo: "https://calculadora17pro-max.vercel.app/",
      tags: ["Algorithms", "Math", "Premium UI"],
      challenge: "Handling complex mathematical expressions and edge cases while maintaining a 'Pro Max' aesthetic.",
      solution: "Developed a custom parsing engine for math logic and applied Glassmorphism CSS effects for a high-end visual experience."
    },
    {
      image: "/landing.png",
      title: t.proj6Title,
      desc: t.proj6Desc,
      github: "https://github.com/SebastianBolivar01/landing_page",
      demo: "https://landing-page-blue-three-45.vercel.app/",
      tags: ["Marketing", "SEO", "Responsive Design"],
      challenge: "Creating a landing page that converts users through visual hierarchy and fast performance.",
      solution: "Optimized for Core Web Vitals and implemented scroll-trigger animations that guide the user's attention to the CTA."
    },
  ];

  const handleOpenModal = (proj: any) => {
    setSelectedProject(proj);
    setIsModalOpen(true);
  };

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
          <div key={idx} onClick={() => handleOpenModal(proj)} className="portfolio-clickable-item">
            <PortfolioCard
              image={proj.image}
              title={proj.title}
              desc={proj.desc}
              github={proj.github}
              demo={proj.demo}
              sourceCodeText={t.sourceCode}
              liveDemoText={t.btnLiveDemo}
            />
          </div>
        ))}
      </div>
      
      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={selectedProject} 
        t={t} 
      />

      <div className="section-divider"></div>

      <style jsx>{`
        .portfolio-clickable-item {
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
