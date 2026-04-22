"use client";

import ServiceCard from "./ServiceCard";

interface ServicesProps {
  t: any;
}

export default function Services({ t }: ServicesProps) {
  return (
    <section id="services" className="py-[120px] bg-bg-matte border-t border-white/8">
      <div className="text-center max-w-[600px] mx-auto mb-[60px]">
        <span className="block text-[0.75rem] text-accent font-outfit font-bold uppercase tracking-[2px] mb-2">{t.servicesSubtitle}</span>
        <h2 className="text-[2.2rem] font-bold text-text-primary mb-4 font-outfit">{t.servicesTitle}</h2>
        <p className="text-[0.9rem] text-text-secondary line-height-[1.6]">{t.servicesDesc}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-5">
        <ServiceCard icon="devicon-nextjs-plain" title={t.service1} />
        <ServiceCard icon="devicon-react-original" title={t.service2} />
        <ServiceCard icon="devicon-python-plain" title={t.service3} />
        <ServiceCard icon="devicon-figma-plain" title={t.service4} />
      </div>

      <div className="text-center mt-[50px]">
        <a 
          href="#contact" 
          className="inline-block px-8 py-3 text-[0.85rem] font-semibold font-outfit tracking-[1.5px] uppercase transition-all duration-250 rounded-[40px] border border-accent text-accent bg-transparent hover:bg-accent hover:text-bg-matte"
        >
          {t.btnBuyService}
        </a>
      </div>
    </section>
  );
}
