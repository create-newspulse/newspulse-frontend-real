export default async function fetchGujaratiRSS() {
  const res = await fetch('https://rss.app/feeds/v1.1/LIHKxoQ9OUnxLIHx.json');
  const data = await res.json();
  return data.items || []; // returns list of news articles
}
