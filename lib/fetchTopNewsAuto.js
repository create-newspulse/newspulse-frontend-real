// lib/fetchTopNewsAuto.js
export default async function fetchTopNewswithAutoKey(language = 'english') {
  const API_KEY = 'YOUR_NEWSAPI_KEY'; // 🔁 Replace with your real key
  const langCode = language === 'hindi' ? 'hi' : language === 'gujarati' ? 'gu' : 'en';

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&language=${langCode}&apiKey=${API_KEY}`
  );
  const data = await res.json();
  return data.articles || [];
}
