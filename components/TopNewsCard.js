import Image from 'next/image';

export default function TopNewsCard({ article }) {
  const { title, urlToImage, description, source, publishedAt, language = 'en', url } = article;

  // Detect language
  const lang = title.match(/[\u0A80-\u0AFF]/) ? 'gu'
              : title.match(/[\u0900-\u097F]/) ? 'hi' : 'en';

  const langMap = {
    gu: { badge: '🟢 Gujarati', color: 'bg-green-100 text-green-800' },
    hi: { badge: '🔵 Hindi', color: 'bg-blue-100 text-blue-800' },
    en: { badge: '🔴 English', color: 'bg-red-100 text-red-800' },
  };

  const langProps = langMap[lang] || langMap.en;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className="bg-white shadow hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border hover:scale-[1.02]">
        {/* Image */}
        <div className="relative h-[180px] w-full">
          <Image
            src={urlToImage || '/fallback.jpg'}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${langProps.color}`}>
              {langProps.badge}
            </span>
            <span className="text-xs text-gray-400">{new Date(publishedAt).toLocaleDateString()}</span>
          </div>

          <h2 className="text-md font-semibold leading-tight line-clamp-2">{title}</h2>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

          <div className="text-xs mt-3 text-right text-blue-500 font-medium underline">
            {source?.name || 'Read more'}
          </div>
        </div>
      </div>
    </a>
  );
}
