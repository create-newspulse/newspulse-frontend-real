// lib/fetchTopNewsAuto.js
import fetchTopNewswithAutoKey from '../lib/fetchTopNewsAuto';
  const apiKeys = ['d6cda5432c664498a61b9716f315f772', 'pub_85406e94a0feb2dd4271a881f45dae915a4cd']; // ✅ rotate if needed
  const key = apiKeys[Math.floor(Math.random() * apiKeys.length)];
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${key}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.articles;
}
