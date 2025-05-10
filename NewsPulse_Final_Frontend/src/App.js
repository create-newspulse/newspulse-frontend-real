import React from 'react';
import BreakingTicker from './components/BreakingTicker';
import './Index.css';

function App() {
  return (
    <div className="container">
      <header>
        <h1>News Pulse News Updates</h1>
      </header>
      <BreakingTicker className="news-pulse-ticker" />
      <main>
        <p>Welcome to News Pulse for the latest updates!</p>
      </main>
    </div>
  );
}

export default App;
