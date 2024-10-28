import React from 'react';
import { Camera } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

interface ProfileEditorProps {
  name: string;
  avatar: string;
  onNameChange: (name: string) => void;
  onAvatarChange: (avatar: string) => void;
  isBot?: boolean;
}

export function ProfileEditor({ 
  name, 
  avatar, 
  onNameChange, 
  onAvatarChange, 
  isBot = false 
}: ProfileEditorProps) {
  const { theme } = useThemeStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onAvatarChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`absolute bottom-0 right-0 p-1 rounded-full ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          } hover:opacity-80`}
        >
          <Camera className={`w-3 h-3 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder={isBot ? "Bot's nickname" : "Your name"}
        className={`px-3 py-1.5 rounded-lg border ${
          theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      />
    </div>
  );
}