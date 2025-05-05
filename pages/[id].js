import { useRouter } from 'next/router';

export default function DynamicNewsPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen p-10 bg-white">
      <h1 className="text-2xl font-bold text-gray-800">📰 News ID: {id}</h1>
      <p className="text-gray-600 mt-4">This is a dynamic news page for article ID: <strong>{id}</strong>.</p>
    </div>
  );
}
