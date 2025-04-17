
import React, { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

interface AudioPlayerProps {
  audioBlob: Blob | null;
  duration: number;
}

export function AudioPlayer({ audioBlob, duration }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioBlob) {
      // Create object URL for audio blob
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      
      // Clean up function to revoke object URL
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [audioBlob]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);
    
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}"`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}'${String(remainingSeconds).padStart(2, '0')}"`;
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={togglePlayback}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-600"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <Play size={20} className={isPlaying ? "opacity-50" : ""} />
      </button>
      <span className="ml-2 text-gray-500">{formatDuration(duration)}</span>
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}
    </div>
  );
}
