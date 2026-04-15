"use client";

import ServiceCard from "./ServiceCard";

interface ServicesProps {
  t: any;
}

export default function Services({ t }: ServicesProps) {
  return (
    <section id="services" className="section-dark">
      <div className="section-head">
        <span className="section-subtitle">{t.servicesSubtitle}</span>
        <h2 className="section-title">{t.servicesTitle}</h2>
        <p className="section-desc">{t.servicesDesc}</p>
      </div>

      <div className="services-grid">
        <ServiceCard icon="devicon-nextjs-plain" title={t.service1} />
        <ServiceCard icon="devicon-react-original" title={t.service2} />
        <ServiceCard icon="devicon-python-plain" title={t.service3} />
        <ServiceCard icon="devicon-figma-plain" title={t.service4} />
      </div>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <a href="#contact" className="btn btn-outline-gold">{t.btnBuyService}</a>
      </div>
    </section>
  );
}
