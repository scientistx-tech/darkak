'use client';
import { useGetConversationQuery } from '@/redux/services/client/homeContentApi';
import { socket } from '@/socket';
import React, { useEffect } from 'react';

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
};

type Props = {
  chats: Chat[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export default function ChatList({ chats, selectedId, onSelect }: Props) {
  const { data, isLoading, refetch } = useGetConversationQuery();

  useEffect(() => {
    socket.on('receive_message', (newMessage: any) => {
      console.log(newMessage);
      refetch();
    });
  }, []);

  return (
    <div className="h-[80vh] w-1/3 overflow-y-auto border-gray-300 bg-white dark:bg-dark">
      <h2 className="border-b p-4 text-xl font-semibold text-primary">Customer Chats</h2>
      <ul>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="border-b p-4">
                <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-300" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
              </li>
            ))
          : data?.map((chat) => (
              <li
                key={chat.id}
                onClick={() => onSelect(chat.id)}
                className={`relative cursor-pointer border-b p-4 transition hover:bg-primary hover:text-white ${
                  selectedId === chat.id
                    ? 'bg-blue-500 text-white'
                    : `${chat.unreadCount > 0 ? 'bg-gray-3' : ''}`
                }`}
              >
                <p className="font-medium">{chat.sender.name}</p>
                <p className="truncate text-sm">{chat?.messages?.[0]?.message || 'N/A'}</p>
                {chat.unreadCount > 0 && (
                  <div className="absolute aspect-square h-5 text-xs flex justify-center items-center w-5 overflow-hidden right-1 top-2 rounded-full bg-red p-1 text-white">
                    {chat.unreadCount}
                  </div>
                )}
              </li>
            ))}
      </ul>
    </div>
  );
}
