"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { EyeOutlined, HeartOutlined, LinkOutlined } from "@ant-design/icons";
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
    <div className="w-[280px] h-[450px] group rounded-md bg-white p-5 transition-all duration-500 hover:shadow-lg">
      <Image alt="img" src={mainImage} className="w-full h-[250px] rounded-md shadow"/>
      <div className="flex gap-1 justify-center">
        <button className="h-[10px] w-[10px] rounded-full bg-primary"></button>
        <button className="h-[10px] w-[10px] rounded-full bg-secondary"></button>
        <button className="h-[10px] w-[10px] rounded-full bg-secondary"></button>
        <button className="h-[10px] w-[10px] rounded-full bg-secondary"></button>
      </div>

    </div>
  );
};

export default Card;
