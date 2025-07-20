'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface WatchBannerCardProps {
  href: any;
  img: any;
  name: string;
  text: string;
}

export default function WatchBannerCard({ href, img, name, text }: WatchBannerCardProps) {
  return (
    <Link href={href} className="relative h-[280px] md:h-[400px] w-[180px] md:w-[300px] overflow-hidden rounded-xl shadow-md group cursor-pointer">
      {/* Background Image */}
      <Image
        src={img}
        alt={name}
        fill
        className="md:h-[398px] md:w-[298px] transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition-all duration-500"></div>

      {/* Content */}
      <div className="absolute bottom-0 p-6 text-white transition-all duration-500 group-hover:bottom-4">
        <h2 className="text-lg md:text-2xl font-bold tracking-wide">{name}</h2>
        <p className="text-sm md:text-lg opacity-80">{text}</p>
      </div>
    </Link>
  );
}
