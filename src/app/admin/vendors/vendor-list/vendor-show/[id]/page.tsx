"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ShopOverview from "../components/ShopOverview";
import OrderTab from "../components/Order";
import Products from "../components/Products";
import Transaction from "../components/Transaction";
import Reviews from "../components/Reviews";
import { useGetVendorDetailsByIdAdminQuery } from "@/redux/services/admin/adminVendorApis";
import Setting from "../components/Setting";
import { FaArrowLeft } from "react-icons/fa";

const TAB_COMPONENTS: Record<string, React.FC<{ id: string }>> = {
  "Shop overview": ShopOverview,
  Order: OrderTab,
  Product: Products,
  Transaction: Transaction,
  Review: Reviews,
  Setting: Setting,
};

const VendorDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error, refetch } = useGetVendorDetailsByIdAdminQuery(
    { id: Number(id) },
  );
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState<string>("Shop overview");
  const TabComponent =
    TAB_COMPONENTS[currentTab] || (() => <div>Not found</div>);

  return (
    <div className="min-h-screen bg-gray-50 md:p-6">
      <h1 className="mb-4 flex items-center gap-2 text-2xl font-bold">
        <FaArrowLeft
          onClick={() => router.back()}
          className="mr-3 inline h-8 w-8 cursor-pointer rounded-full bg-gray-4 p-2 hover:bg-gray-3"
        />
        <span>👤</span> Vendor Details
      </h1>

      {currentTab !== "Shop overview" && (
        <div>
          <h1
            style={{ textShadow: " #fc0 1px 0 10px" }}
            className="my-6 text-xl font-bold text-slate-900"
          >
            {data?.seller?.store_name}
          </h1>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="mb-6 overflow-x-auto border-b bg-white">
        <div className="scrollbar-always flex gap-4 whitespace-nowrap px-2 py-2 sm:gap-8 sm:px-0 sm:py-0 md:gap-10">
          {[
            "Shop overview",
            "Order",
            "Product",
            // "Clearance sale products",
            "Setting",
            "Transaction",
            "Review",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`px-3 py-2 pb-2 text-sm transition-colors duration-150 sm:text-base ${
                tab === currentTab
                  ? "border-b-2 border-blue-500 font-medium text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              style={{ minWidth: 100 }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <TabComponent id={id} />
    </div>
  );
};

export default VendorDetailsPage;
