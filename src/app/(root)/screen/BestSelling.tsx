"use client";

import React from "react";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "../types/ProductType";
import Image from "next/image";

import images from "@/Data/Demo/Rectangle 130 (1).png"

const dummyProducts: Product[] = new Array(8).fill(null).map((_, i) => ({
  id: `prod-${i}`,
  name: "iPhone 15 Pro Max",
  images: [
    "/images/dummy/dummy.png",
    "/images/dummy/dummy1.png",
    "/images/dummy/dummy2.png",
  ],
  price: 800,
  originalPrice: 1000,
  storage: "12GB/512GB",
  discount: 20,
  rating: 4.5,
  reviews: 65,
}));

const BestSelling: React.FC = () => {
  return (
    <section className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primaryDarkBlue">
          BEST SELLING PRODUCTS
        </h2>
        <span className="text-2xl cursor-pointer">→</span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]">
        {/* LEFT BANNER */}
        <div className="bg-blue-600 text-white rounded-lg p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold mb-2">SUMMER OFFER</h3>
            <p className="text-2xl font-bold leading-tight">
              GET 10% DISCOUNT ON <br /> FIRST PURCHASE
            </p>
          </div>
          <div className="mt-4">
            <Image
              src={images}
              alt="Offer Laptop"
              width={300}
              height={200}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 xl:gap-8">
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
