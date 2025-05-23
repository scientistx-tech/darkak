"use client";

import React, { useState } from "react";
import ProductBreadcrumb from "./components/ProductBreadcrumb";
import ProductShow from "./components/ProductShow";
import RelatedProductsSwiper from "./components/RelatedProductsSwiper";
import { CustomerReviews } from "./components/CustomerReviews";
import { ProductTabs } from "./components/ProductTabs";
import { useParams } from "next/navigation";
import { useGetSinglePublicProductDetailsQuery } from "@/redux/services/client/products";
import ClientLoading from "../../components/ClientLoading";

export default function ProductDetails() {
  const params = useParams();
  let slug: string = "";
  if (params?.id) {
    slug = Array.isArray(params.id) ? params.id[0] : params.id;
  }

  const { data, error, isLoading, refetch } =
    useGetSinglePublicProductDetailsQuery(slug);

  if (isLoading) return <ClientLoading></ClientLoading>;
  if (error)
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5">
          <p>Error loading product.</p>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="rounded border-2 border-red-700 bg-red-100 px-5 py-1 text-red-700 transition-all duration-300 ease-in hover:bg-red-200"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  if (!data) return <div>No product found.</div>;

  return (
    <div className="ml-[5%] w-[90%]">
      <ProductBreadcrumb />
      <ProductShow data={data} slug={slug} />
      <RelatedProductsSwiper data={data.related} />
      <div className="w-[100%] gap-6 px-2 py-10 lg:flex">
        <div className="w-full lg:w-[65%]">
          <ProductTabs data={data.product} />
        </div>
        <div className="w-full py-10 lg:w-[35%] lg:py-0">
          <CustomerReviews />
        </div>
      </div>
    </div>
  );
}
