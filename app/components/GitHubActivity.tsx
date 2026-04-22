"use client";

import React, { useEffect, useState } from "react";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: {
    commits?: { message: string }[];
    action?: string;
  };
  created_at: string;
}

export default function GitHubActivity({ t }: { t: any }) {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubActivity = async () => {
      try {
        const response = await fetch("https://api.github.com/users/SebastianBolivar01/events/public?per_page=5");
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching GitHub activity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubActivity();
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "PushEvent": return "🚀";
      case "CreateEvent": return "🆕";
      case "WatchEvent": return "⭐";
      case "PullRequestEvent": return "🔀";
      default: return "💻";
    }
  };

  const getEventText = (event: GitHubEvent) => {
    const repoName = event.repo.name.split("/")[1] || event.repo.name;
    switch (event.type) {
      case "PushEvent":
        return `Pushed ${event.payload.commits?.length || 0} commit(s) to ${repoName}`;
      case "CreateEvent":
        return `Created ${repoName}`;
      case "WatchEvent":
        return `Starred ${repoName}`;
      case "PullRequestEvent":
        return `${event.payload.action === "opened" ? "Opened" : "Closed"} a PR in ${repoName}`;
      default:
        return `Activity in ${repoName}`;
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (loading) return (
    <div className="github-loading">
      <div className="spinner"></div>
    </div>
  );

  if (events.length === 0) return null;

  return (
    <section className="github-section">
      <div className="container">
        <div className="github-card animate-fade-in-up">
          <div className="github-header">
            <div className="github-title-group">
              <span className="github-pulse"></span>
              <h3 className="github-title">Live GitHub Activity</h3>
            </div>
            <a 
              href="https://github.com/SebastianBolivar01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-profile-link"
            >
              @SebastianBolivar01 ↗
            </a>
          </div>

          <div className="github-events">
            {events.map((event) => (
              <div key={event.id} className="github-event-item">
                <div className="github-event-icon">{getEventIcon(event.type)}</div>
                <div className="github-event-info">
                  <p className="github-event-text">{getEventText(event)}</p>
                  <span className="github-event-time">{formatTime(event.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .github-section {
          padding: 60px 0;
        }

        .github-card {
          background: var(--bg-secondary);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 30px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        .github-card::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, var(--aurora-glow) 0%, transparent 70%);
          pointer-events: none;
          opacity: 0.5;
        }

        .github-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          position: relative;
          z-index: 2;
        }

        .github-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .github-pulse {
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          box-shadow: 0 0 10px #4ade80;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        .github-title {
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: var(--text-primary);
          margin: 0;
        }

        .github-profile-link {
          font-size: 0.85rem;
          color: var(--accent-primary);
          text-decoration: none;
          font-weight: 600;
          transition: 0.3s;
        }

        .github-profile-link:hover {
          opacity: 0.8;
          transform: translateX(3px);
        }

        .github-events {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          position: relative;
          z-index: 2;
        }

        .github-event-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: var(--bg-color);
          border-radius: 12px;
          border: 1px solid var(--card-border);
          transition: 0.3s;
        }

        .github-event-item:hover {
          border-color: var(--accent-primary);
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .github-event-icon {
          font-size: 1.5rem;
          min-width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          border-radius: 10px;
        }

        .github-event-info {
          display: flex;
          flex-direction: column;
        }

        .github-event-text {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
          line-height: 1.3;
        }

        .github-event-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .github-loading {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spinner {
          width: 30px;
          height: 30px;
          border: 3px solid var(--card-border);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .github-events { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
