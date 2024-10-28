import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  const { theme } = useThemeStore();
  
  return (
    <div className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-md ${
      theme === 'dark'
        ? 'bg-red-900/50 border-red-800 text-red-200'
        : 'bg-red-50 border border-red-200 text-red-800'
    }`}>
      <AlertCircle className="w-5 h-5" />
      <span>{message}</span>
      <button
        onClick={onDismiss}
        className={`ml-auto ${
          theme === 'dark' ? 'text-red-200 hover:text-red-100' : 'text-red-600 hover:text-red-800'
        }`}
      >
        ×
      </button>
    </div>
  );
}