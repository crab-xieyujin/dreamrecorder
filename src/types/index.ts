
export interface Recording {
  id: string;
  audio: Blob | null; 
  text: string;
  duration: number;
  timestamp: Date;
  timeString: string;
}

export interface DreamPrompt {
  text: string;
  images: string[];
}

export interface Dream {
  id: string;
  date: Date;
  recordings: Recording[];
  prompt: DreamPrompt | null;
  savedImages: string[];
}
