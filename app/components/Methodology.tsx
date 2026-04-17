"use client";

import { MethodStep } from "../types";

interface MethodologyProps {
  t: any;
}

export default function Methodology({ t }: MethodologyProps) {
  return (
    <section id="process" className="section-dark">
      <div className="section-head">
        <span className="section-subtitle">{t.processSubtitle}</span>
        <h2 className="section-title">{t.processTitle}</h2>
      </div>

      <div className="process-container container">
        <div className="process-flow">
          {t.processSteps.map((step: MethodStep, idx: number) => (
            <div key={idx} className="process-card animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="process-header">
                <span className="process-id">{step.id}</span>
                <div className="process-line"></div>
              </div>
              <h3 className="process-card-title">{step.title}</h3>
              <p className="process-card-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
