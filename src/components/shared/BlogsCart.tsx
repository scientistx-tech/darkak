"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

interface BlogCardProps {
  image: string | StaticImageData;
  writerName: string;
  date: string;
  title: string;
  description: string;
  link?: string;
}

const BlogsCart: React.FC<BlogCardProps> = ({
  image,
  writerName,
  date,
  title,
  description,
  link = "/blogs",
}) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-sm mx-auto">
      <Link href='/blogs/view' className="block">
        {/* Image */}
        <div className="relative h-48 md:h-64 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="text-gray-400" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaUser className="text-gray-400" />
              <span>{writerName}</span>
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          <p className="text-gray-600 text-sm md:text-base line-clamp-3 h-[80px] md:h-[100px]">
            {description}
          </p>

          <button className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg text-sm md:text-base font-medium hover:bg-primary/90 transition-colors duration-300">
            Read More
          </button>
        </div>
      </Link>
    </div>
  );
};

export default BlogsCart;
