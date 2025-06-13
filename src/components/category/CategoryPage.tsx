"use client";
import React, { useState } from "react";
import Hero from "@/components/category/Hero";
import Brands from "@/components/category/Brands";
import SortBy from "@/components/category/SortBy";
import ProductsSection from "@/components/category/ProductsSection";
import Pagination from "../shared/Pagination";

export default function CategoryPage({
  initialQuery,
}: {
  initialQuery: Record<string, string>;
}) {
  const [searchValue, setSearchValue] = useState<string>("");

  const [sortBy, setSortBy] = useState("newer");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const categoryTitle = initialQuery.categoryId || "All Products";

  console.log("lll", currentPage, totalPages);

  return (
    <div>
      {/* <Hero /> */}
      {/* <Brands /> */}
      <SortBy
        categoryTitle={categoryTitle}
        setSortBy={setSortBy}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <ProductsSection
        currentPage={currentPage}
        setTotalPages={setTotalPages}
        initialQuery={initialQuery}
        sortBy={sortBy}
        searchValue={searchValue}
      />
      {/* <div className="px-10">
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
          align="right"
        />
      </div> */}
    </div>
  );
}
