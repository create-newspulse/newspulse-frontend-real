import axios from 'axios';

const API_KEY = process.env.NEWSDATA_API_KEY;

export async function fetchTopNewsByCategory(category = 'top') {
  try {
    console.log("🔑 API KEY from env:", API_KEY);
    console.log("📦 Fetching category:", category);

    const response = await axios.get('https://newsdata.io/api/1/news', {
      params: {
        apikey: API_KEY,
        country: 'in',
        category,
        language: 'en',
      },
    });

    const articles = response.data.results.map((item) => ({
      title: item.title,
      description: item.description,
      urlToImage: item.image_url || '/fallback.jpg',
    }));

    return articles;
  } catch (error) {
    console.error('❌ Failed to fetch top news:', error.message);

    // ✅ Optional Fallback Dummy Data
    return [
      {
        title: 'Fallback Headline: Stay tuned!',
        description: 'No live data now. Showing a fallback headline for preview.',
        urlToImage: '/fallback.jpg',
      },
    ];
  }
}
