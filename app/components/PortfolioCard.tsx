"use client";

interface PortfolioCardProps {
  emoji: string;
  title: string;
  desc: string;
  link: string;
  sourceCodeText: string;
}

export default function PortfolioCard({ 
  emoji, 
  title, 
  desc, 
  link, 
  sourceCodeText 
}: PortfolioCardProps) {
  return (
    <div className="portfolio-card">
      <div className="portfolio-image">{emoji}</div>
      <div className="portfolio-info">
        <h3 className="portfolio-title">{title}</h3>
        <p className="portfolio-desc">{desc}</p>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="portfolio-link"
        >
          {sourceCodeText}
        </a>
      </div>
    </div>
  );
}
