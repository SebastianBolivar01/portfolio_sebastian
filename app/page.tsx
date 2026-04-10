"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import { translations, Lang } from "./i18n";

export default function Home() {
  const [lang, setLang] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedLang = localStorage.getItem('lang') as Lang;
    if (savedLang && translations[savedLang]) {
      setLang(savedLang);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Lang;
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = translations[lang];

  return (
    <>
      <header className="nav-header">
        <div className="nav-container">
          <a href="#" className="nav-logo">SB<span className="dot">.</span></a>

          <nav className="nav-links">
            <a href="#">{t.navHome}</a>
            <a href="#services">{t.navServices}</a>
            <a href="#portfolios">{t.navPortfolios}</a>
            <a href="#freelance">{t.navFreelance}</a>
            <a href="#contact">{t.navContact}</a>

            {mounted && (
              <>
                <button
                  onClick={toggleTheme}
                  className="theme-toggle"
                  aria-label="Toggle Theme"
                  title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                <select value={lang} onChange={handleLangChange} className="lang-select" aria-label="Change Language">
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                  <option value="it">IT</option>
                  <option value="pt">PT</option>
                </select>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="container">
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-col hero-col-left">
            <h1 className="hero-main-title">Sebastian<br />Bolivar<span className="dot">.</span></h1>
            <p className="hero-social-text">Instagram | Facebook<br />WhatsApp | Telegram.</p>
            <a href="#contact" className="btn btn-outline-gold">{t.btnContact}</a>
          </div>

          <div className="hero-col hero-col-center">
            <div className="hero-image-box" title="Place your image at /profile.jpg">
              <div className="hero-image-circle"></div>
              <img src="/profile.jpg" alt="Sebastian" onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"} />
            </div>
          </div>

          <div className="hero-col hero-col-right">
            <h4 className="hero-intro-label">{t.introLabel}</h4>
            <h2 className="hero-intro-title">{t.heroTitleHighlight}</h2>
            <p className="hero-intro-desc">
              {t.heroSubtitle}
            </p>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="section-dark">
          <div className="section-head">
            <span className="section-subtitle">{t.servicesSubtitle}</span>
            <h2 className="section-title">{t.servicesTitle}</h2>
            <p className="section-desc">{t.servicesDesc}</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <span className="service-icon"><i className="devicon-nextjs-plain"></i></span>
              <span className="service-title" dangerouslySetInnerHTML={{ __html: t.service1.replace(' ', '<br/>') }}></span>
            </div>
            <div className="service-card">
              <span className="service-icon"><i className="devicon-react-original"></i></span>
              <span className="service-title" dangerouslySetInnerHTML={{ __html: t.service2.replace(' ', '<br/>') }}></span>
            </div>
            <div className="service-card">
              <span className="service-icon"><i className="devicon-python-plain"></i></span>
              <span className="service-title" dangerouslySetInnerHTML={{ __html: t.service3.replace(' ', '<br/>') }}></span>
            </div>
            <div className="service-card">
              <span className="service-icon"><i className="devicon-figma-plain"></i></span>
              <span className="service-title" dangerouslySetInnerHTML={{ __html: t.service4.replace(' ', '<br/>') }}></span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <a href="#contact" className="btn btn-outline-gold">{t.btnBuyService}</a>
          </div>
        </section>

        {/* PORTFOLIOS SECTION */}
        <section id="portfolios" className="section">
          <div className="section-head">
            <span className="section-subtitle">{t.portfolioSubtitle}</span>
            <h2 className="section-title">{t.portfolioTitle}</h2>
            <p className="section-desc">{t.portfolioDesc}</p>
            <div className="section-divider"></div>
          </div>

          <div className="portfolio-grid">
            {/* Project 1 */}
            <div className="portfolio-card">
              <div className="portfolio-image">📊</div>
              <div className="portfolio-info">
                <h3 className="portfolio-title">{t.proj1Title}</h3>
                <p className="portfolio-desc">{t.proj1Desc}</p>
                <a href="https://github.com/SebastianBolivar01/dashboard" target="_blank" className="portfolio-link">{t.sourceCode}</a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="portfolio-card">
              <div className="portfolio-image">🎵</div>
              <div className="portfolio-info">
                <h3 className="portfolio-title">{t.proj2Title}</h3>
                <p className="portfolio-desc">{t.proj2Desc}</p>
                <a href="https://github.com/SebastianBolivar01/Reproductor-Musica" target="_blank" className="portfolio-link">{t.sourceCode}</a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="portfolio-card">
              <div className="portfolio-image">⚔️</div>
              <div className="portfolio-info">
                <h3 className="portfolio-title">{t.proj3Title}</h3>
                <p className="portfolio-desc">{t.proj3Desc}</p>
                <a href="https://github.com/SebastianBolivar01/patron-decorator" target="_blank" className="portfolio-link">{t.sourceCode}</a>
              </div>
            </div>

            {/* Project 4 */}
            <div className="portfolio-card">
              <div className="portfolio-image">💳</div>
              <div className="portfolio-info">
                <h3 className="portfolio-title">{t.proj4Title}</h3>
                <p className="portfolio-desc">{t.proj4Desc}</p>
                <a href="https://github.com/SebastianBolivar01/checkout" target="_blank" className="portfolio-link">{t.sourceCode}</a>
              </div>
            </div>

            {/* Project 5 */}
            <div className="portfolio-card">
              <div className="portfolio-image">🚀</div>
              <div className="portfolio-info">
                <h3 className="portfolio-title">{t.proj5Title}</h3>
                <p className="portfolio-desc">{t.proj5Desc}</p>
                <a href="https://github.com/SebastianBolivar01/landing_page" target="_blank" className="portfolio-link">{t.sourceCode}</a>
              </div>
            </div>

            {/* Project 6 */}
            <div className="portfolio-card">
              <div className="portfolio-image">🐍</div>
              <div className="portfolio-info">
                <h3 className="portfolio-title">{t.proj6Title}</h3>
                <p className="portfolio-desc">{t.proj6Desc}</p>
                <a href="https://github.com/SebastianBolivar01/ejercicioDjango" target="_blank" className="portfolio-link">{t.sourceCode}</a>
              </div>
            </div>
          </div>
          <div className="section-divider"></div>
        </section>

        {/* FREELANCE SECTION */}
        <section id="freelance" className="section-dark">
          <div className="section-head">
            <span className="section-subtitle">{t.freelanceSubtitle}</span>
            <h2 className="section-title">{t.freelanceTitle}</h2>
            <p className="section-desc">{t.freelanceDesc}</p>
          </div>

          <div className="freelance-bars">
            <div className="freelance-item">
              <h3 className="freelance-title">FIVERR</h3>
              <a href="#contact" className="btn btn-outline-gold">{t.btnHireMe}</a>
            </div>
            <div className="freelance-item">
              <h3 className="freelance-title">UPWORK</h3>
              <a href="#contact" className="btn btn-outline-gold">{t.btnHireMe}</a>
            </div>
            <div className="freelance-item">
              <h3 className="freelance-title">GURU</h3>
              <a href="#contact" className="btn btn-outline-gold">{t.btnHireMe}</a>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section">
          <div className="section-head">
            <span className="section-subtitle">{t.contactSubtitle}</span>
            <h2 className="section-title">{t.contactTitle}</h2>
            <p className="section-desc">{t.contactDesc2}</p>
          </div>

          <div className="contact-grid">
            <a href="tel:+573000000000" className="contact-item">
              <span className="contact-icon">📞</span>
              +57 300 000 0000, +57 301 000 0000
            </a>
            <a href="mailto:tu@email.com" className="contact-item">
              <span className="contact-icon">✉️</span>
              tu@email.business@gmail.com
            </a>
            <a href="https://linkedin.com/in/tu-usuario" target="_blank" className="contact-item">
              <span className="contact-icon">🌐</span>
              www.linkedin.com/in/sebastian
            </a>
            <a href="https://github.com/SebastianBolivar01" target="_blank" className="contact-item">
              <span className="contact-icon">💻</span>
              www.github.com/SebastianBolivar01
            </a>
          </div>
        </section>
      </main>

      <footer>
        {t.footerText}
      </footer>
    </>
  );
}
