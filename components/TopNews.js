import TopNewsCard from './TopNewsCard';

const TopNews = ({ articles }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {articles.map((article, index) => (
        <TopNewsCard key={index} article={article} />
      ))}
    </section>
  );
};

export default TopNews;
