import { useEffect, useState } from 'react';

const headlines = [
  "🗞️ Budget 2025 highlights: Gujarat leads in solar push",
  "🧠 AI Anchor teaser launches soon on News Pulse",
  "🌐 Multilingual interface now live — EN, HI, GU",
  "📱 News Pulse App announced for Android & iOS"
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
    <div className="bg-black text-white text-sm sm:text-base px-4 py-2 flex items-center space-x-3 overflow-x-auto whitespace-nowrap">
      <span className="text-red-500 animate-pulse">🔴 LIVE</span>
      <span>{headlines[current]}</span>
    </div>
  );
}