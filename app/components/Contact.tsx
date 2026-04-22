"use client";

interface ContactProps {
  t: any;
}

export default function Contact({ t }: ContactProps) {
  const contactItems = [
    { icon: "📞", text: "+57 321 726 3018", link: "tel:+573217263018" },
    { icon: "✉️", text: "bolivarsebas9@gmail.com", link: "mailto:bolivarsebas9@gmail.com" },
    { icon: "🌐", text: "www.linkedin.com/in/sebastian", link: "https://www.linkedin.com/in/sebastian-bolivar-cabrera-689309405/" },
    { icon: "💻", text: "www.github.com/SebastianBolivar01", link: "https://github.com/SebastianBolivar01" },
  ];

  return (
    <section id="contact" className="py-[120px] bg-bg-secondary border-t border-white/8">
      <div className="text-center max-w-[600px] mx-auto mb-[60px]">
        <span className="block text-[0.75rem] text-accent font-outfit font-bold uppercase tracking-[2px] mb-2">{t.contactSubtitle}</span>
        <h2 className="text-[2.2rem] font-bold text-text-primary mb-4 font-outfit">{t.contactTitle}</h2>
        <p className="text-[0.9rem] text-text-secondary line-height-[1.6]">{t.contactDesc2}</p>
      </div>

      <div className="flex flex-col items-center gap-5 px-6">
        {contactItems.map((item, idx) => (
          <a 
            key={idx} 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full max-w-[480px] flex items-center justify-center gap-4 px-6 py-4.5 bg-bg-secondary border border-white/8 rounded-full text-text-secondary text-[0.95rem] font-medium transition-all duration-250 no-underline hover:border-accent hover:text-text-primary hover:shadow-lg"
          >
            <span className="text-accent text-[1.2rem] flex">{item.icon}</span>
            {item.text}
          </a>
        ))}
      </div>
    </section>
  );
}
