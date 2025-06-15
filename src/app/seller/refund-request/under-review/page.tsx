"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Download, Eye } from "lucide-react";
import RequireAccess from "@/components/Layouts/RequireAccess";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetAllRefundRequestSellerQuery,
  useGetAllUnderReviewRefundRequestSellerQuery,
} from "@/redux/services/seller/sellerRefundRequest";

interface RefundRequest {
  id: number;
  refundId: number;
  orderId: string;
  productInfo: {
    name: string;
    image?: string;
    quantity: number;
  };
  customerInfo: {
    name: string;
    phone: string;
  };
  totalAmount: string;
  status: "pending" | "approved" | "rejected";
}

const UnderReviewRefundRequest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRefunds, setFilteredRefunds] = useState();
  const navigate = useRouter();

  const { data, isFetching, isLoading } =
    useGetAllUnderReviewRefundRequestSellerQuery({});

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = data?.refund.filter(
      (refund: any) =>
        refund.orderId.toLowerCase().includes(value.toLowerCase()) ||
        refund.refundId.toString().includes(value) ||
        refund.customerInfo.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredRefunds(filtered);
  };

  const handleViewDetails = (refundId: number) => {
    navigate.push(`/seller/refund-request/${refundId}`);
  };
  return (
    <RequireAccess permission="refund-pending">
      <div className="min-h-screen p-6">
        <div className="">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500">
                <span className="text-xs text-white">📋</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Under Review Refund Requests
              </h1>
              <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800">
                {data?.refund?.length}{" "}
              </span>
            </div>
          </div>

          {/* Search and Export */}
          <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative max-w-md flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by order id or refund id"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Refunds Table */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="p-4 text-left font-medium text-gray-700">
                      SL
                    </th>
                    <th className="p-4 text-left font-medium text-gray-700">
                      Refund ID
                    </th>
                    <th className="p-4 text-left font-medium text-gray-700">
                      Order Id
                    </th>
                    <th className="p-4 text-left font-medium text-gray-700">
                      Product Info
                    </th>
                    <th className="p-4 text-left font-medium text-gray-700">
                      Customer Info
                    </th>
                    <th className="p-4 text-left font-medium text-gray-700">
                      Total Amount
                    </th>
                    <th className="p-4 text-left font-medium text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading &&
                    Array.from({ length: 7 }).map((_, i) => (
                      <tr key={i}>
                        <td colSpan={7}>
                          <Skeleton className="h-8" />
                        </td>
                      </tr>
                    ))}
                  {!isLoading && data?.refund?.length <= 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-red-500">
                        No Data to Show
                      </td>
                    </tr>
                  ) : (
                    data?.refund?.map((refund: any, index: any) => (
                      <tr
                        key={refund.id}
                        className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                      >
                        <td className="p-4 text-gray-600">{index + 1}</td>
                        <td className="p-4 font-medium">{refund?.id}</td>
                        <td className="p-4 text-gray-600">
                          {refund?.order_item?.orderId}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {refund?.order_item?.product?.thumbnail && (
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-lg">
                                <Image
                                  src={refund?.order_item?.product?.thumbnail}
                                  alt={refund?.order_item?.product?.title}
                                  width={64}
                                  height={64}
                                  className="rounded"
                                />
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-gray-900">
                                {refund?.order_item?.product?.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                QTY: {refund?.order_item?.quantity}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-gray-900">
                              {refund?.order_item?.order?.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {refund?.order_item?.order?.phone}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-medium text-gray-900">
                          {refund?.order_item?.order?.subTotal}
                        </td>
                        <td className="p-4">
                          <button
                            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => handleViewDetails(refund?.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </RequireAccess>
  );
};

export default UnderReviewRefundRequest;
