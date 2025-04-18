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

export interface CommunityPost {
  id: string;
  userId: string;
  username: string;
  content: string;
  imageUrl: string;
  likes: number;
  timestamp: Date;
}

export interface Message {
  id: string;
  sender: string;
  avatar?: string;
  content: string;
  timestamp: string;
  type: 'like' | 'comment' | 'system';
  dreamTitle?: string;
}

export interface UserProfile {
  id: string;
  nickname: string;
  avatar: string;
  dreams: Dream[];
}
