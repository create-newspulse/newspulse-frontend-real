import Head from 'next/head';
import BreakingTicker from '../components/BreakingTicker';
import VoiceButton from '../components/VoiceButton';
import VoiceCarousel from '../components/VoiceCarousel';
import AdSpace from '../components/AdSpace';
import usePreferences from '../hooks/usePreferences';
import { useState, useEffect } from 'react';

export default function Home() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'english';
    }
    return 'english';
  });
  const [featuredHeadlines, setFeaturedHeadlines] = useState([]);
  const [tickerHeadlines, setTickerHeadlines] = useState([]);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, updatePreferences] = usePreferences();

  useEffect(() => {
    localStorage.setItem('language', language);
    updatePreferences({ preferredLanguage: language });
  }, [language]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/headlines?action=categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
        setCategories(['general', 'technology', 'sports', 'business', 'entertainment', 'health', 'science']);
      }
    };
    fetchCategories();
  }, []);

  const taglines = {
    english: [
      'Your source for real-time news from around the world',
      'Stay informed, stay ahead with News Pulse',
      'Global news, local insights',
    ],
    hindi: [
      'दुनिया भर से रीयल-टाइम समाचार के लिए आपका स्रोत',
      'न्यूज़ पल्स के साथ सूचित रहें, आगे रहें',
      'वैश्विक समाचार, स्थानीय अंतर्दृष्टि',
    ],
    gujarati: [
      'વિશ્વભરના રીયલ-ટાઇમ સમાચાર માટે તમારો સ્ત્રોત',
      'ન્યૂઝ પલ્સ સાથે માહિતગાર રહો, આગળ રહો',
      'વૈશ્વિક સમાચાર, સ્થાનિક આંતરદૃષ્ટિ',
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines[language].length);
    }, 5000);
    return () => clearInterval(interval);
  }, [language]);

  const translations = {
    english: {
      title: 'News Pulse',
      subtitle: taglines.english[currentTaglineIndex],
      languageLabel: 'Language:',
      categoryLabel: 'Filter by Category:',
      featuredNews: 'Featured News',
      noHeadlines: 'No headlines available.',
      loadMore: 'Load More',
      allCategories: 'All',
      general: 'General',
      technology: 'Technology',
      sports: 'Sports',
      business: 'Business',
      entertainment: 'Entertainment',
      health: 'Health',
      science: 'Science',
      preferences: 'Preferences',
      save: 'Save',
      preferredCategories: 'Preferred Categories:',
    },
    hindi: {
      title: 'न्यूज़ पल्स',
      subtitle: taglines.hindi[currentTaglineIndex],
      languageLabel: 'भाषा:',
      categoryLabel: 'श्रेणी द्वारा फ़िल्टर करें:',
      featuredNews: 'विशेष समाचार',
      noHeadlines: 'कोई समाचार उपलब्ध नहीं।',
      loadMore: 'और लोड करें',
      allCategories: 'सभी',
      general: 'सामान्य',
      technology: 'प्रौद्योगिकी',
      sports: 'खेल',
      business: 'व्यापार',
      entertainment: 'मनोरंजन',
      health: 'स्वास्थ्य',
      science: 'विज्ञान',
      preferences: 'प्राथमिकताएँ',
      save: 'सहेजें',
      preferredCategories: 'पसंदीदा श्रेणियाँ:',
    },
    gujarati: {
      title: 'ન્યૂઝ પલ્સ',
      subtitle: taglines.gujarati[currentTaglineIndex],
      languageLabel: 'ભાષા:',
      categoryLabel: 'શ્રેણી દ્વારા ફિલ્ટર કરો:',
      featuredNews: 'વિશેષ સમાચાર',
      noHeadlines: 'કોઈ સમાચાર ઉપલબ્ધ નથી.',
      loadMore: 'વધુ લોડ કરો',
      allCategories: 'બધા',
      general: 'સામાન્ય',
      technology: 'ટેકનોલોજી',
      sports: 'રમતગમત',
      business: 'વ્યવસાય',
      entertainment: 'મનોરંજન',
      health: 'આરોગ્ય',
      science: 'વિજ્ઞાન',
      preferences: 'પસંદગીઓ',
      save: 'સાચવો',
      preferredCategories: 'પસંદગીની શ્રેણીઓ:',
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

      const prioritizedHeadlines = data.sort((a, b) => {
        const aMatches = preferences.preferredCategories.includes(a.category) ? 1 : 0;
        const bMatches = preferences.preferredCategories.includes(b.category) ? 1 : 0;
        return bMatches - aMatches;
      });

      if (pageNum === 1) {
        setFeaturedHeadlines(prioritizedHeadlines);
      } else {
        setFeaturedHeadlines((prev) => [...prev, ...prioritizedHeadlines]);
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
  }, [category, language, page, preferences]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const logInteraction = async (headline) => {
    try {
      const userId = 'guest'; // Replace with actual user ID in a real app
      await fetch('/api/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          headlineId: headline.id,
          category: headline.category,
          action: 'click',
        }),
      });
    } catch (error) {
      console.error('Error logging interaction:', error.message);
    }
  };

  const fontClass = language === 'hindi' ? 'font-hindi' : language === 'gujarati' ? 'font-gujarati' : 'font-english';

  const categoryIcons = {
    general: '🌐',
    technology: '💻',
    sports: '⚽',
    business: '💼',
    entertainment: '🎬',
    health: '🩺',
    science: '🔬',
  };

  const handleSavePreferences = () => {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="preferredCategories"]:checked')).map(
      (input) => input.value
    );
    updatePreferences({ preferredCategories: selectedCategories });
    setShowPreferences(false);
  };

  return (
    <div className={`min-h-screen bg-light-gray ${fontClass}`}>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.subtitle} />
        <meta name="keywords" content="news, breaking news, global news, multilingual news, AI news" />
        <meta name="author" content="Kiran Parmar" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newspulse.co.in" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="icon" href="/favicon.ico" />
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
        <div className="relative z-10 flex space-x-2">
          <VoiceButton language={language} headline={tickerHeadlines[currentHeadlineIndex]} />
          <button
            onClick={() => setShowPreferences(true)}
            className="p-2 rounded-full bg-royal-blue text-white hover:bg-royal-blue-light transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-royal-blue-light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{t.preferences}</span>
          </button>
        </div>
      </header>

      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-royal-blue mb-4">{t.preferences}</h2>
            <div className="mb-4">
              <label className="block text-dark-gray mb-2">{t.preferredCategories}</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="preferredCategories"
                      value={cat}
                      defaultChecked={preferences.preferredCategories.includes(cat)}
                      className="form-checkbox text-royal-blue"
                    />
                    <span>{categoryIcons[cat] || '📰'} {t[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 bg-gray-300 text-dark-gray rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 bg-royal-blue text-white rounded-md hover:bg-royal-blue-light transition-colors"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

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
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {categoryIcons[cat] || '📰'} {t[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <BreakingTicker
          className="news-pulse-ticker"
          speed={50}
          pollingInterval={300000}
          category={category}
          language={language}
          onHeadlinesUpdate={(headlines) => {
            setTickerHeadlines(headlines);
            setCurrentHeadlineIndex(0);
          }}
        />

        <div className="mt-6">
          <VoiceCarousel headlines={tickerHeadlines} language={language} />
        </div>

        <div className="mt-6 flex justify-center">
          <AdSpace language={language} />
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
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => logInteraction(headline)}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs text-royal-blue-light">
                      {categoryIcons[headline.category] || '📰'} {headline.category.toUpperCase()}
                    </span>
                  </div>
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
