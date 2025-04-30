"use client";

import React, { useState } from "react";
import ProductBreadcrumb from "./components/ProductBreadcrumb";
import ProductShow from "./components/ProductShow";
import RelatedProductsSwiper from "./components/RelatedProductsSwiper";
import { CustomerReviews } from "./components/CustomerReviews";
import { ProductTabs } from "./components/ProductTabs";

export default function ProductDetails() {
  return (
    <div className="container mx-auto px-2 md:px-4">
      <ProductBreadcrumb />
      <ProductShow></ProductShow>
      <RelatedProductsSwiper />
      <div className="lg:flex gap-6 px-2 py-10 w-[100%]">
        <div className="w-full lg:w-[65%]">
          <ProductTabs />
        </div>
        <div className="w-full lg:w-[35%] py-10 lg:py-0">
          <CustomerReviews />
        </div>
      </div>
    </div>
  );
}
