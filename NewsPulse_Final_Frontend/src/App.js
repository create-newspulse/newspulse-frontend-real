require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const API_CONFIGS = {
  newsapi: {
    url: `https://newsapi.org/v2/top-headlines?language=en&pageSize=10&apiKey=${process.env.NEWSAPI_KEY}`,
    mapResponse: (data) => data.articles.map((article, index) => ({
      id: `${index}-${article.publishedAt || Date.now()}`,
      text: article.title,
      source: article.source.name,
      publishedAt: article.publishedAt,
    })),
  },
  // Add other APIs similarly
};

app.get('/api/headlines', async (req, res) => {
  try {
    const fetchPromises = Object.values(API_CONFIGS).map(async (config) => {
      const response = await axios.get(config.url);
      return config.mapResponse(response.data);
    });
    const headlines = (await Promise.all(fetchPromises)).flat();
    res.json(headlines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch headlines' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
