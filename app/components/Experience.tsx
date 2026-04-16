"use client";

import { ExperienceItem } from "../types";

interface ExperienceProps {
  t: any;
}

export default function Experience({ t }: ExperienceProps) {
  return (
    <section id="experience" className="section-dark">
      <div className="section-head">
        <span className="section-subtitle">{t.experienceSubtitle}</span>
        <h2 className="section-title">{t.experienceTitle}</h2>
      </div>

      <div className="experience-container container">
        <div className="experience-cols">
          
          {/* Education Column */}
          <div className="experience-col animate-fade-in-up">
            <h3 className="experience-col-title">
              <span className="icon">🎓</span> {t.eduTitle}
            </h3>
            <div className="timeline">
              {t.education.map((item: ExperienceItem, idx: number) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <span className="timeline-year">{item.year}</span>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-subtitle">{item.subtitle}</p>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Work Column */}
          <div className="experience-col animate-fade-in-up delay-1">
            <h3 className="experience-col-title">
              <span className="icon">💼</span> {t.workTitle}
            </h3>
            <div className="timeline">
              {t.work.map((item: ExperienceItem, idx: number) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <span className="timeline-year">{item.year}</span>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-subtitle">{item.subtitle}</p>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
