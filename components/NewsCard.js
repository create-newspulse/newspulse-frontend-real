import Link from 'next/link';

export default function NewsCard({ article }) {
  return (
    <div style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
      <Link href={`/news/${article._id}`}>
        <h2 style={{ cursor: 'pointer' }}>{article.title}</h2>
      </Link>
      <p>{article.description}</p>
    </div>
  );
}
