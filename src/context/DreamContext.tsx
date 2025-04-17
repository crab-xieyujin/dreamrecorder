
import { createContext, useState, useContext, ReactNode } from "react";
import { Dream, Recording, DreamPrompt } from "@/types";
import { nanoid } from "nanoid";

interface DreamContextProps {
  dreams: Dream[];
  currentDream: Dream | null;
  currentRecordings: Recording[];
  currentPrompt: DreamPrompt | null;
  isProcessing: boolean;
  addRecording: (recording: Recording) => void;
  setCurrentPrompt: (prompt: DreamPrompt | null) => void;
  saveDream: () => void;
  startNewDream: () => void;
  clearRecordings: () => void;
  regenerateImages: () => Promise<void>;
  setIsProcessing: (value: boolean) => void;
}

const DreamContext = createContext<DreamContextProps | undefined>(undefined);

export const DreamProvider = ({ children }: { children: ReactNode }) => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [currentDream, setCurrentDream] = useState<Dream | null>(null);
  const [currentRecordings, setCurrentRecordings] = useState<Recording[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<DreamPrompt | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const startNewDream = () => {
    const newDream: Dream = {
      id: nanoid(),
      date: new Date(),
      recordings: [],
      prompt: null,
      savedImages: []
    };
    setCurrentDream(newDream);
    setCurrentRecordings([]);
    setCurrentPrompt(null);
  };

  const addRecording = (recording: Recording) => {
    setCurrentRecordings(prev => [...prev, recording]);
  };

  const clearRecordings = () => {
    setCurrentRecordings([]);
  };

  const saveDream = () => {
    if (currentDream && currentPrompt) {
      const updatedDream: Dream = {
        ...currentDream,
        recordings: [...currentRecordings],
        prompt: currentPrompt,
        savedImages: [...currentPrompt.images]
      };
      
      setDreams(prev => [...prev, updatedDream]);
      setCurrentDream(null);
      setCurrentRecordings([]);
      setCurrentPrompt(null);
    }
  };

  // Mock function to simulate AI image generation
  const regenerateImages = async () => {
    if (!currentPrompt) return;
    
    setIsProcessing(true);

    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo: use placeholder image URLs that could be dynamically replaced 
    // with actual API call results in a production environment
    const mockImageUrls = [
      '/lovable-uploads/c019e98f-40be-4e0e-83c4-a21f59130e14.png',
      '/lovable-uploads/1c65074e-1875-4d35-babe-35d74b8a2205.png'
    ];

    setCurrentPrompt({
      ...currentPrompt,
      images: mockImageUrls
    });
    
    setIsProcessing(false);
  };

  const value = {
    dreams,
    currentDream,
    currentRecordings,
    currentPrompt,
    isProcessing,
    addRecording,
    setCurrentPrompt,
    saveDream,
    startNewDream,
    clearRecordings,
    regenerateImages,
    setIsProcessing
  };

  return <DreamContext.Provider value={value}>{children}</DreamContext.Provider>;
};

export const useDream = () => {
  const context = useContext(DreamContext);
  if (context === undefined) {
    throw new Error("useDream must be used within a DreamProvider");
  }
  return context;
};
