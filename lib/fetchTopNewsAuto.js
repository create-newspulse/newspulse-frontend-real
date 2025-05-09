// lib/fetchTopNewsAuto.js

export default async function fetchTopNewswithAutoKey(category = 'general') {
  const apiKeys = [
    'd6cda5432c664498a61b9716f315f772',
    'pub_85406e94a0feb2dd4271a881f45dae915a4cd',
  ];

  const key = apiKeys[Math.floor(Math.random() * apiKeys.length)];
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${key}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data || !Array.isArray(data.articles)) {
      console.warn('❌ Invalid data format from API');
      return [];
    }
    return data.articles;
  } catch (error) {
    console.error('❌ Error fetching news:', error.message);
    return [];
  }
}
