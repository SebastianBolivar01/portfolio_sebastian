"use client";

import { SkillCategory } from "../types";

interface SkillsProps {
  t: any;
}

export default function Skills({ t }: SkillsProps) {
  return (
    <section id="skills" className="py-[120px] bg-bg-secondary border-t border-white/8">
      <div className="text-center max-w-[600px] mx-auto mb-[60px]">
        <span className="block text-[0.75rem] text-accent font-outfit font-bold uppercase tracking-[2px] mb-2">
          {t.skillsSubtitle}
        </span>
        <h2 className="text-[2.2rem] font-bold text-text-primary mb-4 font-outfit">
          {t.skillsTitle}
        </h2>
        <div className="w-[150px] h-[1px] bg-accent mx-auto my-[60px] opacity-50"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.skillCategories.map((cat: SkillCategory, idx: number) => (
            <div 
              key={idx} 
              className="bg-bg-matte border border-white/8 p-8 rounded-xl transition-all duration-250 hover:border-accent hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] animate-fade-in-up" 
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <h3 className="text-[1.25rem] font-bold mb-6 text-text-primary font-outfit">{cat.title}</h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="group px-4 py-2 bg-bg-secondary border border-white/8 rounded-full text-[0.85rem] font-semibold text-text-secondary flex items-center gap-2.5 transition-all duration-250 hover:bg-accent hover:text-bg-matte hover:border-accent hover:-translate-y-0.5"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full transition-all duration-250 group-hover:bg-bg-matte"></span>
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
