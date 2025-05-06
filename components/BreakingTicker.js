// components/BreakingTicker.js
import { useEffect, useState } from 'react';

export default function BreakingTicker() {
  const [headlines, setHeadlines] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const data = [
      "AI now driving newsrooms faster than ever.",
      "New education bill passed in Parliament.",
      "Stock market hits all-time high today.",
      "Cyclone warning issued in coastal areas.",
      "Top scientists win global innovation award."
    ];
    setHeadlines(data);

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-600 text-white py-2 px-4 overflow-hidden whitespace-nowrap font-semibold text-sm shadow-md animate-fade-in">
      🔴 {headlines[index]}
    </div>
  );
}
