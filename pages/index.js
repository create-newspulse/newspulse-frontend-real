import Head from 'next/head';
import NavBar from '../components/NavBar';
import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews'; // ✅ Importing live Top News section

export default function Home() {
  return (
    <>
      <Head>
        <title>News Pulse – Real-time Verified News Powered by AI</title>
        <meta
          name="description"
          content="Breaking news & trending headlines, verified with AI. Covering India & beyond."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* 🔵 Sticky Navbar */}
      <NavBar />

      {/* 🔴 Breaking News Ticker Bar */}
      <BreakingTicker />

      {/* 📰 Main Content */}
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 px-4 py-10">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700">📰 News Pulse</h1>
            <p className="text-lg sm:text-xl text-gray-600 mt-2">
              Real-time headlines. Verified facts. Now with AI-powered delivery.
            </p>
          </header>

          <article className="bg-white p-6 rounded-xl shadow-md space-y-4 border-l-4 border-red-600">
            <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Breaking
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              AI Revolutionizes News Industry with Speed & Accuracy
            </h2>
            <p className="text-sm text-gray-500">
              Published on May 5, 2025 by <span className="font-medium text-black">News Pulse Editorial Team</span>
            </p>
            <p className="text-base leading-relaxed">
              AI tools are now driving newsrooms—writing, verifying, and distributing global news faster than ever.
            </p>
          </article>

          {/* ✅ Live Top News Section from NewsAPI */}
          <section className="mt-10">
            <TopNews />
          </section>
        </div>
      </main>
    </>
  );
}
