"use client";
import React from "react";
import Image from "next/image";

import icon1 from "@/Data/Icon/Multiple Devices.png";
import icon2 from "@/Data/Icon/Accessories.png";
import icon3 from "@/Data/Icon/Jacket.png";
import icon4 from "@/Data/Icon/Lipstick.png";
import icon5 from "@/Data/Icon/Women Shoe Side View.png";
import icon6 from "@/Data/Icon/Books.png";
import icon7 from "@/Data/Icon/Food Donor.png";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="flex w-full flex-col items-center justify-center md:mt-10">
      <h1 className="mt-4 mb-5 text-3xl font-medium text-gray-800 md:text-5xl">
        Shop by Categories
      </h1>

      <div className="mt-8 grid grid-cols-2 gap-6 px-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        <CategoriesComponent name="Electronics" icon={icon1} href="/" />
        <CategoriesComponent name="Accessories" icon={icon2} href="/" />
        <CategoriesComponent name="Dresses" icon={icon3} href="/" />
        <CategoriesComponent name="Fashion & Cosmetic" icon={icon4} href="/" />
        <CategoriesComponent name="Shoes" icon={icon5} href="/" />
        <CategoriesComponent name="Books" icon={icon6} href="/" />
        <CategoriesComponent name="Groceries" icon={icon7} href="/" />
      </div>
    </div>
  );
}

interface CategoriesProps {
  name: string;
  icon: any;
  href: string;
}

const CategoriesComponent: React.FC<CategoriesProps> = ({
  name,
  icon,
  href,
}) => {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center"
    >
      <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white transition-all duration-300 hover:scale-105 group-hover:shadow-lg md:h-[120px] md:w-[120px]">
        <Image src={icon} alt={name} width={50} height={50} />
      </div>

      <p className="mt-5 text-center text-xl font-semibold text-gray-700">
        {name}
      </p>
    </Link>
  );
};
