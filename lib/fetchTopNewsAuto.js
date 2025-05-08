// lib/fetchTopNewsAuto.js

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export default async function fetchTopNewsAuto() {
  try {
    const res = await fetch(`${BASE_URL}?country=in&pageSize=6&apiKey=${API_KEY}`);
    const data = await res.json();

    if (!data.articles || !Array.isArray(data.articles)) {
      console.warn('⚠️ No articles found in API response.');
      return [];
    }

    return data.articles.filter(article => article.title); // filter out blank titles
  } catch (error) {
    console.error('❌ fetchTopNewsAuto error:', error.message);
    return [];
  }
}
