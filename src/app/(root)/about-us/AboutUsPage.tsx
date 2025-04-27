"use client";

import React from "react";
import { FaUsers, FaBullseye, FaCrown } from "react-icons/fa";

const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f0] to-[#e0eafc] py-16 px-6">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white/80 backdrop-blur-md p-10 shadow-2xl space-y-16 animate-fade-in-up">
        
        {/* Title Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-[#2c3e50]">About <span className="text-primaryBlue">Us</span></h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Welcome to <span className="font-semibold text-primaryBlue">Darkak</span> — Your Ultimate E-commerce Destination!
          </p>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-300"></div>

        {/* Our Story */}
        <section className="space-y-6 text-gray-700 text-lg">
          <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-[#1b2a41]">
            <FaUsers className="text-primaryBlue" /> Our Story
          </h2>
          <p>
            Founded with a dream to redefine online shopping, <span className="font-semibold text-primaryBlue">Darkak</span> 
            has quickly grown into a beloved brand known for quality, trust, and customer-first service. 
            We bring handpicked products directly to your doorstep with a seamless and joyful experience.
          </p>
        </section>

        {/* Our Mission */}
        <section className="space-y-6 text-gray-700 text-lg">
          <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-[#1b2a41]">
            <FaBullseye className="text-primaryBlue" /> Our Mission
          </h2>
          <p>
            Our mission is simple: To empower our customers by providing high-quality products, 
            unbeatable prices, and outstanding service. We believe shopping should be inspiring, 
            effortless, and tailored to you.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="space-y-6 text-gray-700 text-lg">
          <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-[#1b2a41]">
            <FaCrown className="text-primaryBlue" /> Why Choose Darkak?
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>✅ Premium Products from trusted suppliers</li>
            <li>✅ Fast and secure delivery</li>
            <li>✅ 24/7 Customer Support</li>
            <li>✅ Easy returns and satisfaction guarantee</li>
          </ul>
        </section>

        {/* Ending Quote */}
        <div className="text-center pt-10">
          <p className="italic text-gray-500">"At <span className="font-semibold text-primaryBlue">Darkak</span>, you’re not just shopping — you’re experiencing excellence."</p>
        </div>

      </div>
    </div>
  );
};

export default AboutUsPage;
