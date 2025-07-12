'use client';
import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatConversation from './ChatConversation';

const dummyChats = [
  { id: '1', name: 'John Doe', lastMessage: 'When will I receive my order?' },
  { id: '2', name: 'Jane Smith', lastMessage: 'I want to change my address.' },
  { id: '3', name: 'Rahim Uddin', lastMessage: 'Please check my refund status.' },
  { id: '4', name: 'Mr. XYZ', lastMessage: 'Please check my refund status.' },
];

export default function Page() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(dummyChats[0].id);

  return (
    <div className="flex overflow-hidden">
      <ChatList
        chats={dummyChats}
        selectedId={selectedCustomerId}
        onSelect={setSelectedCustomerId}
      />
      <ChatConversation selectedCustomer={selectedCustomerId} />
    </div>
  );
}
