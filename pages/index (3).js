import BreakingTicker from '../components/BreakingTicker';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const taglines = [
  "News that connects hearts.",
  "ख़बरें जो दिलों को जोड़ती हैं।",
  "સમાચાર જે દિલોને જોડે છે।"
];

export default function HomePage() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen p-4 bg-gray-100 text-center font-sans">
      <BreakingTicker />

      <div className="mt-10">
        <h1 className="text-4xl font-bold text-green-700">🟢 Welcome to News Pulse</h1>
        <p className="mt-4 text-xl text-gray-700 animate-fade-in">
          🗣️ {taglines[taglineIndex]}
        </p>
      </div>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <Link href="/gujarat" className="bg-green-100 hover:bg-green-200 p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-green-800">🟢 Gujarati News</h2>
          <p className="text-sm mt-2">Explore headlines in Gujarati</p>
        </Link>
        <Link href="/india" className="bg-orange-100 hover:bg-orange-200 p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-orange-800">🔶 Hindi News</h2>
          <p className="text-sm mt-2">Explore headlines in Hindi</p>
        </Link>
        <Link href="/international" className="bg-blue-100 hover:bg-blue-200 p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-blue-800">🔵 English News</h2>
          <p className="text-sm mt-2">Explore headlines in English</p>
        </Link>
      </section>

      <footer className="mt-20 text-sm text-gray-500">
        © 2025 News Pulse · Powered by AI · Multilingual · Voice-ready
      </footer>
    </main>
  );
}