"use client";

import React, { useRef } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import BlogsCart from "@/components/shared/BlogsCart";

import img1 from "@/Data/Demo/product-2-3.png";
import img2 from "@/Data/Demo/product-2-1.png";
import img3 from "@/Data/Demo/product-2-2.avif";
import img4 from "@/Data/Demo/product-2-4.png";
import img5 from "@/Data/Demo/product-2-3.png";

const RecentBlogs: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300, // Adjust this value to control scroll distance
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300, // Adjust this value to control scroll distance
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="w-full">
      <p className="mt-10 text-2xl font-semibold uppercase text-primary md:mt-16 md:text-3xl">
        RECENT<samp className="text-secondary"> BLOGS</samp>
      </p>

      <div className="tablet:mt-10 relative mt-5 flex w-full items-center justify-center">
        <button
          onClick={scrollLeft}
          className="absolute left-2 z-10 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-200"
        >
          <FaAngleDoubleLeft />
        </button>

        <div
          ref={scrollRef}
          className="no-scrollbar flex h-auto w-full space-x-5 overflow-hidden overflow-x-scroll scroll-smooth"
        >
          <div className="">
            <BlogsCart
              image={img1}
              writerName="John Doe"
              date="March 25, 2025"
              title="Understanding React Performance"
              description="Learn how to optimize React apps for better performance."
            />
          </div>

          <div className="">
            <BlogsCart
              image={img2}
              writerName="John Doe"
              date="March 25, 2025"
              title="Understanding React Performance"
              description="Learn how to optimize React apps for better performance."
            />
          </div>

          <div className="">
            <BlogsCart
              image={img3}
              writerName="John Doe"
              date="March 25, 2025"
              title="Understanding React Performance"
              description="Learn how to optimize React apps for better performance."
            />
          </div>

          <div className="">
            <BlogsCart
              image={img4}
              writerName="John Doe"
              date="March 25, 2025"
              title="Understanding React Performance"
              description="Learn how to optimize React apps for better performance."
            />
          </div>

          <div className="">
            <BlogsCart
              image={img5}
              writerName="John Doe"
              date="March 25, 2025"
              title="Understanding React Performance"
              description="Learn how to optimize React apps for better performance."
            />
          </div>

          <div className="">
            <BlogsCart
              image={img3}
              writerName="John Doe"
              date="March 25, 2025"
              title="Understanding React Performance"
              description="Learn how to optimize React apps for better performance."
            />
          </div>
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-2 z-10 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-200"
        >
          <FaAngleDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default RecentBlogs;
