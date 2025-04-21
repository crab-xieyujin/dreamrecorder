
import { useLocation, useNavigate } from "react-router-dom";
import { Star, Users, Mic, MessageSquare, User } from "lucide-react";
import { useDream } from "@/context/DreamContext";
import { useState, useEffect } from "react";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const { startNewDream, addRecording } = useDream();
  
  // 录音相关的状态和函数
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordStartTime, setRecordStartTime] = useState<number | null>(null);

  useEffect(() => {
    // 当导航离开记录页面时，确保停止录音
    return () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        setIsRecording(false);
      }
    };
  }, [mediaRecorder]);

  // 开始录音
  const startRecording = async () => {
    try {
      if (isRecording) return; // 如果已经在录音中，不做任何操作
      
      // 请求麦克风权限
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // 清空以前的录音数据
      setAudioChunks([]);
      
      // 创建媒体录音器
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      // 设置事件处理
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks(prev => [...prev, e.data]);
        }
      };
      
      recorder.onstop = () => {
        // 生成录音Blob
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        
        // 生成时间戳信息
        const now = new Date();
        const timeString = formatTime(now);
        const duration = recordStartTime ? Math.floor((Date.now() - recordStartTime) / 1000) : 0;
        
        // 创建录音对象
        const recording = {
          id: Math.random().toString(36).substring(2, 9),
          audio: audioBlob,
          text: "正在转录中...",
          duration: duration,
          timestamp: now,
          timeString
        };
        
        // 模拟转录 (实际环境中会替换为真实API调用)
        setTimeout(() => {
          // 模拟转录结果
          const mockTranscriptions = [
            "这是一段测试录音，文字转换未完成......",
            "这是一段测试录音，已经文字转换完成",
            "我觉得，我现在充满了能量，好，我要开始工作！",
            "散步的路上，很喜欢这些树，很漂亮。我就好像在树之间走路一样，觉得很开心呢。"
          ];
          
          // 随机选择一个转录结果
          const randomIndex = Math.floor(Math.random() * mockTranscriptions.length);
          recording.text = mockTranscriptions[randomIndex];
          
          // 添加录音到梦境上下文
          addRecording(recording);
        }, 1000);
        
        // 停止所有音频轨道以释放麦克风
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
      };
      
      // 开始录音
      recorder.start();
      setRecordStartTime(Date.now());
      setIsRecording(true);
    } catch (error) {
      console.error('启动录音时出错:', error);
      setIsRecording(false);
    }
  };

  // 停止录音
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  };

  // 格式化时间为 HH:MM 格式
  const formatTime = (date: Date): string => {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const navItems = [
    { icon: Star, label: "梦境", path: "/" },
    { icon: Users, label: "社区", path: "/community" },
    { icon: Mic, label: "记录", path: "/record", special: true },
    { icon: MessageSquare, label: "消息", path: "/messages" },
    { icon: User, label: "我的", path: "/profile" }
  ];

  const handleNavItemClick = (item: typeof navItems[0]) => {
    if (item.path === "/record") {
      if (!isRecording) {
        // 如果不是在录音中，开始录音并确保我们在记录页面
        if (location.pathname !== "/record") {
          navigate("/record");
        }
        startNewDream();
        startRecording();
      } else {
        // 如果正在录音，停止录音
        stopRecording();
      }
    } else {
      // 对于其他导航项，正常导航
      navigate(item.path);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === "/record" && isRecording);
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => handleNavItemClick(item)}
              className={`flex flex-col items-center py-2 px-4 ${
                item.special 
                  ? `bg-${isRecording ? 'red-500' : 'dream-primary'} text-white rounded-full w-16 h-16 -translate-y-4 shadow-lg transition-all duration-300` 
                  : (isActive ? "text-dream-primary" : "text-gray-500")
              }`}
            >
              <Icon 
                size={24} 
                className={`${isRecording && item.path === "/record" ? "animate-pulse" : ""} ${
                  item.special 
                    ? "text-white" 
                    : (isActive ? "text-dream-primary" : "")
                }`} 
              />
              <span 
                className={`text-xs mt-1 ${
                  item.special ? "text-white" : (isActive ? "text-dream-primary" : "")
                }`}
              >
                {item.path === "/record" && isRecording ? "录音中" : item.label}
              </span>
              {isRecording && item.path === "/record" && (
                <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
