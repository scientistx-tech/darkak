"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

interface BlogCardProps {
  image: StaticImageData;
  writerName: string;
  date: string;
  title: string;
  description: string;
}

const BlogsCart: React.FC<BlogCardProps> = ({
  image,
  writerName,
  date,
  title,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-gray-500 text-sm">{date} • {writerName}</p>
        <h3 className="text-xl font-semibold mt-2">{title}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default BlogsCart;
