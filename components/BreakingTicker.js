// components/BreakingTicker.js
import { useEffect, useState, useCallback, useRef } from 'react';
import Marquee from 'react-fast-marquee';

const fetchHeadlines = async (category = '', language = 'english') => {
  try {
    const url = `/api/headlines?${category ? `category=${category}&` : ''}language=${language}`;
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
  speed = 50,
  pauseOnHover = true,
  className = '',
  pollingInterval = 300000, // 5 minutes
  category = '',
  language = 'english',
}) {
  const [headlines, setHeadlines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const pollingRef = useRef(null);
  const retryCount = useRef(0);
  const maxRetries = 3;

  const loadHeadlines = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchHeadlines(category, language);

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
      setError(
        language === 'gujarati'
          ? 'ગુજરાતી સમાચાર હાલમાં ઉપલબ્ધ નથી।'
          : language === 'hindi'
          ? 'हिन्दी समाचार अभी उपलब्ध नहीं हैं।'
          : 'No valid headlines available.'
      );
    } else {
      setError(null);
    }
  }, [category, language]);

  useEffect(() => {
    loadHeadlines(); // Initial fetch
    pollingRef.current = setInterval(loadHeadlines, pollingInterval); // Polling

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [loadHeadlines, pollingInterval]);

  const fontClass = language === 'hindi' ? 'font-hindi' : language === 'gujarati' ? 'font-gujarati' : 'font-english';

  if (isLoading && headlines.length === 0) {
    return (
      <div className={`bg-royal-blue text-white px-4 py-2 ${fontClass} ${className}`}>
        {language === 'gujarati' ? 'લોડ કરી રહ્યું છે...' : language === 'hindi' ? 'लोड हो रहा है...' : 'Loading headlines...'}
      </div>
    );
  }

  if (error && headlines.length === 0) {
    return (
      <div className={`bg-royal-blue text-red-500 px-4 py-2 ${fontClass} ${className}`}>
        {error}
      </div>
    );
  }

  return (
    <div className={`bg-royal-blue text-white py-2 ${fontClass} ${className}`}>
      <div className="flex items-center space-x-3">
        <span className="text-red-500 animate-pulse px-4" aria-hidden="true">
          🔴 LIVE
        </span>
        <div className="flex-1">
          <Marquee
            speed={speed}
            pauseOnHover={pauseOnHover}
            gradient={false}
            className="text-white"
          >
            {headlines.map((headline, index) => (
              <span key={headline.id || index} className="mx-4">
                {headline.text} {headline.source && <span className="text-gray-300 text-sm">({headline.source})</span>}
              </span>
            ))}
          </Marquee>
        </div>
        {lastUpdated && (
          <span className="text-gray-300 text-sm px-4" aria-hidden="true">
            {language === 'gujarati' ? 'અપડેટ: ' : language === 'hindi' ? 'अपडेट: ' : 'Updated: '}
            {lastUpdated}
          </span>
        )}
      </div>
    </div>
  );
}
