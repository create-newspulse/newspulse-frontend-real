import { useEffect, useState, useCallback, useRef } from 'react';

// Types
interface Headline {
  id: string;
  text: string;
  source?: string;
  publishedAt?: string;
}

interface TickerProps {
  speed?: number; // Transition speed in ms
  pauseOnHover?: boolean;
  className?: string;
  pollingInterval?: number; // Polling interval in ms
}

// API configurations
const API_CONFIGS = {
  newsapi: {
    url: 'https://newsapi.org/v2/top-headlines?language=en&pageSize=10',
    key: 'd6cda5432c664498a61b9716f315f772',
    mapResponse: (data: any) =>
      data.articles.map((article: any, index: number) => ({
        id: `${index}-${article.publishedAt || Date.now()}`,
        text: article.title,
        source: article.source.name,
        publishedAt: article.publishedAt,
      })),
  },
  newsdata: {
    url: 'https://newsdata.io/api/1/news?language=en&size=10',
    key: 'pub_854060b07532e1e92a586939878c2ffa18131',
    mapResponse: (data: any) =>
      data.results.map((article: any, index: number) => ({
        id: `${index}-${article.pubDate || Date.now()}`,
        text: article.title,
        source: article.source_name || 'Unknown',
        publishedAt: article.pubDate,
      })),
  },
  thenewsapi: {
    url: 'https://api.thenewsapi.com/v1/news/top?locale=us&language=en&limit=10',
    key: 'NEkDgFxwbVPTE04MZgrrvN5IesXloHsK2ifFuXbw',
    mapResponse: (data: any) =>
      data.data.map((article: any, index: number) => ({
        id: `${index}-${article.published_at || Date.now()}`,
        text: article.title,
        source: article.source || 'Unknown',
        publishedAt: article.published_at,
      })),
  },
  mediastack: {
    url: 'http://api.mediastack.com/v1/news?languages=en&limit=10',
    key: '2a38a5e69e2648013aba40a407bd1b38',
    mapResponse: (data: any) =>
      data.data.map((article: any, index: number) => ({
        id: `${index}-${article.published_at || Date.now()}`,
        text: article.title,
        source: article.source || 'Unknown',
        publishedAt: article.published_at,
      })),
  },
  gnews: {
    url: 'https://gnews.io/api/v4/top-headlines?lang=en&max=10',
    key: 'f703727c81cc39fd08ef8074b59c8ba0',
    mapResponse: (data: any) =>
      data.articles.map((article: any, index: number) => ({
        id: `${index}-${article.publishedAt || Date.now()}`,
        text: article.title,
        source: article.source.name || 'Unknown',
        publishedAt: article.publishedAt,
      })),
  },
};

// Fetch headlines from multiple APIs
const fetchHeadlines = async (): Promise<Headline[]> => {
  try {
    const fetchPromises = Object.entries(API_CONFIGS).map(async ([name, config]) => {
      try {
        const response = await fetch(`${config.url}&apikey=${config.key}`, {
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error(`Failed to fetch from ${name}`);
        const data = await response.json();
        return config.mapResponse(data);
      } catch (error) {
        console.error(`Error fetching from ${name}:`, error);
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    // Flatten, deduplicate by text, and sort by publishedAt (newest first)
    const allHeadlines = results
      .flat()
      .filter((headline, index, self) => 
        headline.text && 
        index === self.findIndex(h => h.text.toLowerCase() === headline.text.toLowerCase())
      )
      .sort((a, b) => 
        (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - 
        (a.publishedAt ? new Date(a.publishedAt).getTime() : 0)
      );

    return allHeadlines.slice(0, 20); // Limit to 20 headlines
  } catch (error) {
    console.error('Failed to fetch headlines:', error);
    return [];
  }
};

// CSS styles
const tickerStyles = `
  @keyframes slideIn {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-100%); opacity: 0; }
  }
  .ticker-enter {
    animation: slideIn 0.5s ease-out forwards;
  }
  .ticker-exit {
    animation: slideOut 0.5s ease-out forwards;
  }
`;

export default function BreakingTicker({
  speed = 3500,
  pauseOnHover = true,
  className = '',
  pollingInterval = 300000 // 5 minutes
}: TickerProps) {
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);
  const pollingRef = useRef<number | null>(null);
  const retryCount = useRef<number>(0);
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
  const handleKeyDown = (e: React.KeyboardEvent) => {
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
    <>
      <style>{tickerStyles}</style>
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
    </>
  );
}
