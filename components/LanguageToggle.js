// components/LanguageToggle.js
import { useLanguage } from '../utils/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex justify-center my-4 space-x-3">
      <button onClick={() => setLanguage('english')} className="px-3 py-1 border rounded bg-white hover:bg-gray-200">🌐 English</button>
      <button onClick={() => setLanguage('hindi')} className="px-3 py-1 border rounded bg-white hover:bg-gray-200">🇮🇳 हिन्दी</button>
      <button onClick={() => setLanguage('gujarati')} className="px-3 py-1 border rounded bg-white hover:bg-gray-200">🇬🇮 ગુજરાતી</button>
    </div>
  );
}
