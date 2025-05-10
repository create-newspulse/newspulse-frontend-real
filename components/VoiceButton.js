import { useState, useEffect } from 'react';
import axios from 'axios';

export default function VoiceButton({ language, headline }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const audioRef = useRef(null);

  const langMap = {
    english: 'en-US',
    hindi: 'hi-IN',
    gujarati: 'gu-IN',
  };

  const voiceMap = {
    'en-US': 'your-english-voice-id', // Replace with ElevenLabs voice ID
    'hi-IN': 'your-hindi-voice-id',
    'gu-IN': 'your-gujarati-voice-id',
  };

  const handleVoicePlayback = async () => {
    if (!headline) {
      console.log('No headline available');
      return;
    }

    if (isPlaying && !isPaused) {
      audioRef.current.pause();
      setIsPaused(true);
      return;
    }

    if (isPaused) {
      audioRef.current.play();
      setIsPaused(false);
      return;
    }

    const textToRead = headline.text || 'No headline available';
    try {
      const response = await axios.post(
        'https://api.elevenlabs.io/v1/text-to-speech/' + voiceMap[langMap[language]],
        {
          text: textToRead,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        },
        {
          headers: {
            'xi-api-key': 'YOUR_ELEVENLABS_API_KEY', // Replace with your API key
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        }
      );

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      audio.onerror = () => {
        console.error('Audio playback error');
        setIsPlaying(false);
        setIsPaused(false);
      };

      audio.play();
      setIsPlaying(true);
      setIsPaused(false);
    } catch (error) {
      console.error('Error with ElevenLabs API:', error.message);
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, []);

  const buttonText = isPlaying
    ? isPaused
      ? (language === 'hindi' ? 'फिर से शुरू करें' : language === 'gujarati' ? 'ફરી શરૂ કરો' : 'Resume')
      : (language === 'hindi' ? 'रोकें' : language === 'gujarati' ? 'રોકો' : 'Pause')
    : (language === 'hindi' ? 'सुनें' : language === 'gujarati' ? 'સાંભળો' : 'Listen');

  return (
    <button
      onClick={handleVoicePlayback}
      disabled={!headline}
      className={`p-2 rounded-full bg-royal-blue text-white hover:bg-royal-blue-light transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-royal-blue-light ${
        isPlaying && !isPaused ? 'animate-pulse' : ''
      } ${!headline ? 'opacity-50 cursor-not-allowed' : ''}`}
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
          d={
            isPlaying && !isPaused
              ? 'M10 9v6m4-6v6m-7 3h10a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2z'
              : 'M9 5v14l11-7L9 5z'
          }
        />
      </svg>
      <span>{buttonText}</span>
    </button>
  );
}
