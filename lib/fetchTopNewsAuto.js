export default async function fetchTopNewswithAutoKey(language = 'english') {
  const API_KEY =d6cda5432c664498a61b9716f315f772; // Replace with your actual API key
  const langCode = language === 'hindi' ? 'hi' : language === 'gujarati' ? 'gu' : 'en';

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&language=${langCode}&apiKey=${API_KEY}`
  );
  const data = await res.json();
  return data.articles || [];
}
