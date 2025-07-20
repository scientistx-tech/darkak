'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaCartPlus, FaHeart } from "react-icons/fa";

interface WatchCardProps {
  img1: any;
  img2: any;
  name: string;
  price: number;
  discount: number;
}

export default function WatchCard({ img1, img2, name, price, discount }: WatchCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative h-[400px] w-[300px] cursor-pointer overflow-hidden transition-transform duration-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount and Buttons */}
      <div className="absolute z-30 mt-10 flex w-[290px] items-center justify-between">
        {/* Discount Badge */}
        <div className='p-1 pl-3 pr-4 bg-primary text-white text-[14px] rounded-r-full transition-all duration-500'>
          <p>{discount}%</p>
          <p className='mt-[-5px]'>Off</p>
        </div>

        {/* Action Buttons */}
        <div className='bg-primary p-2 rounded-md pr-2 flex flex-col items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500'>
          <button className='text-white text-xl'>
            <FaCartPlus />
          </button>
          <button className='text-white text-xl'>
            <FaHeart />
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="relative mt-3 h-[75%] w-full rounded-xl bg-primaryBlue shadow-lg transition-all duration-500">
        <Image
          src={isHovered ? img2 : img1}
          alt={name}
          fill
          className="rounded-xl object-cover transition-opacity duration-500"
        />
      </div>

      {/* Details */}
      <div className="flex h-[25%] flex-col p-4">
        <h3 className="truncate text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-xl font-bold text-primary">৳ {price.toLocaleString()}</p>
      </div>
    </div>
  );
}
