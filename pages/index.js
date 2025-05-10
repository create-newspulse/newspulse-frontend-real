import Head from 'next/head';
import { useState, useEffect } from 'react';

// Simulated breaking news data
const breakingNews = [
  "Global Summit Addresses Climate Crisis in Paris",
  "Tech Giant Unveils New AI Model at Conference",
  "Stock Markets Surge After Positive Economic Data",
];

// Simulated VoiceButton component (modular, AI-ready)
// In a real project, this would be in a separate file: components/VoiceButton.js
const VoiceButton = () => {
  const handleVoiceCommand = () => {
    alert("Voice system activated! (Placeholder for AI voice integration)");
    // Future: Integrate with AI voice recognition API
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
  // State for breaking news ticker
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Rotate breaking news every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % breakingNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Multilingual taglines
  const taglines = {
    en: "Your pulse on what matters most.",
    es: "Tu pulso sobre lo que más importa.",
    fr: "Votre pouls sur ce qui compte le plus.",
  };
  const [language, setLanguage] = useState('en');

  // Language toggle (placeholder for future language switch component)
  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'es' : language === 'es' ? 'fr' : 'en';
    setLanguage(nextLang);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>News Pulse - Modern Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 text-center relative">
        <h1 className="text-5xl font-bold tracking-tight">News Pulse</h1>
        <p className="mt-4 text-xl font-light">{taglines[language]}</p>
        {/* Voice Button */}
        <div className="absolute top-4 right-4">
          <VoiceButton />
        </div>
        {/* Language Toggle (future: move to a separate LanguageSwitch component) */}
        <button
          onClick={toggleLanguage}
          className="absolute top-4 left-4 text-white underline text-sm"
        >
          Switch Language: {language.toUpperCase()}
        </button>
      </header>

      {/* Breaking News Ticker */}
      <div className="bg-red-600 text-white py-2 overflow-hidden">
        <div className="animate-slide whitespace-nowrap">
          <span className="inline-block px-4 font-semibold">
            Breaking News: {breakingNews[currentNewsIndex]}
          </span>
        </div>
      </div>

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Ad Banner for Monetization */}
        <section className="mb-8">
          <div className="bg-gray-300 text-center py-8 rounded-lg">
            <p className="text-gray-700">Ad Space - Partner with News Pulse!</p>
            {/* Future: Integrate with ad network */}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Latest News Updates</h2>
          <p className="text-lg text-gray-600 mb-8">
            Stay informed with the latest breaking news from around the world. 
            Explore in-depth articles, live updates, and more.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder News Cards */}
            {/* Future: Add AI personalization by filtering news based on user preferences */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">News Headline 1</h3>
              <p className="text-gray-600">A brief summary of the first news article goes here.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">News Headline 2</h3>
              <p className="text-gray-600">A brief summary of the second news article goes here.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">News Headline 3</h3>
              <p className="text-gray-600">A brief summary of the third news article goes here.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>© 2025 News Pulse. All rights reserved.</p>
      </footer>
    </div>
  );
}
