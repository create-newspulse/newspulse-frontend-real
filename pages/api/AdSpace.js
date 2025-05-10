import { useState, useEffect } from 'react';

export default function AdSpace({ language }) {
  const [adConfig, setAdConfig] = useState({ type: 'banner', size: '728x90', priority: 'medium' });
  const [topCategory, setTopCategory] = useState('general');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdConfig = async () => {
      try {
        const response = await fetch('/api/optimize-ads');
        if (!response.ok) throw new Error('Failed to fetch ad config');
        const data = await response.json();
        setAdConfig(data.adConfig);
        setTopCategory(data.topCategory);
      } catch (error) {
        console.error('Error fetching ad config:', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdConfig();
  }, []);

  const translations = {
    english: {
      adLabel: 'Advertisement',
      basedOn: 'Based on your interest in',
    },
    hindi: {
      adLabel: 'विज्ञापन',
      basedOn: 'आपकी रुचि के आधार पर',
    },
    gujarati: {
      adLabel: 'જાહેરાત',
      basedOn: 'તમારી રુચિના આધારે',
    },
  };

  const t = translations[language] || translations.english;
  const fontClass = language === 'hindi' ? 'font-hindi' : language === 'gujarati' ? 'font-gujarati' : 'font-english';

  const adStyles = {
    banner: 'h-24',
    skyscraper: 'w-40 h-96',
    rectangle: 'w-64 h-56',
  };

  if (isLoading) {
    return <div className="bg-gray-200 h-24 flex items-center justify-center rounded-lg">Loading ad...</div>;
  }

  return (
    <div className={`bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 ${adStyles[adConfig.type]} ${fontClass}`}>
      <p className="text-xs text-gray-500 mb-1">
        {t.adLabel} - {t.basedOn} {topCategory.charAt(0).toUpperCase() + topCategory.slice(1)}
      </p>
      <div className="bg-gray-300 w-full h-full flex items-center justify-center rounded">
        <p className="text-gray-500">
          Ad Space - {adConfig.size} ({adConfig.type})
        </p>
      </div>
    </div>
  );
}
