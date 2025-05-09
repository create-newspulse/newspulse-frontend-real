// pages/_app.js
import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
export default MyApp;
import { LanguageProvider } from '../utils/LanguageContext';

export default async function fetchTopNewswithAutoKey(category) { ... }
  return (
    <LanguageProvider>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap"
          rel="stylesheet"
        />
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
