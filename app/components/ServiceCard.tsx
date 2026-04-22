"use client";

interface ServiceCardProps {
  icon: string;
  title: string;
}

export default function ServiceCard({ icon, title }: ServiceCardProps) {
  return (
    <div className="group w-[180px] h-[180px] bg-bg-matte border border-white/8 flex flex-col items-center justify-center gap-4 transition-all duration-250 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:border-accent hover:-translate-y-1.5">
      <span className="text-[3rem] text-text-secondary transition-colors duration-250 group-hover:text-text-primary">
        <i className={icon}></i>
      </span>
      <span 
        className="text-[0.9rem] font-medium font-outfit text-text-primary text-center" 
        dangerouslySetInnerHTML={{ __html: title.replace(' ', '<br/>') }}
      ></span>
    </div>
  );

}
