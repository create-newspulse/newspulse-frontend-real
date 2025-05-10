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
  if (preferences.preferredCategories.includes(headline.category)) score += 2;

  const recentInteractions = interactions.slice(-10); // Consider last 10 interactions
  recentInteractions.forEach((interaction, index) => {
    const recencyWeight = (10 - index) / 10; // More recent = higher weight
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
  const [language, setLanguage] = useState('english'); // Default for SSR
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
  const [error, setError] = useState(null); // For API error feedback
  const observerRef = useRef(null);

  // Sync language with localStorage on client side
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

  // Voice command handling with fixed logging
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleVoiceCommand = (event) => {
      const command = event.detail?.command?.toLowerCase();
      if (command === 'next headline') {
        setCurrentHeadlineIndex((prev) => {
          const newIndex = (prev + 1) % tickerHeadlines.length;
          logInteraction(tickerHeadlines[newIndex], 'voice_next');
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
        <meta name="keywords" content="news, breaking news
