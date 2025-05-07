// lib/fetchTopNews.js
import axios from 'axios';

let cache = null;
let lastFetch = 0;

export async function fetchTopNewsByCategory(category) {
  const now = Date.now();
  if (cache && now - lastFetch < 60000) return cache;

  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;

  const res = await axios.get(url);
  cache = res.data.articles;
  lastFetch = now;

  return cache;
}
