import { useEffect, useState } from 'react';
import { fetchTopNews } from '../lib/fetchTopNews';

export default function TopNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchTopNews()
      .then(setNews)
      .catch(console.error);
  }, []);

  return (
    <section className="bg-gray-50 py-6 px-4 rounded-xl shadow-md mt-10 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-800 border-b-2 border-blue-300 pb-2">📰 Top Stories</h2>
      <ul className="space-y-4">
        {news.map((article, i) => (
          <li key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg font-semibold text-blue-700 hover:underline"
            >
              {article.title}
            </a>
            <p className="text-sm text-gray-600 mt-1">{article.source.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
