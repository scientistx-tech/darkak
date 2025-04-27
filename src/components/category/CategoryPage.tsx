"use client";
import React from "react";
import Hero from "@/components/category/Hero";
import Brands from "@/components/category/Brands";
import SortBy from "@/components/category/SortBy";
import ProductsSection from "@/components/category/ProductsSection";

export default function CategoryPage() {
  return (
    <div>
      <Hero />
      <Brands />
      <SortBy />
      <ProductsSection />
    </div>
  );
}
