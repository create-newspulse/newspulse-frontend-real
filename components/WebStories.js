// components/WebStories.js

const sampleStories = [
  {
    title: '🧠 AI Explains Budget 2024 in 60 Seconds',
    image: '/ai-budget-2024.jpg',
    link: '#',
  },
  {
    title: '🚀 ISRO Launches India’s First Space Lab',
    image: '/isro-launch.jpg',
    link: '#',
  },
  {
    title: '📉 How India Beat Inflation: Explained Visually',
    image: '/india-inflation.jpg',
    link: '#',
  },
  {
    title: '🎬 Behind the Scenes of “Ramayana 2025”',
    image: '/ramayana-2025.jpg',
    link: '#',
  },
];

const WebStories = () => {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-4">📚 Web Stories</h2>
      <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-2">
        {sampleStories.map((story, idx) => (
          <a
            key={idx}
            href={story.link}
            className="min-w-[180px] max-w-[200px] bg-white border rounded-lg shadow hover:shadow-md transition"
          >
            <div className="w-full h-[180px] overflow-hidden rounded-t-lg">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 text-sm font-semibold line-clamp-2">
              {story.title}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default WebStories;
