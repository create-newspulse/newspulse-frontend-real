import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>NewsPulse – Real-time Verified News Powered by AI</title>
        <meta
          name="description"
          content="Breaking headlines, trending stories, and AI-verified facts. NewsPulse delivers fast, accurate news across India and beyond."
        />
        <meta
          name="keywords"
          content="NewsPulse, Breaking News, AI News, India News, Tech News, Real-time Headlines"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />

        {/* Open Graph */}
        <meta property="og:title" content="NewsPulse – Real-time Verified News Powered by AI" />
        <meta
          property="og:description"
          content="Get the latest AI-powered news from around the world. Instantly verified, lightning fast."
        />
        <meta property="og:image" content="/cover.jpg" />
        <meta property="og:url" content="https://newspulse.co.in/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NewsPulse – Real-time Verified News Powered by AI" />
        <meta name="twitter:description" content="Your trusted source for live news, verified by AI." />
        <meta name="twitter:image" content="/cover.jpg" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-16">
        {/* ✨ Intro */}
        <section className="text-center mb-8">
          <p className="text-gray-600 text-lg">
            Real-time headlines. Verified facts. Now with AI-powered delivery.
          </p>
        </section>

        {/* 🧨 Breaking News */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-10">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs">Breaking</span>
          <h2 className="text-xl font-bold mt-3">
            AI Revolutionizes News Industry with Speed & Accuracy
          </h2>
          <p className="text-gray-600 mt-2">Published on May 5, 2025 by NewsPulse Editorial Team</p>
          <p className="mt-2 text-gray-700">
            AI tools are now driving newsrooms—writing, verifying, and distributing global news faster than ever.
          </p>
          <button
            onClick={() => {
              const message = new SpeechSynthesisUtterance(
                "AI tools are now driving newsrooms—writing, verifying, and distributing global news faster than ever."
              );
              message.lang = 'en-IN';
              message.pitch = 1;
              message.rate = 1;
              window.speechSynthesis.speak(message);
            }}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition"
          >
            🔊 Listen to this news
          </button>
        </section>

        {/* 🔥 Trending Stories */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">🔥 Trending Now</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <h4 className="font-bold text-blue-700">🛰 Rural Internet Expands</h4>
              <p className="text-sm mt-1 text-gray-600">Faster access reaches remote India.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <h4 className="font-bold text-green-700">🌿 Solar Projects Launched</h4>
              <p className="text-sm mt-1 text-gray-600">Massive green energy wave across 5 states.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <h4 className="font-bold text-red-700">📉 Inflation Eases to 4.8%</h4>
              <p className="text-sm mt-1 text-gray-600">Govt says relief for middle-class families.</p>
            </div>
          </div>
        </section>

        {/* 🔘 View More */}
        <div className="text-center mt-8">
          <Link href="/news">
            <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm transition">
              View More News →
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
