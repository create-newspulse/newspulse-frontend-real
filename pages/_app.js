import '../styles/globals.css';
import Head from 'next/head';
import { LanguageProvider } from '../utils/LanguageContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Head>
        {/* Hindi Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap"
          rel="stylesheet"
        />
        {/* Gujarati Font - system fallback */}
        <style>{`
          @font-face {
            font-family: 'Shruti';
            src: local('Shruti');
          }
        `}</style>
      </Head>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
