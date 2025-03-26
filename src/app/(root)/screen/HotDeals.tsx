"use client";

import React, { useState } from "react";
import HotCard from "@/components/shared/HotCard";

import Img1 from "@/Data/Demo/iPad-Air-M3---2025-1259.jpg";
import Img2 from "@/Data/Demo/iPad-Air-M3---2025-purple-1209.jpg";
import Img3 from "@/Data/Demo/iPad-Air-M3---2025-space-gray-3684.jpg";
import Img4 from "@/Data/Demo/iPad-Air-M3---2025-starlight-2313.jpg";

import Img5 from "@/Data/Demo/Product-banner-1.jpg";
import Img6 from "@/Data/Demo/Product-banner-2.jpg";
import Img7 from "@/Data/Demo/Product-banner-3.webp";
import Img8 from "@/Data/Demo/Product-banner-6.jpg";

const products = [
  {
    name: "iPad Air M3 - 2025",
    categories: "Product",
    regularPrice: 80200,
    discount: 20,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3...",
    mainImage: Img1,
    image1: Img2,
    image2: Img3,
    image3: Img4,
    rating: 1,
    reviews: 10,
    cartLink: "/cart",
    buyLink: "/buy",
    favoriteLink: "/wishlist",
  },
  {
    name: "Demo Product",
    categories: "Product",
    regularPrice: 10100,
    discount: 10,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3...",
    mainImage: Img5,
    image1: Img6,
    image2: Img7,
    image3: Img8,
    rating: 5,
    reviews: 10,
    cartLink: "/cart",
    buyLink: "/buy",
    favoriteLink: "/wishlist",
  },
  {
    name: "iPad Air M3 - 2025",
    categories: "Product",
    regularPrice: 80200,
    discount: 20,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3...",
    mainImage: Img1,
    image1: Img2,
    image2: Img3,
    image3: Img4,
    rating: 4.5,
    reviews: 100,
    cartLink: "/cart",
    buyLink: "/buy",
    favoriteLink: "/wishlist",
  },
  {
    name: "Demo Product",
    categories: "Product",
    regularPrice: 10100,
    discount: 10,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3...",
    mainImage: Img8,
    image1: Img6,
    image2: Img7,
    image3: Img5,
    rating: 5,
    reviews: 10,
    cartLink: "/cart",
    buyLink: "/buy",
    favoriteLink: "/wishlist",
  },
  {
    name: "Demo Product",
    categories: "Product",
    regularPrice: 10100,
    discount: 10,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3...",
    mainImage: Img5,
    image1: Img6,
    image2: Img7,
    image3: Img8,
    rating: 5,
    reviews: 10,
    cartLink: "/cart",
    buyLink: "/buy",
    favoriteLink: "/wishlist",
  },
  {
    name: "Demo Product",
    categories: "Product",
    regularPrice: 10100,
    discount: 10,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3...",
    mainImage: Img5,
    image1: Img6,
    image2: Img7,
    image3: Img8,
    rating: 5,
    reviews: 10,
    cartLink: "/cart",
    buyLink: "/buy",
    favoriteLink: "/wishlist",
  },
];

const HotDeals: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? products : products.slice(0, 3);

  return (
    <div className="w-full">
      <div className="mt-10 flex justify-between md:mt-16">
        <p className="text-2xl font-semibold uppercase text-primary md:text-3xl">
          Hot <span className="text-secondary">Deals</span>
        </p>
        <button
          className="font-serif text-lg font-medium text-secondary hover:text-primary"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "See Less" : "See More"}
        </button>
      </div>

      <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {visibleProducts.map((product, index) => (
          <HotCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default HotDeals;
