// pages/api/headlines.js
import axios from 'axios';

const API_CONFIGS = {
  newsapi: {
    url: (category, page, language) => {
      const langMap = { english: 'en', hindi: 'hi', gujarati: 'gu' };
      const lang = langMap[language] || 'en';
      return `https://newsapi.org/v2/top-headlines?language=${lang}&pageSize=10&page=${page}${
        category ? `&category=${category}` : ''
      }&apiKey=${process.env.NEWSAPI_KEY}`;
    },
    config: { headers: { 'User-Agent': 'NewsPulse/1.0' } },
    mapResponse: (data) =>
      data.articles.map((article, index) => ({
        id: `${index}-${article.publishedAt || Date.now()}`,
        text: article.title,
        source: article.source.name,
        publishedAt: article.publishedAt,
      })),
  },
  newsdata: {
    url: (category, page, language) => {
      const langMap = { english: 'en', hindi: 'hi', gujarati: 'gu' };
      const lang = langMap[language] || 'en';
      return `https://newsdata.io/api/1/news?language=${lang}&size=10&page=${page}${
        category ? `&category=${category}` : ''
      }&apikey=${process.env.NEWSDATA_API_KEY}`;
    },
    config: { headers: { 'User-Agent': 'NewsPulse/1.0' } },
    mapResponse: (data) =>
      data.results.map((article, index) => ({
        id: `${index}-${article.pubDate || Date.now()}`,
        text: article.title,
        source: article.source_name || 'Unknown',
        publishedAt: article.pubDate,
      })),
  },
  thenewsapi: {
    url: (category, page, language) => {
      const langMap = { english: 'en', hindi: 'hi', gujarati: 'gu' };
      const lang = langMap[language] || 'en';
      return `https://api.thenewsapi.com/v1/news/top?locale=${lang}&language=${lang}&limit=10&page=${page}${
        category ? `&categories=${category}` : ''
      }&api_token=${process.env.THENEWSAPI_TOKEN}`;
    },
    config: { headers: { 'User-Agent': 'NewsPulse/1.0' } },
    mapResponse: (data) =>
      data.data.map((article, index) => ({
        id: `${index}-${article.published_at || Date.now()}`,
        text: article.title,
        source: article.source || 'Unknown',
        publishedAt: article.published_at,
      })),
  },
  mediastack: {
    url: (category, page, language) => {
      const langMap = { english: 'en', hindi: 'hi', gujarati: 'gu' };
      const lang = langMap[language] || 'en';
      return `http://api.mediastack.com/v1/news?languages=${lang}&limit=10&offset=${
        (page - 1) * 10
      }${category ? `&categories=${category}` : ''}&access_key=${process.env.MEDIASTACK_API_KEY}`;
    },
    config: { headers: { 'User-Agent': 'NewsPulse/1.0' } },
    mapResponse: (data) =>
      data.data.map((article, index) => ({
        id: `${index}-${article.published_at || Date.now()}`,
        text: article.title,
        source: article.source || 'Unknown',
        publishedAt: article.published_at,
      })),
  },
  gnews: {
    url: (category, page, language) => {
      const langMap = { english: 'en', hindi: 'hi', gujarati: 'gu' };
      const lang = langMap[language] || 'en';
      return `https://gnews.io/api/v4/top-headlines?lang=${lang}&max=10&from=${
        (page - 1) * 10
      }${category ? `&topic=${category}` : ''}&apikey=${process.env.GNEWS_API_KEY}`;
    },
    config: { headers: { 'User-Agent': 'NewsPulse/1.0' } },
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
    const { category, page = 1, language = 'english' } = req.query;
    const fetchPromises = Object.entries(API_CONFIGS).map(async ([name, config]) => {
      try {
        const response = await axios.get(config.url(category, page, language), config.config || {});
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

    res.status(200).json(allHeadlines.slice(0, 10));
  } catch (error) {
    console.error('Failed to fetch headlines:', error.message);
    res.status(500).json({ error: 'Failed to fetch headlines' });
  }
}
