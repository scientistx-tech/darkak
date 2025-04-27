"use client";
import React from "react";
import Hero from "@/app/(root)/category/components/Hero";
import Brands from "@/app/(root)/category/components/Brands";
import SortBy from "@/app/(root)/category/components/SortBy";

export default function CategoryPage() {
  return (
    <div>
      <Hero />
      <Brands />
      <SortBy />
    </div>
  );
}
