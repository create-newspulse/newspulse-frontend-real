// pages/india.js

import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews';
import TrendingNow from '../components/TrendingNow';
import WebStories from '../components/WebStories';
import fetchTopNewswithAutoKey from '../lib/fetchTopNewsAuto'; // ✅ Use default import if it's exported as default

export default function IndiaNews({ topHeadlines }) {
  return (
    <>
      <BreakingTicker />

      <main className="p-4 sm:p-6 lg:p-8 space-y-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700">
          🔵 India News Pulse
        </h1>

        {topHeadlines && topHeadlines.length > 0 ? (
          <TopNews articles={topHeadlines} />
        ) : (
          <p className="text-center text-yellow-600 font-medium">
            ⚠️ No news available right now.
          </p>
        )}

        <TrendingNow />
        <WebStories />
      </main>
    </>
  );
}

// ✅ Use getServerSideProps for better freshness or fallback support
export async function getServerSideProps() {
  try {
    const allArticles = await fetchTopNewswithAutoKey('general');

    return {
      props: {
        topHeadlines: allArticles || [],
      },
    };
  } catch (error) {
    console.error('❌ IndiaNews fetch error:', error);
    return {
      props: {
        topHeadlines: [],
      },
    };
  }
}
