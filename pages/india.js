import { useEffect, useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import fetchTopNewswithAutoKey from '../lib/fetchTopNewsAuto';

export default function IndiaNews() {
  const { language, setLanguage } = useLanguage();
  const [topHeadlines, setTopHeadlines] = useState([]);

  useEffect(() => {
    setLanguage('hindi');
    fetchTopNewswithAutoKey('hindi').then(setTopHeadlines);
  }, []);

  return (
    <>
      <LanguageToggle />
      <main className="p-4 font-hindi">
        <h1 className="text-4xl font-bold text-center text-orange-700">
          🔶 News Pulse – Hindi
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
          <p className="text-yellow-600 text-center mt-10">⚠️ कोई समाचार उपलब्ध नहीं है।</p>
        )}
      </main>
    </>
  );
}