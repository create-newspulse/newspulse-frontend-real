<h1 className="text-4xl font-bold text-center text-green-600">
  🟢 Gujarat News Pulse ({language === 'gujarati' ? 'ગુજરાતી' : language === 'hindi' ? 'हिन्दी' : 'English'})
</h1>

// Use same imports as above...

export default function GujaratNews({ topHeadlines }) {
    const { language } = useLanguage();
  
    return (
      <>
        <BreakingTicker />
        <LanguageToggle />
        <main className={`p-4 sm:p-6 lg:p-8 space-y-10 font-${language}`}>
          <h1 className="text-4xl font-bold text-center text-green-700">
            🟢 Gujarat News Pulse (ગુજરાતી)
          </h1>
          {topHeadlines.length > 0 ? (
            <TopNews articles={topHeadlines} />
          ) : (
            <p className="text-center text-yellow-600 font-medium">
              ⚠️ No news available right now.
            </p>
          )}
          <TrendingNow />
          <WebStories />
        </main>
      </>
    );
  }
  
  export async function getStaticProps() {
    const allArticles = await fetchTopNewswithAutoKey('general');
    return {
      props: {
        topHeadlines: allArticles || [],
      },
      revalidate: 1800,
    };
  }
  
