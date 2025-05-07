import { useState, useEffect } from 'react';

export default function NewsReader() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showWave, setShowWave] = useState(false);

  const handleVoice = () => {
    const synth = window.speechSynthesis;

    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      setShowWave(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      "AI tools are now driving newsrooms—writing, verifying, and distributing global news faster than ever."
    );
    utterance.lang = 'en-IN';
    utterance.rate = 1.15;

    const voices = synth.getVoices();
    const preferredVoice = voices.find((v) =>
      ['female', 'zira', 'google', 'susan'].some((term) =>
        v.name.toLowerCase().includes(term)
      )
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    synth.speak(utterance);
    setIsSpeaking(true);
    setShowWave(true);

    utterance.onend = () => {
      setIsSpeaking(false);
      setShowWave(false);
    };
  };

  return (
    <div className="mt-4 flex flex-col items-start">
      <button
        onClick={handleVoice}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition duration-300 shadow-lg border border-black"
      >
        🔊 {isSpeaking ? 'Stop Voice' : 'Listen to this news'}
      </button>

      {/* 🎨 Colorful Wave Animation */}
      {showWave && (
        <div className="mt-3 flex gap-1 h-5 items-end">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-sm animate-bar`}
              style={{
                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#EC4899'][i % 6],
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes bar {
          0%, 100% {
            height: 0.4rem;
          }
          50% {
            height: 1.5rem;
          }
        }
        .animate-bar {
          animation: bar 1s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
