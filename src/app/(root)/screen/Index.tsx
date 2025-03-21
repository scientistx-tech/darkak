"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import img1 from "@/Data/Demo/Product-banner-1.jpg";
import img2 from "@/Data/Demo/Product-banner-2.jpg";
import img3 from "@/Data/Demo/Product-banner-3.webp";
import img4 from "@/Data/Demo/Product-banner-4.jpg";
import img5 from "@/Data/Demo/Product-banner-5.webp";
import img6 from "@/Data/Demo/Product-banner-6.jpg";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const images = [img1, img2, img3, img4];

const Index: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex h-[450px] w-full justify-between">
      <div className="relative w-[67%]">
        <button
          className="absolute left-4 top-1/2 h-[30px] w-[30px] -translate-y-1/2 transform rounded-full bg-white text-xl shadow-md"
          onClick={prevSlide}
        >
          <LeftOutlined />
        </button>

        <Image
          alt="Slider Image"
          src={images[currentIndex]}
          className="h-[450px] w-full rounded object-cover"
        />

        <button
          className="absolute right-4 top-1/2 h-[30px] w-[30px] -translate-y-1/2 transform rounded-full bg-white text-xl shadow-md"
          onClick={nextSlide}
        >
          <RightOutlined />
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full transition-all ${
                currentIndex === index ? "w-6 bg-primary" : "bg-secondary"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="flex w-[30%] flex-col justify-between">
        <Link href="" className="">
          <Image alt="Img" src={img5} className="h-[200px] w-full rounded" />
        </Link>

        <Link href="" className="">
          <Image alt="Img" src={img6} className="h-[200px] w-full rounded" />
        </Link>
      </div>
    </div>
  );
};

export default Index;
