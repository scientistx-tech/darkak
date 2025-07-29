'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import Link from 'next/link';

interface WatchCardProps {
  href: any;
  img1: any;
  img2: any;
  name: string;
  price: number;
  discount: number;
  discountType: string;
  img1Alt: string;
  img2Alt: string;
}

export default function WatchCard({
  href,
  img1,
  img2,
  name,
  price,
  discount,
  discountType,
  img1Alt,
  img2Alt,
}: WatchCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const p = discountType === 'flat' ? price - discount : price - (price * discount) / 100;

  return (
    <Link
      href={href}
      className="group relative h-[300px] w-[180px] cursor-pointer overflow-hidden transition-transform duration-500 hover:scale-105 md:h-[400px] md:w-[300px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount and Buttons */}
      <div className="absolute z-30 mt-10 flex w-[290px] items-center justify-between">
        {/* Discount Badge */}
        <div className="rounded-r-full bg-primary p-1 pl-3 pr-4 text-[14px] text-white transition-all duration-500">
          <p>
            {discount}
            {discountType === 'flat' ? 'BDT' : '%'}
          </p>
          <p className="mt-[-5px]">Off</p>
        </div>

        {/* Action Buttons */}
        <div className="flex translate-y-4 flex-col items-center gap-3 rounded-md bg-primary p-2 pr-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="text-xl text-white transition-colors duration-300 hover:text-primaryBlue">
            <FaCartPlus />
          </button>
          <button className="text-xl text-white transition-colors duration-300 hover:text-primaryBlue">
            <FaHeart />
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="relative mt-3 h-[70%] w-full rounded-xl bg-primaryBlue shadow-lg transition-all duration-500 md:h-[75%]">
        <Image
          src={isHovered ? img2 : img1}
          alt={isHovered ? img2Alt : img1Alt}
          fill
          className="rounded-xl object-cover transition-opacity duration-500"
        />
      </div>

      {/* Details */}
      <div className="flex h-[30%] flex-col p-2 md:h-[25%] md:p-4">
        <h3 className="truncate font-semibold text-gray-800 md:text-lg">{name}</h3>
        <p className="font-bold text-primary md:text-xl">৳ {p.toFixed(1)}</p>
      </div>
    </Link>
  );
}
