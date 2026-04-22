"use client";

interface PortfolioCardProps {
  image: string;
  title: string;
  desc: string;
  github: string;
  demo?: string;
  sourceCodeText: string;
  liveDemoText: string;
}

export default function PortfolioCard({ 
  image, 
  title, 
  desc, 
  github, 
  demo,
  sourceCodeText,
  liveDemoText
}: PortfolioCardProps) {
  return (
    <div className="group relative bg-bg-matte rounded-xl overflow-hidden border border-white/8 transition-all duration-300 flex flex-col hover:border-accent hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_40px_var(--aurora-glow)] animate-fade-in-up">
      <div className="h-[220px] w-full overflow-hidden bg-bg-secondary relative">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-[1.25rem] font-bold font-outfit mb-3 text-text-primary border-b-2 border-accent pb-2 inline-block self-start">{title}</h3>
        <p className="text-[0.9rem] text-text-secondary mb-6 flex-1 leading-[1.6]">{desc}</p>
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-text-primary text-[0.8rem] font-bold uppercase no-underline py-2.5 border border-white/8 block text-center rounded-[40px] transition-all duration-250 hover:bg-accent hover:text-bg-matte hover:border-accent"
          >
            {sourceCodeText}
          </a>
          {demo && (
            <a 
              href={demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-text-primary text-[0.8rem] font-bold uppercase no-underline py-2.5 bg-bg-secondary border border-white/8 block text-center rounded-[40px] transition-all duration-250 hover:bg-accent hover:text-bg-matte hover:border-accent"
            >
              {liveDemoText}
            </a>
          )}
        </div>
      </div>
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full -skew-x-15 group-hover:animate-shimmer"></div>
      </div>
    </div>
  );

}
