import { useEffect, useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import fetchTopNewswithAutoKey from '../lib/fetchTopNewsAuto';

export default function GujaratNews() {
  const { language } = useLanguage();
  const [topHeadlines, setTopHeadlines] = useState([]);

  useEffect(() => {
    async function loadNews() {
      const articles = await fetchTopNewswithAutoKey(language);
      setTopHeadlines(articles);
    }
    loadNews();
  }, [language]);

  return (
    <>
      <LanguageToggle />
      <main className={`p-4 sm:p-6 lg:p-8 font-${language}`}>
        <h1 className="text-4xl font-bold text-center text-green-700">
          🟢 News Pulse — Gujarat | Hindi | English
        </h1>

        {topHeadlines.length > 0 ? (
          <ul className="mt-6 space-y-2">
            {topHeadlines.map((article, index) => (
              <li key={index}>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-yellow-600 mt-10">⚠️ No news available.</p>
        )}
      </main>
    </>
  );
}