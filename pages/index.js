import { useEffect, useState } from 'react';

const taglines = [
  "Your pulse on what matters most.",
  "ख़बरें जो दिलों की धड़कन बनें।",
  "સમાચાર જે દિલને સ્પર્શે."
];

export default function HomePage() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header with Royal Blue Gradient */}
      <div className="bg-gradient-to-r from-[#004AAD] to-[#2980B9] text-white text-center py-10 shadow-md">
        <h1 className="text-4xl font-bold tracking-tight">News Pulse</h1>
        <p className="mt-4 text-lg italic">{taglines[taglineIndex]}</p>
      </div>
    </main>
  );
}
