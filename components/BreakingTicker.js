import { useEffect, useState } from 'react';

const headlines = [
  "PM visits Gujarat",
  "ISRO's Gaganyaan enters Phase 2",
  "Budget 2025 update released",
  "AI tools shaping journalism"
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