'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogFrom from './components/BlogFrom';
import BlogList from './components/BlogList';

export default function Page() {
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');

  return (
    <div>
      {/* Header with toggle buttons */}
      <div className="mb-6 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          {activeTab === 'form' ? 'Create New Blog' : 'Blog List'}
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('list')}
            className={`rounded-md border-2 border-primaryBlue px-4 py-2 font-medium transition-all duration-300 ${
              activeTab === 'list'
                ? 'bg-primaryBlue text-white'
                : 'bg-white text-primaryBlue hover:bg-primaryBlue hover:text-white'
            }`}
          >
            Blog List
          </button>

          <button
            onClick={() => setActiveTab('form')}
            className={`rounded-md border-2 border-primaryBlue px-4 py-2 font-medium transition-all duration-300 ${
              activeTab === 'form'
                ? 'bg-primaryBlue text-white'
                : 'bg-white text-primaryBlue hover:bg-primaryBlue hover:text-white'
            }`}
          >
            Add Blog
          </button>
        </div>
      </div>

      {/* Content with animation */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'form' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <BlogFrom />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <BlogList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
