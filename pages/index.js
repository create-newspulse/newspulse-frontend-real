import Head from 'next/head';
import NavBar from '../components/NavBar';
import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews'; // ✅ Just use component here

export default function Home() {
  return (
    <>
      <Head>
        <title>News Pulse ▌Real-time Verified News Powered by AI</title>
        <meta
          name="description"
          content="Breaking news & trending headlines, verified with AI. Covering India & world."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <NavBar />
      <BreakingTicker />

      {/* ✅ Top News Section */}
      <TopNews />  {/* Don't write news.map here! */}

    </>
  );
}
