"use client";

import VendorCard from "@/components/shared/VendorCard";
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function VendorPage() {
  return (
    <div className="w-full px-6 py-3 md:px-12 md:py-6">
      {/* Header */}
      <div className="flex w-full flex-col items-center justify-between rounded-lg bg-gradient-to-r from-primary to-[#e5effe] px-6 py-6 md:flex-row">
        {/* Text Section */}
        <div className="w-full text-white md:w-1/2">
          <h1 className="text-2xl font-bold">ALL STORES</h1>
          <p className="mt-1">
            Find your desired stores and shop your favourite products
          </p>
        </div>

        {/* Search Box */}
        <div className="mt-3 flex w-full justify-end md:mt-0 md:w-1/2">
          <div className="flex w-full max-w-md">
            <input
              type="text"
              placeholder="Search Store"
              className="w-full rounded-l-md border-[1.5px] border-blue-300 px-4 py-2 outline-none focus:border-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="rounded-r-md bg-primary px-4 text-white hover:bg-blue-800">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Body-Par */}

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <VendorCard
          shopLink="/vendors/shop-view"
          shopBanner="https://img.freepik.com/free-vector/flat-local-market-business-social-media-cover-template_23-2149507335.jpg?semt=ais_hybrid&w=740"
          shopLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLP0L-mu0JmaUEFQjNVlWbrxw3pgTZIBmFQg&s"
          shopName="Darkak Sub Shop"
          shopRating="4.8"
          shopReviews="4"
          shopTotalProduct="194"
        />
        <VendorCard
          shopLink="/vendors/shop-view"
          shopBanner="https://img.freepik.com/free-vector/flat-local-market-business-social-media-cover-template_23-2149507335.jpg?semt=ais_hybrid&w=740"
          shopLogo="https://cdn.freebiesupply.com/logos/large/2x/vendor-logo-svg-vector.svg"
          shopName="Darkak Sub Shop"
          shopRating="4.8"
          shopReviews="4"
          shopTotalProduct="194"
        />
        <VendorCard
          shopLink="/vendors/shop-view"
          shopBanner="https://img.freepik.com/free-vector/flat-local-market-business-social-media-cover-template_23-2149507335.jpg?semt=ais_hybrid&w=740"
          shopLogo="https://cdn.freebiesupply.com/logos/large/2x/vendor-logo-svg-vector.svg"
          shopName="Darkak Sub Shop"
          shopRating="4.8"
          shopReviews="4"
          shopTotalProduct="194"
        />
        <VendorCard
          shopLink="/vendors/shop-view"
          shopBanner="https://img.freepik.com/free-vector/flat-local-market-business-social-media-cover-template_23-2149507335.jpg?semt=ais_hybrid&w=740"
          shopLogo="https://cdn.freebiesupply.com/logos/large/2x/vendor-logo-svg-vector.svg"
          shopName="Darkak Sub Shop"
          shopRating="4.8"
          shopReviews="4"
          shopTotalProduct="194"
        />
        <VendorCard
          shopLink="/vendors/shop-view"
          shopBanner="https://img.freepik.com/free-vector/flat-local-market-business-social-media-cover-template_23-2149507335.jpg?semt=ais_hybrid&w=740"
          shopLogo="https://cdn.freebiesupply.com/logos/large/2x/vendor-logo-svg-vector.svg"
          shopName="Darkak Sub Shop"
          shopRating="4.8"
          shopReviews="4"
          shopTotalProduct="194"
        />
        <VendorCard
          shopLink="/vendors/shop-view"
          shopBanner="https://img.freepik.com/free-vector/flat-local-market-business-social-media-cover-template_23-2149507335.jpg?semt=ais_hybrid&w=740"
          shopLogo="https://cdn.freebiesupply.com/logos/large/2x/vendor-logo-svg-vector.svg"
          shopName="Darkak Sub Shop"
          shopRating="4.8"
          shopReviews="4"
          shopTotalProduct="194"
        />
      </div>
    </div>
  );
}
