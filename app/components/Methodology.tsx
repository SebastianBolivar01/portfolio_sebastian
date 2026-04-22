"use client";

import { MethodStep } from "../types";

interface MethodologyProps {
  t: any;
}

export default function Methodology({ t }: MethodologyProps) {
  return (
    <section id="process" className="py-[120px] bg-bg-matte border-t border-white/8">
      <div className="text-center max-w-[600px] mx-auto mb-[60px]">
        <span className="block text-[0.75rem] text-accent font-outfit font-bold uppercase tracking-[2px] mb-2">{t.processSubtitle}</span>
        <h2 className="text-[2.2rem] font-bold text-text-primary mb-4 font-outfit">{t.processTitle}</h2>
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.processSteps.map((step: MethodStep, idx: number) => (
            <div key={idx} className="relative animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex items-center gap-5 mb-5">
                <span className="text-[1.5rem] font-extrabold text-accent font-outfit bg-bg-secondary w-[50px] h-[50px] flex items-center justify-center rounded-xl border border-white/8 shadow-lg shrink-0">
                  {step.id}
                </span>
                <div className="hidden lg:block flex-1 h-[2px] bg-white/8"></div>
              </div>
              <h3 className="text-[1.25rem] font-bold mb-3 text-text-primary">{step.title}</h3>
              <p className="text-[0.9rem] text-text-secondary leading-[1.6]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

}
