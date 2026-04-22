"use client";

import { useState } from "react";
import { Testimonial } from "../types";

interface TestimonialsProps {
  t: any;
}

export default function Testimonials({ t }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = t.testimonials[activeIndex] as Testimonial;

  return (
    <section id="testimonials" className="py-[120px] bg-bg-matte border-t border-white/8">
      <div className="text-center max-w-[600px] mx-auto mb-[60px]">
        <span className="block text-[0.75rem] text-accent font-outfit font-bold uppercase tracking-[2px] mb-2">
          {t.testimonialSubtitle}
        </span>
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
          
          {/* Featured Testimonial (Left) */}
          <div className="relative">
            <div className="bg-bg-secondary border border-white/8 p-8 lg:p-[60px] rounded-xl relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] animate-fade-in-up">
              <div className="absolute top-5 left-5 w-5 h-5 border-l-2 border-t-2 border-accent/30"></div>
              <div className="absolute bottom-5 right-5 w-5 h-5 border-r-2 border-b-2 border-accent/30"></div>
              
              <div className="flex justify-between items-center mb-[30px]">
                <div className="text-[#FF8A00] text-[1.2rem] flex gap-1">
                  {[...Array(active.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <div className="text-[5rem] lg:text-[8rem] font-serif leading-none text-accent opacity-15 absolute top-[-10px] right-5 lg:right-10 select-none">”</div>
              </div>

              <p className="text-xl lg:text-[1.5rem] font-medium leading-[1.6] text-text-primary mb-10 italic relative z-2">
                “{active.text}”
              </p>

              <div className="flex items-center gap-5">
                <div className="relative w-20 h-20 shrink-0">
                  <img src={active.avatar} alt={active.author} className="w-full h-full rounded-full object-cover relative z-2" />
                  <div className="absolute inset-[-5px] border-2 border-accent rounded-full opacity-50"></div>
                </div>
                <div>
                  <h3 className="text-[1.25rem] font-bold mb-1 text-text-primary">{active.author}</h3>
                  <p className="text-[0.85rem] text-accent font-semibold">{active.role}</p>
                  <p className="text-[0.8rem] text-text-muted">{active.location}</p>
                </div>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="mt-[30px] flex items-center gap-5">
               <div className="flex items-center gap-[15px]">
                  <button 
                    className="w-11 h-11 bg-bg-secondary border border-white/8 text-text-primary rounded-full cursor-pointer flex items-center justify-center transition-all duration-250 hover:bg-accent hover:text-bg-matte hover:border-accent text-2xl" 
                    onClick={() => setActiveIndex((prev) => (prev === 0 ? t.testimonials.length - 1 : prev - 1))}
                  >
                    ‹
                  </button>
                  <div className="flex gap-2">
                    {t.testimonials.map((_: any, idx: number) => (
                      <span 
                        key={idx} 
                        className={`h-1.5 rounded-full cursor-pointer transition-all duration-250 ${idx === activeIndex ? "w-10 bg-accent" : "w-6 bg-white/8"}`}
                        onClick={() => setActiveIndex(idx)}
                      ></span>
                    ))}
                  </div>
                  <button 
                    className="w-11 h-11 bg-bg-secondary border border-white/8 text-text-primary rounded-full cursor-pointer flex items-center justify-center transition-all duration-250 hover:bg-accent hover:text-bg-matte hover:border-accent text-2xl"
                    onClick={() => setActiveIndex((prev) => (prev === t.testimonials.length - 1 ? 0 : prev + 1))}
                  >
                    ›
                  </button>
               </div>
            </div>
          </div>

          {/* Side Testimonials (Right) */}
          <div className="flex flex-col gap-5">
            {t.testimonials.map((item: Testimonial, idx: number) => (
              <div 
                key={idx} 
                className={`
                  relative p-6 bg-bg-secondary border rounded-xl cursor-pointer transition-all duration-250 
                  ${idx === activeIndex ? "border-accent bg-bg-card opacity-100 shadow-[0_10px_30px_rgba(0,0,0,0.1)]" : "border-white/8 opacity-70 hover:bg-bg-card hover:opacity-100"}
                `}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-bg-matte rounded-full flex items-center justify-center border border-white/8">
                     <span className="text-[1.2rem] opacity-50">👤</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold mb-0.5 text-text-primary">{item.author}</h4>
                    <p className="text-[0.75rem] text-text-muted">{item.location}</p>
                  </div>
                </div>
                <p className="text-[0.85rem] text-text-secondary leading-[1.5] italic">
                  “{item.text.substring(0, 80)}...”
                </p>
                {idx === activeIndex && <div className="absolute bottom-0 left-6 right-6 h-[3px] bg-accent rounded-t-full"></div>}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
