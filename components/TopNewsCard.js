import Image from 'next/image';

export default function TopNewsCard({ article }) {
  const { title, urlToImage, description, source, publishedAt, language = 'en' } = article;

  const langMap = {
    gu: { badge: '🟢 Gujarati', color: 'bg-green-100 text-green-800' },
    hi: { badge: '🔵 Hindi', color: 'bg-blue-100 text-blue-800' },
    en: { badge: '🔴 English', color: 'bg-red-100 text-red-800' },
  };

  const lang = title.match(/[\u0A80-\u0AFF]/) ? 'gu'
              : title.match(/[\u0900-\u097F]/) ? 'hi' : 'en';

  const langProps = langMap[lang] || langMap.en;

  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border">
      <div className="relative h-[200px] w-full">
        <Image
          src={urlToImage || '/fallback.jpg'}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
      </div>

      <div className="p-4 space-y-2">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${langProps.color}`}>
          {langProps.badge}
        </span>
        <h2 className="text-md font-semibold line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        <div className="text-xs text-gray-400 mt-2 flex justify-between items-center">
          <span>{source?.name || 'Unknown Source'}</span>
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
