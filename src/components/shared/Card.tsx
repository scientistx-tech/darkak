"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";

import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaHeart
} from "react-icons/fa";
import Link from "next/link";

interface CardProps {
  name: string;
  categories: string;
  regularPrice: number;
  newPrice: number;
  status: string;
  description: string;
  mainImage: StaticImageData;
  image1: StaticImageData;
  image2: StaticImageData;
  image3: StaticImageData;
  rating: number;
  reviews: number;
  cartLink: string;
  buyLink: string;
  favoriteLink: string;
}

const Card: React.FC<CardProps> = ({
  name,
  categories,
  regularPrice,
  newPrice,
  status,
  description,
  mainImage,
  image1,
  image2,
  image3,
  rating,
  reviews,
  cartLink,
  buyLink,
  favoriteLink,
}) => {
  // For slider
  const images = [mainImage, image1, image2, image3];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  // For Review
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center text-yellow-500">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} />
        ))}
        {halfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} />
        ))}
      </div>
    );
  };

  const shortDescription =
    description.split(" ").slice(0, 15).join(" ") +
    (description.split(" ").length > 15 ? "..." : "");

  return (
    <div className="group h-auto w-[180px] md:w-[280px] rounded-md bg-white p-2 md:p-5 transition-all duration-500 hover:shadow-lg">
      <div className="relative h-[150px] md:h-[250px] w-full overflow-hidden rounded-md">
        <Image
          alt="Product Image"
          src={images[currentImage]}
          className="h-full w-full rounded-md object-cover transition-opacity duration-500"
        />
      </div>

      <div className="relative z-20 -mt-4 flex justify-center gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-[8px] md:h-[10px] w-[8px] md:w-[10px] rounded-full transition-all ${
              index === currentImage ? "scale-110 bg-primary" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>

      <div className="mt-3 flex w-full flex-col items-center justify-center rounded-md bg-slate-100">
        <p className="mt-3 text-lg font-semibold text-secondary">{name}</p>

        <div className="-mt-2 flex">
          <div className="mt-2 text-[12px] md:text-base flex items-center gap-1">{renderStars()}</div>

          <p className="ml-2 mt-3 text-[10px]">({reviews} reviews) </p>
        </div>

        <div className="mt-2 flex">
          <div className="font-semibold text-secondary">{newPrice} TK</div>

          <p className="ml-2 line-through">{regularPrice} TK</p>
        </div>

        <div className="mt-3 mb-3 flex w-full justify-evenly">
          <Link
            href={buyLink}
            className="rounded-lg border border-primary bg-primary p-1 md:p-1.5 px-2 md:px-4 font-semibold text-secondary hover:bg-transparent hover:text-primary"
          >
            Buy Now
          </Link>

          <Link
            href={cartLink}
            className="text-xl md:text-2xl mt-2 md:mt-1 text-secondary hover:text-primary"
          >
            <FaShoppingCart />
          </Link>

          <Link
            href={favoriteLink}
            className="text-xl md:text-2xl mt-2 md:mt-1 text-secondary hover:text-primary"
          >
            <FaHeart />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
