import { useEffect, useState, useCallback, useRef } from 'react';
const fetchHeadlines = async (category = '') => {
  try {
    const url = category ? `/api/headlines?category=${category}` : '/api/headlines';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch headlines: ${response.statusText}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format: Expected an array of headlines');
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch headlines:', error.message);
    return [];
  }
};

export default function BreakingTicker({
  speed = 3500,
  pauseOnHover = true,
  className = '',
  pollingInterval = 300000,
  category = '',
}) {
  const [headlines, setHeadlines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);
  const pollingRef = useRef(null);
  const retryCount = useRef(0);
  const maxRetries = 3;

  const loadHeadlines = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchHeadlines(category);

    if (data.length === 0 && retryCount.current < maxRetries) {
      retryCount.current += 1;
      console.warn(`Retry attempt ${retryCount.current}/${maxRetries} for fetching headlines`);
      setTimeout(loadHeadlines, 5000 * retryCount.current);
      return;
    }

    const validHeadlines = data.filter(
      (headline) => headline && typeof headline.text === 'string' && headline.text.trim() !== ''
    );

    setHeadlines(validHeadlines);
    setIsLoading(false);
    setLastUpdated(new Date().toLocaleTimeString());
    retryCount.current = 0;

    if (validHeadlines.length === 0) {
      setError('No valid headlines available');
    } else {
      setError(null);
    }
  }, [category]);

  useEffect(() => {
    loadHeadlines();
    pollingRef.current = setInterval(loadHeadlines, pollingInterval);
    return () => clearInterval(pollingRef.current);
  }, [loadHeadlines, pollingInterval]);

  const startTicker = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (headlines.length || 1));
    }, speed);
  }, [speed, headlines.length]);

  useEffect(() => {
    if (headlines.length > 0 && !isPaused) startTicker();
    return () => clearInterval(intervalRef.current);
  }, [headlines.length, isPaused, startTicker]);

  const handleMouseEnter = () => pauseOnHover && setIsPaused(true);
  const handleMouseLeave = () => pauseOnHover && setIsPaused(false);
  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      setIsPaused(!isPaused);
    }
  };

  if (isLoading && headlines.length === 0) {
    return <div className={`bg-black text-white px-4 py-2 ${className}`}>Loading headlines...</div>;
  }

  if (error && headlines.length === 0) {
    return <div className={`bg-black text-red-500 px-4 py-2 ${className}`}>{error}</div>;
  }

  return (
    <div
      className={`bg-black text-white px-4 py-2 flex items-center space-x-3 overflow-x-auto whitespace-nowrap font-sans ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="marquee"
      aria-live="polite"
    >
      <span className="text-red-500 animate-pulse" aria-hidden="true">
        🔴 LIVE
      </span>
      <div className="relative flex-1 overflow-hidden">
        <span
          key={currentIndex}
          className="ticker-enter inline-block"
          aria-label={headlines[currentIndex]?.text || 'No headline available'}
        >
          {headlines[currentIndex]?.text || 'No headline available'}
          {headlines[currentIndex]?.source && (
            <span className="text-gray-400 text-sm ml-2">
              ({headlines[currentIndex].source})
            </span>
          )}
        </span>
      </div>
      {lastUpdated && (
        <span className="text-gray-500 text-sm" aria-hidden="true">
          Updated: {lastUpdated}
        </span>
      )}
    </div>
  );
}
