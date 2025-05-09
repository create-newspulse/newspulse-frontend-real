// lib/fetchTopNewsAuto.js
export default async function fetchTopNewswithAutoKey(category) {
  const apiKeys = ['YOUR_API_KEY_1', 'YOUR_API_KEY_2']; // ✅ rotate if needed
  const key = apiKeys[Math.floor(Math.random() * apiKeys.length)];
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${key}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.articles;
}
