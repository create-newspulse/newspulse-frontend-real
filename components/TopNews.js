import { useEffect, useState } from 'react';
import { fetchTopNewsByCategory } from '../lib/fetchTopNews';

const categories = ['general', 'business', 'entertainment', 'science'];

export default function TopNews() {
  const [news, setNews] = useState([]);
  const [selected, setSelected] = useState('general');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTopNewsByCategory(selected)
      .then(data => {
        console.log('✅ NewsAPI Response:', data);
        setNews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selected]);

  return (
    <div className="mt-6">
      {/* 🔘 Category Buttons */}
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

      {/* 📰 News Grid / Reel */}
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading top news...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x sm:snap-none pb-4">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 min-w-[280px] snap-start animate-pulse-on-load hover:shadow-lg transition duration-300"
            >
              {/* 🖼️ Thumbnail */}
              {article.urlToImage ? (
                <img
                  src={article.urlToImage}
                  alt="News Thumbnail"
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 rounded-md mb-3 flex items-center justify-center text-sm text-gray-400">
                  No Image
                </div>
              )}

              {/* 📄 Content */}
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 line-clamp-2 mb-2">
                  {article.title}
                </h3>
              </a>
              <p className="text-sm text-gray-500">{article.source.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
