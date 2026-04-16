"use client";

interface AboutProps {
  t: any;
}

export default function About({ t }: AboutProps) {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-wrapper">
          <div className="about-image-side animate-fade-in-up">
            <div className="about-img-box">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop" 
                alt="Workspace" 
              />
              <div className="about-img-deco"></div>
            </div>
          </div>
          
          <div className="about-content animate-fade-in-up delay-1">
            <span className="section-subtitle">{t.aboutSubtitle}</span>
            <h2 className="section-title">{t.aboutTitle}</h2>
            <p className="about-text p-highlight">
              {t.aboutDesc1}
            </p>
            <p className="about-text">
              {t.aboutDesc2}
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-num">50+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">3+</span>
                <span className="stat-label">Years</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
