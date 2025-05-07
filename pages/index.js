import BreakingTicker from '../components/BreakingTicker';

<BreakingTicker />
import TopNews from '../components/TopNews';
import { fetchTopNewswithAutoKey } from '../lib/fetchTopNewsAuto';
import { filterArticlesByRegion } from '../utils/filterArticlesByRegion';

export default function Home({ topHeadlines }) {
  return (
    <main className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">📰 Today’s Highlights</h1>
      <TopNews articles={topHeadlines} />
    </main>
  );
}

export async function getStaticProps() {
  const allArticles = await fetchTopNewswithAutoKey('general');

  const topHeadlines = filterArticlesByRegion(allArticles, 'gujarat'); // 👈 change for india/international

  return {
    props: {
      topHeadlines,
    },
    revalidate: 1800,
  };
}
