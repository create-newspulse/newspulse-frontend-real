// ✅ pages/india.js
import Head from 'next/head';
import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews';
import TrendingNow from '../components/TrendingNow';
import WebStories from '../components/WebStories';
import fetchTopNewsAuto from '../lib/fetchTopNewsAuto'; // ✅ default import

export default function IndiaNews({ topHeadlines }) {
  return (
    <>
      <Head>
        <title>India News Pulse</title>
        <meta name="description" content="Live headlines from India. National news powered by News Pulse." />
      </Head>

      <BreakingTicker />

      <main className="p-4 sm:p-6 lg:p-8 space-y-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700">
          🔵 India News Pulse
        </h1>

        {topHeadlines?.length > 0 ? (
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

// ✅ Static props using correct default fetch
export async function getStaticProps() {
  try {
    const topHeadlines = await fetchTopNewsAuto('general'); // ✅ matches default import
    return {
      props: { topHeadlines },
      revalidate: 1800, // 30 minutes
    };
  } catch (error) {
    console.error('❌ Error in getStaticProps:', error.message);
    return {
      props: { topHeadlines: [] },
    };
  }
}
