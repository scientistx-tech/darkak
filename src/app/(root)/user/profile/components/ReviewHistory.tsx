"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import product1 from "@/Data/Demo/product-2-1.png";
import product2 from "@/Data/Demo/product-2-3.png";
import product3 from "@/Data/Demo/product-2-4.png";

export default function ReviewHistory() {
  const [activeTab, setActiveTab] = useState<
    "toReview" | "toFollowUp" | "history"
  >("toReview");

  const toReviewProducts = [
    { id: 1, image: product1, name: "Running Shoes", price: "29.99 TK" },
    { id: 2, image: product2, name: "Handbag", price: "49.99 TK" },
    { id: 3, image: product3, name: "Laptop", price: "49.99 TK" },
    { id: 4, image: product1, name: "Running Shoes", price: "29.99 TK" },
    { id: 5, image: product2, name: "Handbag", price: "49.99 TK" },
    { id: 6, image: product3, name: "Laptop", price: "49.99 TK" },
  ];

  const toFollowUpReviews = [
    {
      id: 1,
      image: product3,
      name: "Camera Lens",
      price: "19.99 TK",
      userReview: "Good but can be better.",
    },
  ];

  const historyReviews = [
    {
      id: 1,
      image: product1,
      name: "Running Shoes",
      price: "29.99 TK",
      userReview: "Amazing quality!",
      rating: 5,
    },
    {
      id: 2,
      image: product2,
      name: "Handbag",
      price: "49.99 TK",
      userReview: "Loved the design.",
      rating: 4,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl rounded-3xl border bg-gradient-to-tr from-[#ffffff80] via-[#ecf3ff90] to-[#ffffff80] p-2 py-4 shadow-2xl backdrop-blur-md md:p-10">
      <h2 className="mb-6 text-center text-2xl font-semibold text-primaryBlue md:mb-12 md:text-4xl">
        My Review
      </h2>

      {/* Tabs */}
      <div className="mb-8 flex justify-center gap-3 md:gap-0 md:space-x-6">
        {["toReview", "toFollowUp", "history"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`rounded-full px-6 py-2 text-sm font-semibold ${
              activeTab === tab
                ? "bg-primaryBlue text-white"
                : "bg-white text-primaryBlue"
            } shadow-md transition`}
          >
            {tab === "toReview"
              ? "To Review"
              : tab === "toFollowUp"
                ? "To Follow-Up"
                : "History"}
          </button>
        ))}
      </div>

      {/* Content based on tab */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {activeTab === "toReview" &&
          toReviewProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-2xl bg-white/80 p-6 text-center shadow-md backdrop-blur-md md:flex-col"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                className="mb-4 rounded-lg object-cover"
              />

              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {product.name}
                </h3>
                <p className="mt-2 font-bold text-primaryBlue">
                  {product.price}
                </p>
              </div>

              <Link
                href="/review"
                // href={`/review?id=${product.id}`}
                className="mt-4 inline-block rounded-full bg-primaryBlue px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Write Review
              </Link>
            </div>
          ))}

        {activeTab === "toFollowUp" &&
          toFollowUpReviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col items-center rounded-2xl bg-white/80 p-6 text-center shadow-md backdrop-blur-md"
            >
              <Image
                src={review.image}
                alt={review.name}
                width={100}
                height={100}
                className="mb-4 rounded-lg object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-700">
                {review.name}
              </h3>
              <p className="mt-2 font-bold text-primaryBlue">{review.price}</p>
              <p className="mt-2 text-sm text-gray-500">
                Your Review: {review.userReview}
              </p>
              <Link
                href={`/review?id=${review.id}&edit=true`}
                className="mt-4 inline-block rounded-full bg-yellow-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600"
              >
                Edit Review
              </Link>
            </div>
          ))}

        {activeTab === "history" &&
          historyReviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col items-center rounded-2xl bg-white/80 p-6 text-center shadow-md backdrop-blur-md"
            >
              <Image
                src={review.image}
                alt={review.name}
                width={100}
                height={100}
                className="mb-4 rounded-lg object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-700">
                {review.name}
              </h3>
              <p className="mt-2 font-bold text-primaryBlue">{review.price}</p>
              <div className="mt-2 flex items-center">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <span key={idx} className="text-lg text-yellow-400">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - review.rating }).map((_, idx) => (
                  <span key={idx} className="text-lg text-gray-300">
                    ★
                  </span>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">{review.userReview}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
