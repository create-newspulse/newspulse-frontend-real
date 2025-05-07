import Image from 'next/image';

const TopNews = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        ⚠️ No top news articles found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {articles.map((article, index) => (
        <div key={index} className="bg-white rounded-xl shadow p-3 overflow-hidden">
          <div className="relative w-full h-60">
            <Image
              src={article.urlToImage || '/fallback.jpg'}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
              priority
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
