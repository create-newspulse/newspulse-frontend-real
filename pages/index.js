// pages/index.js (without Tailwind)
import Head from 'next/head';
import BreakingTicker from '../components/BreakingTicker';
import { useState, useEffect } from 'react';
import '../styles/Index.css';

export default function Home() {
  const [category, setCategory] = useState('');
  const [featuredHeadlines, setFeaturedHeadlines] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchFeaturedHeadlines = async (selectedCategory, pageNum) => {
    setIsLoading(true);
    try {
      const url = selectedCategory
        ? `/api/headlines?category=${selectedCategory}&page=${pageNum}`
        : `/api/headlines?page=${pageNum}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch featured headlines');
      const data = await response.json();
      if (pageNum === 1) {
        setFeaturedHeadlines(data);
      } else {
        setFeaturedHeadlines((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === 10);
    } catch (error) {
      console.error('Error fetching featured headlines:', error);
      setFeaturedHeadlines([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedHeadlines(category, page);
  }, [category, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <Head>
        <title>News Pulse News Updates</title>
        <meta name="description" content="Real-time news updates from News Pulse" />
      </Head>

      <header
        className="hero"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504711434969-e3388611e4c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>News Pulse News Updates</h1>
          <p>Your source for real-time news from around the world</p>
        </div>
      </header>

      <div className="container">
        <div className="category-filter">
          <label htmlFor="category">Filter by Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All</option>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>

        <BreakingTicker
          className="news-pulse-ticker"
          speed={5000}
          pollingInterval={300000}
          category={category}
        />

        <section className="featured-news">
          <h2>Featured News</h2>
          <div className="news-grid">
            {featuredHeadlines.length === 0 && !isLoading ? (
              <p>No headlines available.</p>
            ) : (
              featuredHeadlines.map((headline) => (
                <div key={headline.id || Math.random()} className="news-card">
                  <h3>{headline.text || 'No title'}</h3>
                  <p>{headline.source || 'Unknown'}</p>
                  <p className="date">
                    {headline.publishedAt
                      ? new Date(headline.publishedAt).toLocaleDateString()
                      : 'No date'}
                  </p>
                </div>
              ))
            )}
            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="news-card">
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-line"></div>
                  <div className="skeleton skeleton-line"></div>
                </div>
              ))}
          </div>
        </section>

        {hasMore && !isLoading && (
          <div className="load-more">
            <button onClick={handleLoadMore}>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
}
