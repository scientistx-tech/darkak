"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaEye, FaRandom, FaShoppingCart } from "react-icons/fa";
import { Product } from "@/app/(root)/types/ProductType";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[20px] bg-primaryWhite shadow-md transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Discount badge */}
      {product.discount > 0 && (
        <div className="absolute left-0 top-5 z-10 rounded-r-full bg-secondaryLiteBlue px-4 py-1 text-center text-xs font-semibold text-secondaryWhite">
          {product.discount}%
          <br />
          OFF
        </div>
      )}

      {/* Top Right Icons */}
      <motion.div
        className="absolute right-3 top-5 z-20 flex flex-col gap-3 text-xl text-secondaryLiteBlue"
        initial={{ opacity: 0, y: -10 }}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        <FaHeart className="cursor-pointer hover:text-primaryBlue transition-all hover:scale-110 duration-300" />
        <FaEye className="cursor-pointer hover:text-primaryBlue transition-all hover:scale-110 duration-300" />
        <FaRandom className="cursor-pointer hover:text-primaryBlue transition-all hover:scale-110 duration-300" />
      </motion.div>

      {/* Image Container with background */}
      <div
        className="relative flex h-32 items-center justify-center bg-cover bg-center bg-no-repeat transition-all duration-500 md:h-48"
        style={{
          backgroundImage: `url('/images/dummy/dummy3.png')`,
        }}
        onMouseEnter={() => {
          setTimeout(() => {
            setActiveImage((activeImage + 1) % product.images.length);
          }, 800);
        }}
      >
        <motion.img
          key={activeImage}
          src={product.images[activeImage]}
          alt={product.name}
          initial={{ opacity: 0.5, scale: 0.98 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="h-32 object-contain transition-all duration-700 md:h-48"
        />
      </div>

      {/* Image Indicators */}
      <div className="my-2 flex items-center justify-center gap-2">
        {product.images.map((_, i) => (
          <div
            key={i}
            onClick={() => setActiveImage(i)}
            className={`h-2 w-4 cursor-pointer rounded-full transition-all duration-300 ${
              i === activeImage ? "w-8 bg-secondaryLiteBlue" : "bg-secondaryWhite border-secondaryLiteBlue border-[1px]"
            }`}
          />
        ))}
      </div>

      {/* Price and Info */}
      <PriceInfo product={product} />
    </div>
  );
};

export default ProductCard;

const PriceInfo: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="xl:space-y space-y-2 p-2 text-center xl:p-6">
      <div className="flex flex-wrap items-center justify-center gap-1">
        <span className="md:text-md text-sm font-bold text-primaryDarkBlue">
          Price: {product.price} TK
        </span>
        <span className="text-xs text-gray-400 line-through md:text-sm">
          {product.originalPrice} TK
        </span>
      </div>
      <h3 className="md:text-md line-clamp-2 text-center text-sm font-semibold text-primaryDarkBlue">
        {product.name} ({product.storage})
      </h3>
      <div className="flex flex-wrap items-center justify-center text-sm text-secondaryLiteBlue">
        {Array(Math.round(product.rating))
          .fill("")
          .map((_, i) => (
            <span key={i}>★</span>
          ))}
        <span className="ml-2 text-gray-500">({product.reviews} Reviews)</span>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-evenly">
        <p className="scale-90 cursor-pointer rounded-full bg-secondaryLiteBlue px-4 py-2 text-sm font-medium text-primbg-primaryWhite transition-all hover:bg-primaryBlue duration-300 md:scale-100 md:px-6 md:font-semibold lg:text-base text-secondaryWhite hover:text-white">
          BUY NOW
        </p>
        <div className="cursor-pointer rounded-full bg-secondaryWhite px-3 py-2 text-sm text-secondaryLiteBlue hover:text-primaryBlue md:px-4 lg:text-base">
          <FaShoppingCart />
        </div>
      </div>
    </div>
  );
};
