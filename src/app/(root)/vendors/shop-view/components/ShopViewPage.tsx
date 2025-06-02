"use client";

import ProductsSection from "@/components/category/ProductsSection";
import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import VendorsProductsSection from "./VendorsProductSection";

export default function ShopViewPage({
  shop,
  products,
}: {
  shop: any;
  products: any;
}) {
  const [searchValue, setSearchValue] = useState<string>("");

  const [sortBy, setSortBy] = useState("newer");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  console.log("shop view shop", shop);
  return (
    <div className="w-full px-12 py-6">
      <div className="w-full">
        {/* Banner Image */}
        <div className="relative h-[400px] w-full">
          <Image
            src={shop?.shop_banner}
            alt="Vendor Banner"
            width={1200}
            height={12}
            className="h-full w-full rounded-xl"
          />
          {/* Overlay for better text visibility */}
          <div className="absolute ml-[10px] mt-[-110px] flex h-[100px] items-center gap-5 rounded-xl bg-white px-6 text-black">
            <div className="">
              <Image
                src={shop.shop_logo}
                alt={`${shop.shop_name} Logo`}
                width={48}
                height={48}
                className="h-[70px] w-[70px] rounded-full border border-primaryBlue object-cover shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-primaryBlue">
                {shop?.store_name}
              </h2>
              <div className="flex items-center gap-1 text-xs text-yellow-500">
                <FaStar className="text-sm" />
                <span className="text-black">{shop?.averageRate || 0}</span>
                <span className="ml-1 text-gray-500">Rating</span>
                <span className="ml-1 text-black">|</span>
                <span className="ml-1 text-black">
                  {shop?.reviews?.length || 0}
                </span>
                <span className="ml-1 text-gray-500">Reviews</span>
              </div>

              <div className="mt-1 flex items-center">
                <span className="ml-1 text-primary">Total Order:</span>
                <span className="ml-1 text-black">{shop?.totalOrder || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 w-full">
          {/* Orther products */}
          <VendorsProductsSection
            currentPage={currentPage}
            setTotalPages={setTotalPages}
            // initialQuery={}
            sortBy={sortBy}
            searchValue={searchValue}
            vendorProduct={products}
          />
        </div>
      </div>
    </div>
  );
}
