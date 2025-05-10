// pages/index.js
import Head from 'next/head';
import BreakingTicker from '../components/BreakingTicker';
import { useState, useEffect } from 'react';

export default function Home() {
  const [category, setCategory] = useState(''); // Category filter
  const [featuredHeadlines, setFeaturedHeadlines] = useState([]); // Featured news
  const [page, setPage] = useState(1); // Pagination
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // More headlines to load

  // Fetch featured headlines
  const fetchFeaturedHeadlines = async (selectedCategory, pageNum) => {
    setIsLoading(true);
    try {
      const url = selectedCategory
        ? `/api/headlines?category=${selectedCategory}&page=${pageNum}`
        : `/api/headlines?page=${pageNum}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch featured headlines');
      const data = await response.json();

      // Update headlines
      if (pageNum === 1) {
        setFeaturedHeadlines(data);
      } else {
        setFeaturedHeadlines((prev) => [...prev, ...data]);
      }

      // Check if there are more headlines to load
      setHasMore(data.length === 10); // Assuming API returns 10 items per page
    } catch (error) {
      console.error('Error fetching featured headlines:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch headlines when category or page changes
  useEffect(() => {
    fetchFeaturedHeadlines(category, page);
  }, [category, page]);

  // Load more headlines
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>News Pulse News Updates</title>
        <meta name="description" content="Real-time news updates from News Pulse" />
      </Head>

      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center h-64 flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504711434969-e3388611e4c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">News Pulse News Updates</h1>
          <p className="mt-2 text-lg text-gray-200">Your source for real-time news from around the world</p>
        </div>
      </header>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="category" className="text-lg font-medium text-gray-700">
              Filter by Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1); // Reset page when category changes
              }}
              className="p-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="technology">Technology</option>
              <option value="sports">Sports</option>
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>
        </div>

        {/* Breaking Ticker */}
        <BreakingTicker
          className="news-pulse-ticker"
          speed={5000}
          pollingInterval={300000}
          category={category}
        />

        {/* Featured News Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Featured News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHeadlines.length === 0 && !isLoading ? (
              <p className="col-span-full text-center text-gray-500">No headlines available.</p>
            ) : (
              featuredHeadlines.map((headline) => (
                <div
                  key={headline.id}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-medium text-gray-800">{headline.text}</h3>
                  <p className="text-sm text-gray-500 mt-1">{headline.source}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(headline.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
            {/* Skeleton Loading */}
            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
          </div>
        </section>

        {/* Load More Button */}
        {hasMore && !isLoading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
