"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-10 right-10 w-[50px] h-[50px] rounded-full bg-accent text-bg-matte border-none cursor-pointer flex items-center justify-center text-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-[1000] transition-transform duration-300 hover:scale-110"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
