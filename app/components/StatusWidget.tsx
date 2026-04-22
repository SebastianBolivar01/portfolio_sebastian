"use client";

import React, { useState, useEffect } from "react";

export default function StatusWidget() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const bogotaTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Bogota",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());
      setTime(bogotaTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex flex-col sm:flex-row items-center sm:items-center gap-3 bg-bg-secondary border border-white/8 px-4 py-2 rounded-2xl sm:rounded-full text-[0.75rem] font-semibold text-text-secondary shadow-[0_4px_15px_rgba(0,0,0,0.1)] backdrop-blur-[5px] animate-fade-in">
      <div className="flex items-center gap-1.5">
        <span className="text-[0.9rem]">🇨🇴</span>
        <span>Based in Colombia</span>
      </div>
      <div className="hidden sm:block w-[1px] h-3.5 bg-white/8"></div>
      <div className="flex items-center gap-1.5">
        <span className="text-[0.9rem]">🕒</span>
        <span>{time}</span>
      </div>
      <div className="hidden sm:block w-[1px] h-3.5 bg-white/8"></div>
      <div className="flex items-center gap-1.5">
        <span className="relative w-2 h-2 bg-[#4ade80] rounded-full">
          <span className="absolute inset-0 bg-[#4ade80] rounded-full animate-ping opacity-75"></span>
        </span>
        <span>Available for Projects</span>
      </div>
    </div>
  );
}

