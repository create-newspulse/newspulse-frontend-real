import TopNews from '../components/TopNews';
import { fetchTopNewswithAutoKey } from '../lib/fetchTopNewsAuto'; // ✅ Correct filename

export default function Home({ topHeadlines }) {
  return (
    <section className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">📰 Today’s Highlights</h1>
      <TopNews articles={topHeadlines} />

      <section className="bg-gray-100 p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">🌍 Trending Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          {/* You can populate categories here */}
        </div>
      </section>
    </section>
  );
}

export async function getStaticProps() {
  const topHeadlines = await fetchTopNewswithAutoKey('top'); // ✅ Uses rotating keys

  return {
    props: {
      topHeadlines,
    },
    revalidate: 1800, // 🔁 Optional: ISR refreshes every 30 mins
  };
}
