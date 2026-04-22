"use client";

import React, { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "experience", label: "Experience" },
  { id: "portfolios", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      // Calculate total scroll percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setProgress((currentScroll / totalScroll) * 100);

      // Determine active section
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.id);
        if (element && window.scrollY >= element.offsetTop - 300) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-[30px] top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-[15px] z-[90]">
      <div className="w-[2px] h-[300px] bg-white/10 relative rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full bg-accent shadow-[0_0_10px_var(--accent-primary)] transition-all duration-100 ease-out" 
          style={{ height: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <a 
            key={section.id} 
            href={`#${section.id}`}
            className="group relative flex items-center justify-end no-underline"
            aria-label={section.label}
          >
            <span className="absolute right-[25px] bg-bg-secondary text-text-primary px-2.5 py-1 rounded border border-white/8 text-[0.7rem] font-bold uppercase tracking-wider opacity-0 translate-x-[10px] transition-all duration-300 pointer-events-none whitespace-nowrap group-hover:opacity-100 group-hover:translate-x-0">
              {section.label}
            </span>
            <div className={`w-2 h-2 rounded-full transition-all duration-300 border border-transparent ${activeSection === section.id ? "bg-accent scale-150 shadow-[0_0_10px_var(--accent-primary)]" : "bg-white/20 group-hover:border-accent group-hover:bg-accent/30"}`}></div>
          </a>
        ))}
      </div>
    </div>
  );
}
