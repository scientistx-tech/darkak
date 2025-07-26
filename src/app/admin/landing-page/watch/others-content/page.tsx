'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import WatchBrand from './components/WatchBrand';
import WatchCategory from './components/WatchCategory';
import WatchPoster from './components/WatchPoster';
import WatchTestimonial from './components/WatchTestimonial';
import WatchBanner from './components/WatchBanner';

export default function Page() {
  const [activeTab, setActiveTab] = useState<'category' | 'brand' | 'poster' | 'banner' | 'testimonial'>('category');

  return (
    <div className="w-full px-4 py-6">
      {/* Tab Buttons */}
      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={() => setActiveTab('banner')}
          className={`rounded-md px-4 py-2 text-white ${
            activeTab === 'banner' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          Banner
        </button>
        <button
          onClick={() => setActiveTab('category')}
          className={`rounded-md px-4 py-2 text-white ${
            activeTab === 'category' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          Category
        </button>
        <button
          onClick={() => setActiveTab('brand')}
          className={`rounded-md px-4 py-2 text-white ${
            activeTab === 'brand' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          Brand
        </button>
        <button
          onClick={() => setActiveTab('poster')}
          className={`rounded-md px-4 py-2 text-white ${
            activeTab === 'poster' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          Poster
        </button>
        <button
          onClick={() => setActiveTab('testimonial')}
          className={`rounded-md px-4 py-2 text-white ${
            activeTab === 'testimonial' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          Testimonial
        </button>
      </div>

      {/* Animated Section Content */}
      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === 'category' && (
            <motion.div
              key="category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WatchCategory />
            </motion.div>
          )}

          {activeTab === 'brand' && (
            <motion.div
              key="brand"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WatchBrand />
            </motion.div>
          )}

          {activeTab === 'poster' && (
            <motion.div
              key="poster"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WatchPoster />
            </motion.div>
          )}

          {activeTab === 'testimonial' && (
            <motion.div
              key="testimonial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WatchTestimonial />
            </motion.div>
          )}

           {activeTab === 'banner' && (
            <motion.div
              key="banner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WatchBanner />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
