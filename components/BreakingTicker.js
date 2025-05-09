import { useEffect, useState } from 'react';

const breakingNews = [
  "🚨 Gujarat Budget 2025 to focus on AI education reforms.",
  "📢 PM announces Digital Bharat 2.0 expansion in 3 languages.",
  "🗳️ Election buzz: Major rallies happening across UP, Gujarat.",
  "🧠 News Pulse now ranked in Top 10 AI-powered news platforms!"
];

export default function BreakingTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % breakingNews.length);
    }, 4000); // rotates every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-600 text-white py-2 px-4 overflow-hidden font-semibold text-sm sm:text-base flex items-center space-x-2">
      <span className="animate-pulse">🔴</span>
      <span className="whitespace-nowrap overflow-hidden">
        {breakingNews[index]}
      </span>
    </div>
  );
}