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
        className={`fixed pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0"} ${isHovering ? "w-1 h-1 opacity-50" : "w-2 h-2"}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`fixed pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 cubic-bezier(0.23, 1, 0.32, 1) mix-blend-screen dark:mix-blend-screen light:mix-blend-multiply light:opacity-30 ${isVisible ? "opacity-100" : "opacity-0"} ${isHovering ? "w-[450px] h-[450px]" : "w-[300px] h-[300px]"}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          background: `radial-gradient(circle, var(--aurora-glow) 0%, transparent ${isHovering ? '80%' : '70%'})`
        }}
      />
    </>
  );

}
