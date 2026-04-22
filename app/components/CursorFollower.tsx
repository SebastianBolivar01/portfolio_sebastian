"use client";

import { useEffect, useState } from "react";

export default function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button, select, input, .portfolio-clickable-item"));
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      <div 
        className={`cursor-dot ${isVisible ? "visible" : ""} ${isHovering ? "hover" : ""}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`cursor-aurora ${isVisible ? "visible" : ""} ${isHovering ? "hover" : ""}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />

      <style jsx global>{`
        .cursor-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-primary);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 10001;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, opacity 0.3s;
          opacity: 0;
        }

        .cursor-dot.visible { opacity: 1; }
        .cursor-dot.hover { width: 4px; height: 4px; opacity: 0.5; }

        .cursor-aurora {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, var(--aurora-glow) 0%, transparent 70%);
          position: fixed;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
          transition: transform 0.15s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s, width 0.5s, height 0.5s;
          opacity: 0;
          mix-blend-mode: screen;
        }

        .cursor-aurora.visible { opacity: 1; }
        .cursor-aurora.hover {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, var(--aurora-glow) 0%, transparent 80%);
        }

        [data-theme="light"] .cursor-aurora {
          mix-blend-mode: multiply;
          opacity: 0.3;
        }
      `}</style>
    </>
  );
}
