// lib/fetchTopNewsAuto.js

const apiKeys = [
  'd6cda5432c664498a61b9716f315f772', // ✅ Add more if you have
];

let currentKeyIndex = 0;

export default async function fetchTopNewsAuto(category = 'general') {
  while (currentKeyIndex < apiKeys.length) {
    const apiKey = apiKeys[currentKeyIndex];
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.status === 'ok' && Array.isArray(data.articles)) {
        return data.articles
          .filter(article => article.title)
          .map(article => ({
            ...article,
            language: /[\u0900-\u097F]/.test(article.title) ? 'hi' : 'en',
          }));
      } else {
        console.warn(`⚠️ Key[${currentKeyIndex}] failed:`, data);
        currentKeyIndex++;
      }
    } catch (err) {
      console.error(`❌ API key error:`, err.message);
      currentKeyIndex++;
    }
  }

  
  console.error('❌ All API keys failed. Returning empty array.');
  return [];
}

