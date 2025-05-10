// pages/_app.js
import '../styles/globals.css';
import '../styles/BreakingTicker.css'; // ✅ Add this here
import { LanguageProvider } from '../utils/LanguageContext';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;
