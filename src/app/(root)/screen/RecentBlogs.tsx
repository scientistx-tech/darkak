"use client";

import BlogsCart from "@/components/shared/BlogsCart";
import React from "react";

import img1 from "@/Data/Demo/product-2-3.png";

const RecentBlogs: React.FC = () => {
  return (
    <div className="w-full">
      <p className="mt-10 text-2xl font-semibold uppercase text-primary md:mt-16 md:text-3xl">
        RECENT<samp className="text-secondary"> BLOGS</samp>
      </p>

      <div className="tablet:mt-10 relative mt-5 flex w-full items-center justify-center">
        <BlogsCart
          image={img1}
          writerName="John Doe"
          date="March 25, 2025"
          title="Understanding React Performance"
          description="Learn how to optimize React apps for better performance."
        />
      </div>
    </div>
  );
};

export default RecentBlogs;
