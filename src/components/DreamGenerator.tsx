
import { useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { DreamPrompt } from '@/types';

interface DreamGeneratorProps {
  prompt: string;
  images: string[];
  isLoading: boolean;
  onRegenerate: () => Promise<void>;
  onSave: () => void;
}

export function DreamGenerator({ 
  prompt, 
  images, 
  isLoading, 
  onRegenerate, 
  onSave 
}: DreamGeneratorProps) {
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    await onRegenerate();
    setIsRegenerating(false);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700 whitespace-pre-wrap">{prompt}</p>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 size={40} className="animate-spin text-dream-primary mb-4" />
          <p className="text-gray-500">生成梦境中...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`Generated dream ${index + 1}`} 
                className="rounded-lg w-full h-auto object-cover aspect-square"
              />
            ))}
          </div>
          
          <div className="flex space-x-2 pt-4">
            <button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              {isRegenerating ? (
                <Loader2 size={20} className="animate-spin mr-2" />
              ) : (
                <RefreshCw size={20} className="mr-2" />
              )}
              重新生成
            </button>
            
            <button
              onClick={onSave}
              className="flex-1 py-3 px-4 bg-dream-primary text-white rounded-lg font-medium hover:bg-blue-700"
            >
              保存梦境
            </button>
          </div>
        </>
      )}
    </div>
  );
}
