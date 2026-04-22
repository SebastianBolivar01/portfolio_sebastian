"use client";

interface FooterProps {
  text: string;
}

export default function Footer({ text }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: "devicon-github-original", href: "https://github.com/SebastianBolivar01", label: "GitHub" },
    { icon: "devicon-linkedin-plain", href: "https://www.linkedin.com/in/sebastian-bolivar-cabrera-689309405/", label: "LinkedIn" },
  ];

  const quickLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#portfolios", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="relative bg-bg-secondary border-t border-white/8 overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>

      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-5">
            <a href="#" className="flex items-center gap-3 no-underline group">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent-primary)" />
                      <stop offset="100%" stopColor="#FFF" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M20 2 L37.3 11 L37.3 29 L20 38 L2.7 29 L2.7 11 Z" 
                    fill="none" 
                    stroke="url(#footerLogoGrad)" 
                    strokeWidth="2"
                  />
                  <text 
                    x="50%" 
                    y="50%" 
                    dominantBaseline="central" 
                    textAnchor="middle" 
                    className="fill-text-primary font-outfit font-extrabold text-[14px]"
                  >SB</text>
                </svg>
              </div>
              <span className="text-text-primary font-outfit font-bold text-xl tracking-tight group-hover:text-accent transition-colors duration-300">
                Sebastian<span className="text-accent">.</span>
              </span>
            </a>
            <p className="text-text-secondary text-[0.85rem] leading-[1.7] max-w-[300px]">
              Full-Stack Developer crafting modern, scalable, and beautiful digital experiences from Colombia 🇨🇴
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-bg-matte border border-white/8 rounded-lg flex items-center justify-center text-text-muted text-lg transition-all duration-300 hover:bg-accent hover:text-bg-matte hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_5px_15px_var(--aurora-glow)]"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
              {/* Email icon (no devicon) */}
              <a
                href="mailto:bolivarsebas9@gmail.com"
                aria-label="Email"
                className="w-10 h-10 bg-bg-matte border border-white/8 rounded-lg flex items-center justify-center text-text-muted text-lg transition-all duration-300 hover:bg-accent hover:text-bg-matte hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_5px_15px_var(--aurora-glow)]"
              >
                ✉️
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-5">
            <h4 className="text-text-primary font-outfit font-bold text-[0.85rem] uppercase tracking-[2px]">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary text-[0.85rem] no-underline transition-all duration-300 hover:text-accent hover:translate-x-1 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info Column */}
          <div className="flex flex-col gap-5">
            <h4 className="text-text-primary font-outfit font-bold text-[0.85rem] uppercase tracking-[2px]">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-4">
              <a 
                href="mailto:bolivarsebas9@gmail.com" 
                className="text-text-secondary text-[0.85rem] no-underline transition-colors duration-300 hover:text-accent flex items-center gap-3"
              >
                <span className="text-accent">✉️</span>
                bolivarsebas9@gmail.com
              </a>
              <a 
                href="tel:+573217263018" 
                className="text-text-secondary text-[0.85rem] no-underline transition-colors duration-300 hover:text-accent flex items-center gap-3"
              >
                <span className="text-accent">📞</span>
                +57 321 726 3018
              </a>
              <span className="text-text-secondary text-[0.85rem] flex items-center gap-3">
                <span className="text-accent">📍</span>
                Pasto, Colombia
              </span>
            </div>

            {/* CTA */}
            <a 
              href="#contact" 
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg-matte text-[0.75rem] font-bold font-outfit uppercase tracking-wider rounded-full transition-all duration-300 hover:shadow-[0_5px_20px_var(--aurora-glow)] hover:-translate-y-0.5 no-underline w-fit"
            >
              Let&apos;s Work Together
              <span className="text-sm">→</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-[0.75rem] text-center md:text-left">
            {text}
          </p>
          <div className="flex items-center gap-2 text-text-muted text-[0.75rem]">
            <span>Built with</span>
            <span className="text-accent font-semibold flex items-center gap-1">
              <i className="devicon-nextjs-plain text-sm"></i> Next.js
            </span>
            <span>&</span>
            <span className="text-accent font-semibold flex items-center gap-1">
              <i className="devicon-tailwindcss-original text-sm"></i> Tailwind
            </span>
          </div>
        </div>
      </div>

      {/* Large background watermark */}
      <div className="absolute bottom-[-60px] right-[-20px] text-[15rem] font-outfit font-extrabold text-white/[0.02] select-none pointer-events-none leading-none">
        SB
      </div>
    </footer>
  );
}
