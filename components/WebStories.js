// components/WebStories.js
const WebStories = ({ stories }) => (
    <section className="mt-6 px-4">
      <h2 className="text-xl font-bold mb-3">📲 Web Stories</h2>
      <div className="flex gap-3 overflow-x-auto snap-x">
        {stories.map((story, i) => (
          <a key={i} href={story.url} className="min-w-[200px] snap-center">
            <div className="w-48 h-80 bg-gray-200 rounded-lg overflow-hidden relative">
              <img src={story.image || '/story-placeholder.jpg'} alt="" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 bg-black bg-opacity-50 text-white text-sm p-2">{story.title}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
  
  export default WebStories;
  
