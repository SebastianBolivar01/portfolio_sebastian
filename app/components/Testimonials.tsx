"use client";

import { useState } from "react";
import { Testimonial } from "../types";

interface TestimonialsProps {
  t: any;
}

export default function Testimonials({ t }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = t.testimonials[activeIndex] as Testimonial;

  return (
    <section id="testimonials" className="section-dark">
      <div className="section-head">
        <span className="section-subtitle">{t.testimonialSubtitle}</span>
      </div>

      <div className="testimonials-container container">
        <div className="testimonials-grid">
          
          {/* Featured Testimonial (Left) */}
          <div className="testimonial-featured">
            <div className="testimonial-featured-card animate-fade-in-up">
              <div className="card-ornament top-left"></div>
              <div className="card-ornament bottom-right"></div>
              
              <div className="testimonial-featured-header">
                <div className="star-rating">
                  {[...Array(active.rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <div className="quote-icon-large">”</div>
              </div>

              <p className="testimonial-main-text">
                “{active.text}”
              </p>

              <div className="testimonial-author">
                <div className="author-avatar-box">
                  <img src={active.avatar} alt={active.author} className="author-avatar" />
                  <div className="avatar-border"></div>
                </div>
                <div className="author-info">
                  <h3 className="author-name">{active.author}</h3>
                  <p className="author-role">{active.role}</p>
                  <p className="author-location">{active.location}</p>
                </div>
              </div>
            </div>

            {/* Pagination Controls (Bottom Left) */}
            <div className="testimonials-controls">
               <div className="controls-arrows">
                  <button 
                    className="control-btn" 
                    onClick={() => setActiveIndex((prev) => (prev === 0 ? t.testimonials.length - 1 : prev - 1))}
                  >
                    ‹
                  </button>
                  <div className="controls-dots">
                    {t.testimonials.map((_: any, idx: number) => (
                      <span 
                        key={idx} 
                        className={`dot ${idx === activeIndex ? "active" : ""}`}
                        onClick={() => setActiveIndex(idx)}
                      ></span>
                    ))}
                  </div>
                  <button 
                    className="control-btn"
                    onClick={() => setActiveIndex((prev) => (prev === t.testimonials.length - 1 ? 0 : prev + 1))}
                  >
                    ›
                  </button>
               </div>
            </div>
          </div>

          {/* Side Testimonials (Right) */}
          <div className="testimonials-side-list">
            {t.testimonials.map((item: Testimonial, idx: number) => (
              <div 
                key={idx} 
                className={`testimonial-side-card ${idx === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="side-card-author">
                  <div className="side-avatar-box">
                     <span className="side-avatar-icon">👤</span>
                  </div>
                  <div className="side-info">
                    <h4 className="side-name">{item.author}</h4>
                    <p className="side-location">{item.location}</p>
                  </div>
                </div>
                <p className="side-preview">
                  “{item.text.substring(0, 80)}...”
                </p>
                {idx === activeIndex && <div className="side-card-indicator"></div>}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
