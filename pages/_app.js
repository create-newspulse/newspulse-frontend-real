// pages/_app.js
import '../styles/globals.css';
import { LanguageProvider } from '../utils/LanguageContext';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            @font-face {
              font-family: 'Shruti';
              src: local('Shruti');
            }
          `}
        </style>
      </Head>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
