// components/VoicePlayer.js
import { useEffect, useRef } from 'react';

const VoicePlayer = ({ src, autoPlay = true }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.warn('Autoplay blocked:', e.message);
      });
    }
  }, [src]);

  return <audio ref={audioRef} controls src={src} />;
};

export default VoicePlayer;
