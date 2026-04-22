"use client";

import Link from "next/link";
import { cvLink } from "../i18n";
import Magnetic from "./Magnetic";
import StatusWidget from "./StatusWidget";

interface HeroProps {
  t: any;
}

export default function Hero({ t }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center pt-[100px] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-20">
        
        {/* Left Side: Content */}
        <div className="flex-[1.2] animate-fade-in-up text-center md:text-left">
          <div className="mb-6 inline-block">
            <StatusWidget />
          </div>
          <div className="mb-10">
            <h1 className="text-5xl lg:text-[4.5rem] font-extrabold leading-none font-outfit tracking-[-2px] mb-8">
              Sebastian<br />Bolivar<span className="text-accent">.</span>
            </h1>
            
            <div className="max-w-[500px] mx-auto md:mx-0">
              <h4 className="text-accent text-[0.85rem] uppercase font-outfit font-bold tracking-[3px] mb-3">
                {t.introLabel}
              </h4>
              <h2 className="text-2xl lg:text-[2rem] leading-[1.2] font-outfit font-bold mb-5">
                {t.heroTitleHighlight}
              </h2>
              <p className="text-base lg:text-lg text-text-secondary leading-[1.8]">
                {t.heroSubtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
            <Magnetic strength={0.2}>
              <a 
                href="#contact" 
                className="inline-block px-8 py-3 text-[0.85rem] font-semibold font-outfit tracking-[1.5px] uppercase transition-all duration-250 rounded-[40px] bg-accent text-bg-matte border border-accent hover:bg-transparent hover:text-accent"
              >
                {t.btnContact}
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link 
                href={cvLink} 
                className="inline-block px-8 py-3 text-[0.85rem] font-semibold font-outfit tracking-[1.5px] uppercase transition-all duration-250 rounded-[40px] border border-accent text-accent bg-transparent hover:bg-accent hover:text-bg-matte"
              >
                {t.btnCV}
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex-[0.8] flex justify-center md:justify-end items-center animate-fade-in-up delay-1 order-first md:order-last">
          <div className="w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] relative">
            <div className="absolute inset-[-15px] rounded-full bg-accent/15 blur-[40px] z-1 opacity-50"></div>
            <img 
              src="/profile.jpg" 
              alt="Sebastian Bolivar" 
              className="w-full h-full object-cover rounded-full relative z-2 border-8 border-bg-secondary shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
              onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"} 
            />
          </div>
        </div>

      </div>
    </section>
  );

}
