"use client";

interface ContactProps {
  t: any;
}

export default function Contact({ t }: ContactProps) {
  const contactItems = [
    { icon: "📞", text: "+57 321 726 3018", link: "tel:+573217263018" },
    { icon: "✉️", text: "bolivarsebas9@gmail.com", link: "mailto:bolivarsebas9@gmail.com" },
    { icon: "🌐", text: "www.linkedin.com/in/sebastian", link: "https://linkedin.com/in/tu-usuario" },
    { icon: "💻", text: "www.github.com/SebastianBolivar01", link: "https://github.com/SebastianBolivar01" },
  ];

  return (
    <section id="contact" className="section">
      <div className="section-head">
        <span className="section-subtitle">{t.contactSubtitle}</span>
        <h2 className="section-title">{t.contactTitle}</h2>
        <p className="section-desc">{t.contactDesc2}</p>
      </div>

      <div className="contact-grid">
        {contactItems.map((item, idx) => (
          <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="contact-item">
            <span className="contact-icon">{item.icon}</span>
            {item.text}
          </a>
        ))}
      </div>
    </section>
  );
}
