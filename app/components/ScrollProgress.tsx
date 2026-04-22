"use client";

import React, { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "experience", label: "Experience" },
  { id: "portfolios", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      // Calculate total scroll percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setProgress((currentScroll / totalScroll) * 100);

      // Determine active section
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.id);
        if (element && window.scrollY >= element.offsetTop - 300) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-progress-nav">
      <div className="progress-track">
        <div className="progress-bar" style={{ height: `${progress}%` }}></div>
      </div>
      
      <div className="section-dots">
        {sections.map((section) => (
          <a 
            key={section.id} 
            href={`#${section.id}`}
            className={`section-dot-wrapper ${activeSection === section.id ? "active" : ""}`}
            aria-label={section.label}
          >
            <span className="dot-label">{section.label}</span>
            <div className="dot-circle"></div>
          </a>
        ))}
      </div>

      <style jsx>{`
        .scroll-progress-nav {
          position: fixed;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 15px;
          z-index: 90;
        }

        .progress-track {
          width: 2px;
          height: 300px;
          background: rgba(255, 255, 255, 0.1);
          position: relative;
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: var(--accent-primary);
          box-shadow: 0 0 10px var(--accent-primary);
          transition: height 0.1s ease-out;
        }

        .section-dots {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-dot-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          text-decoration: none;
        }

        .dot-circle {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transition: 0.3s;
          border: 1px solid transparent;
        }

        .section-dot-wrapper.active .dot-circle {
          background: var(--accent-primary);
          transform: scale(1.5);
          box-shadow: 0 0 10px var(--accent-primary);
        }

        .dot-label {
          position: absolute;
          right: 25px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0;
          transform: translateX(10px);
          transition: 0.3s;
          pointer-events: none;
          white-space: nowrap;
          border: 1px solid var(--card-border);
        }

        .section-dot-wrapper:hover .dot-label {
          opacity: 1;
          transform: translateX(0);
        }

        .section-dot-wrapper:hover .dot-circle {
          border-color: var(--accent-primary);
          background: rgba(245, 199, 30, 0.3);
        }

        @media (max-width: 1024px) {
          .scroll-progress-nav { display: none; }
        }
      `}</style>
    </div>
  );
}
