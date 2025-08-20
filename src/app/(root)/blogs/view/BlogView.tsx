"use client";

import React from "react";
import Image from "next/image";
import { FaUser, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

import heroImg from "@/Data/Demo/thumb-1920-831859.jpg";

export default function BlogView() {
  return (
    <div className="w-full mt-10">
      {/* Back button */}
      <div className="max-w-5xl mx-auto px-4">
        <Link
          href="/blogs"
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-6"
        >
          <FaArrowLeft /> Back to Blogs
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative w-full max-w-5xl mx-auto px-4">
        <div className="relative h-72 md:h-[420px] w-full rounded-xl overflow-hidden shadow-lg">
          <Image
            src={heroImg}
            alt="Blog Hero"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-2xl md:text-4xl font-bold text-white text-center px-4">
              Top 10 Summer Fashion Trends for 2025
            </h1>
          </div>
        </div>
      </div>

      {/* Blog Meta */}
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <div className="flex items-center justify-between text-sm text-gray-500 border-b pb-4">
          <div className="flex items-center gap-2">
            <FaUser className="text-gray-400" />
            <span>John Doe</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            <span>August 20, 2025</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-3xl mx-auto px-4 mt-6 text-gray-700 leading-relaxed">
        <p className="mb-4">
          Summer 2025 is all about bold statements, vibrant colors, and comfort.
          From oversized hats to eco-friendly fabrics, this season’s fashion
          trends are designed to keep you stylish while staying practical.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">
          1. Bright & Bold Colors
        </h2>
        <p className="mb-4">
          This summer, neon greens, electric blues, and bold oranges are taking
          over the fashion scene. Pair them with neutral accessories for a
          balanced look.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">
          2. Eco-Friendly Fabrics
        </h2>
        <p className="mb-4">
          Sustainable fashion continues to rise in 2025. Expect to see more
          outfits made from organic cotton, bamboo, and recycled fabrics.
        </p>

        <p className="mt-6">
          These are just a few of the exciting fashion trends for Summer 2025.
          Stay tuned to our blog for more updates and style guides.
        </p>
      </div>

      {/* Related Blogs */}
      <div className="max-w-5xl mx-auto px-4 mt-12 mb-16">
        <h3 className="text-xl md:text-2xl font-semibold mb-6">
          Related Blogs
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Example related blog card */}
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
            >
              <div className="h-40 w-full overflow-hidden">
                <Image
                  src={heroImg}
                  alt="Related Blog"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  Fashion Guide {item}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  Explore the latest styles and inspirations for the new season.
                </p>
                <Link
                  href="/blogs"
                  className="inline-block mt-3 text-primary font-medium text-sm hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
