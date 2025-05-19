"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "../types/ProductType";
import laptop from "@/Data/Demo/Rectangle 130 (1).png";
import { useGetNewArivalProductsQuery } from "@/redux/services/client/products";

// const dummyProducts: Product[] = new Array(7).fill(null).map((_, i) => ({
//   id: `prod-${i}`,
//   name: "iPhone 15 Pro Max",
//   images: [
//     "/images/dummy/dummy.png",
//     "/images/dummy/dummy1.png",
//     "/images/dummy/dummy2.png",
//   ],
//   price: 800,
//   originalPrice: 1000,
//   storage: "12GB/512GB",
//   discount: 10,
//   rating: 4.5,
//   reviews: 65,
// }));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const BestSelling: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetNewArivalProductsQuery({});

  return (
    <motion.section
      className="container mx-auto mt-10 px-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primaryDarkBlue md:ml-[33%] lg:ml-[25%] xl:ml-[20%]">
          BEST SELLING PRODUCTS
        </h2>
        <span className="cursor-pointer text-2xl">→</span>
      </div>

      <div className="relative grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8">
        {/* LEFT SIDE BANNER */}
        <motion.div
          variants={itemVariants}
          className="absulate hidden flex-col justify-between rounded-xl bg-[#4C84FF] p-6 text-white md:mt-[-45px] md:flex md:h-[425px] lg:mt-[-40px] lg:h-[420px] xl:mt-[-40px] xl:h-[450px] 2xl:mt-[-50px]"
        >
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
        </motion.div>

        {/* PRODUCT CARDS */}
        {data?.data.map((product: any) => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default BestSelling;
