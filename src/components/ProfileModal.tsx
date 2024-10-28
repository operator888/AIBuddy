import React from 'react';
import { X, Camera } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useProfileStore } from '../store/profileStore';

interface ProfileModalProps {
  isOpen: boolean;
  isBot: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, isBot, onClose }: ProfileModalProps) {
  const { theme } = useThemeStore();
  const {
    userName,
    userAvatar,
    botName,
    botAvatar,
    setUserName,
    setUserAvatar,
    setBotName,
    setBotAvatar,
  } = useProfileStore();

  const name = isBot ? botName : userName;
  const avatar = isBot ? botAvatar : userAvatar;
  const setName = isBot ? setBotName : setUserName;
  const setAvatar = isBot ? setBotAvatar : setUserAvatar;
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-xl max-w-md w-full p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-full ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`absolute bottom-0 right-0 p-2 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                } hover:opacity-80`}
              >
                <Camera className={`w-4 h-4 ${
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

            <div className="w-full">
              <label className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-indigo-500 hover:bg-indigo-600'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white`}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}