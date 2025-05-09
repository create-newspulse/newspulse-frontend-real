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
        Choose your preferred language and explore Gujarati, Hindi, or English news sections.
      </p>
      <LanguageToggle />
      <ul className="mt-8 space-y-3 text-center">
        <li><a href="/gujarat" className="text-blue-600 underline">🟢 News Pulse – Gujarati</a></li>
        <li><a href="/india" className="text-blue-600 underline">🔶 News Pulse – Hindi</a></li>
        <li><a href="/international" className="text-blue-600 underline">🔵 News Pulse – English</a></li>
      </ul>
    </main>
  );
}