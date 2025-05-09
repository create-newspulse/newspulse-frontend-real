// components/LanguageToggle.js
import { useLanguage } from '../utils/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="text-center mt-4">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border rounded px-3 py-1"
      >
        <option value="english">English</option>
        <option value="hindi">हिन्दी</option>
        <option value="gujarati">ગુજરાતી</option>
      </select>
    </div>
  );
}
