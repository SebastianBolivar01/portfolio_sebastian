"use client";

import { ExperienceItem } from "../types";

interface ExperienceProps {
  t: any;
}

export default function Experience({ t }: ExperienceProps) {
  return (
    <section id="experience" className="py-[120px] bg-bg-matte border-t border-white/8">
      <div className="text-center max-w-[600px] mx-auto mb-[60px]">
        <span className="block text-[0.75rem] text-accent font-outfit font-bold uppercase tracking-[2px] mb-2">{t.experienceSubtitle}</span>
        <h2 className="text-[2.2rem] font-bold text-text-primary mb-4 font-outfit">{t.experienceTitle}</h2>
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px]">
          
          {/* Education Column */}
          <div className="animate-fade-in-up">
            <h3 className="text-[1.5rem] font-bold mb-10 text-text-primary flex items-center gap-3">
              <span className="text-[1.8rem]">🎓</span> {t.eduTitle}
            </h3>
            <div className="relative pl-[30px] border-l-2 border-white/8">
              {t.education.map((item: ExperienceItem, idx: number) => (
                <div key={idx} className="relative mb-10 last:mb-0">
                  <div className="absolute -left-[37px] top-0 w-3.5 h-3.5 bg-accent rounded-full border-4 border-bg-matte"></div>
                  <span className="inline-block px-3 py-1 bg-bg-secondary border border-white/8 rounded-full text-[0.75rem] font-bold text-accent mb-3 uppercase tracking-wider">{item.year}</span>
                  <h4 className="text-[1.1rem] font-bold mb-1 text-text-primary">{item.title}</h4>
                  <p className="text-[0.9rem] text-text-muted mb-3">{item.subtitle}</p>
                  <p className="text-[0.85rem] text-text-secondary leading-[1.6]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Work Column */}
          <div className="animate-fade-in-up delay-1">
            <h3 className="text-[1.5rem] font-bold mb-10 text-text-primary flex items-center gap-3">
              <span className="text-[1.8rem]">💼</span> {t.workTitle}
            </h3>
            <div className="relative pl-[30px] border-l-2 border-white/8">
              {t.work.map((item: ExperienceItem, idx: number) => (
                <div key={idx} className="relative mb-10 last:mb-0">
                  <div className="absolute -left-[37px] top-0 w-3.5 h-3.5 bg-accent rounded-full border-4 border-bg-matte"></div>
                  <span className="inline-block px-3 py-1 bg-bg-secondary border border-white/8 rounded-full text-[0.75rem] font-bold text-accent mb-3 uppercase tracking-wider">{item.year}</span>
                  <h4 className="text-[1.1rem] font-bold mb-1 text-text-primary">{item.title}</h4>
                  <p className="text-[0.9rem] text-text-muted mb-3">{item.subtitle}</p>
                  <p className="text-[0.85rem] text-text-secondary leading-[1.6]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
