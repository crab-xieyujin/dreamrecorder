
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onSubmit: (content: string) => void;
}

export function CommentSection({ comments, onSubmit }: CommentSectionProps) {
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!content.trim()) {
      toast({
        title: "请输入评论内容",
        variant: "destructive",
      });
      return;
    }
    onSubmit(content);
    setContent("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写下你的评论..."
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>发送</Button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{comment.author}</span>
                <span className="text-sm text-gray-500">{comment.timestamp}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
