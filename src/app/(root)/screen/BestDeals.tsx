"use client";

import React from "react";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "../types/ProductType";
import Image from "next/image";
import laptop from "@/Data/Demo/Rectangle 130 (1).png";

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
  discount: 10,
  rating: 4.5,
  reviews: 65,
}));

const BestDeals: React.FC = () => {
  return (
    <section className="mt-10 px-2 container mx-auto">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-2xl lg:ml-[25%] xl:ml-[20%] md:ml-[33%] font-semibold  text-primaryDarkBlue">
          BEST DEAL
        </h2>
        <span className="cursor-pointer text-2xl">→</span>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8 relative">
        {/* LEFT SIDE BANNER */}
        <div className="absulate hidden md:h-[425px] lg:h-[420px] xl:h-[450px] rounded-xl md:mt-[-45px] lg:mt-[-40px] xl:mt-[-40px] 2xl:mt-[-50px] bg-[#4C84FF] p-6 text-white md:flex flex-col justify-between ">
          <div>
            <h3 className="text-sm font-semibold mb-3">SUMMER OFFER</h3>
            <p className="text-2xl font-semibold leading-tight">
              GET 10% DISCOUNT ON <br /> FIRST PURCHASE
            </p>
          </div>
          <div className="mt-auto pt-8 flex justify-center">
            <Image
              src={laptop}
              alt="Offer Laptop"
              className="w-[200px] object-contain"
            />
          </div>
        </div>

        {/* PRODUCT CARDS */}
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestDeals;
