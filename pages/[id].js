import { useRouter } from 'next/router';

export default function NewsDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>News Detail Page</h1>
      <p>Showing details for article ID: {id}</p>
    </div>
  );
}
