
import { ChevronLeft, MoreVertical, MessageSquare, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockDreamDetail = {
  id: "1",
  date: "2025-04-12",
  content: "晨光中的森林小径，粗壮的树干形成天然拱门，阳光透过树叶酒下光斑，8K超清写实风格，嫩绿草地与深褐树皮形成色彩对比，低视角拍摄增强空间纵深感",
  imageUrl: "/lovable-uploads/b0bc30e8-a07a-4c74-aa1d-e9ca3a412c4f.png",
  tags: ["一个人", "森林", "漫步"],
  analysis: "在梦境心理学中，海底漫步通常象征着对潜意识的探索。你能与海洋生物交流可能表明你正在寻求与自己更深层次的自我连接。水是情感的象征，而这种平静的感觉可能反映出你最近在情感上达到了一定程度的平衡和和谐。",
  likes: 120,
  comments: []
};

export default function DreamDetailPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">梦境详情</h1>
        </div>
        <button>
          <MoreVertical className="h-6 w-6" />
        </button>
      </header>

      <main className="p-4">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{mockDreamDetail.date}</h2>
            <p className="text-gray-700 mb-4">{mockDreamDetail.content}</p>
            <img 
              src={mockDreamDetail.imageUrl} 
              alt="Dream visualization" 
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="flex gap-2 mb-6">
              {mockDreamDetail.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-gray-100">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                梦境解析
              </h3>
              <p className="text-gray-600">{mockDreamDetail.analysis}</p>
            </div>

            <div className="flex justify-between items-center border-t pt-4">
              <Button variant="outline" className="flex-1 mr-2" onClick={() => {}}>
                <ThumbsUp className="mr-2 h-4 w-4" />
                点赞 {mockDreamDetail.likes}
              </Button>
              <Button variant="outline" className="flex-1 ml-2" onClick={() => {}}>
                <MessageSquare className="mr-2 h-4 w-4" />
                评论
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
