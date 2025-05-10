import { useEffect, useState, useCallback, useRef } from 'react';
import '../styles/BreakingTicker.css';

const fetchHeadlines = async () => {
  try {
    const response = await fetch('/api/headlines');
    if (!response.ok) throw new Error('Failed to fetch headlines');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch headlines:', error);
    return [];
  }
};

export default function BreakingTicker({
  speed = 3500,
  pauseOnHover = true,
  className = '',
  pollingInterval = 300000 // 5 minutes
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

  // Fetch headlines with retry logic
  const loadHeadlines = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchHeadlines();
    
    if (data.length === 0 && retryCount.current < maxRetries) {
      retryCount.current += 1;
      setTimeout(loadHeadlines, 5000 * retryCount.current); // Exponential backoff
      return;
    }

    setHeadlines(data);
    setIsLoading(false);
    setLastUpdated(new Date().toLocaleTimeString());
    retryCount.current = 0;
    
    if (data.length === 0) {
      setError('No headlines available');
    } else {
      setError(null);
    }
  }, []);

  // Initial fetch and periodic polling
  useEffect(() => {
    loadHeadlines();
    pollingRef.current = window.setInterval(loadHeadlines, pollingInterval);
    
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [loadHeadlines, pollingInterval]);

  // Handle ticker animation
  const startTicker = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (headlines.length || 1));
    }, speed);
  }, [speed, headlines.length]);

  useEffect(() => {
    if (headlines.length > 0 && !isPaused) {
      startTicker();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [headlines.length, isPaused, startTicker]);

  // Handle pause on hover
  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  // Accessibility: Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      setIsPaused(!isPaused);
    }
  };

  if (isLoading && headlines.length === 0) {
    return (
      <div className={`bg-black text-white px-4 py-2 ${className}`}>
        Loading headlines...
      </div>
    );
  }

  if (error && headlines.length === 0) {
    return (
      <div className={`bg-black text-red-500 px-4 py-2 ${className}`}>
        {error}
      </div>
    );
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
          aria-label={headlines[currentIndex]?.text}
        >
          {headlines[currentIndex]?.text}
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
