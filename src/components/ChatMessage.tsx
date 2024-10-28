import { format } from 'date-fns';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
  userAvatar: string;
  aiAvatar: string;
}

export function ChatMessage({ message, userAvatar, aiAvatar }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} mb-4`}>
      <img
        src={isUser ? userAvatar : aiAvatar}
        alt={`${isUser ? 'User' : 'AI'} avatar`}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isUser
              ? 'bg-blue-600 text-white rounded-tr-none'
              : 'bg-gray-200 text-gray-800 rounded-tl-none'
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {format(message.timestamp, 'HH:mm')}
        </span>
      </div>
    </div>
  );
}