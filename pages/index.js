import TopNews from '../components/TopNews';
import { fetchTopNewswithAutoKey } from '../lib/fetchTopNewsAuto';

export default function Home({ topHeadlines }) {
  const filtered = topHeadlines.filter(a => a.language === 'en' || a.language === 'hi');

  return (
    <section className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">📰 Today’s Highlights</h1>
      {filtered.length > 0 ? (
        <TopNews articles={filtered} />
      ) : (
        <p className="text-center text-yellow-600 font-semibold">
          ⚠️ No top news articles found.
        </p>
      )}
    </section>
  );
}

export async function getStaticProps() {
  const topHeadlines = await fetchTopNewswithAutoKey('general');
  return {
    props: {
      topHeadlines,
    },
    revalidate: 1800,
  };
}
