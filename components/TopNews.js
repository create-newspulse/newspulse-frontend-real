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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {news.map((article, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-sm text-gray-500 mt-2">{article.source.name}</p>
          </a>
        </div>
      ))}
    </div>
  );
}
