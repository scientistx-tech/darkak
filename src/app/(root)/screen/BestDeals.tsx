"use client";

import React from "react";
import ProductCard from "@/components/shared/ProductCard";
import Image from "next/image";
import laptop from "@/Data/Demo/Rectangle 130 (1).png";
import { motion } from "framer-motion";
import { useGetBestDealProductsQuery } from "@/redux/services/client/products";
import Link from "next/link";

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const BestDeals: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetBestDealProductsQuery("");
  if (data?.data === 0) {
    return null;
  }

  return (
    <motion.section
      className="container mx-auto mt-0 px-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div
        className="mb-1 flex items-center justify-between"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-semibold text-primaryDarkBlue md:ml-[33%] lg:ml-[25%] xl:ml-[20%]">
          TO DAYS DEAL
        </h2>
        <Link href="/more/todays-deal" className="">
          <span className="cursor-pointer text-2xl">→</span>
        </Link>
      </motion.div>

      <motion.div
        className="relative grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-8"
        variants={containerVariants}
      >
        {/* LEFT SIDE BANNER */}
        <motion.div
          className="absulate hidden flex-col justify-between rounded-xl bg-[#4C84FF] p-6 text-white md:mt-[-45px] md:flex md:h-[425px] lg:mt-[-40px] lg:h-[420px] xl:mt-[-40px] xl:h-[450px] 2xl:mt-[-50px]"
          variants={itemVariants}
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
        {data?.data.slice(0, 9).map((product: any) => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default BestDeals;
