"use client";

import React, { useState } from "react";
import Image from "next/image";

import product1 from "@/Data/Demo/product-2-1.png";
import product2 from "@/Data/Demo/product-2-3.png";

export default function TrackOrder() {
  const [activeStep, setActiveStep] = useState(2); // Change this to simulate current step

  const steps = [
    {
      title: "Order placed",
      description: "Your order has been placed for delivery",
    },
    {
      title: "Order confirmed",
      description: "Your order has been placed for delivery",
    },
    {
      title: "Processed",
      description: "Your order has been placed for delivery",
    },
    {
      title: "Given to delivery man",
      description: "Your order has been placed for delivery",
    },
    {
      title: "On the way",
      description: "Your order has been placed for delivery",
    },
    {
      title: "Delivered",
      description: "Your order has been placed for delivery",
    },
  ];

  const products = [
    {
      id: 1,
      name: "IQOO Neo 9 Pro",
      quantity: 1,
      price: "40000 TK",
      image: product1,
    },
    {
      id: 2,
      name: "IQOO Neo 9 Pro",
      quantity: 1,
      price: "40000 TK",
      image: product2,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl rounded-3xl border bg-gradient-to-tr from-[#ffffff80] via-[#ecf3ff90] to-[#ffffff80] p-4 shadow-2xl backdrop-blur-md md:p-10">
      <h2 className="mb-6 text-center text-2xl font-semibold text-primaryBlue md:mb-12 md:text-4xl">
        Track your order here
      </h2>

      {/* Product Cards */}
      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
            <div className="ml-4">
              <h3 className="text-md font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">
                {product.quantity} pc / {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Step Tracker */}
      <div className="overflow-x-auto p-4 pb-6">
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
                  className={`absolute right-[-50%] top-5 hidden h-1 md:block ${
                    index < activeStep ? "bg-primaryBlue" : "bg-gray-300"
                  }`}
                  style={{ width: "100px" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
