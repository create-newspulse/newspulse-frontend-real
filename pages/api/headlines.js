// pages/api/headlines.js
import axios from 'axios';

const API_CONFIGS = {
  newsapi: {
    url: (category, page) =>
      `https://newsapi.org/v2/top-headlines?language=en&pageSize=10&page=${page}${
        category ? `&category=${category}` : ''
      }&apiKey=${process.env.NEWSAPI_KEY}`,
    mapResponse: (data) =>
      data.articles.map((article, index) => ({
        id: `${index}-${article.publishedAt || Date.now()}`,
        text: article.title,
        source: article.source.name,
        publishedAt: article.publishedAt,
      })),
  },
  newsdata: {
    url: (category, page) =>
      `https://newsdata.io/api/1/news?language=en&size=10&page=${page}${
        category ? `&category=${category}` : ''
      }&apikey=${process.env.NEWSDATA_API_KEY}`,
    mapResponse: (data) =>
      data.results.map((article, index) => ({
        id: `${index}-${article.pubDate || Date.now()}`,
        text: article.title,
        source: article.source_name || 'Unknown',
        publishedAt: article.pubDate,
      })),
  },
  thenewsapi: {
    url: (category, page) =>
      `https://api.thenewsapi.com/v1/news/top?locale=us&language=en&limit=10&page=${page}${
        category ? `&categories=${category}` : ''
      }&api_token=${process.env.THENEWSAPI_TOKEN}`,
    mapResponse: (data) =>
      data.data.map((article, index) => ({
        id: `${index}-${article.published_at || Date.now()}`,
        text: article.title,
        source: article.source || 'Unknown',
        publishedAt: article.published_at,
      })),
  },
  mediastack: {
    url: (category, page) =>
      `http://api.mediastack.com/v1/news?languages=en&limit=10&offset=${
        (page - 1) * 10
      }${category ? `&categories=${category}` : ''}&access_key=${process.env.MEDIASTACK_API_KEY}`,
    mapResponse: (data) =>
      data.data.map((article, index) => ({
        id: `${index}-${article.published_at || Date.now()}`,
        text: article.title,
        source: article.source || 'Unknown',
        publishedAt: article.published_at,
      })),
  },
  gnews: {
    url: (category, page) =>
      `https://gnews.io/api/v4/top-headlines?lang=en&max=10&from=${
        (page - 1) * 10
      }${category ? `&topic=${category}` : ''}&apikey=${process.env.GNEWS_API_KEY}`,
    mapResponse: (data) =>
      data.articles.map((article, index) => ({
        id: `${index}-${article.publishedAt || Date.now()}`,
        text: article.title,
        source: article.source.name || 'Unknown',
        publishedAt: article.publishedAt,
      })),
  },
};

export default async function handler(req, res) {
  try {
    const { category, page = 1 } = req.query; // Get category and page from query params
    const fetchPromises = Object.entries(API_CONFIGS).map(async ([name, config]) => {
      try {
        const response = await axios.get(config.url(category, page));
        return config.mapResponse(response.data);
      } catch (error) {
        console.error(`Error fetching from ${name}:`, error.message);
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    const allHeadlines = results
      .flat()
      .filter((headline, index, self) =>
        headline.text &&
        index === self.findIndex((h) => h.text.toLowerCase() === headline.text.toLowerCase())
      )
      .sort((a, b) =>
        (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) -
        (a.publishedAt ? new Date(a.publishedAt).getTime() : 0)
      );

    res.status(200).json(allHeadlines.slice(0, 10)); // Limit to 10 per page
  } catch (error) {
    console.error('Failed to fetch headlines:', error.message);
    res.status(500).json({ error: 'Failed to fetch headlines' });
  }
}
