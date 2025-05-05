import { useRouter } from 'next/router';

export default function NewsDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>News Article: {id}</h1>
      {/* Load article details by ID */}
    </div>
  );
}
