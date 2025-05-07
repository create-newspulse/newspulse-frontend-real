import Image from 'next/image';

export default function TopNews({ articles }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <div key={index} className="bg-white shadow-md rounded-md overflow-hidden p-4">
          <div className="relative w-full h-56 mb-4">
            <Image
              src={article.urlToImage || '/fallback.jpg'}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-md"
            />
          </div>
          <h2 className="text-lg font-bold">{article.title}</h2>
          <p className="text-sm text-gray-600">{article.description?.slice(0, 150)}...</p>
        </div>
      ))}
    </div>
  );
}
