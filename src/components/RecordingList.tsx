
import { Recording } from "@/types";
import { AudioPlayer } from "./AudioPlayer";

interface RecordingListProps {
  recordings: Recording[];
  onGenerateDream?: () => void;
}

export function RecordingList({ recordings, onGenerateDream }: RecordingListProps) {
  if (recordings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 my-6">
      <div className="text-2xl font-bold mb-4">{recordings[0].timestamp.toISOString().split('T')[0]}</div>
      
      {recordings.map((recording) => (
        <div key={recording.id} className="mb-8">
          <div className="flex items-start mb-2">
            <AudioPlayer audioBlob={recording.audio} duration={recording.duration} />
          </div>
          
          <div className="ml-14 bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-700">{recording.text}</p>
            <p className="text-xs text-gray-400 mt-1">{recording.timeString}</p>
          </div>
        </div>
      ))}

      {onGenerateDream && (
        <button
          onClick={onGenerateDream}
          className="w-full py-3 px-4 bg-dream-primary text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors"
        >
          生成梦境
        </button>
      )}
    </div>
  );
}
