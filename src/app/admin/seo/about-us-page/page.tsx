'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContentCart from './components/ContentCart';
import SeoCart from './components/SeoCart';
import FaqCart from './components/FaqCart';

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState<'seo' | 'content' | 'faq'>('seo');

  return (
    <div className="">
      <h1 className="mb-4 text-2xl font-bold">AboutUs Page</h1>
      <p className="mb-6 text-gray-700">
        This is the SEO section for managing AboutUs page metadata.
      </p>

      {/* Toggle Buttons */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setActiveTab('seo')}
          className={`rounded-md px-4 py-2 text-white ${
            activeTab === 'seo' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          Meta Section
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`rounded-md px-4 py-2 text-white ${
            activeTab === 'content' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          Content Section
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`rounded-md px-4 py-2 text-white ${
            activeTab === 'faq' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          FAQ Section
        </button>
      </div>

      {/* Animated Section */}
      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === 'seo' && (
            <motion.div
              key="seo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <SeoCart />
            </motion.div>
          )}

          {activeTab === 'content' && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ContentCart />
            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FaqCart />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
