"use client";

interface ServiceCardProps {
  icon: string;
  title: string;
}

export default function ServiceCard({ icon, title }: ServiceCardProps) {
  return (
    <div className="service-card">
      <span className="service-icon"><i className={icon}></i></span>
      <span className="service-title" dangerouslySetInnerHTML={{ __html: title.replace(' ', '<br/>') }}></span>
    </div>
  );
}
