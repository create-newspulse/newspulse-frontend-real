
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* 🧨 Breaking News Card */}
      <div className="bg-white p-4 shadow-md rounded-md">
        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm inline-block mb-2">
          🧨 Breaking News
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          AI Revolutionizes News Industry with Speed & Accuracy
        </h1>
        <p className="text-gray-600 mt-2">
          Published on May 5, 2025 | by NewsPulse Editorial Team
        </p>
        <p className="text-gray-700 mt-4">
          In a historic shift, AI tools are now being used to power newsrooms across the globe — from writing articles to verifying facts in real-time.
        </p>
      </div>

      {/* 🔥 Trending Section */}
      <div className="bg-white p-4 shadow-md rounded-md mt-6">
        <h2 className="text-lg font-bold">📢 Trending</h2>
        <p className="text-gray-600">
          Stay tuned for live updates from across the world.
        </p>
      </div>

      {/* 📦 Trending Cards */}
      <div className="flex md:grid md:grid-cols-3 gap-4 mt-8 min-w-full overflow-x-auto">

        {/* 🛰 Card 1 */}
        <div className="bg-white p-4 rounded-lg shadow transition transform hover:scale-105">
          <h3 className="font-semibold text-lg text-blue-700">
            🛰 Satellite Internet Now Covers Rural India
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Faster net access reaches villages and remote areas.
          </p>
        </div>

        {/* 🌿 Card 2 */}
        <div className="bg-white p-4 rounded-lg shadow transition transform hover:scale-105">
          <h3 className="font-semibold text-lg text-green-700">
            🌿 India’s Green Energy Push Speeds Up
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Massive solar projects launched across 5 states.
          </p>
        </div>

        {/* 📉 Card 3 */}
        <div className="bg-white p-4 rounded-lg shadow transition transform hover:scale-105">
          <h3 className="font-semibold text-lg text-red-700">
            📉 Inflation Drops to 4.8% in April
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Govt says falling prices bring relief to families.
          </p>
        </div>
      </div>

      {/* 🔘 View More News Button */}
      <div className="mt-6 text-center">
        <Link href="/news">
          <a className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm transition inline-block">
            View More News
          </a>
        </Link>
      </div>
    </div>
  );
}
