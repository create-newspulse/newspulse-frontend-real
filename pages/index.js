import Head from 'next/head';
import Script from 'next/script';
import BreakingTicker from '../components/BreakingTicker';
import VoiceButton from '../components/VoiceButton';
import VoiceCarousel from '../components/VoiceCarousel';
import AdSpace from '../components/AdSpace';
import usePreferences from '../hooks/usePreferences';
import { useState, useEffect, useRef, useCallback } from 'react';

// Lightweight sentiment analysis function
const analyzeSentiment = (text) => {
  const positiveWords = ['good', 'great', 'positive', 'happy', 'success'];
  const negativeWords = ['bad', 'terrible', 'negative', 'sad', 'failure'];
  let score = 0;
  const words = text.toLowerCase().split(/\s+/);
  words.forEach((word) => {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  });
  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
};

// Simple recommendation scoring based on user interactions
const calculateRecommendationScore = (headline, preferences, interactions) => {
  let score = 0;
  if (preferences.preferredCategories.includes(headline.category)) score += 2;
  if (interactions.some((i) => i.category === headline.category && i.action === 'click')) score += 1;
  if (interactions.some((i) => i.headlineId === headline.id && i.action === 'voice_play')) score += 1;
  return score;
};

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
  const [interactions, setInteractions] = useState([]);
  const [preferences, updatePreferences] = usePreferences();
  const observerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('language', language);
    updatePreferences({ preferredLanguage: language });
  }, [language]);

  useEffect(() => {
    setCategories([
      'news',
      'regional',
      'national',
      'international',
      'sports',
      'business',
      'glamorous',
      'lifestyle',
      'science',
      'technology',
    ]);
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
      allCategories: 'All Categories',
      news: 'News',
      regional: 'Regional',
      national: 'National',
      international: 'International',
      sports: 'Sports',
      business: 'Business',
      glamorous: 'Glamorous',
      lifestyle: 'Lifestyle',
      science: 'Science',
      technology: 'Technology',
      preferences: 'Preferences',
      save: 'Save',
      preferredCategories: 'Preferred Categories:',
      sentimentPositive: 'Positive',
      sentimentNegative: 'Negative',
      sentimentNeutral: 'Neutral',
    },
    hindi: {
      title: 'न्यूज़ पल्स',
      subtitle: taglines.hindi[currentTaglineIndex],
      languageLabel: 'भाषा:',
      categoryLabel: 'श्रेणी द्वारा फ़िल्टर करें:',
      featuredNews: 'विशेष समाचार',
      noHeadlines: 'कोई समाचार उपलब्ध नहीं।',
      loadMore: 'और लोड करें',
      allCategories: 'सभी श्रेणियाँ',
      news: 'समाचार',
      regional: 'क्षेत्रीय',
      national: 'राष्ट्रीय',
      international: 'अंतरराष्ट्रीय',
      sports: 'खेल',
      business: 'व्यापार',
      glamorous: 'ग्लैमरस',
      lifestyle: 'लाइफस्टाइल',
      science: 'विज्ञान',
      technology: 'प्रौद्योगिकी',
      preferences: 'प्राथमिकताएँ',
      save: 'सहेजें',
      preferredCategories: 'पसंदीदा श्रेणियाँ:',
      sentimentPositive: 'सकारात्मक',
      sentimentNegative: 'नकारात्मक',
      sentimentNeutral: 'तटस्थ',
    },
    gujarati: {
      title: 'ન્યૂઝ પલ્સ',
      subtitle: taglines.gujarati[currentTaglineIndex],
      languageLabel: 'ભાષા:',
      categoryLabel: 'શ્રેણી દ્વારા ફિલ્ટર કરો:',
      featuredNews: 'વિશેષ સમાચાર',
      noHeadlines: 'કોઈ સમાચાર ઉપલબ્ધ નથી.',
      loadMore: 'વધુ લોડ કરો',
      allCategories: 'બધી શ્રેણીઓ',
      news: 'સમાચાર',
      regional: 'પ્રાદેશિક',
      national: 'રાષ્ટ્રીય',
      international: 'આંતરરાષ્ટ્રીય',
      sports: 'રમતગમત',
      business: 'વ્યવસાય',
      glamorous: 'ગ્લેમરસ',
      lifestyle: 'જીવનશૈલી',
      science: 'વિજ્ઞાન',
      technology: 'ટેકનોલોજી',
      preferences: 'પસંદગીઓ',
      save: 'સાચવો',
      preferredCategories: 'પસંદગીની શ્રેણીઓ:',
      sentimentPositive: 'સકારાત્મક',
      sentimentNegative: 'નકારાત્મક',
      sentimentNeutral: 'તટસ્થ',
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

      const enrichedHeadlines = data.map((headline) => ({
        ...headline,
        sentiment: analyzeSentiment(headline.text || ''),
      }));

      const prioritizedHeadlines = enrichedHeadlines.sort((a, b) => {
        const aScore = calculateRecommendationScore(a, preferences, interactions);
        const bScore = calculateRecommendationScore(b, preferences, interactions);
        return bScore - aScore;
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
  }, [category, language, page, preferences, interactions]);

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const lastHeadlineRef = useCallback(
    (node) => {
      if (isLoading || typeof window === 'undefined') return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handleLoadMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore, handleLoadMore]
  );

  const logInteraction = async (headline, action) => {
    try {
      const userId = 'guest';
      const interaction = {
        userId,
        headlineId: headline.id,
        category: headline.category,
        action,
        language,
      };
      await fetch('/api/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(interaction),
      });
      setInteractions((prev) => [...prev, interaction]);

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
          event_category: 'User Interaction',
          event_label: headline.category,
          value: headline.id,
        });
      }
    } catch (error) {
      console.error('Error logging interaction:', error.message);
    }
  };

  const fontClass = language === 'hindi' ? 'font-hindi' : language === 'gujarati' ? 'font-gujarati' : 'font-english';

  const categoryIcons = {
    news: '📰',
    regional: '🏞️',
    national: '🇮🇳',
    international: '🌍',
    sports: '⚽',
    business: '💼',
    glamorous: '✨',
    lifestyle: '🌟',
    science: '🔬',
    technology: '💻',
  };

  const sentimentIcons = {
    positive: '😊',
    negative: '😟',
    neutral: '😐',
  };

  const handleSavePreferences = () => {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="preferredCategories"]:checked')).map(
      (input) => input.value
    );
    updatePreferences({ preferredCategories: selectedCategories });
    setShowPreferences(false);
    logInteraction({ id: 'preferences_save', category: 'settings' }, 'save_preferences');
  };

  const socialMediaLinks = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://facebook.com' },
    { name: 'X', icon: 'fab fa-x-twitter', url: 'https://x.com' },
    { name: 'YouTube', icon: 'fab fa-youtube', url: 'https://youtube.com' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://linkedin.com' },
    { name: 'Pinterest', icon: 'fab fa-pinterest-p', url: 'https://pinterest.com' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com' },
  ];

  // Voice command handling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleVoiceCommand = (event) => {
      const command = event.detail?.command?.toLowerCase();
      if (command === 'next headline') {
        setCurrentHeadlineIndex((prev) => (prev + 1) % tickerHeadlines.length);
        logInteraction(tickerHeadlines[currentHeadlineIndex], 'voice_next');
      }
    };
    window.addEventListener('voiceCommand', handleVoiceCommand);
    return () => window.removeEventListener('voiceCommand', handleVoiceCommand);
  }, [tickerHeadlines, currentHeadlineIndex]);

  return (
    <div className={`min-h-screen bg-light-gray ${fontClass}`}>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content="News Pulse: Your source for real-time, AI-powered global news in English, Hindi, and Gujarati." />
        <meta name="keywords" content="news, breaking news, global news, multilingual news, AI news" />
        <meta name="author" content="Kiran Parmar" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newspulse.co.in" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
      </Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `,
        }}
      />

      <header className="bg-royal-blue h-48 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white">{t.title}</h1>
          <p className="mt-2 text-lg text-gray-200">{t.subtitle}</p>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <VoiceButton
            language={language}
            headline={tickerHeadlines[currentHeadlineIndex]}
            fullArticle={tickerHeadlines[currentHeadlineIndex]?.fullText}
            onVoicePlay={() => logInteraction(tickerHeadlines[currentHeadlineIndex], 'voice_play')}
          />
          <button
            onClick={() => setShowPreferences(true)}
            className="p-2 rounded-full bg-royal-blue text-white hover:bg-royal-blue-light transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-royal-blue-light"
            aria-label={t.preferences}
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
                logInteraction({ id: 'language_change', category: 'settings' }, `language_${e.target.value}`);
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
                logInteraction({ id: 'category_filter', category: e.target.value }, 'category_filter');
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
          className="news-pulse-ticker bg-black text-white font-bold text-lg"
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
          <VoiceCarousel
            headlines={tickerHeadlines}
            language={language}
            onVoicePlay={(headline) => logInteraction(headline, 'voice_play')}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <AdSpace
            language={language}
            category={category}
            userPreferences={preferences}
            interactions={interactions}
          />
        </div>

        <section className="mt-8" aria-labelledby="featured-news">
          <h2 id="featured-news" className="text-2xl font-semibold text-royal-blue mb-4">
            {t.featuredNews}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHeadlines.length === 0 && !isLoading ? (
              <p className="col-span-full text-center text-gray-500">{t.noHeadlines}</p>
            ) : (
              featuredHeadlines.map((headline, index) => {
                const isLastElement = index === featuredHeadlines.length - 1;
                return (
                  <div
                    key={headline.id || Math.random()}
                    ref={isLastElement ? lastHeadlineRef : null}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => logInteraction(headline, 'click')}
                    role="article"
                    aria-labelledby={`headline-${headline.id}`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs text-royal-blue-light">
                        {categoryIcons[headline.category] || '📰'} {headline.category.toUpperCase()}
                      </span>
