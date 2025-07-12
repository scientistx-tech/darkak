'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQ = {
  question: string;
  answer: string;
};

type Props = {
  content: string;
  faqs: FAQ[];
};

export default function ContentFaqCard({ content, faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full space-y-8 rounded-2xl bg-white p-6 shadow">
      {/* Content */}
      <div
        className="text-justify text-base font-light leading-relaxed tracking-wide text-gray-700 md:text-xl"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      {/* FAQ Section */}
      <div>
        <h2 className="mb-6 border-b pb-4 text-xl font-bold text-primaryBlue md:text-3xl">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300"
              >
                <button
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-medium text-gray-800 transition hover:bg-gray-50"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-0 text-base leading-relaxed text-gray-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
