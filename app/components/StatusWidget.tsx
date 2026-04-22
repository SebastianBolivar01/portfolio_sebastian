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
    <div className="status-widget animate-fade-in">
      <div className="status-location">
        <span className="flag">🇨🇴</span>
        <span>Based in Colombia</span>
      </div>
      <div className="status-divider"></div>
      <div className="status-time">
        <span className="clock-icon">🕒</span>
        <span>{time}</span>
      </div>
      <div className="status-divider"></div>
      <div className="status-availability">
        <span className="pulse-dot"></span>
        <span>Available for Projects</span>
      </div>

      <style jsx>{`
        .status-widget {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--card-border);
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          backdrop-filter: blur(5px);
        }

        .status-location, .status-time, .status-availability {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-divider {
          width: 1px;
          height: 14px;
          background: var(--card-border);
        }

        .flag, .clock-icon {
          font-size: 0.9rem;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          position: relative;
        }

        .pulse-dot::after {
          content: "";
          position: absolute;
          inset: 0;
          background: #4ade80;
          border-radius: 50%;
          animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.7); opacity: 0.5; }
          80%, 100% { transform: scale(2.5); opacity: 0; }
        }

        @media (max-width: 600px) {
          .status-widget {
            flex-direction: column;
            border-radius: 16px;
            padding: 12px;
            align-items: flex-start;
          }
          .status-divider { display: none; }
        }
      `}</style>
    </div>
  );
}
