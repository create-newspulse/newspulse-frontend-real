const newsApiKeys = ['d6cda5432c664498a61b9716f315f772']; // Only one working
const newsDataKey = 'pub_85406e94a0feb2dd4271a881f45dae915a4cd'; // NewsData.io

export async function fetchTopNewswithAutoKey(category) {
  // 1. Try NewsAPI.org
  for (let key of newsApiKeys) {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${key}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.status === 'ok' && data.articles?.length > 0) {
        console.log('✅ NewsAPI success');
        return data.articles;
      } else {
        console.warn(`❌ NewsAPI Key Failed:`, data);
      }
    } catch (err) {
      console.error('❌ Error with NewsAPI:', err);
    }
  }

  // 2. Fallback: Try NewsData.io
  try {
    const fallbackUrl = `https://newsdata.io/api/1/news?country=in&category=${category}&apikey=${newsDataKey}`;
    const res = await fetch(fallbackUrl);
    const data = await res.json();

    if (data?.results?.length > 0) {
      console.log('✅ NewsData.io fallback success');
      return data.results.map(item => ({
        title: item.title,
        url: item.link,
        urlToImage: item.image_url,
        description: item.description,
        source: { name: item.source_id },
        publishedAt: item.pubDate,
      }));
    } else {
      console.warn('❌ NewsData.io gave no results:', data);
    }
  } catch (err) {
    console.error('❌ NewsData.io error:', err);
  }

  console.error('❌ All sources failed. Returning empty array.');
  return [];
}
