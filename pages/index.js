import Head from 'next/head';
import BreakingNews from '../components/BreakingNews';
import TrendingNews from '../components/TrendingNews';
import NewsCard from '../components/NewsCard';

export async function getServerSideProps() {
  const res = await fetch(
    'https://newspulse-backend-real.onrender.com/api/news',
  );
  const news = await res.json();

  return { props: { news } };
}

export default function Home({ news }) {
  return (
    <div>
      <Head>
        <title>News Pulse - Your Pulse on What Matters Most</title>
        <meta
          name="description"
          content="Get latest breaking news, trending stories, and much more."
        />
      </Head>
      <BreakingNews news={news} />
      <TrendingNews news={news} />
      <div style={{ padding: '20px' }}>
        {news.map((article) => (
          <NewsCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
}
