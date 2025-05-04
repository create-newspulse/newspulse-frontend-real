import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://your-backend.onrender.com/api/news/${id}`);
  const article = await res.json();
  return { props: { article } };
}

export default function NewsDetail({ article }) {
  const router = useRouter();

  if (!article) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{article.title}</h1>
      <p>{article.date}</p>
      <img src={article.imageURL} alt={article.title} style={{ maxWidth: '100%' }} />
      <p>{article.content}</p>
      <button onClick={() => router.back()}>← Go Back</button>
    </div>
  );
}
