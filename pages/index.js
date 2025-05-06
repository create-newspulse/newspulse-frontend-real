import Head from 'next/head';
import dynamic from 'next/dynamic';
import NavBar from '../components/NavBar';
import BreakingTicker from '../components/BreakingTicker';

// ✅ Dynamically import TopNews with SSR disabled
const TopNews = dynamic(() => import('../components/TopNews'), {
  ssr: false,
  loading: () => <p className="text-center text-blue-600 font-medium mt-4">Loading Top News...</p>
});

export default function Home() {
  return (
    <>
      <Head>
        <title>News Pulse 🟣 Real-time Verified News Powered by AI</title>
        <meta
          name="description"
          content="Breaking news & trending headlines, verified with AI. Covering India & World."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* 🧠 Sticky Navigation */}
      <NavBar />

      {/* 🔴 Breaking News Bar */}
      <BreakingTicker />

      {/* 🌍 Hero + Main Content */}
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <section>
            <h2 className="text-2xl font-bold text-blue-700 border-b pb-2 mb-4">
              📰 Top Stories
            </h2>

            {/* ✅ Render Top News Section */}
            <TopNews />
          </section>
        </div>
      </main>
    </>
  );
}

