import Image from 'next/image';

const TopNewsCard = ({ article }) => {
  const { title, description, urlToImage, language = 'en' } = article;

  const langColor = {
    gu: '🟢 Gujarati',
    hi: '🔵 Hindi',
    en: '🔴 English',
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col gap-2 border border-gray-100">
      <div className="relative w-full h-40 overflow-hidden rounded-md">
        <Image
          src={urlToImage || '/fallback.jpg'}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      <span className="text-xs mt-2 font-medium">
        {langColor[language] || '🌐 Unlabeled'}
      </span>
    </div>
  );
};

export default TopNewsCard;
