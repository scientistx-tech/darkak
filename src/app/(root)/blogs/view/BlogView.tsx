'use client';

import React from 'react';
import Image from 'next/image';
import { FaUser, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

import heroImg from '@/Data/Demo/thumb-1920-831859.jpg';
import BlogsCart from '@/components/shared/BlogsCart';

import img from '@/Data/Demo/thumb-1920-831859.jpg';
import ContentFaqCard from '@/components/shared/ContentFaqCard';

export default function BlogView() {
  return (
    <div className="mt-10 w-full">
      {/* Back button */}
      <div className="">
        <Link
          href="/blogs"
          className="mb-6 flex items-center gap-2 text-gray-600 transition-colors hover:text-primary"
        >
          <FaArrowLeft /> Back to Blogs
        </Link>
      </div>

      {/* Hero Section */}
      <div className="w-full">
        <h1 className="mb-5 text-start text-2xl font-bold text-primaryBlue md:text-4xl">
          Top 10 Summer Fashion Trends for 2025
        </h1>
        <div className="relative h-72 w-full overflow-hidden rounded-xl shadow-lg md:h-[520px]">
          <Image src={heroImg} alt="Blog Hero" className="h-full w-full object-cover" priority />
        </div>
      </div>

      {/* Blog Meta */}
      <div className="mt-5 w-full">
        <div className="flex items-center justify-between border-b pb-4 text-sm text-gray-500">
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
      <div className="mt-6 w-full px-4 leading-relaxed text-gray-700">
        <p className="mb-4">
          Summer 2025 is all about bold statements, vibrant colors, and comfort. From oversized hats
          to eco-friendly fabrics, this season’s fashion trends are designed to keep you stylish
          while staying practical.
        </p>

        <h2 className="mb-3 mt-6 text-xl font-semibold md:text-2xl">1. Bright & Bold Colors</h2>
        <p className="mb-4">
          This summer, neon greens, electric blues, and bold oranges are taking over the fashion
          scene. Pair them with neutral accessories for a balanced look.
        </p>

        <h2 className="mb-3 mt-6 text-xl font-semibold md:text-2xl">2. Eco-Friendly Fabrics</h2>
        <p className="mb-4">
          Sustainable fashion continues to rise in 2025. Expect to see more outfits made from
          organic cotton, bamboo, and recycled fabrics.
        </p>

        <p className="mt-6">
          These are just a few of the exciting fashion trends for Summer 2025. Stay tuned to our
          blog for more updates and style guides.
        </p>
      </div>

      {/* Related Blogs */}
      <div className="mb-16 mt-12 w-full">
        <h3 className="mb-6 text-xl font-semibold text-primaryBlue md:text-2xl">Related Blogs</h3>

        <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <BlogsCart
            image={img}
            writerName="John Doe"
            date="Aug 20, 2025"
            title="Top 10 Summer Fashion Trends for 2025"
            description="Discover the hottest summer fashion trends of 2025. From vibrant colors to stylish accessories, find out how to upgrade your wardrobe this season."
          />
          <BlogsCart
            image={img}
            writerName="John Doe"
            date="Aug 20, 2025"
            title="Top 10 Summer Fashion Trends for 2025"
            description="Discover the hottest summer fashion trends of 2025..."
          />
          <BlogsCart
            image={img}
            writerName="Jane Smith"
            date="Aug 18, 2025"
            title="How to Style Your Accessories Like a Pro"
            description="Learn how to choose and style accessories to elevate your outfits..."
          />

          <BlogsCart
            image={img}
            writerName="John Doe"
            date="Aug 20, 2025"
            title="Top 10 Summer Fashion Trends for 2025"
            description="Discover the hottest summer fashion trends of 2025. From vibrant colors to stylish accessories, find out how to upgrade your wardrobe this season."
          />
        </div>
      </div>

      {/* <div className="ml-[2.5%] mt-8 w-[95%] md:mt-16">
        <ContentFaqCard content={data?.data?.content} faqs={data?.data?.faq?.faq || []} />
      </div> */}

    </div>
  );
}
