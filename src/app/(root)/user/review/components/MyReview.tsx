"use client";

import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

import product1 from "@/Data/Demo/product-2-1.png";
import product2 from "@/Data/Demo/product-2-3.png";
import product3 from "@/Data/Demo/product-2-4.png";

const reviews = [
  {
    id: 1,
    image: product1,
    name: "Product One",
    date: "4/24/2025",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 5,
  },
  {
    id: 2,
    image: product2,
    name: "Product Two",
    date: "4/20/2025",
    description:
      "It has been the industry's standard dummy text ever since the 1500s.",
    rating: 4,
  },
  {
    id: 3,
    image: product3,
    name: "Product Three",
    date: "4/18/2025",
    description:
      "An unknown printer took a galley of type and scrambled it to make a type specimen book.",
    rating: 2,
  },
];

export default function MyReview() {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-primaryBlue md:text-2xl">
        My Review
      </h2>

      <div className="mt-6 flex flex-col gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex w-full items-center justify-between rounded-xl border bg-white p-4 shadow-lg hover:shadow-xl transition xl:w-[80%]"
          >
            <Image
              src={review.image}
              height={80}
              width={80}
              alt="Review Image"
              className="rounded-lg"
            />

            <div className="w-[70%] px-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={`${
                        index < review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {review.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">{review.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
