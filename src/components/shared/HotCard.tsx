"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Link from "next/link";

interface HotCardProps {
  name: string;
  regularPrice: number;
  discount: number;
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

const HotCard: React.FC<HotCardProps> = ({
  name,
  regularPrice,
  discount,
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
  const newPrice = regularPrice - (regularPrice * discount) / 100;
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
    description.split(" ").slice(0, 20).join(" ") +
    (description.split(" ").length > 20 ? "..." : "");

  return (
    <div className="rounded-md bg-white p-5">
      <div className="flex">
        <div>
          <Image alt="img" src={mainImage} className="h-[200px] w-[200px]"/>
        </div>

        <div>
          <p className="text-[12px] text-primary line-through">
            Regular Price: {regularPrice}
          </p>
          <p className="font-semibold text-green-600">
            Price: {newPrice.toFixed(2)}
          </p>
          <p className="text-xl text-secondary">{name}</p>
          <p>{shortDescription}</p>

          <p>Raring: ({reviews} reviews)</p>
          <div className="flex items-center gap-1">{renderStars()}</div>
        </div>
      </div>

      <div className="flex justify-between">
        <Link href={buyLink}  className="text-xl font-medium rounded-full border border-primary bg-transparent p-2 pl-4 pr-4 text-secondary  hover:bg-primary">Buy Now</Link>

        <Link href={cartLink}  className="text-xl font-medium rounded-full border border-primary bg-primary p-2 pl-4 pr-4 text-secondary hover:bg-transparent hover:text-primary">Add to Cart</Link>
      </div>
    </div>
  );
};

export default HotCard;
