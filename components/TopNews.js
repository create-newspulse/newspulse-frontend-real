import { useEffect, useState } from 'react';
import { fetchTopNews } from '../lib/fetchTopNews';

export default function TopNews() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');

  useEffect(() => {
    fetchTopNews(category)
      .then(setNews)
      .catch(console.error);
  }, [category]);

  const categories = ['general', 'business', 'entertainment', 'science'];

  return (
    <section>
      {/* ✅ Category Tabs */}
      <div className="flex gap-3 mb-4 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm font-medium border transition
              ${category === cat ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'}`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* ✅ Auto-Scroll Animation */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse-on-load">
        {news.map((article, i) => (
          <div key={i} className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 p-4">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{article.source.name}</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
