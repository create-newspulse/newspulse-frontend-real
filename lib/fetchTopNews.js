import axios from 'axios';

const NEWSDATA_KEY = process.env.NEWSDATA_API_KEY || 'pub_85406e94a0feb2dd4271a881f45dae915a4cd';
const NEWSAPI_KEY = process.env.NEWSAPI_KEY || 'd6cda5432c664498a61b9716f315f772';

function formatArticles(articles = []) {
  return articles.map((item) => ({
    title: item.title,
    description: item.description || '',
    urlToImage: item.image_url || item.urlToImage || '/fallback.jpg',
  }));
}

export async function fetchTopNewsByCategory(category = 'top') {
  try {
    // 🌐 Try NewsData.io First
    const newsdataRes = await axios.get('https://newsdata.io/api/1/news', {
      params: {
        apikey: NEWSDATA_KEY,
        country: 'in',
        category,
        language: 'en',
      },
    });

    if (newsdataRes.data?.results?.length > 0) {
      console.log('✅ Fetched from NewsData.io');
      return formatArticles(newsdataRes.data.results);
    }

    throw new Error('NewsData.io returned empty or invalid data');
  } catch (err1) {
    console.warn('⚠️ NewsData failed, switching to NewsAPI.org');

    try {
      const fallbackRes = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          apiKey: NEWSAPI_KEY,
          country: 'in',
          category,
          pageSize: 10,
        },
      });

      if (fallbackRes.data?.articles?.length > 0) {
        console.log('✅ Fetched from NewsAPI.org (fallback)');
        return formatArticles(fallbackRes.data.articles);
      }

      throw new Error('NewsAPI.org returned empty');
    } catch (err2) {
      console.error('❌ All sources failed:', err2.message);
      return [
        {
          title: '⚠️ No news available at the moment',
          description: 'Try again later. This is fallback content.',
          urlToImage: '/fallback.jpg',
        },
      ];
    }
  }
}
