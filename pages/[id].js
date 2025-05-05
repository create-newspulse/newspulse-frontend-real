import { useRouter } from 'next/router';

export async function getServerSideProps({ params }) {
  const { id } = params; // Get the dynamic 'id' from URL params

  // Fetch the article based on 'id'
  const res = await fetch(
    `https://newspulse-backend-real.onrender.com/api/news/${id}`,
  );
  const article = await res.json();

  // Check if the article exists
  if (!article) {
    return { notFound: true }; // Return 404 if no article found
  }

  return { props: { article } };
}

export default function NewsDetail({ article }) {
  const router = useRouter();

  if (!article) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{article.title}</h1>
      <p>{new Date(article.date).toLocaleDateString()}</p>
      <img
        src={article.imageURL}
        alt={article.title}
        style={{ maxWidth: '100%' }}
      />
      <p>{article.content}</p>
      <button onClick={() => router.back()}>← Go Back</button>
    </div>
  );
}
