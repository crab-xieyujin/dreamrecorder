
import React from "react";
import { Mic } from "lucide-react";

interface RecordButtonProps {
  isRecording: boolean;
  onRecordStart: () => void;
  onRecordStop: () => void;
}

export function RecordButton({ isRecording, onRecordStart, onRecordStop }: RecordButtonProps) {
  // Use touch events for press and hold functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent default behavior
    onRecordStart();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent default behavior
    onRecordStop();
  };

  // Mouse events for desktop usage
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    onRecordStart();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    onRecordStop();
  };

  // Handle mouse leaving the button while pressed
  const handleMouseLeave = (e: React.MouseEvent) => {
    if (isRecording) {
      e.preventDefault();
      onRecordStop();
    }
  };

  return (
    <button
      className={`relative flex items-center justify-center w-20 h-20 rounded-full ${
        isRecording ? "bg-red-400 scale-110" : "bg-dream-secondary"
      } text-white shadow-lg transition-all duration-200`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      aria-label={isRecording ? "Stop recording" : "Start recording"}
    >
      <div className="relative">
        <Mic size={32} className={isRecording ? "animate-pulse" : ""} />
        {isRecording && (
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
        )}
      </div>
      {isRecording && (
        <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
      )}
    </button>
  );
}
