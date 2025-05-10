import Head from 'next/head';
import Script from 'next/script';
import BreakingTicker from '../components/BreakingTicker';
import VoiceButton from '../components/VoiceButton';
import VoiceCarousel from '../components/VoiceCarousel';
import AdSpace from '../components/AdSpace';
import usePreferences from '../hooks/usePreferences';
import { useState, useEffect, useRef, useCallback } from 'react';

// Improved sentiment analysis with negation handling and language support
const analyzeSentiment = (text, language) => {
  const sentimentWords = {
    english: {
      positive: ['good', 'great', 'positive', 'happy', 'success'],
      negative: ['bad', 'terrible', 'negative', 'sad', 'failure'],
      negation: ['not', 'no', 'never'],
    },
    hindi: {
      positive: ['अच्छा', 'शानदार', 'सकारात्मक', 'खुश', 'सफलता'],
      negative: ['बुरा', 'भयानक', 'नकारात्मक', 'दुखी', 'असफलता'],
      negation: ['नहीं', 'न', 'कभी नहीं'],
    },
    gujarati: {
      positive: ['સારું', 'શાનદાર', 'સકારાત્મક', 'ખુશ', 'સફળતા'],
      negative: ['ખરાબ', 'ભયાનક', 'નકારાત્મક', 'દુઃખી', 'નિષ્ફળતા'],
      negation: ['નહીં', 'ક્યારેય નહીં'],
    },
  };

  const wordsList = sentimentWords[language] || sentimentWords.english;
  let score = 0;
  let negate = false;
  const words = text.toLowerCase().split(/\s+/);

  for (let i = 0; i < words.length; i++) {
    if (wordsList.negation.includes(words[i])) {
      negate = true;
      continue;
    }
    if (wordsList.positive.includes(words[i])) {
      score += negate ? -1 : 1;
      negate = false;
    } else if (wordsList.negative.includes(words[i])) {
      score += negate ? 1 : -1;
      negate = false;
    }
  }

  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
};

// Improved recommendation scoring with recent interaction weighting
const calculateRecommendationScore = (headline, preferences, interactions) => {
  let score = 0;
  const preferredCategories = preferences.preferredCategories || [];
  if (preferredCategories.includes(headline.category)) score += 2;

  const recentInteractions = interactions.slice(-10);
  recentInteractions.forEach((interaction, index) => {
    const recencyWeight = (10 - index) / 10;
    if (interaction.category === headline.category && interaction.action === 'click') {
      score += 1 * recencyWeight;
    }
    if (interaction.headlineId === headline.id && interaction.action === 'voice_play') {
      score += 1 * recencyWeight;
    }
  });

  return score;
};

export default function Home() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [language, setLanguage] = useState('english');
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
  const [error, setError] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'english';
    setLanguage(storedLanguage);
    updatePreferences({ preferredLanguage: storedLanguage });
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    updatePreferences({ preferredLanguage: language });
  }, [language]);

  useEffect(() => {
    setCategories([
      'News',
      'Politics',
      'Regional',
      'National',
      'International',
      'Sports',
      'Business',
      'Glamorous',
      'Lifestyle',
      'Science',
      'Technology',
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
      News: 'News',
      Politics: 'Politics',
      Regional: 'Regional',
      National: 'National',
      International: 'International',
      Sports: 'Sports',
      Business: 'Business',
      Glamorous: 'Glamorous',
      Lifestyle: 'Lifestyle',
      Science: 'Science',
      Technology: 'Technology',
      preferences: 'Preferences',
      save: 'Save',
      preferredCategories: 'Preferred Categories:',
      sentimentPositive: 'Positive',
      sentimentNegative: 'Negative',
      sentimentNeutral: 'Neutral',
      error: 'Failed to load headlines. Please try again later.',
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
      News: 'समाचार',
      Politics: 'राजनीति',
      Regional: 'क्षेत्रीय',
      National: 'राष्ट्रीय',
      International: 'अंतरराष्ट्रीय',
      Sports: 'खेल',
      Business: 'व्यापार',
      Glamorous: 'ग्लैमरस',
      Lifestyle: 'लाइफस्टाइल',
      Science: 'विज्ञान',
      Technology: 'प्रौद्योगिकी',
      preferences: 'प्राथमिकताएँ',
      save: 'सहेजें',
      preferredCategories: 'पसंदीदा श्रेणियाँ:',
      sentimentPositive: 'सकारात्मक',
      sentimentNegative: 'नकारात्मक',
      sentimentNeutral: 'तटस्थ',
      error: 'समाचार लोड करने में विफल। कृपया बाद में पुनः प्रयास करें।',
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
      News: 'સમાચાર',
      Politics: 'રાજકારણ',
      Regional: 'પ્રાદેશિક',
      National: 'રાષ્ટ્રીય',
      International: 'આંતરરાષ્ટ્રીય',
      Sports: 'રમતગમત',
      Business: 'વ્યવસાય',
      Glamorous: 'ગ્લેમરસ',
      Lifestyle: 'જીવનશૈલી',
      Science: 'વિજ્ઞાન',
      Technology: 'ટેકનોલોજી',
      preferences: 'પસંદગીઓ',
      save: 'સાચવો',
      preferredCategories: 'પસંદગીની શ્રેણીઓ:',
      sentimentPositive: 'સકારાત્મક',
      sentimentNegative: 'નકારાત્મક',
      sentimentNeutral: 'તટસ્થ',
      error: 'સમાચાર લોડ કરવામાં નિષ્ફળ. કૃપા કરીને પછીથી ફરી પ્રયાસ કરો.',
    },
  };

  const t = translations[language] || translations.english;

  const fetchFeaturedHeadlines = async (selectedCategory, selectedLanguage, pageNum) => {
    setIsLoading(true);
    setError(null);
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
        sentiment: analyzeSentiment(headline.text || '', language),
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
      setError(t.error);
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
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            handleLoadMore();
          }
        },
        { threshold: 0.1 }
      );
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
        timestamp: Date.now(),
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
    News: '📰',
    Politics: '🏛️',
    Regional: '🏞️',
    National: '🇮🇳',
    International: '🌍',
    Sports: '⚽',
    Business: '💼',
    Glamorous: '✨',
    Lifestyle: '🌟',
    Science: '🔬',
    Technology: '💻',
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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleVoiceCommand = (event) => {
      const command = event.detail?.command?.toLowerCase();
      if (command === 'next headline' && tickerHeadlines.length > 0) {
        setCurrentHeadlineIndex((prev) => {
          const newIndex = (prev + 1) % tickerHeadlines.length;
          if (tickerHeadlines[newIndex]) {
            logInteraction(tickerHeadlines[newIndex], 'voice_next');
          }
          return newIndex;
        });
      }
    };
    window.addEventListener('voiceCommand', handleVoiceCommand);
    return () => window.removeEventListener('voiceCommand', handleVoiceCommand);
  }, [tickerHeadlines]);

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
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
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
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}');
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
            fullArticle={tickerHeadlines[currentHeadlineIndex]?.fullText || tickerHeadlines[currentHeadlineIndex]?.text}
            onVoicePlay={() => tickerHeadlines[currentHeadlineIndex] && logInteraction(tickerHeadlines[currentHeadlineIndex], 'voice_play')}
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
                      defaultChecked={preferences.preferredCategories?.includes(cat) || false}
                      className="form-checkbox text-royal-blue"
                    />
                    <span>{categoryIcons[cat] || '📰'} {t[cat] || translations.english[cat]}</span>
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
                  {categoryIcons[cat] || '📰'} {t[cat] || translations.english[cat]}
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
          {error && (
            <p className="col-span-full text-center text-red-500 mb-4">{error}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHeadlines.length === 0 && !isLoading && !error ? (
              <p className="col-span-full text-center text-gray-500">{t.noHeadlines}</p>
            ) : (
              featuredHeadlines.map((headline, index) => {
                const isLastElement = index === featuredHeadlines.length - 1;
                const key = headline.id || `${headline.publishedAt}-${index}`;
                return (
                  <div
                    key={key}
                    ref={isLastElement ? lastHeadlineRef : null}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => logInteraction(headline, 'click')}
                    role="article"
                    aria-labelledby={`headline-${key}`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs text-royal-blue-light">
                        {categoryIcons[headline.category] || '📰'} {headline.category.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        {sentimentIcons[headline.sentiment]}{' '}
                        {t[`sentiment${headline.sentiment.charAt(0).toUpperCase() + headline.sentiment.slice(1)}`] ||
                          translations.english[`sentiment${headline.sentiment.charAt(0).toUpperCase() + headline.sentiment.slice(1)}`]}
                      </span>
                    </div>
                    <h3 id={`headline-${key}`} className="text-lg font-medium text-dark-gray">
                      {headline.text || 'No title'}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{headline.source || 'Unknown'}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {headline.publishedAt
                        ? new Date(headline.publishedAt).toLocaleDateString(
                            language === 'hindi' ? 'hi-IN' : language === 'gujarati' ? 'gu-IN' : 'en-US'
                          )
                        : 'No date'}
                    </p>
                  </div>
                );
              })
            )}
            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <div key={`loading-${index}`} className="bg-white rounded-lg shadow-md p-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
          </div>
        </section>
      </div>

      <footer className="bg-royal-blue text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6">
            {socialMediaLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-gray-200 transition-colors"
                aria-label={link.name}
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
          <p className="text-center mt-4 text-sm">
            © {new Date().getFullYear()} News Pulse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
