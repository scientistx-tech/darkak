import React, { useEffect, useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "@/app/(root)/types/ProductType";
import LeftSidebar from "@/components/category/leftSidebar/LeftSidebar";
import CategoryFilter from "@/assets/svg/CategoryFilter";
import { useGetAllProductsQuery } from "@/redux/services/client/products";

// const dummyProducts: Product[] = new Array(7).fill(null).map((_, i) => ({
//   id: `prod-${i}`,
//   name: "iPhone 15 Pro Max",
//   images: [
//     "/images/dummy/dummy.png",
//     "/images/dummy/dummy1.png",
//     "/images/dummy/dummy2.png",
//   ],
//   price: 800,
//   originalPrice: 1000,
//   storage: "12GB/512GB",
//   discount: 20,
//   rating: 4.5,
//   reviews: 65,
// }));

const ProductsSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data, error, isLoading, refetch } = useGetAllProductsQuery({});

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
        <LeftSidebar />
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
              <LeftSidebar />
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid w-full grid-cols-2 gap-4 lg:w-4/5 lg:grid-cols-3 xl:grid-cols-4">
        {data?.data?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
