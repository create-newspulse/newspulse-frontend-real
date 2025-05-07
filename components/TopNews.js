// components/TopNews.js
import Image from 'next/image';

const TopNews = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {articles.map((article, index) => (
        <div key={index} className="bg-white rounded-xl shadow p-3">
          <div className="relative w-full h-60">
            <Image
              src={article.urlToImage || '/fallback.jpg'}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
              onError={(e) => (e.target.src = '/fallback.jpg')}
            />
          </div>
          <h2 className="font-semibold mt-3 text-lg">{article.title}</h2>
          <p className="text-sm text-gray-600">{article.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TopNews;
