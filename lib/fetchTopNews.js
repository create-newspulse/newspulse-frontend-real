// lib/fetchTopNews.js

export async function fetchTopNewsByCategory(category) {
  const apiKey = 'YOUR_NEWSAPI_KEY'; // ✅ Use your actual API key
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.articles.slice(0, 6); // Only return top 6 results
  } catch (error) {
    console.error('Error fetching news by category:', error);
    return [];
  }
}
