import TopNews from '../components/TopNews';
import { fetchTopNewsByCategory } from '../lib/fetchTopNews';

export default function Home({ topHeadlines }) {
  return (
    <section className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">📰 Today’s Highlights</h1>
      <TopNews articles={topHeadlines} />

      <section className="bg-gray-100 p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">🌍 Trending Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          {/* add your category blocks here */}
        </div>
      </section>
    </section>
  );
}

export async function getStaticProps() {
  const topHeadlines = await fetchTopNewsByCategory('general');

  // ✅ Safe to log here
  console.log("📰 topHeadlines fetched:", topHeadlines?.length || 0);

  return {
    props: {
      topHeadlines,
    },
  };
}
