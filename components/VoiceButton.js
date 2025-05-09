import { useState } from 'react';

export default function VoiceButton() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVoice = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleVoice}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2"
    >
      <span>{isPlaying ? "⏹ Stop Voice" : "🔊 Play Voice"}</span>
    </button>
  );
}