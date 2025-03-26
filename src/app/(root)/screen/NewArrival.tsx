"use client";
import React, { useRef } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import Img1 from "@/Data/Demo/product-2-1.png";
import Img2 from "@/Data/Demo/product-2-2.avif";
import Img3 from "@/Data/Demo/product-2-3.png";
import Img4 from "@/Data/Demo/product-2-4.png";

import Img5 from "@/Data/Demo/Product-banner-1.jpg";
import Img6 from "@/Data/Demo/Product-banner-2.jpg";
import Img7 from "@/Data/Demo/Product-banner-3.webp";
import Img8 from "@/Data/Demo/Product-banner-6.jpg";
import Card from "@/components/shared/Card";

const NewArrival: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300, // Adjust this value to control scroll distance
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300, // Adjust this value to control scroll distance
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="w-full">
      <p className="mt-10 text-2xl font-semibold uppercase text-primary md:mt-16 md:text-3xl">
        New <samp className="text-secondary">Arrival</samp>
      </p>

      <div className="tablet:mt-10 relative mt-5 flex w-full items-center justify-center">
        <button
          onClick={scrollLeft}
          className="absolute left-2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-200 transition"
        >
          <FaAngleDoubleLeft />
        </button>

        <div
          ref={scrollRef}
          className="no-scrollbar flex h-auto w-full space-x-5 overflow-hidden overflow-x-scroll scroll-smooth"
        >
          <div className="">
            <Card
              name="iPad Air M3 - 2025"
              categories="Product"
              regularPrice={80200}
              newPrice={80100}
              status="In Stock"
              description="Go beyond during every creative project with Apple iPad Air M3. One of the slimmest designs with premium colors looks fashionable and aesthetic at the same time. Get gorgeous visuals from the large 11-inch or 13-inch model, which has Wide Color (P3) supported for immersive viewing."
              mainImage={Img1}
              image1={Img2}
              image2={Img3}
              image3={Img4}
              rating={4.5}
              reviews={10}
              cartLink=""
              buyLink=""
              favoriteLink=""
            />
          </div>

          <div className="">
            <Card
              name="Product 1"
              categories="Product"
              regularPrice={200}
              newPrice={100}
              status="In Stock"
              description="Go beyond during every creative project with Apple iPad Air M3. One of the slimmest designs with premium colors looks fashionable and aesthetic at the same time. Get gorgeous visuals from the large 11-inch or 13-inch model, which has Wide Color (P3) supported for immersive viewing."
              mainImage={Img5}
              image1={Img6}
              image2={Img7}
              image3={Img8}
              rating={1.5}
              reviews={13}
              cartLink=""
              buyLink=""
              favoriteLink=""
            />
          </div>

          <div className="">
            <Card
              name="Product-2"
              categories="Product"
              regularPrice={19200}
              newPrice={18100}
              status="In Stock"
              description="Go beyond during every creative project with Apple iPad Air M3. One of the slimmest designs with premium colors looks fashionable and aesthetic at the same time. Get gorgeous visuals from the large 11-inch or 13-inch model, which has Wide Color (P3) supported for immersive viewing."
              mainImage={Img2}
              image1={Img1}
              image2={Img3}
              image3={Img4}
              rating={3.5}
              reviews={990}
              cartLink=""
              buyLink=""
              favoriteLink=""
            />
          </div>

          <div className="">
            <Card
              name="iPad Air M3 - 2025"
              categories="Product"
              regularPrice={80200}
              newPrice={80100}
              status="In Stock"
              description="Go beyond during every creative project with Apple iPad Air M3. One of the slimmest designs with premium colors looks fashionable and aesthetic at the same time. Get gorgeous visuals from the large 11-inch or 13-inch model, which has Wide Color (P3) supported for immersive viewing."
              mainImage={Img1}
              image1={Img2}
              image2={Img3}
              image3={Img4}
              rating={4.5}
              reviews={10}
              cartLink=""
              buyLink=""
              favoriteLink=""
            />
          </div>

          <div className="">
            <Card
              name="iPad Air M3 - 2025"
              categories="Product"
              regularPrice={80200}
              newPrice={80100}
              status="In Stock"
              description="Go beyond during every creative project with Apple iPad Air M3. One of the slimmest designs with premium colors looks fashionable and aesthetic at the same time. Get gorgeous visuals from the large 11-inch or 13-inch model, which has Wide Color (P3) supported for immersive viewing."
              mainImage={Img1}
              image1={Img2}
              image2={Img3}
              image3={Img4}
              rating={4.5}
              reviews={10}
              cartLink=""
              buyLink=""
              favoriteLink=""
            />
          </div>

          <div className="">
            <Card
              name="iPad Air M3 - 2025"
              categories="Product"
              regularPrice={80200}
              newPrice={80100}
              status="In Stock"
              description="Go beyond during every creative project with Apple iPad Air M3. One of the slimmest designs with premium colors looks fashionable and aesthetic at the same time. Get gorgeous visuals from the large 11-inch or 13-inch model, which has Wide Color (P3) supported for immersive viewing."
              mainImage={Img1}
              image1={Img2}
              image2={Img3}
              image3={Img4}
              rating={4.5}
              reviews={10}
              cartLink=""
              buyLink=""
              favoriteLink=""
            />
          </div>
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-200 transition"
        >
          <FaAngleDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default NewArrival;
