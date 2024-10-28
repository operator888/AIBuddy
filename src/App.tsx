import React from 'react';
import { useChatStore } from './store/chatStore';
import { useThemeStore } from './store/themeStore';
import { useProfileStore } from './store/profileStore';
import { ErrorMessage } from './components/ErrorMessage';
import { ApiKeyModal } from './components/ApiKeyModal';
import { ProfileModal } from './components/ProfileModal';
import { MessageCircle, Sun, Moon, Key } from 'lucide-react';

function App() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    setError,
  } = useChatStore();

  const { theme, toggleTheme } = useThemeStore();
  const {
    apiKey,
    userName,
    userAvatar,
    botName,
    botAvatar,
    setApiKey,
  } = useProfileStore();

  const [input, setInput] = React.useState('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = React.useState(!apiKey);
  const [profileModalData, setProfileModalData] = React.useState<{
    isOpen: boolean;
    isBot: boolean;
  }>({ isOpen: false, isBot: false });
  
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!apiKey) {
      setIsApiKeyModalOpen(true);
      return;
    }
    await sendMessage(input);
    setInput('');
  };

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    setIsApiKeyModalOpen(false);
  };

  const handleProfileClick = (isBot: boolean) => {
    setProfileModalData({ isOpen: true, isBot });
  };

  return (
    <div className={`flex flex-col h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <header className={`${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
      } shadow-sm py-4 px-6 border-b`}>
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <MessageCircle className={`w-6 h-6 ${
              theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
            }`} />
            <h1 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {botName}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className={`p-2 rounded-full ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Configure API Key"
            >
              <Key size={20} />
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === 'dark' 
                  ? 'text-yellow-400 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className={`flex-1 overflow-y-auto p-6 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <button
                  onClick={() => handleProfileClick(message.role === 'assistant')}
                  className="focus:outline-none transform transition-transform hover:scale-110"
                >
                  <img
                    src={message.role === 'user' ? userAvatar : botAvatar}
                    alt={`${message.role} avatar`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : theme === 'dark'
                      ? 'bg-gray-800 text-gray-100'
                      : 'bg-white text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <time className="text-xs opacity-70 mt-1 block">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </time>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className={`${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-t p-4`}>
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto flex gap-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className={`flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`px-6 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 ${
              theme === 'dark'
                ? 'bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-offset-gray-800'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </footer>

      {error && (
        <ErrorMessage
          message={error}
          onDismiss={() => setError(null)}
        />
      )}

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSubmit={handleApiKeySubmit}
      />

      <ProfileModal
        isOpen={profileModalData.isOpen}
        isBot={profileModalData.isBot}
        onClose={() => setProfileModalData({ isOpen: false, isBot: false })}
      />
    </div>
  );
}

export default App;