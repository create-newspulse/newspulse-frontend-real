import { useLanguage } from '../utils/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleChange = (e) => {
    const selected = e.target.value;
    setLanguage(selected);
    localStorage.setItem('lang', selected); // make sure it's remembered
  };

  return (
    <select
      value={language}
      onChange={handleChange}
      className="border rounded p-2 text-base font-medium bg-white shadow"
    >
      <option value="english">🌐 English</option>
      <option value="hindi">🔶 हिंदी</option>
      <option value="gujarati">🟢 ગુજરાતી</option>
    </select>
  );
}