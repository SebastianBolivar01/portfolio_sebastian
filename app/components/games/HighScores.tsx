"use client";

import React, { useState, useEffect } from "react";

interface ScoreEntry {
  name: string;
  score: number;
  date: string;
}

interface HighScoresProps {
  gameId: string;
  currentScore?: number;
  onSave?: (name: string) => void;
}

export default function HighScores({ gameId, currentScore, onSave }: HighScoresProps) {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [name, setName] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`highscores_${gameId}`);
    if (saved) {
      setScores(JSON.parse(saved));
    }
  }, [gameId]);

  const saveScore = () => {
    if (!name.trim() || currentScore === undefined) return;

    const newEntry: ScoreEntry = {
      name: name.trim(),
      score: currentScore,
      date: new Date().toLocaleDateString()
    };

    const newScores = [...scores, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setScores(newScores);
    localStorage.setItem(`highscores_${gameId}`, JSON.stringify(newScores));
    setIsSaved(true);
    if (onSave) onSave(name.trim());
  };

  return (
    <div className="highscores-container">
      <h3 className="arcade-title">🏆 HALL OF FAME 🏆</h3>
      
      <div className="scores-list">
        {scores.length > 0 ? (
          scores.map((s, idx) => (
            <div key={idx} className="score-item">
              <span className="score-rank">#{idx + 1}</span>
              <span className="score-name">{s.name}</span>
              <span className="score-val">{s.score}</span>
            </div>
          ))
        ) : (
          <p className="no-scores">No champions yet...</p>
        )}
      </div>

      {currentScore !== undefined && !isSaved && currentScore > 0 && (
        <div className="save-score-box">
          <p className="your-score">Your Score: {currentScore}</p>
          <div className="input-group">
            <input 
              type="text" 
              maxLength={10} 
              placeholder="YOUR NAME" 
              value={name}
              onChange={e => setName(e.target.value.toUpperCase())}
            />
            <button onClick={saveScore}>SAVE</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .highscores-container {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid var(--accent-primary);
          padding: 20px;
          border-radius: 12px;
          font-family: 'Courier New', Courier, monospace;
          color: var(--accent-primary);
          min-width: 300px;
          box-shadow: 0 0 20px rgba(245, 199, 30, 0.3);
        }

        .arcade-title {
          text-align: center;
          font-size: 1.2rem;
          margin-bottom: 20px;
          text-shadow: 0 0 10px var(--accent-primary);
        }

        .scores-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .score-item {
          display: flex;
          justify-content: space-between;
          padding: 8px;
          border-bottom: 1px dashed rgba(245, 199, 30, 0.3);
        }

        .score-rank { width: 30px; opacity: 0.7; }
        .score-name { flex: 1; font-weight: bold; }
        .score-val { color: #fff; text-shadow: 0 0 5px #fff; }

        .no-scores { text-align: center; font-style: italic; opacity: 0.5; }

        .save-score-box {
          border-top: 2px solid var(--accent-primary);
          padding-top: 15px;
          text-align: center;
        }

        .your-score { font-size: 1.1rem; margin-bottom: 10px; color: #fff; }

        .input-group {
          display: flex;
          gap: 10px;
        }

        input {
          flex: 1;
          background: #000;
          border: 1px solid var(--accent-primary);
          color: var(--accent-primary);
          padding: 8px;
          outline: none;
          text-align: center;
        }

        button {
          background: var(--accent-primary);
          color: #000;
          border: none;
          padding: 8px 15px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.2s;
        }

        button:hover {
          filter: brightness(1.2);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
