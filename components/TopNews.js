import Image from 'next/image';
import { useState } from 'react';

const langLabels = {
  gu: 'Gujarati 🟢',
  hi: 'Hindi 🔵',
  en: 'English 🔴',
};

export default function TopNews({ articles }) {
  const [selectedLang, setSelectedLang] = useState('all');

  const filtered = selectedLang === 'all'
    ? articles
    : articles.filter(a => a.language === selectedLang);

  return (
    <>
      <div className="flex justify-end mb-4">
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="border px-3 py-1 rounded shadow-sm text-sm"
        >
          <option value="all">🌍 All Languages</option>
          <option value="gu">🟢 Gujarati</option>
          <option value="hi">🔵 Hindi</option>
          <option value="en">🔴 English</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article, index) => (
          <div key={index} className="bg-white shadow rounded-xl overflow-hidden">
            <div className="relative w-full h-56">
              <Image
                src={article.urlToImage || '/fallback.jpg'}
                alt={article.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>
            <div className="p-4 space-y-2">
              <h2 className="font-bold text-lg">{article.title}</h2>
              <p className="text-sm text-gray-600">{article.description}</p>
              <p className="text-xs text-right italic text-gray-500">
                {langLabels[article.language] || '🌐'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
