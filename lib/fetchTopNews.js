import axios from 'axios';

const API_KEY = process.env.NEWS_API_KEY; // ✅ Loaded securely from .env.local

export async function fetchTopNewsByCategory(category = 'general') {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'in',
        category,
        pageSize: 10,
        apiKey: API_KEY,
      },
    });

    console.log("📡 API Key:", API_KEY);
    console.log("🔎 Category:", category);

    return response.data.articles;
  } catch (error) {
    console.error('❌ Failed to fetch top news:', error.message);
    return [];
  }
}
