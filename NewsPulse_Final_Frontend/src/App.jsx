import React from 'react';
import BreakingTicker from './components/BreakingTicker'; // Import the component
import './App.css'; // Optional: For styling

function App() {
  return (
    <div className="App">
      <header>
        <h1>News Pulse News Updates</h1>
      </header>
      <BreakingTicker /> {/* Add the ticker here */}
      <main>
        <p>Welcome to News Pulse for the latest updates!</p>
      </main>
    </div>
  );
}

export default App;
