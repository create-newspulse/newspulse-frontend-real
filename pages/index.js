import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>News Pulse - Modern Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight">News Pulse</h1>
        <p className="mt-4 text-xl font-light">Your pulse on what matters most.</p>
      </header>

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Latest News Updates</h2>
          <p className="text-lg text-gray-600 mb-8">
            Stay informed with the latest breaking news from around the world. 
            Explore in-depth articles, live updates, and more.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder News Cards */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">News Headline 1</h3>
              <p className="text-gray-600">A brief summary of the first news article goes here.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">News Headline 2</h3>
              <p className="text-gray-600">A brief summary of the second news article goes here.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">News Headline 3</h3>
              <p className="text-gray-600">A brief summary of the third news article goes here.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>© 2025 News Pulse. All rights reserved.</p>
      </footer>
    </div>
  );
}
