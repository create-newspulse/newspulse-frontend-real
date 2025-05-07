// lib/fetchTopNews.js

export async function fetchTopNewsByCategory(category) {
  const apiKey = 'd6cda5432c664498a61b9716f315f772'; // ✅ Your real key
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("✅ NewsAPI Response:", data); // ✅ For Debug
    return data.articles.slice(0, 6); // ✅ Only return top 6
  } catch (error) {
    console.error('❌ Error fetching top news by category:', error);
    return [];
  }
}
