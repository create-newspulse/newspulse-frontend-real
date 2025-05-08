// pages/index.js

import Head from 'next/head';
import TopNews from '../components/TopNews';
import TrendingNow from '../components/TrendingNow';
import WebStories from '../components/WebStories';
import BreakingTicker from '../components/BreakingTicker';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import fetchTopNewsAuto from '../lib/fetchTopNewsAuto';

export default function Home({ topHeadlines }) {
  return (
    <>
      <Head>
        <title>Gujarat News Pulse</title>
        <meta name="description" content="Live headlines, stories, and web news from Gujarat and India" />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <NavBar />
        <BreakingTicker />

        <h1 className="text-3xl font-bold text-green-700 mb-2 flex items-center gap-2">
          🟢 Gujarat News Pulse
        </h1>

        {topHeadlines?.length > 0 ? (
          <>
            <TopNews articles={topHeadlines} />
            <TrendingNow />
            <WebStories />
          </>
        ) : (
          <p className="text-orange-600 font-medium mt-6">
            ⚠️ No top news available right now.
          </p>
        )}
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const topHeadlines = await fetchTopNewsAuto(); // auto-updated news
  return {
    props: {
      topHeadlines,
    },
  };
}
