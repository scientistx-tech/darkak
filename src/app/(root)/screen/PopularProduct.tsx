"use client";

import React, { useState } from "react";
import Card from "@/components/shared/Card";

import Img1 from "@/Data/Demo/product-2-1.png";
import Img2 from "@/Data/Demo/product-2-2.avif";
import Img3 from "@/Data/Demo/product-2-3.png";
import Img4 from "@/Data/Demo/product-2-4.png";
import Img5 from "@/Data/Demo/Product-banner-1.jpg";
import Img6 from "@/Data/Demo/Product-banner-2.jpg";
import Img7 from "@/Data/Demo/Product-banner-3.webp";
import Img8 from "@/Data/Demo/Product-banner-6.jpg";

const products = [
  {
    name: "Product-2",
    categories: "Product",
    regularPrice: 19200,
    newPrice: 18100,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3.",
    mainImage: Img2,
    image1: Img1,
    image2: Img3,
    image3: Img4,
    rating: 3.5,
    reviews: 990,
    cartLink: "",
    buyLink: "",
    favoriteLink: "",
  },
  {
    name: "iPad Air M3 - 2025",
    categories: "Product",
    regularPrice: 80200,
    newPrice: 80100,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3.",
    mainImage: Img1,
    image1: Img2,
    image2: Img3,
    image3: Img4,
    rating: 4.5,
    reviews: 10,
    cartLink: "",
    buyLink: "",
    favoriteLink: "",
  },
  {
    name: "Product-2",
    categories: "Product",
    regularPrice: 19200,
    newPrice: 18100,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3.",
    mainImage: Img2,
    image1: Img1,
    image2: Img3,
    image3: Img4,
    rating: 3.5,
    reviews: 990,
    cartLink: "",
    buyLink: "",
    favoriteLink: "",
  },
  {
    name: "Product 1",
    categories: "Product",
    regularPrice: 200,
    newPrice: 100,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3.",
    mainImage: Img5,
    image1: Img6,
    image2: Img7,
    image3: Img8,
    rating: 1.5,
    reviews: 13,
    cartLink: "",
    buyLink: "",
    favoriteLink: "",
  },
  {
    name: "Product 1",
    categories: "Product",
    regularPrice: 200,
    newPrice: 100,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3.",
    mainImage: Img5,
    image1: Img6,
    image2: Img7,
    image3: Img8,
    rating: 1.5,
    reviews: 13,
    cartLink: "",
    buyLink: "",
    favoriteLink: "",
  },
  {
    name: "Product 1",
    categories: "Product",
    regularPrice: 200,
    newPrice: 100,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3.",
    mainImage: Img5,
    image1: Img6,
    image2: Img7,
    image3: Img8,
    rating: 1.5,
    reviews: 13,
    cartLink: "",
    buyLink: "",
    favoriteLink: "",
  },
  {
    name: "Product 1",
    categories: "Product",
    regularPrice: 200,
    newPrice: 100,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3.",
    mainImage: Img5,
    image1: Img6,
    image2: Img7,
    image3: Img8,
    rating: 1.5,
    reviews: 13,
    cartLink: "",
    buyLink: "",
    favoriteLink: "",
  },
  {
    name: "Product 1",
    categories: "Product",
    regularPrice: 200,
    newPrice: 100,
    status: "In Stock",
    description:
      "Go beyond during every creative project with Apple iPad Air M3.",
    mainImage: Img5,
    image1: Img6,
    image2: Img7,
    image3: Img8,
    rating: 1.5,
    reviews: 13,
    cartLink: "",
    buyLink: "",
    favoriteLink: "",
  },
];

const PopularProduct: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? products : products.slice(0, 4);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mt-10 flex justify-between md:mt-16">
        <p className="text-2xl font-semibold uppercase text-primary md:text-3xl">
          Popular <span className="text-secondary">Products</span>
        </p>
        <button
          className="text-lg font-medium font-serif text-secondary hover:text-primary"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "See Less" : "See More"}
        </button>
      </div>

      {/* Product Grid */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {visibleProducts.map((product, index) => (
          <Card key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProduct;
