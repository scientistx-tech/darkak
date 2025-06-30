'use client';

import { useGetHomeContentQuery } from '@/redux/services/client/homeContentApi';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';


const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { data, isLoading, error } = useGetHomeContentQuery();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = data?.faqs || [];

  if (isLoading) return <p className="text-center py-10">Loading FAQs...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Failed to load FAQs.</p>;

  return (
    <div className="mx-auto max-w-7xl mt-10 backdrop-blur-lg bg-white/60 rounded-xl p-10">
      <h1 className="text-center text-xl md:text-3xl font-bold text-primaryBlue mb-12">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((faq: any, index: number) => (
          <div
            key={faq.id}
            className="rounded-xl bg-white/80 hover:bg-white px-6 py-3 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg font-semibold text-gray-800">
                {faq.question}
              </h2>

              <FaChevronDown
                className={`transition-transform ${
                  openIndex === index ? 'rotate-180' : 'rotate-0'
                } text-gray-500`}
              />
            </div>

            <div
              className={`mt-4 text-gray-600 leading-relaxed transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
