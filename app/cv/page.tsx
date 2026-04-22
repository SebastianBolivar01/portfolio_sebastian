"use client";

import React from "react";
import { translations } from "../i18n";
import { Lang } from "../types";

export default function CVPage() {
  // Using English as default for CV, or could detect lang from URL/State
  const t = translations.en;
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cv-wrapper">
      {/* Control Bar (Screen only) */}
      <div className="cv-controls no-print">
        <button onClick={() => window.history.back()} className="cv-back-btn">
          ← Back to Portfolio
        </button>
        <button onClick={handlePrint} className="cv-download-btn">
          Download as PDF
        </button>
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
              <h2 className="cv-section-title">CONTACTS</h2>
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
              <h2 className="cv-section-title">SKILLS</h2>
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
              <h2 className="cv-section-title">HOBBIES</h2>
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
              <h2 className="cv-section-title">PROFILE</h2>
              <p className="cv-profile-text">
                {t.aboutDesc1} {t.aboutDesc2}
              </p>
            </section>

            {/* Education */}
            <section className="cv-section">
              <h2 className="cv-section-title">EDUCATION</h2>
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
              <h2 className="cv-section-title">EXPERIENCE</h2>
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
          background: #1a1a1a;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .cv-controls {
          width: 100%;
          max-width: 900px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .cv-back-btn, .cv-download-btn {
          padding: 10px 20px;
          border-radius: 8px;
          border: 1px solid #f5c71e;
          background: transparent;
          color: #f5c71e;
          cursor: pointer;
          font-weight: 600;
          transition: 0.3s;
        }

        .cv-download-btn {
          background: #f5c71e;
          color: #000;
        }

        .cv-back-btn:hover { background: rgba(245, 199, 30, 0.1); }
        .cv-download-btn:hover { background: #d4a717; }

        .cv-document {
          width: 100%;
          max-width: 900px;
          background: #111;
          min-height: 1100px;
          padding: 60px;
          box-shadow: 0 0 50px rgba(0,0,0,0.5);
          position: relative;
        }

        .cv-header {
          display: flex;
          align-items: center;
          gap: 40px;
          border-bottom: 2px solid #333;
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
          border: 4px solid #111;
          position: relative;
          z-index: 2;
        }

        .cv-pic-ring {
          position: absolute;
          inset: -5px;
          background: #f5c71e;
          border-radius: 50%;
          z-index: 1;
        }

        .cv-name {
          font-size: 3rem;
          font-weight: 900;
          color: #f5c71e;
          line-height: 1;
          margin: 0;
        }

        .cv-surname {
          font-size: 3rem;
          font-weight: 400;
          color: white;
          line-height: 1;
          margin: 0 0 10px 0;
        }

        .cv-subtitle {
          font-size: 1rem;
          color: #888;
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
          color: #f5c71e;
          border-bottom: 1px solid #333;
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
          background: #222;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.8rem;
        }

        .cv-label { font-size: 0.7rem; color: #f5c71e; text-transform: uppercase; margin: 0; }
        .cv-value { font-size: 0.85rem; color: #ccc; margin: 0; }

        .cv-skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .cv-skill-circle {
          width: 60px;
          height: 60px;
          border: 3px solid #333;
          border-top-color: #f5c71e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: #f5c71e;
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

        .cv-hobby-item p { font-size: 0.75rem; color: #888; }

        .cv-profile-text {
          font-size: 0.9rem;
          line-height: 1.8;
          color: #ccc;
        }

        .cv-timeline {
          border-left: 1px solid #333;
          padding-left: 25px;
        }

        .cv-timeline-item {
          position: relative;
          margin-bottom: 30px;
        }

        .cv-timeline-year {
          background: #f5c71e;
          color: black;
          padding: 2px 10px;
          font-size: 0.7rem;
          font-weight: 800;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 8px;
        }

        .cv-item-title { font-size: 1rem; color: white; margin-bottom: 2px; }
        .cv-item-subtitle { font-size: 0.8rem; color: #f5c71e; margin-bottom: 10px; }
        .cv-item-desc { font-size: 0.85rem; color: #888; line-height: 1.5; }

        @media print {
          .no-print { display: none !important; }
          .cv-wrapper { padding: 0; background: white; }
          .cv-document { 
            max-width: 100%; 
            box-shadow: none; 
            padding: 40px;
            background: #111 !important; /* Keep dark theme in PDF */
            color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
