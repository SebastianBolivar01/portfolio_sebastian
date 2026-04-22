"use client";

interface AboutProps {
  t: any;
}

export default function About({ t }: AboutProps) {
  return (
    <section id="about" className="py-[120px] bg-bg-secondary border-t border-white/8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-[60px] items-center">
          <div className="relative animate-fade-in-up">
            <div className="w-full h-[350px] lg:h-[500px] rounded-xl overflow-hidden relative z-2 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop" 
                alt="Workspace" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-5 -left-5 w-full h-full border-2 border-accent rounded-xl z-1 opacity-20 hidden lg:block"></div>
          </div>
          
          <div className="animate-fade-in-up delay-1">
            <span className="block text-[0.75rem] text-accent font-outfit font-bold uppercase tracking-[2px] mb-2">
              {t.aboutSubtitle}
            </span>
            <h2 className="text-[2rem] lg:text-[2.2rem] font-bold text-text-primary mb-4 font-outfit">
              {t.aboutTitle}
            </h2>
            <p className="text-[1.1rem] text-text-primary font-medium leading-[1.8] mb-6">
              {t.aboutDesc1}
            </p>
            <p className="text-[1rem] text-text-secondary leading-[1.8] mb-6">
              {t.aboutDesc2}
            </p>
            <div className="flex gap-10 mt-10">
              <div className="flex flex-col">
                <span className="text-[2rem] font-bold text-accent font-outfit leading-none">50+</span>
                <span className="text-[0.8rem] uppercase tracking-[1px] text-text-muted mt-2">Projects</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[2rem] font-bold text-accent font-outfit leading-none">3+</span>
                <span className="text-[0.8rem] uppercase tracking-[1px] text-text-muted mt-2">Years</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
