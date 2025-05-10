<header>
  <img src="/logo.png" alt="News Pulse Logo" className="logo" />
  <h1>News Pulse News Updates</h1>
</header>import Head from 'next/head';
import { useState, useEffect } from 'react';

// ✅ Voice Button Component
const VoiceButton = () => {
  const handleVoiceCommand = () => {
    alert("Voice system activated! 🎙️");
  };

  return (
    <button
      onClick={handleVoiceCommand}
      className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
    >
      🎙️ Voice Command
    </button>
  );
};

export default function Home() {
  const breakingNews = [
    "Global Summit Addresses Climate Crisis in Paris",
    "Tech Giant Unveils New AI Model at Conference",
    "Stock Markets Surge After Positive Economic Data",
  ];

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [language, setLanguage] = useState('en');
  const [taglineIndex, setTaglineIndex] = useState(0);

  const taglines = {
    en: [
      "Your pulse on what matters most.",
      "News that connects hearts.",
      "Stay updated. Stay ahead.",
    ],
    hi: [
      "ख़बरें जो दिलों को जोड़ती हैं।",
      "जो मायने रखे वही न्यूज़ पल्स।",
      "देश-दुनिया की हर धड़कन।",
    ],
    gu: [
      "સમાચાર જે દિલોને જોડે છે.",
      "તમે જાણો છો એ પહેલાં જાણો.",
      "હૃદય સ્પર્શતા સમાચાર, અહીં છે.",
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines[language].length);
    }, 5000);
    return () => clearInterval(interval);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) =>
      prev === 'en' ? 'hi' : prev === 'hi' ? 'gu' : 'en'
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>News Pulse</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* 🔷 Royal Blue Header */}
      <header className="bg-gradient-to-r from-[#004AAD] to-[#2980B9] text-white py-10 text-center shadow-md">
        <h1 className="text-5xl font-bold tracking-tight animate-pulse-on-load">
          News Pulse
        </h1>
        <p className="mt-4 text-lg italic animate-pulse-on-load">
          {taglines[language][taglineIndex]}
        </p>

        <div className="mt-4 flex justify-center gap-6">
          <VoiceButton />
          <button
            onClick={toggleLanguage}
            className="underline text-white text-sm"
          >
            🌐 Switch Language ({language.toUpperCase()})
          </button>
        </div>
      </header>

      {/* 🔴 Breaking News Bar */}
      <div className="bg-red-600 text-white text-sm py-2 overflow-hidden whitespace-nowrap">
        <span className="px-4 font-semibold">
          🔴 Breaking: {breakingNews[currentNewsIndex]}
        </span>
      </div>

      {/* 📰 Placeholder Cards */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Top Headlines</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded shadow-md p-5">
            <h3 className="text-lg font-bold mb-2">Headline One</h3>
            <p className="text-gray-600">Quick summary of the top news headline.</p>
          </div>
          <div className="bg-white rounded shadow-md p-5">
            <h3 className="text-lg font-bold mb-2">Headline Two</h3>
            <p className="text-gray-600">Brief info about the breaking news.</p>
          </div>
          <div className="bg-white rounded shadow-md p-5">
            <h3 className="text-lg font-bold mb-2">Headline Three</h3>
            <p className="text-gray-600">Short highlight from the latest updates.</p>
          </div>
        </div>
      </main>

      {/* 🔻 Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>© 2025 News Pulse. All rights reserved.</p>
      </footer>
    </div>
  );
}
