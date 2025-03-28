"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";

import Img1 from "@/Data/Demo/product-2-1.png";
import Img2 from "@/Data/Demo/product-2-2.avif";
import Img3 from "@/Data/Demo/product-2-3.png";
import Img4 from "@/Data/Demo/product-2-4.png";

const ProductPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<StaticImageData>(Img1);

  const handleImageClick = (image: StaticImageData) => {
    setSelectedImage(image);
  };

  const product = {
    name: "iPad Air M3 - 2025",
    categories: "Product",
    regularPrice: 80200,
    discount: 20,
    newPrice: 79999,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3...",
    mainImage: Img1,
    image1: Img2,
    image2: Img3,
    image3: Img4,
    rating: 3.5,
    reviews: 10,
    cartLink: "/cart",
    buyLink: "/buy",
    favoriteLink: "/wishlist",
  };

  const {
    name,
    categories,
    regularPrice,
    description,
    mainImage,
    image1,
    image2,
    image3,
    rating,
    reviews,
    newPrice,
  } = product;

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

  return (
    <div className="w-full">
      <div className="flex flex-col pt-10 md:flex-row">
        {/* Product Image */}
        <div className="w-full p-4 md:w-1/2">
          <Image
            src={selectedImage}
            alt={name}
            className="h-[300px] w-[300px] rounded-xl object-cover"
          />

          <div className="mt-6 flex w-[300px] justify-evenly">
            <button
              onClick={() => handleImageClick(mainImage)}
              className="rounded-xl border hover:opacity-60"
            >
              <Image
                src={mainImage}
                alt={name}
                className="h-[50px] w-[50px] rounded-lg"
              />
            </button>

            {image1 && (
              <button
                onClick={() => handleImageClick(image1)}
                className="rounded-xl border hover:opacity-60"
              >
                <Image
                  src={image1}
                  alt={name}
                  className="h-[50px] w-[50px] rounded-lg"
                />
              </button>
            )}

            {image2 && (
              <button
                onClick={() => handleImageClick(image2)}
                className="rounded-xl border hover:opacity-60"
              >
                <Image
                  src={image2}
                  alt={name}
                  className="h-[50px] w-[50px] rounded-lg"
                />
              </button>
            )}

            {image3 && (
              <button
                onClick={() => handleImageClick(image3)}
                className="rounded-xl border hover:opacity-60"
              >
                <Image
                  src={image3}
                  alt={name}
                  className="h-[50px] w-[50px] rounded-lg"
                />
              </button>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="tablet:w-1/2 w-full bg-white p-4">
          <p className="text-2xl font-medium text-secondary">{name}</p>
          {/* <p className="font-serif font-bold opacity-60">
            Categories: {categories}
          </p> */}

          <div className="flex">
            <div className="mt-2 flex items-center gap-1 text-[12px] md:text-base">
              {renderStars()}
            </div>

            <p className="ml-2 mt-3 text-[10px]">({reviews} reviews) </p>
          </div>

          <div className="mt-2 flex">
            <div className="text-xl font-semibold text-secondary">
              Price: {newPrice} TK
            </div>

            <p className="ml-2 line-through">{regularPrice} TK</p>
          </div>

          <div className="mt-5 mb-5 h-0.5 w-full bg-primary opacity-40"/>

          <div className="">
            jhhkhkh
          </div>

          <p className="mb-4">{description}</p>

          {/* Additional product options and buttons can go here */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
