'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SeoCart from './components/SeoCart';

export default function ForgotPasswordPage() {
  const [activeTab, setActiveTab] = useState<'seo' >('seo');

  return (
    <div className="">
      <h1 className="mb-4 text-2xl font-bold">Forgot Password Page</h1>
      <p className="mb-6 text-gray-700">
        This is the SEO section for managing Forgot Password page metadata.
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

         

          
        </AnimatePresence>
      </div>
    </div>
  );
}
