// lib/fetchTopNewswithAutoKey.js

const apiKeys = [
  'd6cda5432c664498a61b9716f315f772' // add more if needed
];

let currentKeyIndex = 0;

export function fetchTopNewswithAutoKey(category = 'general') { ... }
  while (currentKeyIndex < apiKeys.length) {
    const apiKey = apiKeys[currentKeyIndex];
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.status === 'ok' && Array.isArray(data.articles)) {
        return data.articles.filter(article => article.title);
      } else {
        currentKeyIndex++;
      }
    } catch (err) {
      currentKeyIndex++;
    }
  }
  return [];
}
