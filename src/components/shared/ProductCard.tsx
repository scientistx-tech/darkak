"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaEye, FaRandom, FaShoppingCart } from "react-icons/fa";
import { FaFacebook, FaPinterest, FaXTwitter, FaLink } from "react-icons/fa6";
import { Product } from "@/app/(root)/types/ProductType";
import { Tooltip, message } from "antd";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const [activeImage, setActiveImage] = useState(1);

  // Message setup
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Link copied to clipboard!",
    });
  };

  return (
    <div
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[20px] bg-primaryWhite shadow-md transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {contextHolder}

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
        transition={{ duration: 0.8 }}
      >
        <Link href="/wishlist">
          <FaHeart className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-primaryBlue" />
        </Link>
        <Link href="/product">
          <FaEye className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-primaryBlue" />
        </Link>

        <Tooltip
          placement="bottomRight"
          color="#5694FF"
          title={
            <div className="flex gap-3 p-1 text-white">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-lg transition-transform hover:scale-125 hover:text-white" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterest className="text-lg transition-transform hover:scale-125 hover:text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="text-lg transition-transform hover:scale-125 hover:text-white" />
              </a>
              <div
                className="cursor-pointer text-lg transition-transform hover:scale-125 hover:text-white"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  success();
                }}
              >
                <FaLink />
              </div>
            </div>
          }
        >
          <FaRandom className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-primaryBlue" />
        </Tooltip>
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
          }, 1600);
        }}
      >
        <motion.img
          key={activeImage}
          src={product.images[activeImage]}
          alt={product.name}
          initial={{ opacity: 0.5, scale: 0.98 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6 }}
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
              i === activeImage
                ? "w-8 bg-secondaryLiteBlue"
                : "border-[1px] border-secondaryLiteBlue bg-secondaryWhite"
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
    <Link href="/product" className="group">
      <div className="xl:space-y space-y-2 p-2 text-center xl:p-6">
        <div className="flex flex-wrap items-center justify-center gap-1">
          <span className="md:text-md text-sm font-bold text-primaryDarkBlue">
            Price: {product.price} TK
          </span>
          <span className="text-xs text-gray-400 line-through md:text-sm">
            {product.originalPrice} TK
          </span>
        </div>
        <h3 className="md:text-md line-clamp-2 text-center text-sm font-semibold text-primaryDarkBlue transition-all duration-300 group-hover:text-secondaryLiteBlue">
          {product.name} ({product.storage})
        </h3>
        <div className="flex flex-wrap items-center justify-center text-sm text-secondaryLiteBlue">
          {Array(Math.round(product.rating))
            .fill("")
            .map((_, i) => (
              <span key={i}>★</span>
            ))}
          <span className="ml-2 text-gray-500">
            ({product.reviews} Reviews)
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-evenly">
          <Link href="/easy-checkout">
            <p className="text-primbg-primaryWhite scale-90 cursor-pointer rounded-full bg-secondaryLiteBlue px-4 py-2 text-sm font-medium text-secondaryWhite transition-all duration-300 hover:bg-primaryBlue hover:text-white md:scale-100 md:px-6 md:font-semibold lg:text-base">
              BUY NOW
            </p>
          </Link>

          <Link href="/cart">
            <div className="cursor-pointer rounded-full bg-secondaryWhite px-3 py-2 text-sm text-secondaryLiteBlue hover:text-primaryBlue md:px-4 lg:text-base">
              <FaShoppingCart />
            </div>
          </Link>
        </div>
      </div>
    </Link>
  );
};
