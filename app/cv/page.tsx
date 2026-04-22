"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { translations } from "../i18n";
import { Lang } from "../types";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";

export default function CVPage() {
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useTheme();
  const { lang, t, handleLangChange } = useLanguage();
  
  const handlePrint = () => {
    window.print();
  };

  if (!mounted) return null;

  return (
    <div className="cv-wrapper" data-theme={theme}>
      {/* Control Bar (Screen only) */}
      <div className="cv-controls no-print">
        <div className="cv-controls-left">
          <button onClick={() => router.push("/")} className="cv-back-btn">
            ← {t.cvBack}
          </button>
        </div>
        <div className="cv-controls-right">
          <select value={lang} onChange={handleLangChange} className="cv-lang-select">
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="it">IT</option>
            <option value="pt">PT</option>
          </select>
          <button onClick={toggleTheme} className="cv-theme-toggle">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button onClick={handlePrint} className="cv-download-btn">
            {t.cvDownload}
          </button>
        </div>
      </div>

      {/* Main CV Document */}
      <div className="cv-document" id="cv-content">
        {/* Header Section */}
        <div className="cv-header">
          <div className="cv-profile-pic-container">
            <img src="/profile.jpg" alt="Sebastian Bolivar" className="cv-profile-pic" />
            <div className="cv-pic-ring"></div>
          </div>
          <div className="cv-header-info">
            <h1 className="cv-name">SEBASTIAN</h1>
            <h1 className="cv-surname">BOLIVAR CABRERA</h1>
            <p className="cv-subtitle">SOFTWARE ENGINEER & FULL-STACK DEVELOPER</p>
          </div>
        </div>

        <div className="cv-main-grid">
          {/* Left Column */}
          <div className="cv-left-col">
            
            {/* Contacts */}
            <section className="cv-section">
              <h2 className="cv-section-title">{t.cvContacts}</h2>
              <div className="cv-contact-list">
                <div className="cv-contact-item">
                  <span className="cv-icon">📞</span>
                  <div>
                    <p className="cv-label">Mobile</p>
                    <p className="cv-value">+57 321 726 3018</p>
                  </div>
                </div>
                <div className="cv-contact-item">
                  <span className="cv-icon">✉️</span>
                  <div>
                    <p className="cv-label">Email</p>
                    <p className="cv-value">bolivarsebas9@gmail.com</p>
                  </div>
                </div>
                <div className="cv-contact-item">
                  <span className="cv-icon">🌐</span>
                  <div>
                    <p className="cv-label">LinkedIn</p>
                    <p className="cv-value">linkedin.com/in/sebastian-bolivar</p>
                  </div>
                </div>
                <div className="cv-contact-item">
                  <span className="cv-icon">💻</span>
                  <div>
                    <p className="cv-label">GitHub</p>
                    <p className="cv-value">github.com/SebastianBolivar01</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="cv-section">
              <h2 className="cv-section-title">{t.cvSkills}</h2>
              <div className="cv-skills-grid">
                {["React", "Next.js", "TS", "Python", "Django", "Node.js"].map((skill) => (
                  <div key={skill} className="cv-skill-circle-box">
                    <div className="cv-skill-circle">
                      <span>{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Hobbies */}
            <section className="cv-section">
              <h2 className="cv-section-title">{t.cvHobbies}</h2>
              <div className="cv-hobbies-grid">
                <div className="cv-hobby-item">
                  <span className="cv-hobby-icon">🎮</span>
                  <p>Gaming</p>
                </div>
                <div className="cv-hobby-item">
                  <span className="cv-hobby-icon">📸</span>
                  <p>Tech</p>
                </div>
                <div className="cv-hobby-item">
                  <span className="cv-hobby-icon">📖</span>
                  <p>Reading</p>
                </div>
                <div className="cv-hobby-item">
                  <span className="cv-hobby-icon">⚽</span>
                  <p>Fitness</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="cv-right-col">
            
            {/* Profile */}
            <section className="cv-section">
              <h2 className="cv-section-title">{t.cvProfile}</h2>
              <p className="cv-profile-text">
                {t.aboutDesc1} {t.aboutDesc2}
              </p>
            </section>

            {/* Education */}
            <section className="cv-section">
              <h2 className="cv-section-title">{t.cvEducation}</h2>
              <div className="cv-timeline">
                {t.education.map((edu: any, i: number) => (
                  <div key={i} className="cv-timeline-item">
                    <div className="cv-timeline-year">{edu.year}</div>
                    <div className="cv-timeline-content">
                      <h4 className="cv-item-title">{edu.title}</h4>
                      <p className="cv-item-subtitle">{edu.subtitle}</p>
                      <p className="cv-item-desc">{edu.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section className="cv-section">
              <h2 className="cv-section-title">{t.cvExperience}</h2>
              <div className="cv-timeline">
                {t.work.map((job: any, i: number) => (
                  <div key={i} className="cv-timeline-item">
                    <div className="cv-timeline-year">{job.year}</div>
                    <div className="cv-timeline-content">
                      <h4 className="cv-item-title">{job.title}</h4>
                      <p className="cv-item-subtitle">{job.subtitle}</p>
                      <p className="cv-item-desc">{job.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>

      <style jsx>{`
        .cv-wrapper {
          min-height: 100vh;
          background: var(--bg-color);
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          transition: background 0.3s ease;
        }

        .cv-controls {
          width: 100%;
          max-width: 900px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .cv-controls-right {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .cv-back-btn, .cv-download-btn, .cv-theme-toggle, .cv-lang-select {
          padding: 10px 20px;
          border-radius: 8px;
          border: 1px solid var(--accent-primary);
          background: transparent;
          color: var(--accent-primary);
          cursor: pointer;
          font-weight: 600;
          transition: 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
        }

        .cv-lang-select {
          appearance: none;
          padding-right: 30px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23f5c71e' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: calc(100% - 10px) center;
        }

        .cv-lang-select option {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .cv-theme-toggle {
          width: 44px;
          height: 44px;
          padding: 0;
          font-size: 1.2rem;
        }

        .cv-download-btn {
          background: var(--accent-primary);
          color: var(--bg-color);
        }

        .cv-back-btn:hover, .cv-theme-toggle:hover { background: var(--aurora-glow); }
        .cv-download-btn:hover { opacity: 0.8; }

        .cv-document {
          width: 100%;
          max-width: 900px;
          background: var(--bg-secondary);
          min-height: 1100px;
          padding: 60px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          position: relative;
          border: 1px solid var(--card-border);
          transition: all 0.3s ease;
        }

        .cv-header {
          display: flex;
          align-items: center;
          gap: 40px;
          border-bottom: 2px solid var(--card-border);
          padding-bottom: 40px;
          margin-bottom: 40px;
        }

        .cv-profile-pic-container {
          position: relative;
          width: 150px;
          height: 150px;
        }

        .cv-profile-pic {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 4px solid var(--bg-secondary);
          position: relative;
          z-index: 2;
        }

        .cv-pic-ring {
          position: absolute;
          inset: -5px;
          background: var(--accent-primary);
          border-radius: 50%;
          z-index: 1;
        }

        .cv-name {
          font-size: 3rem;
          font-weight: 900;
          color: var(--accent-primary);
          line-height: 1;
          margin: 0;
        }

        .cv-surname {
          font-size: 3rem;
          font-weight: 400;
          color: var(--text-primary);
          line-height: 1;
          margin: 0 0 10px 0;
        }

        .cv-subtitle {
          font-size: 1rem;
          color: var(--text-muted);
          letter-spacing: 4px;
        }

        .cv-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.8fr;
          gap: 60px;
        }

        .cv-section {
          margin-bottom: 40px;
        }

        .cv-section-title {
          font-size: 1.2rem;
          color: var(--accent-primary);
          border-bottom: 1px solid var(--card-border);
          padding-bottom: 10px;
          margin-bottom: 20px;
          letter-spacing: 2px;
        }

        .cv-contact-item {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
          align-items: center;
        }

        .cv-icon {
          width: 30px;
          height: 30px;
          background: var(--bg-color);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.8rem;
          border: 1px solid var(--card-border);
        }

        .cv-label { font-size: 0.7rem; color: var(--accent-primary); text-transform: uppercase; margin: 0; }
        .cv-value { font-size: 0.85rem; color: var(--text-secondary); margin: 0; }

        .cv-skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .cv-skill-circle {
          width: 60px;
          height: 60px;
          border: 3px solid var(--card-border);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--accent-primary);
        }

        .cv-hobbies-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .cv-hobby-item {
          text-align: center;
        }

        .cv-hobby-icon {
          font-size: 1.5rem;
          display: block;
          margin-bottom: 5px;
        }

        .cv-hobby-item p { font-size: 0.75rem; color: var(--text-muted); }

        .cv-profile-text {
          font-size: 0.9rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }

        .cv-timeline {
          border-left: 1px solid var(--card-border);
          padding-left: 25px;
        }

        .cv-timeline-item {
          position: relative;
          margin-bottom: 30px;
        }

        .cv-timeline-year {
          background: var(--accent-primary);
          color: var(--bg-color);
          padding: 2px 10px;
          font-size: 0.7rem;
          font-weight: 800;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 8px;
        }

        .cv-item-title { font-size: 1rem; color: var(--text-primary); margin-bottom: 2px; }
        .cv-item-subtitle { font-size: 0.8rem; color: var(--accent-primary); margin-bottom: 10px; }
        .cv-item-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }

        @media print {
          .no-print { display: none !important; }
          .cv-wrapper { padding: 0; background: white !important; color: black !important; }
          .cv-document { 
            max-width: 100%; 
            box-shadow: none; 
            padding: 40px;
            background: white !important; 
            color: black !important;
            border: none;
          }
          .cv-name, .cv-section-title, .cv-item-subtitle, .cv-label, .cv-skill-circle, .cv-timeline-year { color: #D97706 !important; }
          .cv-surname, .cv-item-title, .cv-profile-text, .cv-value, .cv-item-desc { color: black !important; }
          .cv-timeline-year { background: #D97706 !important; color: white !important; }
          .cv-pic-ring { background: #D97706 !important; }
          .cv-skill-circle { border-color: #eee !important; border-top-color: #D97706 !important; }
          .cv-icon { background: #f9f9f9 !important; border-color: #eee !important; }
        }

        @media (max-width: 768px) {
          .cv-document { padding: 30px; }
          .cv-header { flex-direction: column; text-align: center; gap: 20px; }
          .cv-main-grid { grid-template-columns: 1fr; gap: 40px; }
          .cv-name, .cv-surname { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  );
}
