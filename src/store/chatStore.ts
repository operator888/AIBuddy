import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatState, Message } from '../types/chat';
import { getChatCompletion } from '../services/openai';
import { useProfileStore } from './profileStore';

interface ExtendedChatState extends ChatState {
  userAvatar: string | null;
  updateUserAvatar: (avatar: string) => void;
  sendMessage: (content: string) => Promise<void>;
}

export const useChatStore = create<ExtendedChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,
      error: null,
      userAvatar: null,

      updateUserAvatar: (avatar) => {
        set({ userAvatar: avatar });
      },

      addMessage: (message) => {
        set((state) => {
          const newMessage: Message = {
            ...message,
            id: crypto.randomUUID(),
          };
          return { messages: [...state.messages, newMessage] };
        });
      },

      sendMessage: async (content: string) => {
        const state = get();
        const apiKey = useProfileStore.getState().apiKey;
        
        if (!content.trim()) {
          state.setError('Message cannot be empty');
          return;
        }

        if (!apiKey) {
          state.setError('Please configure your OpenAI API key first');
          return;
        }

        state.setLoading(true);
        state.setError(null);

        try {
          // Add user message
          const userMessage = {
            content,
            role: 'user' as const,
            timestamp: Date.now(),
          };
          state.addMessage(userMessage);

          // Get AI response
          const aiResponse = await getChatCompletion(
            apiKey,
            [...state.messages, userMessage]
          );

          // Add AI response
          state.addMessage({
            content: aiResponse,
            role: 'assistant',
            timestamp: Date.now(),
          });
        } catch (error) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : 'Failed to get AI response';
          
          state.setError(errorMessage);
          console.error('Chat error:', error);
        } finally {
          state.setLoading(false);
        }
      },

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        messages: state.messages,
        userAvatar: state.userAvatar,
      }),
    }
  )
);