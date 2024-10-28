import React from 'react';
import { X } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (apiKey: string) => void;
}

export function ApiKeyModal({ isOpen, onClose, onSubmit }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = React.useState('');
  const { theme } = useThemeStore();
  
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(apiKey);
    setApiKey('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-xl max-w-md w-full p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Enter Your OpenAI API Key</h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-full ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className={`text-sm mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Your API key will be stored locally and used only for this chat session.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className={`w-full px-3 py-2 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-indigo-500 hover:bg-indigo-600'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white`}
            >
              Connect
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}