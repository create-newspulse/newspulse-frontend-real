const TrendingNow = () => {
  const trending = [
    '🚀 ISRO set to launch next-gen satellite',
    '🎬 New Bollywood blockbuster breaks records',
    '📱 India becomes world’s 2nd largest smartphone market',
    '🏏 India wins Test series against England',
    '🧪 Breakthrough in cancer research announced',
  ];

  return (
    <section className="mt-10 bg-gray-50 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">🔥 Trending Now</h2>
      <ul className="list-disc list-inside text-gray-800 space-y-1">
        {trending.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default TrendingNow;
