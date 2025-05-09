// lib/fetchTopNewsAuto.js
const apiKeys = [
  'd6cda5432c664498a61b9716f315f772',
  'pub_85406e94a0feb2dd4271a881f45dae915a4cd'
];

const API_KEY = process.env.NEWS_API_KEY; // or hardcoded for testing
export default async function fetchTopNewswithAutoKey() {
  const res = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`);
  const data = await res.json();
  return data.articles || [];
}
