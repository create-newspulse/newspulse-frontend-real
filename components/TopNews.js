import { useEffect, useState } from 'react';
import { fetchTopNewsByCategory } from '../lib/fetchTopNews'; // ✅ Correct import

const categories = ['general', 'business', 'entertainment', 'science'];

export default function TopNews() {
  const [news, setNews] = useState([]);
  const [selected, setSelected] = useState('general');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTopNewsByCategory(selected)
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selected]);

  return (
    <div>
      {/* ✅ Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 font-medium ${
              selected === cat
                ? 'bg-blue-600 text-white shadow'
                : 'border-blue-600 text-blue-600 hover:bg-blue-50'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* ✅ News Card Section */}
      {loading ? (
        <p className="text-gray-500 text-center animate-pulse">Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x">
          {news.map((article, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-4 snap-start animate-pulse-on-load hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h3>
              <p className="text-sm text-gray-500">{article.source.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
