import BreakingTicker from '../components/BreakingTicker';
import Head from 'next/head';
import NewsReader from '../components/NewsReader';

export default function Home() {
  return (
    <>
      <Head>
        <title>News Pulse – Real-time Verified News Powered by AI</title>
        <meta name="description" content="Breaking news & trending headlines, verified with AI. Covering India & beyond." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 px-4 py-10">
        <div className="max-w-5xl mx-auto animate-fade-in space-y-10">

          {/* Hero Headline */}
          <section className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700">📰 News Pulse</h1>
            <p className="text-lg sm:text-xl text-gray-600 mt-2">
              Real-time headlines. Verified facts. Now with AI-powered delivery.
            </p>
          </section>

          {/* Featured Article */}
          <section className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-600 space-y-4">
            <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Breaking
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              AI Revolutionizes News Industry with Speed & Accuracy
            </h2>
            <p className="text-sm text-gray-500">
              Published on May 5, 2025 by <span className="font-medium text-black">News Pulse Editorial Team</span>
            </p>
            <p className="text-base leading-relaxed">
              AI tools are now driving newsrooms—writing, verifying, and distributing global news faster than ever.
            </p>
            <NewsReader />
          </section>

          {/* Latest News */}
          <section>
            <h3 className="text-2xl font-semibold mb-4">🗞️ Latest News</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                  <h4 className="font-bold">Sample Headline {i + 1}</h4>
                  <p className="text-sm text-gray-600 mt-1">Brief description of this news article...</p>
                </div>
              ))}
            </div>
          </section>

          {/* Top Stories */}
          <section>
            <h3 className="text-2xl font-semibold mb-4">🔥 Top Stories</h3>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold">Top Story {i + 1}</h4>
                  <p className="text-sm text-gray-700">Summary of the top trending article of the day.</p>
                </div>
              ))}
            </div>
          </section>

          {/* Trending Videos */}
          <section>
            <h3 className="text-2xl font-semibold mb-4">🎥 Trending Videos</h3>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-black aspect-video rounded-lg flex items-center justify-center text-white font-bold">
                  Video {i + 1}
                </div>
              ))}
            </div>
          </section>

          {/* Editorial Picks */}
          <section>
            <h3 className="text-2xl font-semibold mb-4">🧠 Editorial Picks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm">
                  <h4 className="font-bold">Insightful Topic {i + 1}</h4>
                  <p className="text-gray-600 text-sm mt-2">Explore in-depth commentary and expert views.</p>
                </div>
              ))}
            </div>
          </section>

          {/* Explore Categories */}
          <section>
            <h3 className="text-2xl font-semibold mb-4">🌍 Explore Categories</h3>
            <div className="flex flex-wrap gap-3">
              {["Politics", "Business", "Tech", "Sports", "World", "Glamour"].map((cat, i) => (
                <span
                  key={i}
                  className="bg-gray-100 hover:bg-gray-200 text-sm px-4 py-2 rounded-full cursor-pointer transition"
                >
                  {cat}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
