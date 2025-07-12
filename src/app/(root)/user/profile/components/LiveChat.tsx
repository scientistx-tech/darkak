'use client';

import { useState } from 'react';
import { SendHorizonal } from 'lucide-react';

export default function LiveChat() {
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
  if (!input.trim()) return;

  const userMessage: { from: 'user'; text: string } = {
    from: 'user',
    text: input,
  };

  setMessages((prev) => [...prev, userMessage]);
  setInput('');

  // Simulated bot response
  setTimeout(() => {
    const botMessage: { from: 'bot'; text: string } = {
      from: 'bot',
      text: 'Thanks for your message. We’ll get back to you soon!',
    };

    setMessages((prev) => [...prev, botMessage]);
  }, 800);
};


  return (
    <div className="w-full max-w-xl rounded-lg border border-gray-300 bg-white shadow-md">
      {/* Header */}
      <div className="rounded-t-lg bg-blue-600 px-4 py-3 text-white font-semibold text-lg">
        Live Support Chat
      </div>

      {/* Chat messages */}
      <div className="h-96 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-sm text-gray-500 text-center">Start a conversation...</p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
              msg.from === 'user'
                ? 'ml-auto bg-blue-500 text-white'
                : 'mr-auto bg-gray-200 text-gray-800'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="flex items-center border-t border-gray-200 p-3">
        <input
          type="text"
          className="flex-grow rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition"
        >
          <SendHorizonal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
