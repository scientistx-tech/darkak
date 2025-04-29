"use client";

import React, { useEffect, useState } from "react";
import { Product } from "../types/ProductType";
import ProductCard from "@/components/shared/ProductCard";
import laptop from "@/Data/Demo/Rectangle 130 (1).png";
import Image from "next/image";

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

const NewArrival: React.FC = () => {
  const [screen, setScreen] = useState("md");
  // console.log(screen);

  useEffect(() => {
    const logScreenSize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setScreen("sm");
      } else if (width >= 640 && width < 768) {
        setScreen("md");
      } else if (width >= 768 && width < 1024) {
        setScreen("lg");
      } else if (width >= 1024 && width < 1280) {
        setScreen("xl");
      } else if (width >= 1280) {
        setScreen("2xl");
      }
    };

    // Log the initial screen size
    logScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", logScreenSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", logScreenSize);
    };
  }, []);

  return (
    <main className="mt-10 ">
      <div>
        <div className="h-[50px]">
          <div className=" flex items-center gap-6 justify-between md:justify-start">
            <h2 className="text-2xl font-semibold text-primaryDarkBlue">
            NEW ARRIVAL
            </h2>
            <span className="cursor-pointer text-2xl">→</span>
          </div>
        </div>
        {screen === "sm" || screen === "md" ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8">
            {dummyProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div
              className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8"
              style={{
                clipPath: `polygon(${screen === "lg" ? "68% 0" : screen === "xl" ? "76% 0" : "81% 0"}, ${screen === "lg" ? "68% 380px" : screen === "xl" ? "76% 380px" : "81% 405px"}, ${screen === "lg" ? "100% 380px" : screen === "xl" ? "100% 380px" : "100% 405px"}, 100% 100%, 0 100%, 0 50%, 0 0)`,
              }}
            >
              {dummyProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="absolute right-0 top-0 mt-[-50px] hidden w-[236px] flex-col justify-between rounded-xl bg-[#4C84FF] p-6 text-white md:flex md:h-[425px] lg:w-[238px] xl:h-[450px] xl:w-[240px] 2xl:w-[270px] 3xl:w-[365px]">
              <div>
                <h3 className="mb-3 text-sm font-semibold">SUMMER OFFER</h3>
                <p className="text-2xl font-semibold leading-tight">
                  GET 10% DISCOUNT ON <br /> FIRST PURCHASE
                </p>
              </div>
              <div className="mt-auto flex justify-center pt-8">
                <Image
                  src={laptop}
                  alt="Offer Laptop"
                  className="w-[200px] object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default NewArrival;
