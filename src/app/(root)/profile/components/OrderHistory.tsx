"use client";

import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";

import product1 from "@/Data/Demo/product-2-1.png";
import product2 from "@/Data/Demo/product-2-3.png";
import product3 from "@/Data/Demo/product-2-4.png";

export default function OrderHistory() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      image: product1,
      name: "Product 1",
      price: "2922.99 TK",
      orderDate: "April 1, 2024",
      deliveryStatus: "Delivered",
    },
    {
      id: 2,
      image: product2,
      name: "Product 2",
      price: "4922.99 TK",
      orderDate: "Mar 28, 2024",
      deliveryStatus: "Shipped",
    },
    {
      id: 3,
      image: product3,
      name: "Product 3",
      price: "1922.99 TK",
      orderDate: "April 10, 2024",
      deliveryStatus: "Pending",
    },
  ]);

  const handleDelete = (id: number) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-3xl border bg-gradient-to-tr from-[#ffffff80] via-[#ecf3ff90] to-[#ffffff80] p-2 shadow-2xl backdrop-blur-md md:p-10">
      <h2 className="mb-6 md:mb-12 text-center text-2xl md:text-4xl font-semibold text-primaryBlue">
        Order History
      </h2>

      {/* Table Head */}
      <div className="grid grid-cols-4 px-2 pb-4 text-gray-600 md:px-6 md:font-semibold">
        <div>Product</div>
        <div>Price</div>
        <div>Order Date</div>
        <div>Delivery Status</div>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-4 items-center rounded-2xl bg-white/60 p-2 shadow-md backdrop-blur-md md:p-4"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={order.image}
                alt={order.name}
                width={50}
                height={50}
                className="rounded-lg object-cover"
              />
              <span className="hidden font-medium md:block">{order.name}</span>
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-black md:hidden">
                {order.name}
              </div>
              <div className="font-medium text-gray-700">{order.price}</div>
            </div>
            <div className="text-gray-500">{order.orderDate}</div>

            <div className="flex items-center space-x-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  order.deliveryStatus === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : order.deliveryStatus === "Shipped"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-red-100 text-red-600"
                }`}
              >
                {order.deliveryStatus}
              </span>

              <button
                onClick={() => handleDelete(order.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <FaTrash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
