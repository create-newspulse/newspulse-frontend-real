import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function TopNewsCard({ article }) {
  const {
    title,
    urlToImage,
    description,
    source,
    publishedAt,
    url,
    verified,
    category = 'general',
  } = article;

  // Detect language from title
  const lang = title.match(/[\u0A80-\u0AFF]/) ? 'gu'
              : title.match(/[\u0900-\u097F]/) ? 'hi' : 'en';

  const langMap = {
    gu: { badge: '🟢 Gujarati', color: 'bg-green-100 text-green-800' },
    hi: { badge: '🔵 Hindi', color: 'bg-blue-100 text-blue-800' },
    en: { badge: '🔴 English', color: 'bg-red-100 text-red-800' },
  };

  const categoryIcon = {
    business: '📊',
    entertainment: '🎬',
    science: '🧠',
    politics: '⚖️',
    international: '🌐',
    general: '📰',
  };

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('savedNews') || '[]');
    setSaved(savedList.includes(title));
  }, [title]);

  const toggleSave = (e) => {
    e.preventDefault();
    const savedList = JSON.parse(localStorage.getItem('savedNews') || '[]');
    if (savedList.includes(title)) {
      const updated = savedList.filter((t) => t !== title);
      localStorage.setItem('savedNews', JSON.stringify(updated));
      setSaved(false);
    } else {
      savedList.push(title);
      localStorage.setItem('savedNews', JSON.stringify(savedList));
      setSaved(true);
    }
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang === 'gu' ? 'gu-IN' : lang === 'hi' ? 'hi-IN' : 'en-US';
    window.speechSynthesis.speak(speech);
  };

  const langProps = langMap[lang] || langMap.en;
  const catIcon = categoryIcon[category.toLowerCase()] || '📰';

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
          <div className="flex justify-between items-center text-xs">
            <span className={`px-2 py-1 rounded-full font-medium ${langProps.color}`}>
              {langProps.badge}
            </span>
            <span className="text-gray-400">{new Date(publishedAt).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span>{catIcon}</span>
            <span className="font-semibold leading-tight line-clamp-2">{title}</span>
          </div>

          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

          <div className="flex justify-between items-center mt-2 text-xs">
            {/* Auto-colored source badge */}
            <span
              className={`px-2 py-0.5 rounded-full ${
                source?.name?.includes('BBC') ? 'bg-indigo-100 text-indigo-800' :
                source?.name?.includes('India') ? 'bg-blue-100 text-blue-800' :
                source?.name?.includes('ANI') ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-600'
              }`}
            >
              {source?.name || 'Unknown Source'}
            </span>

            {/* AI Verified Tag */}
            {verified && (
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                ✅ Verified by AI
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-2 text-lg">
            {/* 🔊 Voice Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                speak(title);
              }}
              title="Listen to headline"
              className="text-gray-500 hover:text-black transition"
            >
              🔊
            </button>

            {/* 🔖 Save Button */}
            <button
              onClick={toggleSave}
              title={saved ? 'Saved' : 'Save for later'}
              className="text-gray-500 hover:text-black transition"
            >
              {saved ? '🔖' : '📄'}
            </button>
          </div>
        </div>
      </div>
    </a>
  );
}
