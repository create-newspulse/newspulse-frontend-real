import { useLanguage } from '../utils/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews';
import TrendingNow from '../components/TrendingNow';
import WebStories from '../components/WebStories';
import { fetchTopNewswithAutoKey } from '../lib/fetchTopNewsAuto';
import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews';
import TrendingNow from '../components/TrendingNow';
import WebStories from '../components/WebStories';
import { fetchTopNewswithAutoKey } from '../lib/fetchTopNewsAuto';

export default function WorldNews({ topHeadlines }) {
  return (
    <>
      <BreakingTicker />

      <main className="p-4 sm:p-6 lg:p-8 space-y-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-700">
          🌐 International News Pulse
        </h1>

        {topHeadlines.length > 0 ? (
          <TopNews articles={topHeadlines} />
        ) : (
          <p className="text-center text-yellow-600 font-medium">
            ⚠️ No international news found.
          </p>
        )}

        <TrendingNow />
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
    revalidate: 1800,
  };
}
