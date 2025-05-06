import Head from 'next/head';
import NavBar from '../components/NavBar';
import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews'; // ✅ Correct single import

export default function Home() {
  return (
    <>
      <Head>
        <title>News Pulse 🧠 | Real-time Verified News Powered by AI</title>
        <meta
          name="description"
          content="Breaking news & trending headlines, verified with AI. Covering India & global updates in real-time."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* ✅ Sticky Navbar */}
      <NavBar />

      {/* 🔴 Breaking Ticker Bar */}
      <BreakingTicker />

      {/* ✅ Page Layout */}
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 px-4 py-10">
        <div className="max-w-3xl mx-auto">
          {/* ✅ Top News Section */}
          <TopNews />
        </div>
      </main>
    </>
  );
}
