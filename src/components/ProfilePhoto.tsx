import { Camera } from 'lucide-react';
import { uploadImage } from '../services/storage';

interface ProfilePhotoProps {
  avatar: string;
  onUpdate: (newAvatar: string) => void;
  isEditable?: boolean;
}

export function ProfilePhoto({ avatar, onUpdate, isEditable = false }: ProfilePhotoProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newAvatar = await uploadImage(file);
      onUpdate(newAvatar);
    }
  };

  return (
    <div className="relative">
      <img
        src={avatar}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
      {isEditable && (
        <label className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
          <Camera size={12} className="text-white" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}