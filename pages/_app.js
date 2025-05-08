// pages/_app.js
import '../styles/globals.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Hindi Font: Noto Sans Devanagari */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap"
          rel="stylesheet"
        />
        {/* Gujarati Font: Shruti - System fallback */}
        <style>{`
          @font-face {
            font-family: 'Shruti';
            src: local('Shruti');
          }
        `}</style>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
