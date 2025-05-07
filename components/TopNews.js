import Image from 'next/image';

export default function TopNews({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <p className="text-center text-yellow-600 font-semibold">
        ⚠️ No top news articles found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {articles.map((article, index) => (
        <div key={index} className="bg-white shadow-md rounded-md overflow-hidden">
          <div className="w-full h-[200px] relative">
            {article.urlToImage ? (
              <Image
                src={article.urlToImage}
                alt={article.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-md"
              />
            ) : (
              <Image
                src="/fallback.jpg"
                alt="No Image"
                layout="fill"
                objectFit="cover"
                className="rounded-t-md"
              />
            )}
          </div>

          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">
              {article.title?.slice(0, 100)}
            </h3>
            <p className="text-sm text-gray-700 line-clamp-4">
              {article.description || 'No description available.'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
