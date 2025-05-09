import '../styles/globals.css';
import { useLanguage } from '../utils/LanguageContext'; // ✅

export default function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
