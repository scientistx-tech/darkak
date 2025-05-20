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
  if (error) return <div>Error loading product.</div>;
  if (!data) return <div>No product found.</div>;

  return (
    <div className="container mx-auto px-2 md:px-4">
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
