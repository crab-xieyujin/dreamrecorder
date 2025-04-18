
import { ChevronLeft, MoreVertical, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dream } from "@/types";

const mockDreams: Dream[] = [
  {
    id: "1",
    date: new Date("2024-03-05"),
    recordings: [],
    prompt: {
      text: "一觉醒来，睡在皇帝的床榻上，周边都是宫女等待我醒来，身上还穿着龙袍",
      images: ["https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"]
    },
    savedImages: ["https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"]
  },
  {
    id: "2",
    date: new Date("2024-01-06"),
    recordings: [],
    prompt: {
      text: "秋日银杏大道全景，金黄色的落叶铺成地毯，两侧树木枝干交错形成天然顶棚，逆光拍摄突显半透明叶片纹理，浅景深模糊远端树木...",
      images: ["https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"]
    },
    savedImages: ["https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"]
  }
];

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-16">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">个人中心</h1>
        </div>
        <button>
          <MoreVertical className="h-6 w-6" />
        </button>
      </header>

      <div className="p-4">
        <div className="flex items-start justify-between mb-6">
          <div className="flex gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" />
              <AvatarFallback>YH</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">火山爆发的前兆</h2>
                <button>
                  <Pencil className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-1">ID: 1303415013</p>
            </div>
          </div>
        </div>

        <div className="flex gap-6 mb-6 border-b pb-4">
          <button className="text-gray-600">点赞</button>
          <button className="text-blue-500 border-b-2 border-blue-500">梦境</button>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)]">
          {mockDreams.map((dream) => (
            <div key={dream.id} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">
                  {dream.date.toLocaleDateString().split('/').slice(1).join('-')}
                </span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-medium mb-2">帝王梦</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {dream.prompt?.text}
                  </p>
                </div>
                {dream.prompt?.images[0] && (
                  <img 
                    src={dream.prompt.images[0]} 
                    alt=""
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
