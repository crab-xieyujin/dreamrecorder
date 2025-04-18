
import { CommunityPost } from "@/types";
import { DreamPost } from "@/components/DreamPost";
import { ChevronLeft, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockPosts: CommunityPost[] = [
  {
    id: "1",
    userId: "user1",
    username: "用户名",
    content: "我觉得，我现在充满了能量，好，我要开始工作！",
    imageUrl: "/lovable-uploads/af9f4a46-4fdc-46ad-b953-2ac24c2ba538.png",
    likes: 120,
    timestamp: new Date()
  },
  {
    id: "2",
    userId: "user2",
    username: "用户名",
    content: "晨光中的森林小径，粗壮的树干形成天然拱门，阳光透过树叶洒下光斑，8K超清写实风格，嫩绿草地....",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    likes: 120,
    timestamp: new Date()
  },
  {
    id: "3",
    userId: "user3",
    username: "用户名",
    content: "秋日银杏大道全景，金黄色的落叶铺成地毯，两侧树木枝干交错形成天然顶棚，逆光拍摄突显半透明...",
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    likes: 120,
    timestamp: new Date()
  }
];

export default function CommunityPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">梦境社区</h1>
        </div>
        <button>
          <MoreVertical className="h-6 w-6" />
        </button>
      </header>

      <main className="p-4">
        {mockPosts.map((post) => (
          <DreamPost key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
}
