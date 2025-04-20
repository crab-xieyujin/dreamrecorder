
import { useState } from "react";
import { ChevronLeft, MoreVertical, MessageSquare, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CommentSection } from "@/components/CommentSection";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(mockDreamDetail.likes);
  const [comments, setComments] = useState<Array<{
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }>>([]);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
      toast({
        description: "已取消点赞",
      });
    } else {
      setLikesCount(prev => prev + 1);
      toast({
        description: "点赞成功",
      });
    }
    setIsLiked(!isLiked);
  };

  const handleComment = (content: string) => {
    const newComment = {
      id: Date.now().toString(),
      author: "我",
      content,
      timestamp: new Date().toLocaleTimeString()
    };
    setComments(prev => [newComment, ...prev]);
    toast({
      description: "评论成功",
    });
  };

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

            <div className="flex justify-between items-center border-t pt-4 mb-6">
              <Button 
                variant="outline" 
                className={`flex-1 mr-2 ${isLiked ? "bg-red-50 text-red-500 hover:bg-red-100" : ""}`}
                onClick={handleLike}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                点赞 {likesCount}
              </Button>
              <Button variant="outline" className="flex-1 ml-2">
                <MessageSquare className="mr-2 h-4 w-4" />
                评论
              </Button>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">评论区</h3>
              <CommentSection comments={comments} onSubmit={handleComment} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
