"use client";

import { useState, useEffect } from 'react';
import { translations, Lang } from './i18n';

// app/page.tsx
export default function Portfolio() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLang = (localStorage.getItem('lang') as Lang) || 'en';
    setTheme(savedTheme);
    setLang(savedLang);
    document.documentElement.setAttribute('data-theme', savedTheme);
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
      <nav className="nav-header">
        <div className="nav-container">
          <a href="#" className="nav-logo">Seba<span>stian</span>.</a>
          <div className="nav-links">
            <a href="#about">{t.about}</a>
            <a href="#skills">{t.skills}</a>
            <a href="#projects">{t.projects}</a>
            <a href="#contact">{t.contact}</a>

            {mounted && (
              <>
                <select value={lang} onChange={handleLangChange} className="lang-select" aria-label="Change Language">
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                  <option value="it">IT</option>
                  <option value="pt">PT</option>
                </select>
                <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="container">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="dot"></span> {t.badge}
            </div>
            <h1 className="hero-title">
              {t.heroTitle} <br />
              <span className="name-highlight">{t.heroTitleHighlight}</span>
            </h1>
            <p className="hero-subtitle">
              {t.heroSubtitle}
            </p>
            <div className="btn-group">
              <a href="#projects" className="btn btn-primary">{t.viewProjects}</a>
              <a href="#contact" className="btn btn-outline">{t.getInTouch}</a>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="hero-image-glow"></div>
            <div className="hero-image-box" title="Place your image at /public/profile.jpg">
              {/* Note: Change the src value to '/profile.jpg' once you add your own image */}
              <img src="/profile.jpg" alt="Sebastian - Profile" />
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <h2 className="section-title">{t.aboutMe}</h2>

          <div className="stats-grid">
            <div className="glass-card stat-card">
              <div className="stat-value">5+</div>
              <div className="stat-label">{t.yearsExp}</div>
            </div>
            <div className="glass-card stat-card">
              <div className="stat-value">50+</div>
              <div className="stat-label">{t.projCompleted}</div>
            </div>
            <div className="glass-card stat-card">
              <div className="stat-value">2k+</div>
              <div className="stat-label">{t.codeCommits}</div>
            </div>
          </div>

          <div className="about-grid">
            <div className="about-text">
              <p>{t.aboutP1}</p>
              <p>{t.aboutP2}</p>
            </div>
            <div className="meta-cards">
              <div className="glass-card">
                <div className="meta-label">{t.location}</div>
                <div className="meta-value">San Francisco, CA</div>
              </div>
              <div className="glass-card">
                <div className="meta-label">{t.currentStatus}</div>
                <div className="meta-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
                  {t.takingProjects}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <h2 className="section-title">{t.techArsenal}</h2>
          <div className="skills-grid">
            <div className="glass-card skill-item"><i className="devicon-react-original colored skill-icon"></i><span className="skill-name">React</span></div>
            <div className="glass-card skill-item"><i className="devicon-typescript-plain colored skill-icon"></i><span className="skill-name">TypeScript</span></div>
            <div className="glass-card skill-item"><i className="devicon-nodejs-plain colored skill-icon"></i><span className="skill-name">Node.js</span></div>
            <div className="glass-card skill-item"><i className="devicon-python-plain colored skill-icon"></i><span className="skill-name">Python</span></div>
            <div className="glass-card skill-item"><i className="devicon-docker-plain colored skill-icon"></i><span className="skill-name">Docker</span></div>
            <div className="glass-card skill-item"><i className="devicon-amazonwebservices-original colored skill-icon"></i><span className="skill-name">AWS</span></div>
            <div className="glass-card skill-item"><i className="devicon-mongodb-plain colored skill-icon"></i><span className="skill-name">MongoDB</span></div>
            <div className="glass-card skill-item"><i className="devicon-graphql-plain colored skill-icon"></i><span className="skill-name">GraphQL</span></div>
            <div className="glass-card skill-item"><i className="devicon-nextjs-plain skill-icon" style={{ filter: theme === 'dark' ? 'invert(1)' : 'invert(0)' }}></i><span className="skill-name">Next.js</span></div>
            <div className="glass-card skill-item"><i className="devicon-tailwindcss-plain colored skill-icon"></i><span className="skill-name">Tailwind</span></div>
            <div className="glass-card skill-item"><i className="devicon-firebase-plain colored skill-icon"></i><span className="skill-name">Firebase</span></div>
            <div className="glass-card skill-item"><i className="devicon-git-plain colored skill-icon"></i><span className="skill-name">Git</span></div>
          </div>
        </section>

        <section id="projects" className="section">
          <h2 className="section-title">{t.featuredWork}</h2>
          <div className="projects-grid">
            <div className="glass-card project-card">
              <div className="project-image-wrapper"><span className="project-emoji">📊</span></div>
              <div className="project-body">
                <h3 className="project-title">{t.proj1Title}</h3>
                <p className="project-desc">{t.proj1Desc}</p>
                <div className="project-tags"><span>React</span><span>UI</span><span>Data</span></div>
                <div className="project-actions">
                  <a href="https://github.com/SebastianBolivar01/dashboard" target="_blank" className="btn-primary-sm" style={{flex: '1'}}>{t.sourceCode}</a>
                </div>
              </div>
            </div>

            <div className="glass-card project-card">
              <div className="project-image-wrapper"><span className="project-emoji">🎵</span></div>
              <div className="project-body">
                <h3 className="project-title">{t.proj2Title}</h3>
                <p className="project-desc">{t.proj2Desc}</p>
                <div className="project-tags"><span>JavaScript</span><span>HTML</span><span>CSS</span></div>
                <div className="project-actions">
                  <a href="https://github.com/SebastianBolivar01/Reproductor-Musica" target="_blank" className="btn-primary-sm" style={{flex: '1'}}>{t.sourceCode}</a>
                </div>
              </div>
            </div>

            <div className="glass-card project-card">
              <div className="project-image-wrapper"><span className="project-emoji">⚔️</span></div>
              <div className="project-body">
                <h3 className="project-title">{t.proj3Title}</h3>
                <p className="project-desc">{t.proj3Desc}</p>
                <div className="project-tags"><span>Design Patterns</span><span>Java</span><span>OOP</span></div>
                <div className="project-actions">
                  <a href="https://github.com/SebastianBolivar01/patron-decorator" target="_blank" className="btn-primary-sm" style={{flex: '1'}}>{t.sourceCode}</a>
                </div>
              </div>
            </div>

            <div className="glass-card project-card">
              <div className="project-image-wrapper"><span className="project-emoji">💳</span></div>
              <div className="project-body">
                <h3 className="project-title">{t.proj4Title}</h3>
                <p className="project-desc">{t.proj4Desc}</p>
                <div className="project-tags"><span>React</span><span>Checkout</span><span>UX</span></div>
                <div className="project-actions">
                  <a href="https://github.com/SebastianBolivar01/checkout" target="_blank" className="btn-primary-sm" style={{flex: '1'}}>{t.sourceCode}</a>
                </div>
              </div>
            </div>
            
            <div className="glass-card project-card">
              <div className="project-image-wrapper"><span className="project-emoji">🚀</span></div>
              <div className="project-body">
                <h3 className="project-title">{t.proj5Title}</h3>
                <p className="project-desc">{t.proj5Desc}</p>
                <div className="project-tags"><span>HTML</span><span>CSS</span><span>JS</span></div>
                <div className="project-actions">
                  <a href="https://github.com/SebastianBolivar01/landing_page" target="_blank" className="btn-primary-sm" style={{flex: '1'}}>{t.sourceCode}</a>
                </div>
              </div>
            </div>

            <div className="glass-card project-card">
              <div className="project-image-wrapper"><span className="project-emoji">🐍</span></div>
              <div className="project-body">
                <h3 className="project-title">{t.proj6Title}</h3>
                <p className="project-desc">{t.proj6Desc}</p>
                <div className="project-tags"><span>Python</span><span>Django</span><span>SQLite</span></div>
                <div className="project-actions">
                  <a href="https://github.com/SebastianBolivar01/ejercicioDjango" target="_blank" className="btn-primary-sm" style={{flex: '1'}}>{t.sourceCode}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h2>{t.readyToBuild}</h2>
          <p>{t.contactDesc}</p>
          <a href="mailto:tu@email.com" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>{t.getInTouch}</a>

          <div className="social-links">
            <a href="https://github.com/tu-usuario" target="_blank" className="social-circle" title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
            </a>
            <a href="https://linkedin.com/in/tu-usuario" target="_blank" className="social-circle" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a href="mailto:tu@email.com" className="social-circle" title="Email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></svg>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>{t.footerText}</p>
        </div>
      </footer>
    </>
  );
}
