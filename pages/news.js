// pages/news.js
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&pageSize=5&apiKey=d6cda5432c664498a61b9716f315f772`
      );
      const data = await res.json();
      setArticles(data.articles || []);
    };

    fetchNews();
  }, []);

  return (
    <>
      <Head>
        <title>Top News | News Pulse</title>
      </Head>

      <main className="min-h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">🗞️ Top Headlines - India</h1>

        <div className="space-y-6">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-600 transition hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
              <p className="text-sm text-gray-500">{article.source.name} – {new Date(article.publishedAt).toLocaleString()}</p>
              <p className="mt-2 text-gray-700">{article.description}</p>
              {article.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 mt-3 inline-block underline"
                >
                  Read more →
                </a>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
