import { useEffect, useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import fetchTopNewswithAutoKey from '../lib/fetchTopNewsAuto';

export default function InternationalNews() {
  const { language } = useLanguage();
  const [topHeadlines, setTopHeadlines] = useState([]);

  useEffect(() => {
    if (language === 'english') {
      fetchTopNewswithAutoKey(language).then(setTopHeadlines);
    }
  }, [language]);

  return (
    <>
      <LanguageToggle />
      <main className={`p-4 font-${language}`}>
        <h1 className="text-4xl font-bold text-center text-blue-700">
          🔵 News Pulse – English
        </h1>
        {topHeadlines.length > 0 ? (
          <ul className="mt-6 space-y-2">
            {topHeadlines.map((article, i) => (
              <li key={i}>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-yellow-600 text-center mt-10">⚠️ No news available.</p>
        )}
      </main>
    </>
  );
}