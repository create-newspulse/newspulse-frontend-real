import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews';
import TrendingStories from '../components/TrendingStories';
import { fetchTopNewswithAutoKey } from '../lib/fetchTopNewsAuto';

export default function IndiaPage({ topHeadlines }) {
  return (
    <section className="p-4 space-y-8">
      <BreakingTicker />
      <h1 className="text-3xl font-bold text-center text-blue-600">🔵 India News Pulse</h1>

      {topHeadlines.length > 0 ? (
        <TopNews articles={topHeadlines} />
      ) : (
        <p className="text-center text-yellow-600 font-semibold">
          ⚠️ No top news articles found.
        </p>
      )}

      <TrendingStories articles={topHeadlines} />
    </section>
  );
}

export async function getStaticProps() {
  const topHeadlines = await fetchTopNewswithAutoKey('general');
  return {
    props: {
      topHeadlines,
    },
    revalidate: 1800,
  };
}
