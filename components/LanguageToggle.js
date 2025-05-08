// components/LanguageToggle.js
import { useLanguage } from '../utils/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex justify-end mb-4">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1 text-sm font-medium focus:outline-none focus:ring"
      >
        <option value="gu">🇮🇳 ગુજરાતી</option>
        <option value="hi">🇮🇳 हिंदी</option>
        <option value="en">🌐 English</option>
      </select>
    </div>
  );
}
