"use client";
import React, { useState, useRef } from "react";
import { Input, Button, message as antdMessage } from "antd";
import {
  PaperClipOutlined,
  SendOutlined,
  CloseOutlined,
} from "@ant-design/icons";

type Message = {
  sender: "user" | "bot";
  text?: string;
  image?: string;
};

export default function NoneUserChat({ name }: { name: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: `👋 Hello ${name}, how can We help you today?` },
  ]);
  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim() && !imagePreview) return;

    const newMessages: Message[] = [];

    if (input.trim()) {
      newMessages.push({ sender: "user", text: input });
    }

    if (imagePreview) {
      newMessages.push({ sender: "user", image: imagePreview });
      setImagePreview(null);
    }

    setMessages((prev) => [...prev, ...newMessages]);
    setInput("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      antdMessage.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex h-full flex-col justify-between">
      {/* Chat Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto rounded-lg p-3 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] rounded-xl px-3 py-2 text-sm shadow-sm ${
              msg.sender === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {msg.text && <p>{msg.text}</p>}
            {msg.image && (
              <ImageBubble image={msg.image} isUser={msg.sender === "user"} />
            )}
          </div>
        ))}

        {/* Image Preview before sending */}
        {imagePreview && (
          <div className="mt-3 flex items-center justify-end">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 rounded-lg border object-cover shadow"
              />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-[2px]"
              >
                <CloseOutlined size={10} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="mt-3 flex items-center gap-2 border-t border-gray-200 pt-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-gray-600 hover:text-blue-600 hover:border-blue-600 transition"
        >
          <PaperClipOutlined className="text-lg" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <Input
          placeholder="Type your message..."
          size="large"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSend}
          className="flex-1"
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleSend}
        />
      </div>
    </div>
  );
}

function ImageBubble({ image, isUser }: { image: string; isUser: boolean }) {
  return (
    <div
      className={`mt-1 ${
        isUser ? "flex justify-end" : "flex justify-start"
      }`}
    >
      <img
        src={image}
        alt="Sent"
        className="max-w-[150px] rounded-lg shadow-md border object-cover"
      />
    </div>
  );
}
