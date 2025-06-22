"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  useGetBrandsQuery,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} from "@/redux/services/admin/adminBrandApis";
import { toast } from "react-toastify";
import * as yup from "yup";

import { CiCirclePlus } from "react-icons/ci";
import FilterOrders from "./FilterOrders";
import { useGetOrdersQuery } from "@/redux/services/admin/adminOrderApis";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import Pagination from "@/components/shared/Pagination";
import { useRouter } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderInvoicePDF from "../[id]/components/OrderInvoicePDF";
import RequireAccess from "@/components/Layouts/RequireAccess";
import Button from "../../../components/Button";
import { useGetAliExpressOrdersQuery } from "@/redux/services/admin/adminAli-ExpressOrderApi";

const AllOrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    data: orderData,
    isLoading,
    error,
    refetch,
  } = useGetAliExpressOrdersQuery({ page: String(currentPage), search });

  console.log("orderData", orderData);

  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [currentPage, search]);

  return (
    <RequireAccess permission="order-all">
      <div className="min-h-screen">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold dark:text-white">
          🏠 All Orders{' '}
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-sm text-green-600">194</span>
        </h2>

        <FilterOrders />

        <div className="mt-8 bg-white p-5 dark:bg-gray-dark dark:text-white dark:shadow-card">
          {/* search box and export button */}
          <div className="flex items-center justify-between pb-6">
            <span>Order List</span>
            {/* more buttons*/}
            <div className="flex items-center gap-x-2">
              {/* <button className="flex items-center gap-2 rounded-md border-2 border-blue-400 px-4 py-2 text-sm font-medium text-blue-400">
              <img
                width={20}
                height={20}
                src="/images/icon/icon-excel.svg"
                alt=""
              />
              Export
            </button> */}

              {/* search box */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search order id"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 text-sm outline-none focus:outline-none dark:bg-gray-500"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M16.65 10.35a6.3 6.3 0 11-12.6 0 6.3 6.3 0 0112.6 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          {error ? (
            <p className="px-6 text-red-500">Error loading brands.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-t text-base text-slate-900 [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
                  <TableHead>SL</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Customer Info</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead className="text-center">Order Status</TableHead>
                  <TableHead className="">Courier Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading &&
                  Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={8}>
                        <Skeleton className="h-8" />
                      </TableCell>
                    </TableRow>
                  ))}

                {!isLoading && orderData?.data?.length <= 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-8 text-center text-red-500">
                      No Data to Show
                    </TableCell>
                  </TableRow>
                ) : (
                  orderData?.data?.map((order: any, i: number) => (
                    <TableRow key={order.id} className="text-black dark:text-white">
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{order?.orderId}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="flex items-center">
                        <div className="flex flex-col items-center gap-2">
                          <p>{order.name}</p>
                          <div>
                            <Image
                              width={20}
                              height={20}
                              src="/images/icon/icon_phone.png"
                              alt="phone"
                              className="mr-2 inline-block"
                            />
                            {order.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{order.order_type}</TableCell>
                      <TableCell>
                        <div className="flex flex-col items-center gap-2">
                          <p>{order.subTotal + order.deliveryFee}</p>
                          <div className="flex">
                            {order.paid ? (
                              <p className="mt-1 rounded border border-teal-600 bg-teal-100 p-0.5 text-xs text-teal-600">
                                Paid
                              </p>
                            ) : (
                              <p className="mt-1 rounded border border-rose-600 bg-rose-100 p-0.5 text-xs text-rose-600">
                                Unpaid
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          {order.status === 'pending' ? (
                            <p className="rounded-lg border border-blue-700 bg-blue-50 px-2 py-0.5 text-center font-bold text-blue-700">
                              Pending
                            </p>
                          ) : order.status === 'confirmed' ? (
                            <p className="rounded-lg border border-green-700 bg-green-50 px-2 py-0.5 text-center font-bold text-green-700">
                              Confirmed
                            </p>
                          ) : order.status === 'packaging' ? (
                            <p className="rounded-lg border border-yellow-700 bg-yellow-50 px-2 py-0.5 text-center font-bold text-yellow-700">
                              Packaging
                            </p>
                          ) : order.status === 'out_for_delivery' ? (
                            <p className="rounded-lg border border-yellow-700 bg-yellow-50 px-2 py-0.5 text-center font-bold text-yellow-700">
                              Out For Delivery
                            </p>
                          ) : order.status === 'delivered' ? (
                            <p className="rounded-lg border border-green-700 bg-green-50 px-2 py-0.5 text-center font-bold text-green-700">
                              Delivered
                            </p>
                          ) : order.status === 'returned' ? (
                            <p className="rounded-lg border border-red-700 bg-red-50 px-2 py-0.5 text-center font-bold text-red-700">
                              Returned
                            </p>
                          ) : order.status === 'cancelled' ? (
                            <p className="rounded-lg border border-red-700 bg-red-50 px-2 py-0.5 text-center font-bold text-red-700">
                              Cancelled
                            </p>
                          ) : order.status === 'failed_to_delivery' ? (
                            <p className="rounded-lg border border-red-700 bg-red-50 px-2 py-0.5 text-center font-bold text-red-700">
                              Failed To Deliver
                            </p>
                          ) : (
                            <p className="rounded-lg border border-red-700 bg-red-50 px-2 py-0.5 text-center font-bold text-red-700">
                              Pre Order
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {order?.courier_status === null
                          ? 'N/A'
                          : order?.courier_status.split('_').join(' ')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            onClick={() => {
                              router.push(`/admin/orders/${order.id}`);
                            }}
                            className="rounded-full bg-blue-100 p-1 text-base text-blue-700"
                          >
                            <FaEye />
                          </Button>
                          <PDFDownloadLink
                            document={<OrderInvoicePDF orderDetails={order} />}
                            fileName={`invoice_order_${order?.id}.pdf`}
                          >
                            {({ loading }) => (
                              <button className="rounded-full bg-teal-100 p-1 text-base text-teal-700 hover:bg-teal-50">
                                <MdFileDownload />
                              </button>
                            )}
                          </PDFDownloadLink>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}

          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            total={orderData?.total}
            limit={orderData?.limit}
          />
        </div>
      </div>
    </RequireAccess>
  );
};

export default AllOrderList;
