'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface WatchBannerCardProps {
  href: any;
  img: any;
  name: string;
  text: string;
  alt: string | undefined;
}

export default function WatchBannerCard({ href, img, name, text, alt }: WatchBannerCardProps) {
  return (
    <Link
      href={href}
      className="group relative h-[280px] w-[180px] cursor-pointer overflow-hidden rounded-xl shadow-md md:h-[400px] md:w-[300px]"
    >
      {/* Background Image */}
      <Image
        src={img}
        alt={alt ?? name}
        fill
        className="transition-transform duration-500 group-hover:scale-110 md:h-[398px] md:w-[298px]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-all duration-500 group-hover:bg-opacity-60"></div>

      {/* Content */}
      <div className="absolute bottom-0 p-6 text-white transition-all duration-500 group-hover:bottom-4">
        <h2 className="text-lg font-bold tracking-wide md:text-2xl">{name}</h2>
        <p className="text-sm opacity-80 md:text-lg">{text}</p>
      </div>
    </Link>
  );
}
