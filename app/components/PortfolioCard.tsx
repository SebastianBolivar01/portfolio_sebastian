"use client";

interface PortfolioCardProps {
  emoji: string;
  title: string;
  desc: string;
  github: string;
  demo?: string;
  sourceCodeText: string;
  liveDemoText: string;
}

export default function PortfolioCard({ 
  emoji, 
  title, 
  desc, 
  github, 
  demo,
  sourceCodeText,
  liveDemoText
}: PortfolioCardProps) {
  return (
    <div className="portfolio-card animate-fade-in-up">
      <div className="portfolio-image">{emoji}</div>
      <div className="portfolio-info">
        <h3 className="portfolio-title">{title}</h3>
        <p className="portfolio-desc">{desc}</p>
        <div className="portfolio-links">
          <a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="portfolio-link"
          >
            {sourceCodeText}
          </a>
          {demo && (
            <a 
              href={demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="portfolio-link btn-demo"
            >
              {liveDemoText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
