"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmailFrom from "./EmailFrom";
import EmailList from "./EmailList";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"form" | "list">('form');

  return (
    <div className="p-6 space-y-4">
      {/* ✅ Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab("form")}
          className={`px-4 py-2 rounded-md shadow-md transition ${
            activeTab === "form"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Send Email
        </button>
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 rounded-md shadow-md transition ${
            activeTab === "list"
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Email List
        </button>
      </div>

      {/* ✅ Animated Content */}
      <AnimatePresence mode="wait">
        {activeTab === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <EmailFrom />
          </motion.div>
        )}

        {activeTab === "list" && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <EmailList />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
