import { useEffect, useState, useCallback, useRef } from 'react';
import '../styles/BreakingTicker.css'; // Add this import

// Remove this:
// const tickerStyles = `...`;

// Rest of the code remains the same until the return statement

return (
  <>
    {/* Remove this: <style>{tickerStyles}</style> */}
    <div
      className={`bg-black text-white px-4 py-2 flex items-center space-x-3 overflow-x-auto whitespace-nowrap font-sans ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="marquee"
      aria-live="polite"
    >
      <span className="text-red-500 animate-pulse" aria-hidden="true">
        🔴 LIVE
      </span>
      <div className="relative flex-1 overflow-hidden">
        <span
          key={currentIndex}
          className="ticker-enter inline-block"
          aria-label={headlines[currentIndex]?.text}
        >
          {headlines[currentIndex]?.text}
          {headlines[currentIndex]?.source && (
            <span className="text-gray-400 text-sm ml-2">
              ({headlines[currentIndex].source})
            </span>
          )}
        </span>
      </div>
      {lastUpdated && (
        <span className="text-gray-500 text-sm" aria-hidden="true">
          Updated: {lastUpdated}
        </span>
      )}
    </div>
  </>
);
