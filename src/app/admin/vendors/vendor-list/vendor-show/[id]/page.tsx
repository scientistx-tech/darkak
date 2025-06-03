"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import ShopOverview from "../components/ShopOverview";
import OrderTab from "../components/Order";
import Products from "../components/Products";
import Transaction from "../components/Transaction";
import Reviews from "../components/Reviews";
import { useGetVendorDetailsByIdAdminQuery } from "@/redux/services/admin/adminVendorApis";

const TAB_COMPONENTS: Record<string, React.FC<{ id: string }>> = {
  "Shop overview": ShopOverview,
  Order: OrderTab,
  Product: Products,
  Transaction: Transaction,
  Review: Reviews,
};

const VendorDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error, refetch } = useGetVendorDetailsByIdAdminQuery(
    { id: Number(id) },
  );

  const [currentTab, setCurrentTab] = useState<string>("Shop overview");
  const TabComponent =
    TAB_COMPONENTS[currentTab] || (() => <div>Not found</div>);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-4 flex items-center gap-2 text-2xl font-bold">
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
      <div className="mb-6 flex gap-10 border-b">
        {[
          "Shop overview",
          "Order",
          "Product",
          // "Clearance sale products",
          // "Setting",
          "Transaction",
          "Review",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={`pb-2 ${tab === currentTab ? "border-b-2 border-blue-500 font-medium text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <TabComponent id={id} />
    </div>
  );
};

export default VendorDetailsPage;
