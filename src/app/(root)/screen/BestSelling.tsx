"use client";

import React from "react";

import Img1 from "@/Data/Demo/product-2-1.png";
import Img2 from "@/Data/Demo/product-2-2.avif";
import Img3 from "@/Data/Demo/product-2-3.png";
import Img4 from "@/Data/Demo/product-2-1.png";

import Img5 from "@/Data/Demo/Product-banner-1.jpg";
import Img6 from "@/Data/Demo/Product-banner-2.jpg";
import Img7 from "@/Data/Demo/Product-banner-3.webp";
import Img8 from "@/Data/Demo/Product-banner-6.jpg";
import Card from "@/components/shared/Card";

const BestSelling: React.FC = () => {
  return (
    <div className="w-full">
      <p className="mt-10 text-2xl font-semibold uppercase text-primary md:mt-16 md:text-3xl">
      <samp className="text-secondary">Our</samp> Best <samp className="text-secondary">Selling</samp> Products
      </p>

      <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <Card name="iPad Air M3 - 2025"
          categories="Product"
          regularPrice={80200}
          newPrice={80100}
          status="In Stock"
          description="Go beyond during every creative project with Apple iPad Air M3. One of the slimmest designs with premium colors looks fashionable and aesthetic at the same time. Get gorgeous visuals from the large 11-inch or 13-inch model, which has Wide Color (P3) supported for immersive viewing."
          mainImage={Img1}
          image1={Img2}
          image2={Img3}
          image3={Img4}
          rating={1}
          reviews={10}
          cartLink=""
          buyLink=""
          favoriteLink=""/>
      </div>
    </div>
  );
};

export default BestSelling;
