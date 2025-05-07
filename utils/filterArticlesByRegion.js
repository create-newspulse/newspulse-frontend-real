import { detectLanguage } from './detectLanguage';

export function filterArticlesByRegion(articles, region) {
  const priorityMap = {
    gujarat: ['gu', 'hi', 'en'],
    india: ['hi', 'en', 'gu'],
    international: ['en', 'hi', 'gu'],
  };

  const priorities = priorityMap[region] || ['en'];

  return articles
    .map(article => ({
      ...article,
      language: detectLanguage(article.title),
    }))
    .filter(article => priorities.includes(article.language));
}
