import BreakingTicker from '../components/BreakingTicker';
import TopNews from '../components/TopNews';
import TrendingNow from '../components/TrendingNow';
import WebStories from '../components/WebStories';
import { fetchTopNewswithAutoKey } from '../lib/fetchTopNewsAuto';

export default function GujaratNews({ topHeadlines }) {
  return (
    <>
      <BreakingTicker />

      <main className="font-gujarati p-4 sm:p-6 lg:p-8 space-y-10">
        <h1 className="text-4xl font-bold text-center text-green-700">
          🟢 ગુજરાત ન્યૂઝ પલ્સ
        </h1>

        {topHeadlines.length > 0 ? (
          <TopNews articles={topHeadlines} />
        ) : (
          <p className="text-center text-yellow-600 font-medium">
            ⚠️ હાલ કોઈ મુખ્ય સમાચાર ઉપલબ્ધ નથી.
          </p>
        )}

        <TrendingNow />
        <WebStories />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const allArticles = await fetchTopNewswithAutoKey('general');

  return {
    props: {
      topHeadlines: allArticles || [],
    },
    revalidate: 1800,
  };
}
