"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    image: string;
    title: string;
    desc: string;
    github: string;
    demo?: string;
    tags?: string[];
    challenge?: string;
    solution?: string;
  } | null;
  t: any;
}

export default function ProjectModal({ isOpen, onClose, project, t }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !project || !mounted) return null;

  const modalRoot = document.body;

  return createPortal(
    <div 
      className="fixed inset-0 w-screen h-screen bg-black/92 backdrop-blur-[10px] z-[99999] flex items-center justify-center p-5" 
      onClick={onClose}
    >
      <div 
        className="bg-bg-secondary w-full max-w-[1000px] max-h-[90vh] rounded-[24px] border border-white/8 relative overflow-y-auto shadow-[0_40px_100px_rgba(0,0,0,0.6)] animate-zoom-in" 
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="absolute top-5 right-5 bg-black/50 border border-white/10 text-white w-10 h-10 rounded-full cursor-pointer z-10 transition-all duration-300 hover:bg-accent hover:text-bg-matte hover:rotate-90" 
          onClick={onClose}
        >✕</button>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative h-full min-h-[250px] lg:min-h-[400px]">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent to-bg-secondary"></div>
          </div>

          <div className="p-8 lg:p-10 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-[2rem] font-extrabold text-accent leading-tight">{project.title}</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map(tag => (
                  <span key={tag} className="text-[0.7rem] bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20 font-bold uppercase tracking-wider">{tag}</span>
                ))}
              </div>
            </div>

            <p className="text-[1.1rem] text-text-primary leading-[1.6]">{project.desc}</p>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h4 className="text-accent text-[0.9rem] font-bold tracking-wider uppercase">🚀 The Challenge</h4>
                <p className="text-[0.9rem] text-text-secondary leading-[1.6]">{project.challenge || "Building a high-performance, scalable application with a focus on modern user experience and clean code architecture."}</p>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-accent text-[0.9rem] font-bold tracking-wider uppercase">💡 The Solution</h4>
                <p className="text-[0.9rem] text-text-secondary leading-[1.6]">{project.solution || "Implemented a robust architecture using React/Next.js, optimized for speed and SEO, ensuring seamless integration and responsiveness."}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-2">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block px-6 py-2.5 text-[0.8rem] font-semibold font-outfit tracking-wider uppercase transition-all duration-250 rounded-full border border-accent text-accent bg-transparent hover:bg-accent hover:text-bg-matte"
              >
                View Repository
              </a>
              {project.demo && (
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block px-6 py-2.5 text-[0.8rem] font-semibold font-outfit tracking-wider uppercase transition-all duration-250 rounded-full bg-accent text-bg-matte border border-accent hover:bg-transparent hover:text-accent"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
