'use client';

import { useEffect, useRef, useState } from 'react';
import { SendHorizonal, ImageIcon, X, Loader2Icon } from 'lucide-react';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { useGetConversationMessagesQuery } from '@/redux/services/client/homeContentApi';
import Loader from '@/components/shared/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useUploadImagesMutation } from '@/redux/services/admin/adminProductApis';
import { socket } from '@/socket';

interface MessageFile {
  id: number;
  url: string;
  createAt: string;
  messageId: number;
}

interface Message {
  id: number;
  message: string;
  senderId: number;
  isReadBy: number | null;
  conversationId: number;
  createdAt: string;
  read: boolean;
  message_files: MessageFile[];
  isBot?: boolean;
  notSend?: boolean;
}

type Order = {
  id: string;
  productName: string;
  productImage: string;
};

export default function LiveChat({ id }: { id: number }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showOrders, setShowOrders] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data, isLoading } = useGetConversationMessagesQuery(id);
  const user = useSelector((state: RootState) => state.auth.user);
  const [uploadImages, { isLoading: uploading }] = useUploadImagesMutation();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  useEffect(() => {
    const container = bottomRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const dummyOrders: Order[] = [
    {
      id: '#ORDER00123',
      productName: 'Blue Cotton T-Shirt',
      productImage: 'https://via.placeholder.com/150x150?text=T-Shirt',
    },
    {
      id: '#ORDER00124',
      productName: 'Wireless Headphones',
      productImage: 'https://via.placeholder.com/150x150?text=Headphones',
    },
    {
      id: '#ORDER00125',
      productName: 'Leather Wallet',
      productImage: 'https://via.placeholder.com/150x150?text=Wallet',
    },
  ];

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    const newMessage: Message = {
      id: Date.now(),
      message: input,
      senderId: user?.id || 1,
      isReadBy: null,
      conversationId: id,
      createdAt: new Date().toISOString(),
      read: false,
      message_files: [],
    };
    setMessages((prev) => [...prev, newMessage]);
    socket.emit('send_message', {
      conversationId: id,
      userId: user?.id,
      message: input.trim(),
      files: [],
    }); // ✅ emit image message
    setInput('');
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('images', file);

    try {
      const response = await uploadImages(formData).unwrap();
      const imageUrl = response[0];

      // Build a message with image
      const newMessage: Message = {
        id: Date.now(),
        message: ' ', // no text, just image
        senderId: user?.id || 1,
        isReadBy: null,
        conversationId: id,
        createdAt: new Date().toISOString(),
        read: false,
        message_files: [
          {
            id: Date.now(), // dummy ID for frontend
            url: imageUrl,
            createAt: new Date().toISOString(),
            messageId: 0, // will be updated by backend
          },
        ],
      };

      setMessages((prev) => [...prev, newMessage]);
      socket.emit('send_message', {
        conversationId: id,
        userId: user?.id,
        message: ' ',
        files: imageUrl ? [imageUrl] : [],
      }); // ✅ emit image message
      setSelectedImage(null); // optional: clear preview
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-xl rounded border bg-white p-4 shadow">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Live Chat</h2>
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => setShowOrders((prev) => !prev)}
        >
          <AiOutlineMenuUnfold className="h-5 w-5" />
        </button>
      </div>

      {showOrders && (
        <div className="mb-4 border-t pt-2">
          <h3 className="mb-2 font-medium">Orders</h3>
          <div className="space-y-2">
            {dummyOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-3">
                <img
                  src={order.productImage}
                  alt={order.productName}
                  className="h-12 w-12 rounded object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{order.productName}</p>
                  <p className="text-xs text-gray-500">{order.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div ref={bottomRef} className="mb-2 flex max-h-96 flex-col gap-2 overflow-y-auto">
        {isLoading ? (
          <Loader />
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`w-fit max-w-xs rounded-md p-2 text-sm ${
                msg.senderId === user?.id ? 'ml-auto bg-blue-100' : 'bg-gray-100'
              }`}
            >
              {msg.message_files?.length > 0 && (
                <img
                  src={msg.message_files[0].url}
                  alt="attachment"
                  className="mb-1 h-auto w-40 rounded"
                />
              )}
              {msg.message}
            </div>
          ))
        )}
      </div>
      {uploading && (
        <div className="bottom-0 my-2 flex items-center gap-1 text-sm text-blue-500">
          <Loader2Icon /> Uploading image...
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded border px-3 py-1 text-sm outline-none"
          placeholder="Type a message..."
          disabled={uploading}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="disabled:opacity-50"
        >
          <ImageIcon className="h-5 w-5 text-gray-500" />
        </button>
        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
        <button
          onClick={handleSendMessage}
          disabled={uploading || input.trim() === ''}
          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 disabled:bg-blue-300"
        >
          <SendHorizonal className="h-4 w-4" />
        </button>
      </div>

      {selectedImage && (
        <div className="relative mt-2 w-40">
          <img src={selectedImage} alt="Selected" className="h-auto w-full rounded" />
          <button
            className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 text-white"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
