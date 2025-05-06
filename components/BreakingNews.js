import { useEffect, useState } from 'react';

export default function BreakingTicker() {
  const [headlines, setHeadlines] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // ✅ Fetch static or API-based headlines
    const data = [
      "AI now driving newsrooms faster than ever.",
      "New education bill passed in Parliament.",
      "Stock market hits all-time high today.",
      "Cyclone warning issued in coastal areas.",
      "Top scientists win global innovation award."
    ];
    setHeadlines(data);

    // ✅ Auto-scroll headlines every 4 seconds
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-600 text-white py-3 px-6 shadow-md overflow-hidden">
      <div className="animate-marquee whitespace-nowrap text-sm font-medium">
        🔴 Breaking: {headlines[index]}
      </div>
    </div>
  );
}
