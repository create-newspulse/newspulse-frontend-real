// components/TrendingStories.js
import Image from 'next/image';

const TrendingStories = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-3 text-red-600">🔥 Trending Now</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {articles.slice(0, 8).map((article, index) => (
          <div
            key={index}
            className="min-w-[200px] max-w-[200px] bg-white rounded-xl shadow-md overflow-hidden snap-start"
          >
            <div className="w-full h-28 relative">
              <Image
                src={article.urlToImage || '/fallback.jpg'}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2">
              <p className="text-sm font-medium line-clamp-2">{article.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingStories;
