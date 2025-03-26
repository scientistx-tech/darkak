"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

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
    <Link
      href="/blogs"
      className="group h-auto w-[180px] rounded-md bg-white p-2 transition-all duration-500 hover:shadow-lg md:w-[280px] md:p-5"
    >
      <div className="relative h-[150px] w-full overflow-hidden rounded-md md:h-[250px]">
        <Image
          alt="Product Image"
          src={image}
          className="h-full w-full rounded-md object-cover transition-opacity duration-500"
        />
      </div>

      <div className="p-4">
        <div className="flex w-full justify-between">
          <p className="text-sm text-gray-500">{date}</p>
          <p className="text-sm flex text-gray-500">
            {" "}
            <FaUser className="mr-1 mt-[2.5px]"/> {writerName}
          </p>
        </div>

        <h3 className="mt-2 text-xl font-semibold group-hover:text-primary">{title}</h3>
        <p className="mt-2 text-gray-700">{description}</p>
      </div>
    </Link>
  );
};

export default BlogsCart;
