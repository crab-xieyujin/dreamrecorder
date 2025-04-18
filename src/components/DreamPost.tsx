
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { CommunityPost } from "@/types";

interface DreamPostProps {
  post: CommunityPost;
}

export function DreamPost({ post }: DreamPostProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-0">
        <img 
          src={post.imageUrl} 
          alt="" 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <p className="text-base text-gray-800 mb-3">
            {post.content}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>{post.username[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">{post.username}</span>
            </div>
            <button className="flex items-center gap-1 text-gray-600">
              <Heart className="h-5 w-5" />
              <span className="text-sm">{post.likes}</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
