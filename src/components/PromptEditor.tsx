
import React, { useState } from 'react';
import { Check, X, Edit2 } from 'lucide-react';

interface PromptEditorProps {
  initialPrompt: string;
  onConfirm: (prompt: string) => void;
  onCancel?: () => void;
  isEditable?: boolean;
}

export function PromptEditor({ initialPrompt, onConfirm, onCancel, isEditable = true }: PromptEditorProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isEditing, setIsEditing] = useState(false);

  const handleConfirm = () => {
    onConfirm(prompt);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPrompt(initialPrompt);
    setIsEditing(false);
    if (onCancel) onCancel();
  };

  return (
    <div className="w-full">
      {isEditable ? (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">AI润色提示词:</h3>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center text-gray-500 px-3 py-1 rounded"
                aria-label="Edit prompt"
              >
                <Edit2 size={18} />
                <span className="ml-1 text-sm">修改</span>
              </button>
            )}
          </div>

          {isEditing ? (
            <>
              <textarea
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                >
                  <X size={16} className="mr-1" />
                  取消
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex items-center px-4 py-2 bg-dream-primary text-white rounded-md"
                >
                  <Check size={16} className="mr-1" />
                  确定
                </button>
              </div>
            </>
          ) : (
            <div className="p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
              {prompt}
            </div>
          )}
        </div>
      ) : (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">AI润色提示词:</h3>
          <div className="p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
            {prompt}
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => onCancel && onCancel()}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              <X size={16} className="mr-1" />
              取消
            </button>
            <button
              onClick={() => onConfirm(prompt)}
              className="flex items-center px-4 py-2 bg-dream-primary text-white rounded-md"
            >
              <Check size={16} className="mr-1" />
              确定
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
