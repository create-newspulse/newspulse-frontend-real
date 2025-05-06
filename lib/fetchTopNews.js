export async function fetchTopNews() {
  const apiKey = process.env.NEWS_API_KEY;

  const res = await fetch(`https://newsapi.org/v2/top-headlines?country=in&pageSize=5`, {
    headers: {
      'X-Api-Key': apiKey,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch top news');
  }

  const data = await res.json();
  return data.articles || [];
}
