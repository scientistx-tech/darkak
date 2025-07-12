'use client';
import React from 'react';

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
};

type Props = {
  chats: Chat[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function ChatList({ chats, selectedId, onSelect }: Props) {
  return (
    <div className="w-1/3 border-gray-300 h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-semibold p-4 border-b text-primary">Customer Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`cursor-pointer p-4 border-b hover:bg-primary hover:text-white transition ${
              selectedId === chat.id ? 'bg-blue-500 text-white' : ''
            }`}
          >
            <p className="font-medium">{chat.name}</p>
            <p className="text-sm truncate">{chat.lastMessage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
