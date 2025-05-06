export async function fetchTopNewsByCategory(category) {
  const apiKey = 'YOUR_KEY';
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.articles.slice(0, 6); // Limit results
}
