export default function BreakingNews({ news }) {
  const breaking = news.slice(0, 1);
  return (
    <div style={{ background: '#ff3333', color: '#fff', padding: '10px' }}>
      <h2>Breaking News</h2>
      {breaking.map((item) => (
        <div key={item._id}>
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  );
}
