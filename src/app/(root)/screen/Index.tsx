"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import img1 from "@/Data/Demo/Product-banner-1.jpg";
import img2 from "@/Data/Demo/Product-banner-2.jpg";
import img3 from "@/Data/Demo/Product-banner-3.webp";

// Slide data: image + text per slide
const slides = [
  {
    no: "01",
    image: img1,
    title: "Save Up to 30% on First Purchase",
    subtitle: "Unlocking the Power of Connection",
    tag: "HOT DEALS AVAILABLE",
    button: "Discover More",
  },
  {
    no: "02",
    image: img2,
    title: "Upgrade Your Lifestyle Today",
    subtitle: "Smart gadgets at unbeatable prices",
    tag: "LIMITED TIME OFFER",
    button: "Shop Now",
  },
  {
    no: "03",
    image: img3,
    title: "Tech that Empowers You",
    subtitle: "Explore innovation with every click",
    tag: "EXCLUSIVE LAUNCH",
    button: "Explore Deals",
  },
];

const Slider: React.FC = () => {
  const [index, setIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (i: number) => {
    setIndex(i);
  };

  const current = slides[index];

  return (
    <div className="w-full bg-[#E6EFFF] overflow-hidden font-montserrat">
      <div className="h-[calc(100vh-150px)] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 gap-8">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-sm font-semibold uppercase text-black tracking-wider">
            {current.tag}
          </h4>
          <h1 className="md:h-[100px] mt-4 text-4xl md:text-5xl font-medium text-gray-800">
            {current.title}
          </h1>
          <p className="mt-4 text-lg text-gray-700">{current.subtitle}</p>
          <button className="mt-6 px-6 py-2 rounded-full bg-[#003084] text-white font-semibold hover:bg-blue-600 transition">
            {current.button}
          </button>

          <p className="hidden md:block absolute mt-[62px] text-white left-[20%] text-[150px] font-montserrat"> {current.no}</p>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <Image
            src={current.image}
            alt={`Slide ${index}`}
            className="w-full h-[400px] rounded-xl object-contain"
            priority
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 pb-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
              i === index ? "bg-[#003084] scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
