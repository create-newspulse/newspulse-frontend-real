import { useEffect, useState } from 'react';
import { fetchTopNews } from '../lib/fetchTopNews';

export default function TopNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchTopNews().then(setNews).catch(console.error);
  }, []);

  return (
    <section className="py-10 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-800 border-b-2 border-blue-500 pb-2 mb-6">
          📰 Top News Headlines
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((article, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col h-full">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{article.description}</p>
              </a>
              <div className="mt-auto pt-3 text-right text-sm text-blue-500">
                {article.source.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
