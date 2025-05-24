"use client";
import React, { useState } from "react";
import Hero from "@/components/category/Hero";
import Brands from "@/components/category/Brands";
import SortBy from "@/components/category/SortBy";
import ProductsSection from "@/components/category/ProductsSection";
import Pagination from "@/components/category/Pagination";

export default function CategoryPage({
  initialQuery,
}: {
  initialQuery: Record<string, string>;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newer");
  const totalItems = 701;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Fetch data for the new page here
    console.log("Page changed to:", newPage);
  };

  return (
    <div>
      {/* <Hero /> */}
      <Brands />
      <SortBy setSortBy={setSortBy} />
      <ProductsSection initialQuery={initialQuery} sortBy={sortBy} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        siblingCount={2} // Optional: Adjust the number of siblings
      />
    </div>
  );
}
