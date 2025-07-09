"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    <div className="w-full  p-6 bg-white rounded-2xl shadow space-y-8">
      {/* Content */}
      <div className="text-gray-700 text-base md:text-xl leading-relaxed tracking-wide font-light text-justify">
        {content}
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl md:text-3xl font-bold text-primaryBlue mb-6 border-b pb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <button
                  className="flex w-full justify-between items-center px-6 py-5 text-left text-lg font-medium text-gray-800 hover:bg-gray-50 transition"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-gray-600 text-base leading-relaxed">
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
