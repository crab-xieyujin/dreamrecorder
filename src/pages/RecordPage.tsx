
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDream } from "@/context/DreamContext";
import { Recording, DreamPrompt } from "@/types";
import { RecordingList } from "@/components/RecordingList";
import { PromptEditor } from "@/components/PromptEditor";
import { DreamGenerator } from "@/components/DreamGenerator";
import { ArrowLeft, MoreHorizontal, Camera, Brush, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

enum RecordingStage {
  INITIAL = "initial",
  RECORDING = "recording",
  RECORDED = "recorded",
  PROMPT_EDITING = "prompt_editing",
  GENERATING = "generating",
  GENERATED = "generated"
}

export default function RecordPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    currentRecordings, 
    currentPrompt, 
    setCurrentPrompt,
    regenerateImages,
    isProcessing,
    setIsProcessing,
    saveDream
  } = useDream();
  
  const [recordingStage, setRecordingStage] = useState<RecordingStage>(
    currentRecordings.length > 0 ? RecordingStage.RECORDED : RecordingStage.INITIAL
  );

  // 当录音列表变化时更新状态
  useEffect(() => {
    if (currentRecordings.length > 0) {
      setRecordingStage(RecordingStage.RECORDED);
    }
  }, [currentRecordings]);

  const handleGenerateDream = () => {
    // 组合所有转录
    const combinedText = currentRecordings
      .map(recording => recording.text)
      .join(' ');
    
    // 模拟AI提示增强
    const enhancedPrompt = `晨光中的森林小径，粗壮的树干形成天然拱门，阳光透过树叶洒下光斑，8K超清写实风格，嫩绿草地与深褐树皮形成色彩对比，低视角拍摄增强空间纵深感`;
    
    setCurrentPrompt({
      text: enhancedPrompt,
      images: []
    });
    
    setRecordingStage(RecordingStage.PROMPT_EDITING);
  };

  const handlePromptEdit = () => {
    setRecordingStage(RecordingStage.PROMPT_EDITING);
  };

  const handlePromptConfirm = async (promptText: string) => {
    setCurrentPrompt({
      text: promptText,
      images: []
    });
    setRecordingStage(RecordingStage.RECORDED);
  };

  const handleProceedToDrawing = () => {
    setRecordingStage(RecordingStage.GENERATING);
    setIsProcessing(true);
    regenerateImages().then(() => {
      setIsProcessing(false);
      setRecordingStage(RecordingStage.GENERATED);
    });
  };

  // 处理保存梦境的函数
  const handleSaveDream = () => {
    saveDream();
    toast({
      title: "梦境保存成功",
      description: "你可以在\"梦境\"页面查看你的梦境记录",
    });
    navigate('/');
  };

  const getPageTitle = () => {
    switch (recordingStage) {
      case RecordingStage.RECORDING:
        return "录音中...";
      case RecordingStage.PROMPT_EDITING:
      case RecordingStage.GENERATED:
      case RecordingStage.RECORDED:
        return "记录梦境";
      default:
        return "记录梦境";
    }
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-10">
        <div className="flex justify-between items-center px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-medium">{getPageTitle()}</h1>
          <div className="flex">
            <button className="p-1 ml-2" aria-label="More options">
              <MoreHorizontal size={24} />
            </button>
            <button className="p-1 ml-2" aria-label="Camera">
              <Camera size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 px-4">
        {recordingStage === RecordingStage.PROMPT_EDITING && currentPrompt && (
          <PromptEditor
            initialPrompt={currentPrompt.text}
            onConfirm={handlePromptConfirm}
            isEditable={true}
            onCancel={() => setRecordingStage(RecordingStage.RECORDED)}
          />
        )}

        {(recordingStage === RecordingStage.INITIAL || 
          recordingStage === RecordingStage.RECORDING || 
          recordingStage === RecordingStage.RECORDED) && (
          <>
            <RecordingList
              recordings={currentRecordings}
              onGenerateDream={
                currentRecordings.length > 0 ? handleGenerateDream : undefined
              }
            />
            
            {currentPrompt && recordingStage === RecordingStage.RECORDED && (
              <div className="fixed bottom-32 left-0 right-0 px-4">
                <div className="flex space-x-4">
                  <button
                    onClick={handleProceedToDrawing}
                    className="flex-1 flex items-center justify-center py-3 px-4 bg-dream-primary text-white rounded-lg"
                  >
                    <Brush className="w-5 h-5 mr-2" />
                    绘制
                  </button>
                  <button
                    onClick={handlePromptEdit}
                    className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg"
                  >
                    <Edit2 className="w-5 h-5 mr-2" />
                    修改
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {recordingStage === RecordingStage.GENERATED && currentPrompt && (
          <DreamGenerator
            prompt={currentPrompt.text}
            images={currentPrompt.images}
            isLoading={isProcessing}
            onRegenerate={regenerateImages}
            onSave={handleSaveDream}
          />
        )}

        {/* 空状态提示 */}
        {recordingStage === RecordingStage.INITIAL && currentRecordings.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
            <p className="mb-4">长按底部"记录"按钮开始录音</p>
            <p>松开结束录音并转文字</p>
          </div>
        )}
      </main>
    </div>
  );
}
