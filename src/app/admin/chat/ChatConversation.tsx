'use client';

import React, { useRef, useState } from 'react';
import {
  SendHorizonal,
  ImageIcon,
  X,
  CheckCircle,
  Loader2,
  PauseCircle,
  AlertCircle,
} from 'lucide-react';

type MessageStatus = 'sending' | 'sent' | 'seen' | 'failed';

type Message = {
  from: 'admin' | 'customer';
  text?: string;
  imageUrl?: string;
  status?: MessageStatus;
};

type Props = {
  selectedCustomer: string | null;
};

export default function ChatConversation({ selectedCustomer }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSend = () => {
    if (!input.trim() && !imagePreview) return;

    const newMessage: Message = {
      from: 'admin',
      text: input.trim() || undefined,
      imageUrl: imagePreview || undefined,
      status: 'sending',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setImagePreview(null);

    // Simulate message status update
    setTimeout(() => {
      const randomStatus: MessageStatus = Math.random() < 0.9 ? 'sent' : 'failed'; // 90% chance sent

      setMessages((prev) =>
        prev.map((msg, i) => (i === prev.length - 1 ? { ...msg, status: randomStatus } : msg))
      );

      // Optional: simulate seen
      if (randomStatus === 'sent') {
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg, i) => (i === prev.length - 1 ? { ...msg, status: 'seen' } : msg))
          );
        }, 2000);
      }
    }, 1200);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const getStatusIcon = (status?: MessageStatus) => {
    switch (status) {
      case 'sending':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-300" />;
      case 'sent':
        return <PauseCircle className="h-4 w-4 text-blue-300" />;
      case 'seen':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[80vh] w-2/3 flex-col overflow-hidden rounded-r-xl border-l bg-white shadow-md">
      {/* Messages */}
      <div className="flex-grow space-y-3 overflow-y-auto bg-gray-50 px-6 py-4">
        {!selectedCustomer ? (
          <p className="mt-20 text-center text-gray-400">Select a customer to start chatting</p>
        ) : messages.length === 0 ? (
          <p className="mt-20 text-center text-gray-500">No messages yet</p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-end gap-1">
                <div
                  className={`max-w-xs rounded-xl px-4 py-2 text-sm shadow ${
                    msg.from === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.imageUrl ? (
                    <img
                      src={msg.imageUrl}
                      alt="uploaded"
                      className="max-w-[200px] rounded-md border"
                    />
                  ) : (
                    msg.text
                  )}
                </div>

                {/* Status icon (only for admin messages) */}
                {msg.from === 'admin' && getStatusIcon(msg.status)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Image preview (before sending) */}
      {imagePreview && (
        <div className="relative mx-3 mt-1 max-w-[160px] rounded-md border bg-white p-1 shadow">
          <img src={imagePreview} alt="Preview" className="rounded" />
          <button
            onClick={() => setImagePreview(null)}
            className="absolute right-1 top-1 rounded-full bg-white p-1 text-gray-600 shadow hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Input section */}
      <div className="flex items-center gap-2 border-t bg-white p-4">
        <input
          type="text"
          className="flex-grow rounded-full border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={!selectedCustomer}
        />

        {/* Image upload */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300"
          disabled={!selectedCustomer}
        >
          <ImageIcon className="h-5 w-5" />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!selectedCustomer}
          className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <SendHorizonal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
