"use client";

interface FreelanceProps {
  t: any;
}

export default function Freelance({ t }: FreelanceProps) {
  const platforms = [
    { title: "FIVERR" },
    { title: "UPWORK" },
    { title: "GURU" },
  ];

  return (
    <section id="freelance" className="section-dark">
      <div className="section-head">
        <span className="section-subtitle">{t.freelanceSubtitle}</span>
        <h2 className="section-title">{t.freelanceTitle}</h2>
        <p className="section-desc">{t.freelanceDesc}</p>
      </div>

      <div className="freelance-bars">
        {platforms.map((platform, idx) => (
          <div key={idx} className="freelance-item">
            <h3 className="freelance-title">{platform.title}</h3>
            <a href="#contact" className="btn btn-outline-gold">{t.btnHireMe}</a>
          </div>
        ))}
      </div>
    </section>
  );
}
