






"use client";

import React from "react";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "../types/ProductType";
import Image from "next/image";

import images from "@/Data/Demo/Rectangle 130 (1).png";

const dummyProducts: Product[] = new Array(7).fill(null).map((_, i) => ({
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

const BestDeals: React.FC = () => {
  return (
    <section className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="ml-[26%] text-2xl uppercase font-bold text-primaryDarkBlue">
        Best Deals
        </h2>
        <span className="cursor-pointer text-2xl">→</span>
      </div>

      <div className="w-full">
        {/* LEFT BANNER */}

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 xl:gap-8">
          <div className="">
            <div className="absolute mt-[-50px] flex flex-col justify-between rounded-lg bg-blue-600 p-5 text-white">
              <div className="mt-6">
                <h3 className="mb-2 text-sm font-semibold">SUMMER OFFER</h3>
                <p className="mt-5 text-2xl font-medium leading-tight">
                  GET 10% DISCOUNT ON <br /> FIRST PURCHASE
                </p>
              </div>
              <div className="mt-16 mb-6 flex w-full justify-center">
                <Image
                  src={images}
                  alt="Offer Laptop"
                  className="h-[200px] w-auto object-contain"
                />
              </div>
            </div>
          </div>
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestDeals;
