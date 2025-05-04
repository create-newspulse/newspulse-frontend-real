export default function TrendingNews({ news }) {
  const trending = news.slice(1, 6);
  return (
    <div style={{ background: '#333', color: '#fff', padding: '10px', marginTop: '10px' }}>
      <h2>Trending</h2>
      <ul>
        {trending.map((item) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
