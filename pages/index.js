import { useLanguage } from '../utils/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import NavBar from '../components/NavBar';
import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews';
import TrendingNow from '../components/TrendingNow';
import WebStories from '../components/WebStories';
import Footer from '../components/Footer';
import fetchTopNewsAuto from '../lib/fetchTopNewsAuto';

export default function Home({ topHeadlines }) {
  const { language } = useLanguage();

  return (
    <>
      <NavBar />
      <BreakingTicker />
      <LanguageToggle />

      <main className={`p-4 sm:p-6 lg:p-8 space-y-10 font-${language}`}>
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-700">
          🟢 Gujarat News Pulse ({language === 'gujarati' ? 'ગુજરાતી' : language === 'hindi' ? 'हिन्दी' : 'English'})
        </h1>

        {topHeadlines.length > 0 ? (
          <>
            <TopNews articles={topHeadlines} />
            <TrendingNow />
            <WebStories />
          </>
        ) : (
          <p className="text-orange-600 font-medium mt-6 text-center">
            ⚠️ No top news available right now.
          </p>
        )}
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const topHeadlines = await fetchTopNewsAuto('general');
  return {
    props: { topHeadlines: topHeadlines || [] },
    revalidate: 1800,
  };
}
