'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdPhoneInTalk, MdMailOutline } from 'react-icons/md';
import { FaWhatsapp, FaChevronLeft } from 'react-icons/fa';
import LiveChat from './LiveChat';

export default function CustomerCare() {
  const [activeTab, setActiveTab] = useState('helpline');
  const [showLiveChatBox, setShowLiveChatBox] = useState(false);

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white/30 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl sm:p-10">
      <h2 className="mb-10 text-center text-4xl font-extrabold text-blue-900 drop-shadow-md">
        Contact Customer Care
      </h2>

      {/* Conditionally render box-div or live chat box */}
      {!showLiveChatBox ? (
        <div>
          {/* Button Group */}
          <div className="mb-6 flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('helpline')}
              className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'helpline'
                  ? 'bg-primaryBlue text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-primaryBlue hover:text-white'
              }`}
            >
              Darkak Help Line
              <p className="text-xs font-normal">24/7 Days</p>
            </button>

            <button
              onClick={() => setActiveTab('livechat')}
              className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'livechat'
                  ? 'bg-primaryBlue text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-primaryBlue hover:text-white'
              }`}
            >
              Live Chat with Agent
              <p className="text-xs font-normal">9 AM - 6 PM [Everyday]</p>
            </button>
          </div>

          {/* Content Section with Animation */}
          <div className="min-h-[100px]">
            <AnimatePresence mode="wait">
              {activeTab === 'helpline' && (
                <motion.div
                  key="helpline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center text-gray-700"
                >
                  <h3 className="mb-2 text-xl font-semibold">📞 Call Us Anytime</h3>
                  <p>We are available 24/7 to support you.</p>
                  <p className="mt-2 font-medium">Hotline: 01711726501</p>
                  <p className="text-sm text-gray-600">Email: info@darkak.com.bd</p>
                  <p className="text-sm text-gray-600">Address: Upashahar, Bogura - 5800</p>

                  <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <a
                      href="tel:01711726501"
                      className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2 text-white shadow-lg transition-all hover:bg-green-700"
                    >
                      <MdPhoneInTalk /> Call Now
                    </a>
                    <a
                      href="https://wa.me/8801711726501"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2 text-white shadow-lg transition-all hover:bg-green-500"
                    >
                      <FaWhatsapp /> WhatsApp
                    </a>
                    <a
                      href="mailto:info@darkak.com.bd"
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white shadow-lg transition-all hover:bg-blue-700"
                    >
                      <MdMailOutline /> Email Us
                    </a>
                  </div>
                </motion.div>
              )}

              {activeTab === 'livechat' && (
                <motion.div
                  key="livechat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center text-gray-700"
                >
                  <h3 className="mb-2 text-xl font-semibold">💬 Chat With Our Agent</h3>
                  <p>Available from 9 AM to 6 PM every day.</p>
                  <p className="mt-2 font-medium">Click below to start chat:</p>
                  <button
                    onClick={() => setShowLiveChatBox(true)}
                    className="mt-3 rounded-md bg-primaryBlue px-4 py-2 text-white transition-all hover:bg-blue-700"
                  >
                    Start Live Chat
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div>
          {/* Live Chat Header */}
          <div className="mb-5 flex w-full items-center justify-between rounded-lg bg-primary text-white p-3">
            <button
              onClick={() => setShowLiveChatBox(false)}
              className="flex items-center gap-2 text-lg"
            >
              <FaChevronLeft />
              Back
            </button>
            <p className="text-xl font-semibold">Live Support Chat</p>
            <div className="w-6" /> {/* Spacer */}
          </div>

          {/* Live Chat Component */}
          <LiveChat />
        </div>
      )}
    </div>
  );
}
