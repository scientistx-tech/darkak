'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  SendHorizonal,
  ImageIcon,
  X,
  CheckCircle,
  Loader2,
  PauseCircle,
  AlertCircle,
  Loader2Icon,
} from 'lucide-react';
import { useGetConversationMessagesQuery } from '@/redux/services/client/homeContentApi';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useUploadImagesMutation } from '@/redux/services/admin/adminProductApis';
import { socket } from '@/socket';

type MessageStatus = 'sending' | 'sent' | 'seen' | 'failed';

interface MessageFile {
  id: number;
  url: string;
  createAt: string;
  messageId: number;
}

interface Message {
  id: number;
  message: string;
  senderId: number | string;
  isReadBy: number | null;
  conversationId: number;
  createdAt: string;
  read: boolean;
  message_files: MessageFile[];
  isBot?: boolean;
  notSend?: boolean;
  status: MessageStatus;
}

type Props = {
  selectedCustomer: number;
};

export default function ChatConversation({ selectedCustomer }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data, isLoading, refetch } = useGetConversationMessagesQuery(selectedCustomer);
  const user = useSelector((state: RootState) => state.auth.user);
  const [uploadImages, { isLoading: uploading }] = useUploadImagesMutation();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = bottomRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.on('receive_message', (newMessage: Message) => {
      refetch();
    });
  }, []);

  useEffect(() => {
    if (data) {
      setMessages(data as Message[]);
    }
  }, [data]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    const newMessage: Message = {
      id: Date.now(),
      message: input,
      senderId: user?.id || 1,
      isReadBy: null,
      conversationId: selectedCustomer,
      createdAt: new Date().toISOString(),
      read: false,
      message_files: [],
      status: 'sending',
    };
    setMessages((prev) => [...prev, newMessage]);
    socket.emit('send_message', {
      conversationId: selectedCustomer,
      userId: user?.id,
      message: input.trim(),
      files: [],
    });
    setInput('');
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: 'seen' } : msg))
      );
    }, 500);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('images', file);

    try {
      const response = await uploadImages(formData).unwrap();
      const imageUrl = response[0];

      const newMessage: Message = {
        id: Date.now(),
        message: ' ',
        senderId: user?.id || 1,
        isReadBy: null,
        conversationId: selectedCustomer,
        createdAt: new Date().toISOString(),
        read: false,
        status: 'sending',
        message_files: [
          {
            id: Date.now(),
            url: imageUrl,
            createAt: new Date().toISOString(),
            messageId: 0,
          },
        ],
      };

      setMessages((prev) => [...prev, newMessage]);
      socket.emit('send_message', {
        conversationId: selectedCustomer,
        userId: user?.id,
        message: ' ',
        files: imageUrl ? [imageUrl] : [],
      });
      setImagePreview(null);
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: 'seen' } : msg))
        );
      }, 500);
    } catch (error) {
      console.error('Upload failed:', error);
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
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="flex h-[80vh] w-2/3 flex-col overflow-hidden rounded-r-xl border-l bg-white shadow-md">
      {/* Messages */}
      <div ref={bottomRef} className="flex-grow space-y-3 overflow-y-auto bg-gray-50 px-6 py-4">
        {!selectedCustomer ? (
          <p className="mt-20 text-center text-gray-400">Select a customer to start chatting</p>
        ) : isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-200" />
            </div>
          ))
        ) : messages.length === 0 ? (
          <p className="mt-20 text-center text-gray-500">No messages yet</p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-1 ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-end gap-1">
                <div
                  className={`max-w-xs rounded-xl px-4 py-2 text-sm shadow ${
                    msg.senderId === user?.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.message_files?.length > 0
                    ? msg.message_files.map((file) => (
                        <img
                          key={file.url}
                          src={file.url}
                          alt="uploaded"
                          className="max-w-[200px] rounded-md border"
                        />
                      ))
                    : msg.message}
                </div>
              </div>
              {getStatusIcon(msg.status)}
            </div>
          ))
        )}
      </div>

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
      {uploading && (
        <div className="bottom-0 my-2 flex items-center gap-1 text-sm text-blue-500">
          <Loader2Icon className="animate-spin" /> Uploading image...
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
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={!selectedCustomer}
        />

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

        <button
          onClick={handleSendMessage}
          disabled={!selectedCustomer}
          className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <SendHorizonal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
