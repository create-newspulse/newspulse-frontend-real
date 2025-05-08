// pages/index.js
import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews';
import TrendingNow from '../components/TrendingNow';
import WebStories from '../components/WebStories'; // ✅ Web Stories Block
import { fetchTopNewswithAutoKey } from '../lib/fetchTopNewsAuto';

export default function Home({ topHeadlines }) {
  return (
    <>
      <BreakingTicker />

      <main className="p-4 sm:p-6 lg:p-8 space-y-10">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-700">
          🟢 Gujarat News Pulse
        </h1>

        {/* Top News Grid */}
        {topHeadlines.length > 0 ? (
          <TopNews articles={topHeadlines} />
        ) : (
          <p className="text-center text-yellow-600 font-medium">
            ⚠️ No top news available right now.
          </p>
        )}

        {/* Trending Now Section */}
        <TrendingNow />

        {/* ✅ Web Stories Section */}
        <WebStories />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const allArticles = await fetchTopNewswithAutoKey('general');

  return {
    props: {
      topHeadlines: allArticles || [],
    },
    revalidate: 1800, // Revalidate every 30 min
  };
}
