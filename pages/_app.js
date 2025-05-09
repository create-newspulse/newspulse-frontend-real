// pages/_app.js
import '../styles/globals.css';
import { LanguageProvider } from '../utils/LanguageContext'; // ✅ import provider

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider> {/* ✅ wrap the entire app */}
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;