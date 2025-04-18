
import { ChevronLeft, MoreVertical, Bell, MessageSquare, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Message } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "秋水",
    content: "赞了你的梦境",
    timestamp: "16:00",
    type: "like"
  },
  {
    id: "2",
    sender: "灵感瘦肉所",
    content: "评论了你的梦境",
    dreamTitle: "大白天做火车穿越了黑洞",
    timestamp: "03-10",
    type: "comment"
  },
  {
    id: "3",
    sender: "系统消息",
    content: "恭喜你激活了"白日梦"体验卷",
    timestamp: "02-11",
    type: "system"
  }
];

const MessageTypeIcon = {
  like: ThumbsUp,
  comment: MessageSquare,
  system: Bell
};

const MessageBgColor = {
  like: "bg-red-50",
  comment: "bg-green-50",
  system: "bg-blue-50"
};

export default function MessagesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">消息</h1>
        </div>
        <button>
          <MoreVertical className="h-6 w-6" />
        </button>
      </header>

      <div className="flex justify-around p-4 bg-white mb-2">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
            <ThumbsUp className="h-6 w-6 text-red-500" />
          </div>
          <span className="text-sm">点赞</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
            <MessageSquare className="h-6 w-6 text-green-500" />
          </div>
          <span className="text-sm">评论</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <Bell className="h-6 w-6 text-blue-500" />
          </div>
          <span className="text-sm">通知</span>
        </div>
      </div>

      <div className="bg-white">
        {mockMessages.map((message) => {
          const Icon = MessageTypeIcon[message.type];
          
          return (
            <div key={message.id} className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-start gap-3">
                <Avatar className={cn("h-10 w-10", MessageBgColor[message.type])}>
                  <AvatarFallback><Icon className="h-5 w-5" /></AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{message.sender}</span>
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{message.content}</p>
                  {message.dreamTitle && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-lg text-sm text-gray-600">
                      {message.dreamTitle}
                    </div>
                  )}
                  {message.type === "comment" && (
                    <button className="mt-2 text-gray-400 text-sm border rounded-full px-3 py-1">
                      赞
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
