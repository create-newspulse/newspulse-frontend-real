import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews';
import TrendingNow from '../components/TrendingNow';
import { fetchTopNewswithAutoKey } from '../lib/fetchTopNewsAuto';
import { filterArticlesByRegion } from '../utils/filterArticlesByRegion';

export default function Home({ topHeadlines }) {
  return (
    <>
      <BreakingTicker />
      <main className="p-6 space-y-10">
        <h1 className="text-3xl font-bold text-center">
          🟢 Gujarat News Pulse
        </h1>
        <TopNews articles={topHeadlines} />
        <TrendingNow />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const allArticles = await fetchTopNewswithAutoKey('general');
  const topHeadlines = filterArticlesByRegion(allArticles, 'gujarat');

  return {
    props: {
      topHeadlines,
    },
    revalidate: 1800,
  };
}
