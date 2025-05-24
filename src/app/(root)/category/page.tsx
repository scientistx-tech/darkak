"use client";

import React from "react";
import CategoryPage from "@/components/category/CategoryPage";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  // Convert searchParams to a plain object
  const query: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  return (
    <div className="w-full">
      <div className="h-[65px] w-full md:h-[109px]" />
      <CategoryPage initialQuery={query} />
    </div>
  );
}
