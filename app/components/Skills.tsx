"use client";

import { SkillCategory } from "../types";

interface SkillsProps {
  t: any;
}

export default function Skills({ t }: SkillsProps) {
  return (
    <section id="skills" className="section">
      <div className="section-head">
        <span className="section-subtitle">{t.skillsSubtitle}</span>
        <h2 className="section-title">{t.skillsTitle}</h2>
        <div className="section-divider"></div>
      </div>

      <div className="skills-container container">
        <div className="skills-grid">
          {t.skillCategories.map((cat: SkillCategory, idx: number) => (
            <div key={idx} className="skill-category-card animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <h3 className="skill-cat-title">{cat.title}</h3>
              <div className="skill-pills">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-pill">
                    <span className="skill-dot"></span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
