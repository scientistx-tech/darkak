"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What is Meltiventory?",
    answer:
      "Meltiventory is your premium e-commerce destination offering a wide variety of quality products with fast delivery and excellent customer service.",
  },
  {
    question: "How do I track my order?",
    answer:
      "After your order is shipped, a tracking link will be sent to your email. You can also find tracking info in your Meltiventory account dashboard.",
  },
  {
    question: "What is the return policy?",
    answer:
      "We offer a 7-day hassle-free return policy. Simply go to 'My Orders' and start the return process or contact our support team for assistance.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Our support team is available 24/7. You can chat live with us, email at support@meltiventory.com, or call +123-456-7890 anytime!",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#e0f7fa] via-[#fce4ec] to-[#e0f7fa] py-16 px-6">
      <div className="mx-auto max-w-5xl backdrop-blur-lg bg-white/60 rounded-3xl p-10 shadow-2xl">
        <h1 className="text-center text-3xl md:text-5xl font-bold text-primaryBlue mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white/80 hover:bg-white p-6 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  {faq.question}
                </h2>
                
                <FaChevronDown
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  } text-gray-500`}
                />
              </div>

              <div
                className={`mt-4 text-gray-600 leading-relaxed transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
