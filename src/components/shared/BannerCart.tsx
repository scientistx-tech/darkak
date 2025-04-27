"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface BannerCardProps {
  bgColour: string;
  image: StaticImageData;
  position: "left" | "right";
  title: string;
  description: string;
  text: string;
  link: string;
}

const BannerCart: React.FC<BannerCardProps> = ({
  bgColour,
  image,
  position,
  title,
  description,
  text,
  link,
}) => {
  return (
    <div
      className={clsx(
        "mb-4 flex items-center justify-between overflow-hidden rounded-xl text-white",
      )}
      style={{ backgroundColor: bgColour }}
    >
      <div
        className={clsx(
          "space-y-2 p-4 md:space-y-3 md:p-8",
          position === "left" ? "w-full md:w-[55%]" : "w-full md:w-[45%]",
        )}
      >
        <h2 className="text-sm md:text-base">{title}</h2>
        <h1 className="text-lg font-bold md:text-2xl">{description}</h1>
        <p className={clsx(position === "left" ? "text-2xl" : "text-xl")}>
          {text}
        </p>
        <div className="h-[10px] w-full"></div>

        <Link
          href={link}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-primary p-4 px-6 py-2 font-medium text-indigo-600 shadow-md transition duration-300 ease-out"
        >
          <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-primary text-white duration-300 group-hover:translate-x-0">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="ease absolute flex h-full w-full transform items-center justify-center text-white transition-all duration-300 group-hover:translate-x-full">
            Shop Now
          </span>
          <span className="invisible relative">Shop Now</span>
        </Link>
      </div>

      <div className="w-[40%]">
        <Image src={image} alt="Product Image" className="h-auto w-full" />
      </div>
    </div>
  );
};

export default BannerCart;
