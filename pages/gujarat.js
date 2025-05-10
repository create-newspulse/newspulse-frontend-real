import { useEffect, useState } from 'react';
import fetchGujaratiRSS from '../lib/fetchGujaratiRSS';
import { useLanguage } from '../utils/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

export default function GujaratNews() {
  const { language, setLanguage } = useLanguage();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setLanguage('gujarati'); // Set context
    fetchGujaratiRSS().then(setArticles);
  }, []);

  return (
    <>
      <LanguageToggle />
      <main className="p-4 font-gujarati space-y-6">
        <h1 className="text-4xl font-bold text-green-700 text-center">
          🟢 News Pulse – Gujarati Headlines
        </h1>

        {articles.length > 0 ? (
          <ul className="space-y-4">
            {articles.map((item, i) => (
              <li key={i} className="border-b pb-2">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-700 hover:underline"
                >
                  {item.title}
                </a>
                <p className="text-sm text-gray-600">{item.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Loading Gujarati news...</p>
        )}
      </main>
    </>
  );
}
