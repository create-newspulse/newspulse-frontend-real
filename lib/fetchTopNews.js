// lib/fetchTopNews.js
import axios from 'axios';

const API_KEY = process.env.NEWSDATA_API_KEY; // Set this in your .env.local

export async function fetchTopNewsByCategory(category = 'top') {
  try {
    console.log("🔑 API KEY from env:", API_KEY);
    console.log("📦 Fetching category:", category);

    const response = await axios.get('https://newsdata.io/api/1/news', {
      params: {
        apikey: API_KEY,
        country: 'in',
        category: category,
        language: 'en',
      },
    });

    const articles = response.data.results || [];
    return articles.map(article => ({
      title: article.title,
      description: article.description,
      urlToImage: article.image_url || '/fallback.jpg',
    }));
  } catch (error) {
    console.error('❌ Failed to fetch top news:', error.message);

    // ✅ Bonus: Fallback Dummy Data (optional)
    return [
      {
        title: "📰 Sample News (Offline Mode)",
        description: "Fallback article shown due to API limit or error.",
        urlToImage: "/fallback.jpg",
      },
    ];
  }
}
