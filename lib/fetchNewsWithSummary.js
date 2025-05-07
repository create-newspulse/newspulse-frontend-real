// lib/fetchNewsWithSummary.js
import axios from 'axios';
import summarizeText from './summarizeAI'; // assume OpenAI/AI logic

export async function fetchNewsWithSummary(category) {
  const apiKey = process.env.NEWS_API_KEY;
  const res = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&country=in&apiKey=${apiKey}`);
  const articles = await Promise.all(res.data.articles.map(async (article) => ({
    ...article,
    summary: await summarizeText(article.content || article.description || ''),
  })));

  return articles;
}
