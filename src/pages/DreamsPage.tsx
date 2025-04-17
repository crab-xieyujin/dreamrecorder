
import { useNavigate } from "react-router-dom";
import { useDream } from "@/context/DreamContext";

export default function DreamsPage() {
  const { dreams } = useDream();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white pb-16">
      <header className="border-b border-gray-100 py-4">
        <h1 className="text-xl font-bold text-center">我的梦境</h1>
      </header>
      
      <main className="p-4">
        {dreams.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
            <p>还没有记录梦境</p>
            <button 
              onClick={() => navigate('/record')}
              className="mt-4 px-6 py-2 bg-dream-primary text-white rounded-lg"
            >
              开始记录
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {dreams.map((dream) => (
              <div key={dream.id} className="border rounded-lg p-4">
                <h3 className="font-medium">{dream.date.toLocaleDateString()}</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">{dream.prompt?.text}</p>
                {dream.savedImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {dream.savedImages.slice(0, 2).map((img, i) => (
                      <img 
                        key={i} 
                        src={img} 
                        alt={`Dream visual ${i+1}`} 
                        className="w-full h-32 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
