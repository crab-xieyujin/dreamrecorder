
import { useLocation, useNavigate } from "react-router-dom";
import { Star, Users, Mic, MessageSquare, User } from "lucide-react";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Star, label: "梦境", path: "/" },
    { icon: Users, label: "社区", path: "/community" },
    { icon: Mic, label: "记录", path: "/record" },
    { icon: MessageSquare, label: "消息", path: "/messages" },
    { icon: User, label: "我的", path: "/profile" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-4 ${
                isActive ? "text-dream-primary" : "text-gray-500"
              }`}
            >
              <Icon size={24} className={isActive ? "text-dream-primary" : ""} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
