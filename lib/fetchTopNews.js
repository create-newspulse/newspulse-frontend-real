// lib/fetchTopNews.js
import axios from 'axios';

const API_KEY =process.env.NEWS_API_KEY=d6cda5432c664498a61b9716f315f772

export async function fetchTopNewsByCategory(category = 'general') {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: 'in',
        category,
        pageSize: 10,
        apiKey: API_KEY,
      },
    });

    return response.data.articles;
  } catch (error) {
    console.error('❌ Failed to fetch top news:', error.message);
    return [];
  }
}
