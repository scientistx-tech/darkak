"use client";

import React, { useState, useEffect } from "react";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { FaQuoteLeft } from "react-icons/fa";
import { Button } from "antd";

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    name: "Tasnim Akash, Dhaka",
  },
  {
    id: 2,
    rating: 4,
    text: "Amazing experience with the watch collection. Beautiful and long-lasting. I'd highly recommend!",
    name: "Shakib Hossen, Chattogram",
  },
  {
    id: 3,
    rating: 3,
    text: "This is the best watch I’ve ever purchased. Looks elegant and runs smoothly.",
    name: "Promy, Sylhet",
  },
];

export default function WatchTestimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 7000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (value: number) => {
    return (
      <div className="flex gap-1 justify-center">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-xl ${
              i < value ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="relative w-full md:bg-gradient-to-r from-blue-100 via-white to-blue-100 py-16 px-4 flex justify-center items-center">
      {/* Glass Card */}
      <div className="relative max-w-3xl w-full rounded-2xl border border-blue-200 bg-white/60 backdrop-blur-md px-8 py-12 shadow-xl transition-all duration-500">
        {/* Quote icon */}
        <FaQuoteLeft className="absolute -top-6 left-12 text-5xl text-primary opacity-90" />

        {/* Star rating */}
        {renderStars(testimonials[currentIndex].rating)}

        {/* Testimonial text */}
        <p className="mt-4 md:h-[70px] text-center text-gray-700 text-lg font-medium transition-all duration-500 ease-in-out">
          {testimonials[currentIndex].text}
        </p>

        {/* Name */}
        <p className="mt-3 text-center text-[#1B1464] font-semibold text-xl">
          {testimonials[currentIndex].name}
        </p>

        {/* Navigation buttons */}
        <div className="mt-4 flex justify-center gap-6">
          <button
            onClick={prevTestimonial}
            className="text-[#1B1464] text-3xl hover:text-blue-600 hover:scale-110 transition"
          >
            <LeftCircleOutlined />
          </button>
          <button
            onClick={nextTestimonial}
            className="text-[#1B1464] text-3xl hover:text-blue-600 hover:scale-110 transition"
          >
            <RightCircleOutlined />
          </button>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-5">
          <Button
            type="primary"
            className="!bg-[#1B1464] hover:!bg-blue-700 text-white font-bold px-8 py-2 rounded-full shadow-md"
          >
            SHOP NOW
          </Button>
        </div>
      </div>
    </div>
  );
}
