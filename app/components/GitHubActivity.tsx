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
    <div className="h-[200px] flex items-center justify-center">
      <div className="w-7.5 h-7.5 border-3 border-white/8 border-t-accent rounded-full animate-spin"></div>
    </div>
  );

  if (events.length === 0) return null;

  return (
    <section className="py-[60px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="relative bg-bg-secondary border border-white/8 rounded-[20px] p-8 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.2)] animate-fade-in-up">
          {/* Background Glow */}
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,var(--aurora-glow)_0%,transparent_70%)] pointer-events-none opacity-50"></div>
          
          <div className="flex justify-between items-center mb-8 relative z-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#4ade80] rounded-full shadow-[0_0_10px_#4ade80] animate-pulse"></span>
              <h3 className="text-[1.2rem] font-bold tracking-wider text-text-primary uppercase">Live GitHub Activity</h3>
            </div>
            <a 
              href="https://github.com/SebastianBolivar01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[0.85rem] text-accent font-semibold no-underline transition-all duration-300 hover:opacity-80 hover:translate-x-1"
            >
              @SebastianBolivar01 ↗
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 relative z-2">
            {events.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-4 bg-bg-matte rounded-xl border border-white/8 transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
                <div className="text-[1.5rem] min-w-[40px] h-10 flex items-center justify-center bg-bg-secondary rounded-lg">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex flex-col">
                  <p className="text-[0.85rem] font-bold text-text-primary mb-1 leading-tight">{getEventText(event)}</p>
                  <span className="text-[0.75rem] text-text-muted">{formatTime(event.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
