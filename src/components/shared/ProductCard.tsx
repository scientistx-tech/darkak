"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/app/(root)/types/ProductType";
import { message } from "antd";
import PriceInfo from "./PriceInfo";
import RightIcons from "./RightIcons";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log("product", product, product.Image);

  const [hovered, setHovered] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

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
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[20px] bg-primaryWhite shadow-md transition-all duration-300 md:h-[370px] xl:h-[400px] 2xl:h-[380px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {contextHolder}

      {/* Discount badge */}
      {product.discount > 0 && (
        <div className="absolute left-0 top-5 z-20 rounded-r-full bg-secondaryBlue px-4 py-1 text-center text-xs font-semibold text-secondaryWhite">
          {product.discount}%
          <br />
          OFF
        </div>
      )}

      {/* Top Right Icons */}
      <RightIcons hovered={hovered} success={success}></RightIcons>

      {/* Image Container with polygon background */}
      <div
        className="relative flex h-32 items-center justify-center transition-all duration-500 md:h-48"
        onMouseEnter={() => {
          setTimeout(() => {
            setActiveImage((activeImage + 1) % product.Image.length);
          }, 1600);
        }}
      >
        {/* Polygon background behind the image */}
        <div
          className="absolute inset-0 bg-[#E6EFFF]"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 38%, 0% 100%)",
            zIndex: 0,
          }}
        />

        {/* Product Image */}
        <motion.img
          key={activeImage}
          src={
            typeof product.Image[activeImage] === "string"
              ? product.Image[activeImage]
              : product.Image[activeImage]?.url || product.thumbnail
          }
          alt={product.title}
          initial={{ opacity: 0.5, scale: 0.98 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6 }}
          className="z-10 h-32 object-contain md:h-48"
        />
      </div>

      {/* Image Indicators */}
      <div className="my-2 flex items-center justify-center gap-2">
        {product.Image.map((_, i) => (
          <div
            key={i}
            onClick={() => setActiveImage(i)}
            className={`h-2 w-4 cursor-pointer rounded-full transition-all duration-300 hover:bg-secondaryBlue ${
              i === activeImage
                ? "w-8 bg-secondaryBlue"
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
