"use client";

import React from "react";

import Banner1 from "@/Data/Demo/Banner-1.jpg";
import Banner2 from "@/Data/Demo/Banner-2.jpg";
import Image from "next/image";
import Link from "next/link";

const Banner: React.FC = () => {
  return (
    <div className="w-fill mt-10 justify-between md:mt-16 md:flex">
      <Link href="/shop" className="w-full md:w-[48%]">
        <Image
          src={Banner1}
          alt="Banner"
          className="h-[250px] w-full rounded-lg md:h-[300px]"
        />
      </Link>
      <div className="h-5 w-full md:h-0 md:w-0" />
      <Link href="/shop" className="w-full md:w-[48%]">
        <Image
          src={Banner2}
          alt="Banner"
          className="h-[250px] w-full rounded-lg md:h-[300px]"
        />
      </Link>
    </div>
  );
};

export default Banner;
