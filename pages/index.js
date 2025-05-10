// pages/index.js
import Head from 'next/head';
import BreakingTicker from '../components/BreakingTicker';
import VoiceButton from '../components/VoiceButton';
import { useState, useEffect } from 'react';

export default function Home() {
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'english';
    }
    return 'english';
  });
  const [featuredHeadlines, setFeaturedHeadlines] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const translations = {
    english: {
      title: 'News Pulse',
      subtitle: 'Your source for real-time news from around the world',
      languageLabel: 'Language:',
      categoryLabel: 'Filter by Category:',
      featuredNews: 'Featured News',
      noHeadlines: 'No headlines available.',
      loadMore: 'Load More',
      allCategories: 'All',
      technology: 'Technology',
      sports: 'Sports',
      business: 'Business',
      entertainment: 'Entertainment',
    },
    hindi: {
      title: 'न्यूज़ पल्स',
      subtitle: 'दुनिया भर से रीयल-टाइम समाचार के लिए आपका स्रोत',
      languageLabel: 'भाषा:',
      categoryLabel: 'श्रेणी द्वारा फ़िल्टर करें:',
      featuredNews: 'विशेष समाचार',
      noHeadlines: 'कोई समाचार उपलब्ध नहीं।',
      loadMore: 'और लोड करें',
      allCategories: 'सभी',
      technology: 'प्रौद्योगिकी',
      sports: 'खेल',
      business: 'व्यापार',
      entertainment: 'मनोरंजन',
    },
    gujarati: {
      title: 'ન્યૂઝ પલ્સ',
      subtitle: 'વિશ્વભરના રીયલ-ટાઇમ સમાચાર માટે તમારો સ્ત્રોત',
      languageLabel: 'ભાષા:',
      categoryLabel: 'શ્રેણી દ્વારા ફિલ્ટર કરો:',
      featuredNews: 'વિશેષ સમાચાર',
      noHeadlines: 'કોઈ સમાચાર ઉપલબ્ધ નથી.',
      loadMore: 'વધુ લોડ કરો',
      allCategories: 'બધા',
      technology: 'ટેકનોલોજી',
      sports: 'રમતગમત',
      business: 'વ્યવસાય',
      entertainment: 'મનોરંજન',
    },
  };

  const t = translations[language] || translations.english;

  const fetchFeaturedHeadlines = async (selectedCategory, selectedLanguage, pageNum) => {
    setIsLoading(true);
    try {
      const url = `/api/headlines?page=${pageNum}${
        selectedCategory ? `&category=${selectedCategory}` : ''
      }${selectedLanguage ? `&language=${selectedLanguage}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch featured headlines: ${response.statusText}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: Expected an array of headlines');
      }
      if (pageNum === 1) {
        setFeaturedHeadlines(data);
      } else {
        setFeaturedHeadlines((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === 10);
    } catch (error) {
      console.error('Error fetching featured headlines:', error.message);
      setFeaturedHeadlines([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedHeadlines(category, language, page);
  }, [category, language, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const fontClass = language === 'hindi' ? 'font-hindi' : language === 'gujarati' ? 'font-gujarati' : 'font-english';

  return (
    <div className={`min-h-screen bg-light-gray ${fontClass}`}>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.subtitle} />
      </Head>

      <header
        className="relative bg-cover bg-center h-64 flex items-center justify-between px-4"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504711434969-e3388611e4c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-royal-blue opacity-70"></div>
        <div className="relative z-10 flex items-center">
          <div className="text-3xl font-bold text-white">{t.title}</div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{t.title}</h1>
          <p className="mt-2 text-lg text-gray-200">{t.subtitle}</p>
        </div>
        <div className="relative z-10">
          <VoiceButton language={language} />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="language" className="text-lg font-medium text-dark-gray">
              {t.languageLabel}
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setPage(1);
              }}
              className="p-2 border border-gray-300 rounded-md bg-white text-dark-gray focus:outline-none focus:ring-2 focus:ring-royal-blue"
            >
              <option value="english">English</option>
              <option value="hindi">हिन्दी</option>
              <option value="gujarati">ગુજરાતી</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="category" className="text-lg font-medium text-dark-gray">
              {t.categoryLabel}
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="p-2 border border-gray-300 rounded-md bg-white text-dark-gray focus:outline-none focus:ring-2 focus:ring-royal-blue"
            >
              <option value="">{t.allCategories}</option>
              <option value="technology">{t.technology}</option>
              <option value="sports">{t.sports}</option>
              <option value="business">{t.business}</option>
              <option value="entertainment">{t.entertainment}</option>
            </select>
          </div>
        </div>

        <BreakingTicker
          className="news-pulse-ticker"
          speed={50}
          pollingInterval={300000}
          category={category}
          language={language}
        />

        <div className="mt-6 bg-gray-200 h-24 flex items-center justify-center rounded-lg">
          <p className="text-gray-500">Ad Space - 728x90 Banner</p>
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-royal-blue mb-4">{t.featuredNews}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHeadlines.length === 0 && !isLoading ? (
              <p className="col-span-full text-center text-gray-500">{t.noHeadlines}</p>
            ) : (
              featuredHeadlines.map((headline) => (
                <div
                  key={headline.id || Math.random()}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-medium text-dark-gray">{headline.text || 'No title'}</h3>
                  <p className="text-sm text-gray-500 mt-1">{headline.source || 'Unknown'}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {headline.publishedAt
                      ? new Date(headline.publishedAt).toLocaleDateString(
                          language === 'hindi' ? 'hi-IN' : language === 'gujarati' ? 'gu-IN' : 'en-US'
                        )
                      : 'No date'}
                  </p>
                </div>
              ))
            )}
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

        {hasMore && !isLoading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-royal-blue text-white rounded-md hover:bg-royal-blue-light transition-colors"
            >
              {t.loadMore}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
