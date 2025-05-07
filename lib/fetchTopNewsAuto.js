const apiKeys = [
  'd6cda5432c664498a61b9716f315f772',
  'aa842c00321b428a5c55186dd83ad0b3',
  'f703727c81cc39fd08ef8074b59c8ba0',
];

let currentKeyIndex = 0;

export async function fetchTopNewswithAutoKey(category) {
  while (currentKeyIndex < apiKeys.length) {
    const apiKey = apiKeys[currentKeyIndex];
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.status === 'ok' && Array.isArray(data.articles)) {
        return data.articles
          .map(article => ({
            ...article,
            language: /[\u0900-\u097F]/.test(article.title) ? 'hi' : 'en',
          }))
          .filter(article => article.language === 'en' || article.language === 'hi');
      } else {
        console.warn(`⚠️ Key[${currentKeyIndex}] failed:`, data);
        currentKeyIndex++;
      }
    } catch (err) {
      console.error(`Error with Key[${currentKeyIndex}]:`, err);
      currentKeyIndex++;
    }
  }

  console.error('❌ All API keys failed. Returning empty array.');
  return [];
}
