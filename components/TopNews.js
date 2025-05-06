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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-blue-700">📰 Top Stories</h2>
      <ul className="space-y-2">
        {news.map((article, i) => (
          <li key={i} className="bg-white p-3 rounded-lg shadow-md hover:bg-gray-50 transition">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">
              {article.title}
            </a>
            <p className="text-sm text-gray-600 mt-1">{article.source.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
