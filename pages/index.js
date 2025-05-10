import { useEffect, useState } from 'react';
import BreakingTicker from '../components/BreakingTicker';
import VoiceButton from '../components/VoiceButton';
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
      <div className="bg-gradient-to-r from-[#004AAD] to-[#2980B9] text-white text-center py-8 shadow-md">
        <h1 className="text-4xl font-bold tracking-tight">News Pulse</h1>
        <p className="mt-2 text-lg italic">{taglines[taglineIndex]}</p>
      </div>
      
      <BreakingTicker />

      <section className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 px-6">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white border border-gray-200 p-4 rounded shadow-sm text-center hover:shadow-md transition">
            <div className="text-3xl">{cat.icon}</div>
            <h2 className="text-base mt-2 font-semibold">{cat.name}</h2>
          </div>
        ))}
      </section>

      <div className="fixed bottom-4 right-4">
        <VoiceButton />
      </div>
    </main>
  );
}
