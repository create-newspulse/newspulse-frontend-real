import { useLanguage } from '../utils/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="text-center space-x-4 py-2">
      <button onClick={() => setLanguage('gujarati')} className="text-green-700">Gujarati</button>
      <button onClick={() => setLanguage('hindi')} className="text-red-600">Hindi</button>
      <button onClick={() => setLanguage('english')} className="text-blue-600">English</button>
    </div>
  );
};

export default LanguageToggle;
