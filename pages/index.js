// pages/index.js

import { useLanguage } from '../utils/LanguageContext';
import LanguageToggle from '../components/LanguageToggle'; // ✅ Dropdown/flags to switch
import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews';
import TrendingNow from '../components/TrendingNow';
import WebStories from '../components/WebStories';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Head from 'next/head';
import fetchTopNewswithAutoKey from '../lib/fetchTopNewsAuto'; // ✅ default import (no curly braces)

export default function Home({ topHeadlines }) {
  const { language } = useLanguage(); // ✅ gets current language selection

  return (
    <>
      <Head>
        <title>Gujarat News Pulse</title>
        <meta name="description" content="Live Gujarat headlines in your language." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`max-w-6xl mx-auto px-4 py-6 font-${language}`}>
        <NavBar />
        <BreakingTicker />
        <LanguageToggle />

        <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-700 mt-6">
          🟢 Gujarat News Pulse (
          {language === 'gujarati' ? 'ગુજરાતી' : language === 'hindi' ? 'हिन्दी' : 'English'})
        </h1>

        {topHeadlines.length > 0 ? (
          <>
            <TopNews articles={topHeadlines} />
            <TrendingNow />
            <WebStories />
          </>
        ) : (
          <p className="text-orange-600 font-medium text-center mt-4">
            ⚠️ No top news available right now.
          </p>
        )}
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const allArticles = await fetchTopNewswithAutoKey('general');
  return {
    props: {
      topHeadlines: allArticles || [],
    },
    revalidate: 1800, // Regenerates every 30 mins
  };
}
