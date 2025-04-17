
import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { Recording } from '@/types';

interface AudioRecorderProps {
  onRecordingComplete?: (recording: Recording) => void;
}

export function useAudioRecorder({ onRecordingComplete }: AudioRecorderProps = {}) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Reset state for new recording
      audioChunksRef.current = [];
      setRecordingDuration(0);
      
      // Create media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      // Set up event handlers
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        // Create blob from recorded chunks
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        // Generate timestamp info
        const now = new Date();
        const timeString = formatTime(now);
        
        // Create recording object
        const recording: Recording = {
          id: nanoid(),
          audio: audioBlob,
          text: "Transcribing...", // This would be replaced with actual transcription
          duration: recordingDuration,
          timestamp: now,
          timeString
        };
        
        // Mock transcription (would be replaced with actual API call)
        setTimeout(() => {
          // For demo, simulate a transcription result
          const mockTranscriptions = [
            "这是一段测试录音，文字转换未完成......",
            "这是一段测试录音，13秒已经文字转换完成",
            "我觉得，我现在充满了能量，好，我要开始工作！",
            "散步的路上，很喜欢这些树，很漂亮。我就好像在树之间走路一样，觉得很开心呢。"
          ];
          
          // Pick a random transcription for demo purposes
          const randomIndex = Math.floor(Math.random() * mockTranscriptions.length);
          recording.text = mockTranscriptions[randomIndex];
          
          // Pass the completed recording to the callback
          if (onRecordingComplete) {
            onRecordingComplete(recording);
          }
        }, 1500);
        
        // Stop all audio tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start recording
      mediaRecorder.start();
      startTimeRef.current = Date.now();
      setIsRecording(true);
      
      // Start timer to update recording duration
      timerRef.current = window.setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setRecordingDuration(elapsed);
        }
      }, 100);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Clear the interval timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const formatTime = (date: Date): string => {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
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

  return {
    isRecording,
    recordingDuration,
    formatDuration,
    startRecording,
    stopRecording
  };
}
