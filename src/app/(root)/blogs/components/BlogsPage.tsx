'use client';

import BlogsCart from '@/components/shared/BlogsCart';
import React from 'react';

import { Pagination } from 'antd';

import img from '@/Data/Demo/thumb-1920-831859.jpg';

const BlogsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <BlogsCart
          link="/blogs/view"
          image={img}
          writerName="John Doe"
          date="Aug 20, 2025"
          title="Top 10 Summer Fashion Trends for 2025"
          description="Discover the hottest summer fashion trends of 2025. From vibrant colors to stylish accessories, find out how to upgrade your wardrobe this season."
        />
        <BlogsCart
          link="/blogs/view"
          image={img}
          writerName="John Doe"
          date="Aug 20, 2025"
          title="Top 10 Summer Fashion Trends for 2025"
          description="Discover the hottest summer fashion trends of 2025..."
        />
        <BlogsCart
          link="/blogs/view"
          image={img}
          writerName="Jane Smith"
          date="Aug 18, 2025"
          title="How to Style Your Accessories Like a Pro"
          description="Learn how to choose and style accessories to elevate your outfits..."
        />

        <BlogsCart
          link="/blogs/view"
          image={img}
          writerName="John Doe"
          date="Aug 20, 2025"
          title="Top 10 Summer Fashion Trends for 2025"
          description="Discover the hottest summer fashion trends of 2025. From vibrant colors to stylish accessories, find out how to upgrade your wardrobe this season."
        />
        <BlogsCart
          link="/blogs/view"
          image={img}
          writerName="Jane Smith"
          date="Aug 18, 2025"
          title="How to Style Your Accessories Like a Pro"
          description="Learn how to choose and style accessories to elevate your outfits..."
        />

        <BlogsCart
          link="/blogs/view"
          image={img}
          writerName="John Doe"
          date="Aug 20, 2025"
          title="Top 10 Summer Fashion Trends for 2025"
          description="Discover the hottest summer fashion trends of 2025. From vibrant colors to stylish accessories, find out how to upgrade your wardrobe this season."
        />
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
};

export default BlogsPage;
