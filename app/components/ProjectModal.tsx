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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-zoom-in" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={project.image} alt={project.title} className="modal-image" />
            <div className="modal-image-overlay"></div>
          </div>

          <div className="modal-info">
            <div className="modal-header">
              <h2 className="modal-title">{project.title}</h2>
              <div className="modal-tags">
                {project.tags?.map(tag => (
                  <span key={tag} className="tag-badge">{tag}</span>
                ))}
              </div>
            </div>

            <p className="modal-desc-main">{project.desc}</p>

            <div className="modal-details">
              <div className="detail-section">
                <h4>🚀 The Challenge</h4>
                <p>{project.challenge || "Building a high-performance, scalable application with a focus on modern user experience and clean code architecture."}</p>
              </div>

              <div className="detail-section">
                <h4>💡 The Solution</h4>
                <p>{project.solution || "Implemented a robust architecture using React/Next.js, optimized for speed and SEO, ensuring seamless integration and responsiveness."}</p>
              </div>
            </div>

            <div className="modal-actions">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold">
                View Repository
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.92);
          backdrop-filter: blur(10px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-content {
          background: var(--bg-secondary);
          width: 100%;
          max-width: 1000px;
          max-height: 90vh;
          border-radius: 24px;
          border: 1px solid var(--card-border);
          position: relative;
          overflow-y: auto;
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          transition: 0.3s;
        }

        .modal-close:hover {
          background: var(--accent-primary);
          color: black;
          transform: rotate(90deg);
        }

        .modal-body {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
        }

        .modal-image-container {
          position: relative;
          height: 100%;
          min-height: 400px;
        }

        .modal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent, var(--bg-secondary));
        }

        .modal-info {
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .modal-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--accent-primary);
          margin-bottom: 12px;
        }

        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag-badge {
          font-size: 0.7rem;
          background: rgba(245, 199, 30, 0.1);
          color: var(--accent-primary);
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(245, 199, 30, 0.2);
          font-weight: 700;
          text-transform: uppercase;
        }

        .modal-desc-main {
          font-size: 1.1rem;
          color: var(--text-primary);
          line-height: 1.6;
        }

        .modal-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-section h4 {
          color: var(--accent-primary);
          font-size: 0.9rem;
          margin-bottom: 8px;
          letter-spacing: 1px;
        }

        .detail-section p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .modal-actions {
          margin-top: 10px;
          display: flex;
          gap: 16px;
        }

        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-zoom-in {
          animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (max-width: 900px) {
          .modal-body { grid-template-columns: 1fr; }
          .modal-image-container { min-height: 250px; }
          .modal-image-overlay {
            background: linear-gradient(to bottom, transparent, var(--bg-secondary));
          }
          .modal-info { padding: 30px; }
        }
      `}</style>
    </div>,
    modalRoot
  );
}
