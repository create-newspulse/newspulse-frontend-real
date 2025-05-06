// lib/fetchTopNews.js
export async function fetchTopNews() {
  const apiKey = 'YOUR_NEWSAPI_KEY'; // 🔁 const apiKey = 'd6cda5432c664498a61b9716f315f772';

  const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.articles.slice(0, 5); // Only return top 5
  } catch (error) {
    console.error('Error fetching top news:', error);
    return [];
  }
}
