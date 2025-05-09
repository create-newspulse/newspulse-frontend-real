import { useEffect, useState } from 'react';

const headlines = [
  "🚀 ISRO's Gaganyaan enters Phase 2 successfully",
  "🧠 News Pulse launches voice-powered AI anchor",
  "📊 Budget 2025: Focus on digital journalism & youth"
];

export default function BreakingTicker() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((i) => (i + 1) % headlines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white px-4 py-2 flex items-center space-x-3 overflow-x-auto whitespace-nowrap">
      <span className="text-red-500 animate-pulse">🔴 LIVE</span>
      <span>{headlines[current]}</span>
    </div>
  );
}
