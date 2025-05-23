"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useGetProductCategoriesQuery } from "@/redux/services/client/categories";

export default function Categories() {
  const {
    data: categories,
    isLoading,
    error,
  } = useGetProductCategoriesQuery("");

  if (isLoading) return <p className="text-center">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load categories.</p>;

  return (
    <div className="flex w-full flex-col items-center justify-center md:mt-10">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-4 mb-5 text-3xl font-medium text-gray-800 md:text-5xl"
      >
        Shop by Categories
      </motion.h1>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="mt-8 grid grid-cols-4 gap-3 md:gap-6 px-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7"
      >
        {categories?.map((category: any, index: number) => (
          <CategoriesComponent
            key={index}
            name={category.title}
            icon={category.icon}
            href={`/category/${category.slug}`}
          />
        ))}
      </motion.div>
    </div>
  );
}

interface CategoriesProps {
  name: string;
  icon: string;
  href: string;
}

const CategoriesComponent: React.FC<CategoriesProps> = ({ name, icon, href }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={href}
        className="group flex flex-col items-center justify-center"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-[60px] w-[60px] px-3 items-center justify-center rounded-full bg-white transition-all duration-300 hover:scale-105 group-hover:shadow-lg md:h-[120px] md:w-[120px]"
        >
          <Image
            src={icon}
            alt={name}
            width={50}
            height={50}
            className="object-contain"
          />
        </motion.div>

        <motion.p
          whileHover={{ color: "#00aaef" }}
          className="h-[50px] md:h-[60px] mt-3 md:mt-5 text-center text-base md:text-xl font-semibold text-gray-700"
        >
          {name}
        </motion.p>
      </Link>
    </motion.div>
  );
};
