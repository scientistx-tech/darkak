import React, { useEffect, useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "@/app/(root)/types/ProductType";
import LeftSidebar from "@/components/category/leftSidebar/LeftSidebar";
import CategoryFilter from "@/assets/svg/CategoryFilter";
import { useGetAllProductsQuery } from "@/redux/services/client/products";

const ProductsSection = ({
  initialQuery,
  sortBy,
}: {
  initialQuery: Record<string, string>;
  sortBy: string;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarFilters, setSidebarFilters] = useState<any>(() => {
    // Convert initialQuery values to numbers if possible
    const parsed = Object.fromEntries(
      Object.entries(initialQuery || {}).map(([k, v]) => [
        k,
        !isNaN(Number(v)) && v !== "" ? Number(v) : v,
      ]),
    );
    return parsed;
  });

  console.log("Initial Query from productsection:", initialQuery);

  useEffect(() => {
    if (sortBy) {
      setSidebarFilters((prevFilters: any) => ({
        ...prevFilters,
        sort: sortBy,
      }));
    }
  }, [sortBy]);

  // When initialQuery changes (route changes), update sidebarFilters
  useEffect(() => {
    const parsed = Object.fromEntries(
      Object.entries(initialQuery || {}).map(([k, v]) => [
        k,
        !isNaN(Number(v)) && v !== "" ? Number(v) : v,
      ]),
    );
    setSidebarFilters((prev: any) => {
      const next = { ...parsed };
      if (prev.sort || sortBy) next.sort = prev.sort || sortBy || "";
      return next;
    });
  }, [initialQuery]);

  const { data, error, isLoading, refetch } =
    useGetAllProductsQuery(sidebarFilters);

  // Lock scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "sidebar-overlay") {
      closeSidebar();
    }
  };

  // Handler to receive filter changes from LeftSidebar
  const handleSidebarFilters = (filters: any) => {
    setSidebarFilters((prev: any) => {
      // Merge, but avoid duplicate params (prefer new filters, but keep sort)
      const merged = { ...prev, ...filters };
      if (prev.sort || sortBy) merged.sort = prev.sort || sortBy || "";
      return merged;
    });
    // You can use filters to refetch products, update query params, etc.
    // Example: refetch({ ...filters })
  };

  console.log("Sidebar Filters:", sidebarFilters);
  return (
    <section className="mt-4 w-full items-start gap-x-7 p-4 md:mt-6 md:p-6 lg:flex lg:p-8 xl:p-10">
      {/* <section className="relative mt-4 md:mt-12 md:p-6 lg:mt-[62px] flex w-full flex-col gap-x-7 p-4 lg:flex-row lg:p-8 xl:p-10"> */}
      {/* Hamburger Button */}
      <div className="mb-4 block lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 rounded-md px-4 py-2 text-[#003084]"
        >
          Filter
          <CategoryFilter />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-1/5">
        <LeftSidebar onFilterChange={handleSidebarFilters} />
      </div>

      {/* Mobile Sidebar Drawer with Overlay */}
      {isSidebarOpen && (
        <div
          id="sidebar-overlay"
          className="fixed inset-0 z-99 bg-black bg-opacity-30 lg:hidden"
          onClick={handleBackdropClick}
        >
          <div className="absolute left-0 top-0 h-full w-4/5 max-w-xs transform bg-white shadow-md transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={closeSidebar}>
                <svg
                  className="h-6 w-6 text-gray-700 hover:text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="h-full overflow-y-auto px-4 pb-20 pt-4">
              <LeftSidebar onFilterChange={handleSidebarFilters} />
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid w-full grid-cols-2 gap-4 lg:w-4/5 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading &&
          Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-lg bg-gray-100 p-4 shadow-sm"
            >
              <div className="mb-3 h-36 w-full rounded bg-gray-200" />
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mb-1 h-3 w-1/2 rounded bg-gray-200" />
              <div className="h-3 w-1/3 rounded bg-gray-200" />
            </div>
          ))}
        {data?.data?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
