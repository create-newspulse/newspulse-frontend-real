// components/VoiceButton.js
import { useState } from 'react';

export default function VoiceButton({ language }) {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = () => {
    setIsListening(!isListening);
    if (!isListening) {
      console.log(`Starting voice recognition in ${language}...`);
    } else {
      console.log('Stopping voice recognition...');
    }
  };

  const buttonText = language === 'hindi' ? 'आवाज़ शुरू करें' : language === 'gujarati' ? 'આવાજ શરૂ કરો' : 'Start Voice';

  return (
    <button
      onClick={handleVoiceCommand}
      className={`p-2 rounded-full bg-royal-blue text-white hover:bg-royal-blue-light transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-royal-blue-light ${isListening ? 'animate-pulse' : ''}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-7a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
      <span>{isListening ? (language === 'hindi' ? 'सुन रहा है...' : language === 'gujarati' ? 'સાંભળી રહ્યું છે...' : 'Listening...') : buttonText}</span>
    </button>
  );
}
