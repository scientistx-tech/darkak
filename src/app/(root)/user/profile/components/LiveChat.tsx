'use client';

import { useRef, useState } from 'react';
import { SendHorizonal, ImageIcon, X } from 'lucide-react';
import { AiOutlineMenuUnfold } from 'react-icons/ai';

type Message = {
  from: 'user' | 'bot';
  text?: string;
  imageUrl?: string;
};

type Order = {
  id: string;
  productName: string;
  productImage: string;
};

export default function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showOrders, setShowOrders] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dummyOrders: Order[] = [
    {
      id: '#ORDER00123',
      productName: 'Blue Cotton T-Shirt',
      productImage: 'data:image/jpeg;base64,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',
    },
    {
      id: '#ORDER00124',
      productName: 'Wireless Headphones',
      productImage: 'data:image/jpeg;base64,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',
    },
    {
      id: '#ORDER00125',
      productName: 'Leather Wallet',
      productImage: 'data:image/jpeg;base64,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',
    },
  ];

  const handleSend = () => {
    if (!input.trim() && !selectedImage) return;

    if (input.trim()) {
      setMessages((prev) => [...prev, { from: 'user', text: input }]);
    }

    if (selectedImage) {
      setMessages((prev) => [...prev, { from: 'user', imageUrl: selectedImage }]);
      setSelectedImage(null);
    }

    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: 'Thanks for your message. We’ll get back to you soon!' },
      ]);
    }, 800);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleOrderSelect = (order: Order) => {
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: `Issue with ${order.productName} (${order.id})` },
    ]);
    setShowOrders(false);
  };

  return (
    <div className="w-full">
      {/* Chat messages */}
      <div className="h-96 space-y-3 overflow-y-auto bg-gray-50 px-4 py-3">
        {messages.length === 0 && (
          <p className="text-center text-sm text-gray-500">Start a conversation...</p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
              msg.from === 'user' ? 'ml-auto flex justify-end' : 'mr-auto'
            }`}
          >
            {msg.imageUrl ? (
              <img src={msg.imageUrl} alt="uploaded" className="max-w-[200px] rounded-md" />
            ) : (
              <div
                className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                  msg.from === 'user'
                    ? 'ml-auto bg-blue-500 text-white'
                    : 'mr-auto bg-gray-200 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected image preview */}
      {selectedImage && (
        <div className="relative mt-2 w-fit max-w-[150px] overflow-hidden rounded-md border border-gray-300 p-1">
          <img src={selectedImage} alt="Selected" className="rounded-md" />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-1 top-1 rounded-full bg-white p-1 text-gray-600 shadow hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Input box */}
      <div className="relative border-t border-gray-200 p-3">
        <div className="flex items-center">
          {/* Order list toggle */}
          <div className="relative">
            <button
              onClick={() => setShowOrders((prev) => !prev)}
              className="mr-2 rounded-full bg-gray-200 p-2 text-gray-600 transition hover:bg-gray-300"
            >
              <AiOutlineMenuUnfold />
            </button>

            {/* Order dropdown with product image and name */}
            {showOrders && (
              <div className="absolute left-0 top-12 z-10 w-72 rounded-md border bg-white shadow-md p-2 space-y-2">
                {dummyOrders.map((order, i) => (
                  <div
                    key={i}
                    onClick={() => handleOrderSelect(order)}
                    className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-100"
                  >
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      className="h-10 w-10 rounded object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{order.productName}</p>
                      <p className="text-xs text-gray-500">{order.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input field */}
          <input
            type="text"
            className="flex-grow rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          {/* Image upload */}
          <button
            className="ml-2 rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="h-5 w-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            className="ml-2 rounded-full bg-blue-600 p-2 text-white transition hover:bg-blue-700"
          >
            <SendHorizonal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
