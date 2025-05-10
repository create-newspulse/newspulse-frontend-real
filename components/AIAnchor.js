// components/AIAnchor.js
export default function AIAnchor({ language, headlines }) {
  // Placeholder for AI-generated news anchor
  // Future integration: Use an AI model to summarize headlines and generate a spoken summary
  const getSummary = () => {
    // Mock AI-generated summary
    const summaryText = headlines.slice(0, 3).map((h) => h.text).join(' | ');
    return language === 'hindi'
      ? `आज की मुख्य खबरें: ${summaryText}`
      : language === 'gujarati'
      ? `આજના મુખ્ય સમાચાર: ${summaryText}`
      : `Today's Top Headlines: ${summaryText}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-medium text-royal-blue">AI News Anchor</h3>
      <p className="text-dark-gray">{getSummary()}</p>
      {/* Future Enhancement: Add a "Play Audio" button to read the summary aloud */}
    </div>
  );
}
