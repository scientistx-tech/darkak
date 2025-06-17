"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function AliExpressSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [aliExpressProducts, setAliExpressProducts] = useState<any[]>([]);
  const token = Cookies.get("aliExpressToken");

  const fetchProductsFromAliExpress = async () => {
    try {
      const response = await fetch(
        `https://api.darkak.com.bd/api/aliexpress/get-product-search/${token}?countryCode=BD&keyWord=${searchTerm}&local=en_US&currency=BDT`,
        {
          method: "GET",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch products");
      }

      const res = await response.json();
      console.log("Products:", res);
      setAliExpressProducts(
        res?.aliexpress_ds_text_search_response?.data?.products
          ?.selection_search_product,
      );
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.href =
        "https://api-sg.aliexpress.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=https://darkak.com.bd/connecting-aliExpress&client_id=514372";
    }
  }, []);

  return (
    <div className="mx-auto max-w-xl p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search AliExpress products..."
        className="w-full rounded border p-2"
        onKeyDown={(e) => e.key === "Enter" && fetchProductsFromAliExpress()}
      />
      <div className="mt-4 space-y-2">
        {results.map((item) => (
          <div key={item.id} className="rounded border bg-gray-100 p-2">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
