"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FilterSidebar from "@/components/search/FilterSidebar";
import ProductGrid from "@/components/search/ProductGrid";
import { useGetAllProductsQuery } from "@/redux/services/client/products";
import Pagination from "@/components/shared/Pagination";
import { useGetSearchPublicQuery } from "@/redux/services/client/searchedProducts";
import { IoIosArrowDown } from "react-icons/io";

export interface SortItem {
  value: string;
  name: string;
}

const sortingItems: SortItem[] = [
  {
    value: "newer",
    name: "Newer",
  },
  {
    value: "popular",
    name: "Popular",
  },
  {
    value: "older",
    name: "Older",
  },
  {
    value: "low-to-high",
    name: "Low to High Price",
  },
  {
    value: "high-to-low",
    name: "High to Low Price",
  },
];

export default function SearchPage() {
  const sortingItems: SortItem[] = [
    { value: "newer", name: "Newer" },
    { value: "popular", name: "Popular" },
    { value: "older", name: "Older" },
    { value: "low-to-high", name: "Low to High Price" },
    { value: "high-to-low", name: "High to Low Price" },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sortingItem, setSortingItem] = useState<string>("Newer");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword")?.toLowerCase().trim() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [currentPage, setCurrentPage] = useState(page);
  const pageSize = 16;

  const initialData = useGetSearchPublicQuery({ search: `${keyword}` });

  const { data, isFetching, isLoading } = useGetSearchPublicQuery({
    search: `${keyword}`,
  });

  console.log("🚀 ~ SearchPage ~ data:", initialData);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    router.push(`/search?${newParams.toString()}`);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSort = (name: string, value: string) => {
    setSortingItem(name);
    setIsOpen(false);
  };

  // Filter and paginate on client
  const allProducts = data?.data || [];

  const limit = 16;
  const total = data?.total || 0;

  const startIdx = (currentPage - 1) * limit;
  const endIdx = startIdx + limit;
  const paginatedProducts = allProducts.slice(startIdx, endIdx);

  
  return (
    <div className="container mx-auto w-full">
      <div className="h-[65px] w-full md:h-[109px]" />
      <div className="flex items-center justify-between py-5">
        <p className="mb-1 text-base font-semibold text-[#003084] md:mb-0 md:text-xl lg:text-3xl">
          Searching for &apos;{keyword}&apos;
        </p>
        <div className="order-2 flex w-full flex-row items-center justify-between gap-x-2 md:order-none md:w-auto md:justify-start md:gap-x-4 lg:gap-x-6">
          <p className="whitespace-nowrap text-sm font-semibold text-[#003084] md:text-xl lg:text-3xl">
            Sort By
          </p>
          <div
            className="relative inline-block w-36 text-left md:w-auto"
            ref={dropdownRef}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown();
              }}
              className="inline-flex w-full items-center justify-between rounded-full bg-white px-3 py-2 text-center text-xs font-medium text-[#003084] shadow-md ring-1 ring-gray-200 transition hover:bg-blue-50 focus:outline-none md:px-4 md:py-2 lg:px-8 lg:py-3 lg:text-base"
              type="button"
            >
              <span className="truncate">{sortingItem}</span>
              <IoIosArrowDown
                height={5}
                width={5}
                className={`ml-2 text-[#003084] transition-transform duration-200 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 z-50 mt-2 w-36 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-gray-200 md:w-44">
                <ul className="py-2 text-xs text-[#003084] md:text-base">
                  {sortingItems.map((item) => (
                    <li
                      key={item.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSort(item.name, item.value);
                      }}
                      className="block cursor-pointer rounded px-4 py-2 transition-colors hover:bg-blue-50"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4">
        <div className="col-span-1">
          <FilterSidebar products={allProducts} />
        </div>
        <div className="col-span-3">
          <ProductGrid products={paginatedProducts} isLoading={isFetching} />
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            total={total}
            limit={pageSize}
            align="right"
          />
        </div>
      </div>
    </div>
  );
}
