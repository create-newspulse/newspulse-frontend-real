export async function fetchTopNews(category = 'general') {
  const apiKey = 'YOUR_NEWSAPI_KEY';
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.articles.slice(0, 9); // Return top 9 for grid
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}
