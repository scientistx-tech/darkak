"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaComments } from "react-icons/fa";
import { Modal, Input, Button } from "antd";
import ProfileImg from "@/Data/Img/profile.jpg";
import NoneUserChat from "./NoneUserChat";

const WHATSAPP_LINK =
  "https://api.whatsapp.com/send?phone=8801711726501&text=Hello 👋";

export default function FloatButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Name/Email Modal
  const [isChatModalOpen, setIsChatModalOpen] = useState(false); // Chat Modal
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLiveChatClick = () => {
    setIsModalOpen(true);
  };

  const handleStartChat = () => {
    if (!name.trim() || !email.trim()) {
      alert("Please fill all fields");
      return;
    }

    // Save user data (optional)
    localStorage.setItem(
      "chatUser",
      JSON.stringify({ name: name.trim(), email: email.trim() })
    );

    // Close first modal and open chat modal
    setIsModalOpen(false);
    setIsChatModalOpen(true);
  };

  return (
    <>
      {/* Floating Button */}
      <div
        className="fixed bottom-8 right-6 z-50 flex flex-col items-end"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover Menu */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="mb-3 flex flex-col items-end gap-2"
            >
              {/* Live Chat Button */}
              <button
                onClick={handleLiveChatClick}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700"
              >
                <FaComments className="text-white" />
                Live Chat
              </button>

              {/* WhatsApp Button */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-green-600"
              >
                <FaWhatsapp className="text-white" />
                WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Profile Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative cursor-pointer rounded-full border-2 border-primary shadow-lg"
        >
          <Image
            src={ProfileImg}
            alt="Support Agent"
            width={60}
            height={60}
            className="h-[60px] w-[60px] rounded-full border-2 border-white shadow-lg"
          />
          <span className="absolute right-0 top-0 h-3 w-3 animate-ping rounded-full border-2 border-white bg-green-500"></span>
          <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
        </motion.div>
      </div>

      {/* 1️⃣ Modal for Name & Email */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        title="Start Live Chat"
      >
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="large"
            className="outline-none border-2 border-primaryBlue focus:outline-none focus:border-primaryBlue"
          />
          <Input
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="large"
            className="outline-none border-2 border-primaryBlue focus:outline-none focus:border-primaryBlue"
          />
          <Button
            type="primary"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleStartChat}
            size="large"
          >
            Start Chat
          </Button>
        </div>
      </Modal>

      {/* 2️⃣ Modal for Actual Live Chat */}
      <Modal
        open={isChatModalOpen}
        onCancel={() => setIsChatModalOpen(false)}
        footer={null}
        centered
        title={`Chat with Support (${name})`}
        width={500}
      >
        <NoneUserChat name={name}/>
      </Modal>
    </>
  );
}
