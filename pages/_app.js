// pages/_app.js
import { LanguageProvider } from '../utils/LanguageContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;
