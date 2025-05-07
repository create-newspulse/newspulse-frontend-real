import Marquee from "react-fast-marquee";

const BreakingTicker = () => {
  const headlines = [
    "🛑 Cyclone alert issued in Gujarat.",
    "📈 Stock market hits all-time high today.",
    "🧠 AI now driving newsrooms faster than ever.",
    "🗳️ New education bill passed in Parliament.",
    "🏆 Top scientists win global innovation award."
  ];

  return (
    <div className="bg-black text-white font-medium py-2 px-4 rounded-md shadow-md">
      <Marquee speed={50} gradient={false}>
        <span className="mr-6 text-red-500 font-semibold">🔴 LIVE:</span>
        {headlines.map((headline, i) => (
          <span key={i} className="mr-8 whitespace-nowrap">{headline}</span>
        ))}
      </Marquee>
    </div>
  );
};

export default BreakingTicker;
