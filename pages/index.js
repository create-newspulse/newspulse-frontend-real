// pages/index.js
import Head from 'next/head';
import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews';
import TrendingNow from '../components/TrendingNow';
import WebStories from '../components/WebStories';
import fetchTopNewsAuto from '../lib/fetchTopNewsAuto';

export async function getServerSideProps() {
  const topHeadlines = await fetchTopNewsAuto(); // Auto-updating API
  return { props: { topHeadlines } };
}

export default function Home({ topHeadlines }) {
  return (
    <>
      <Head>
        <title>Gujarat News Pulse</title>
        <meta name="description" content="Latest breaking news from Gujarat, India and around the world." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 🔴 Breaking News Ticker */}
      <BreakingTicker />

      {/* ✅ Hero Title */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <span className="text-green-600 text-3xl font-bold">●</span>
        <h1 className="text-3xl font-bold">Gujarat News Pulse</h1>
      </div>

      {/* ⚠️ No Articles Fallback */}
      {topHeadlines?.length === 0 && (
        <div className="text-orange-600 font-medium text-center mt-4">⚠️ No top news available right now.</div>
      )}

      {/* 🗞 Top News Cards */}
      <div className="px-4 md:px-8 mt-10">
        <TopNews articles={topHeadlines} />
      </div>

      {/* 📈 Trending Now Block */}
      <div className="px-4 md:px-8 mt-10">
        <TrendingNow />
      </div>

      {/* 📚 Web Stories */}
      <div className="px-4 md:px-8 mt-10 mb-10">
        <WebStories />
      </div>
    </>
  );
}
