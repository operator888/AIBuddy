import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProfileState {
  apiKey: string | null;
  userName: string;
  userAvatar: string;
  botName: string;
  botAvatar: string;
  setApiKey: (key: string) => void;
  setUserName: (name: string) => void;
  setUserAvatar: (avatar: string) => void;
  setBotName: (name: string) => void;
  setBotAvatar: (avatar: string) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      apiKey: null,
      userName: 'User',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&fit=crop',
      botName: 'AIBuddy',
      botAvatar: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=200&fit=crop',
      setApiKey: (key) => set({ apiKey: key }),
      setUserName: (name) => set({ userName: name }),
      setUserAvatar: (avatar) => set({ userAvatar: avatar }),
      setBotName: (name) => set({ botName: name }),
      setBotAvatar: (avatar) => set({ botAvatar: avatar }),
    }),
    {
      name: 'profile-storage',
    }
  )
);