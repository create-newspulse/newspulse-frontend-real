// pages/international.js

import { useLanguage } from '../utils/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews';
import TrendingNow from '../components/TrendingNow';
import WebStories from '../components/WebStories';
import { fetchTopNewswithAutoKey } from '../lib/fetchTopNewsAuto';

export default function InternationalNews({ topHeadlines }) {
  const { language } = useLanguage();

  return (
    <>
      <BreakingTicker />
      <LanguageToggle />

      <main className={`p-4 sm:p-6 lg:p-8 space-y-10 font-${language}`}>
        <h1 className="text-4xl font-bold text-center text-red-700">
          🌐 International News Pulse (
          {language === 'gujarati' ? 'ગુજરાતી' : language === 'hindi' ? 'हिन्दी' : 'English'})
        </h1>

        {topHeadlines.length > 0 ? (
          <TopNews articles={topHeadlines} />
        ) : (
          <p className="text-center text-yellow-600 font-medium">
            ⚠️ No international news available right now.
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
    revalidate: 1800, // Regenerates every 30 minutes
  };
}
