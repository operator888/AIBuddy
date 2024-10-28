export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Omit<Message, 'id'>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface OpenAIError {
  status: number;
  message: string;
  code?: string;
}