"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Image from "next/image";
import Pagination from "@/components/shared/Pagination";

export default function AliExpressSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("shirt");
  const [aliExpressProducts, setAliExpressProducts] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [categories, setCategories] = useState<
    { category_id: string; category_name: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]?.category_id || "",
  );
  const [isProductFetching, setIsProductFetching] = useState(false);
  const token = Cookies.get("aliExpressToken");

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `https://api.darkak.com.bd/api/aliexpress/get-product-category/${token}`,
      );
      const data = await response.json();
      setCategories(
        data?.aliexpress_ds_category_get_response?.resp_result?.result
          ?.categories?.category || [],
      );
      setSelectedCategory(categories[0]?.category_id || "");
    } catch (err: any) {
      toast.error("Failed to fetch categories");
    }
  };

  const fetchProductsFromAliExpress = async () => {
    if (!token) return;

    setIsProductFetching(true);

    try {
      const url = `https://api.darkak.com.bd/api/aliexpress/get-product-search/${token}?countryCode=BD&keyWord=${searchTerm}&local=en_US&currency=BDT&pageIndex=${pageIndex}&pageSize=${
        pageSize
      }`;

      const response = await fetch(url, { method: "GET" });
      const result = await response.json();
      const data = result?.aliexpress_ds_text_search_response?.data;

      if (data) {
        setAliExpressProducts(data.products.selection_search_product || []);
        setTotalCount(data.totalCount || 0);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch products");
    } finally {
      setIsProductFetching(false);
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.href =
        "https://api-sg.aliexpress.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=https://darkak.com.bd/connecting-aliExpress&client_id=514372";
    }
  }, []);

  useEffect(() => {
    if (searchTerm) fetchProductsFromAliExpress();
  }, [pageIndex]);

  useEffect(() => {
    if (token) fetchCategories();
  }, [token]);

  const getAbsoluteUrl = (url: string) => {
    if (url.startsWith("//")) return "https:" + url;
    return url;
  };

  return (
    <div className="mx-auto px-4 py-8">
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center">
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search AliExpress products..."
          className="w-full rounded border px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && fetchProductsFromAliExpress()}
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setPageIndex(1); // reset page
            setSearchTerm(e.target.value);
          }}
          className="w-full rounded border px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-64"
        >
          <option value="">All Categories</option>
          {categories.map((cat: any) => (
            <option key={cat.category_id} value={cat.category_name}>
              {cat.category_name}
            </option>
          ))}
        </select>
        <button
          onClick={fetchProductsFromAliExpress}
          className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {isProductFetching
          ? Array.from({ length: 20 }).map((_, i) => (
              <div className="flex animate-pulse flex-col overflow-hidden rounded-lg border bg-white shadow-md">
                {/* Image Skeleton */}
                <div className="h-48 w-full bg-gray-200" />

                {/* Content Skeleton */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div className="mb-2 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                    <div className="h-4 w-5/6 rounded bg-gray-200" />
                  </div>
                  <div className="mb-2 space-y-2">
                    <div className="h-4 w-1/3 rounded bg-gray-200" />
                    <div className="h-4 w-1/4 rounded bg-gray-200" />
                    <div className="h-4 w-2/3 rounded bg-gray-200" />
                  </div>
                  <div className="mt-auto h-10 w-full rounded-md bg-gray-300" />
                </div>
              </div>
            ))
          : aliExpressProducts.map((item) => (
              <div
                key={item.itemId}
                className="flex flex-col overflow-hidden rounded-lg border bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                <Image
                  src={getAbsoluteUrl(item.itemMainPic)}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                  width={300}
                  height={300}
                />
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div className="mb-2">
                    <h2 className="text-md line-clamp-2 font-semibold text-gray-800">
                      {item.title}
                    </h2>
                  </div>
                  <div className="mb-2 space-y-1 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold text-green-600">
                        {item.salePriceFormat || `BDT ${item.targetSalePrice}`}
                      </span>{" "}
                      <span className="text-xs text-gray-400 line-through">
                        {item.targetOriginalPrice &&
                          `BDT ${item.targetOriginalPrice}`}
                      </span>
                    </p>
                    <p className="text-red-500">{item.discount} OFF</p>
                    <p>
                      ⭐ {item.score} | 🛒 {item.orders} orders
                    </p>
                  </div>
                  <button
                    className="mt-auto w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    onClick={() =>
                      router.push(
                        `/admin/ali-express-products/add-product/${item?.itemId}`,
                      )
                    }
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
      </div>
      <Pagination
        currentPage={pageIndex}
        onPageChange={setPageIndex}
        total={totalCount}
        limit={20}
      />
    </div>
  );
}
