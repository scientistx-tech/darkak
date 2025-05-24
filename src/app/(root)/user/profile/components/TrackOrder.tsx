"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
} from "@/redux/services/client/order";

const steps = [
  {
    title: "Pending",
    description: "We received your order.",
  },
  {
    title: "Processing",
    description: "Your order is being prepared.",
  },
  {
    title: "Shipped",
    description: "Your order is on the way.",
  },
  {
    title: "Delivered",
    description: "Order delivered to your address.",
  },
];

const getStepFromStatus = (status: string) => {
  switch (status) {
    case "pending":
      return 0;
    case "processing":
      return 1;
    case "shipped":
      return 2;
    case "delivered":
      return 3;
    default:
      return 0;
  }
};

export default function TrackOrder() {
  const [orderId, setOrderId] = useState<number | undefined>(undefined);
  // console.log(orderId);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1000);

  const { data: ordersData } = useGetMyOrdersQuery({ page, limit });

  useEffect(() => {
    if (ordersData?.data?.length && orderId === undefined) {
      setOrderId(ordersData.data[0].orderId); // Automatically select first order
    }
  }, [ordersData, orderId]);

  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(Number(orderId), {
    skip: orderId === undefined, // skip if no order selected yet
  });

  const activeStep = getStepFromStatus(order?.status || "");

  return (
    <div className="mx-auto w-full max-w-7xl rounded-3xl border bg-gradient-to-tr from-[#ffffff80] via-[#ecf3ff90] to-[#ffffff80] p-4 shadow-2xl backdrop-blur-md md:p-10">
      <h2 className="mb-6 text-center text-2xl font-semibold text-primaryBlue md:mb-12 md:text-4xl">
        Track your order here
      </h2>

      {/* Product Cards */}
      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ordersData?.data
          ?.filter((item) => item.order.status !== "canceled") // Exclude canceled orders
          .map((item) => {
            const isActive = item.orderId === orderId;
            return (
              <div
                key={item.id}
                onClick={() => setOrderId(item.orderId)}
                className={`flex cursor-pointer items-center rounded-xl p-4 transition hover:shadow-lg ${
                  isActive
                    ? "bg-blue-100 ring-2 ring-primaryBlue"
                    : "bg-white shadow-md"
                }`}
              >
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-md font-semibold">
                    {item.product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.quantity} {item.product.unit} / {item.product.price}
                  </p>
                </div>
              </div>
            );
          })}
      </div>

      {/* Step Tracker */}
      <div className="overflow-x-auto p-4 pb-6">
        {isLoading ? (
          <div className="flex h-20 items-center justify-center text-primaryBlue">
            Updating step tracker...
          </div>
        ) : isError || !order ? (
          <div className="flex h-20 items-center justify-center text-red-600">
            Failed to load order details.
          </div>
        ) : (
          <div className="flex min-w-[700px] items-center space-x-8 md:min-w-full">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex w-28 flex-shrink-0 flex-col items-center md:w-36"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-4 md:h-14 md:w-14 ${
                    index <= activeStep
                      ? "border-primaryBlue bg-primaryBlue text-white"
                      : "border-gray-300 bg-gray-300 text-gray-500"
                  }`}
                >
                  ✓
                </div>
                <h4
                  className={`mt-2 text-center text-xs font-semibold md:text-sm ${
                    index <= activeStep ? "text-primaryBlue" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </h4>
                <p className="mt-1 text-center text-[10px] text-gray-400 md:text-xs">
                  {step.description}
                </p>

                {/* Line between steps */}
                {index !== steps.length - 1 && (
                  <div
                    className={`absolute right-[-47%] top-7 hidden h-1 md:block ${
                      index < activeStep ? "bg-primaryBlue" : "bg-gray-300"
                    }`}
                    style={{ width: "100px" }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
