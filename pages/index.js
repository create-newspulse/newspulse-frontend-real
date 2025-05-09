import { useLanguage } from '../utils/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

export default function HomePage() {
  const { language } = useLanguage();

  return (
    <main className={`p-4 font-${language}`}>
      <h1 className="text-4xl text-center font-bold text-green-700">
        🏠 Welcome to News Pulse
      </h1>
      <p className="text-center mt-2 text-gray-600">
        Explore news in Gujarati, Hindi, or English.
      </p>
      <LanguageToggle />
      <ul className="mt-8 space-y-3 text-center">
        <li><a href="/gujarat" className="text-blue-600 underline">🟢 Gujarati News</a></li>
        <li><a href="/india" className="text-blue-600 underline">🔶 Hindi News</a></li>
        <li><a href="/international" className="text-blue-600 underline">🔵 English News</a></li>
      </ul>
    </main>
  );
}