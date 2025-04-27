import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

import product1 from "@/Data/Demo/product-2-1.png";
import product2 from "@/Data/Demo/product-2-3.png";
import product3 from "@/Data/Demo/product-2-4.png";

export default function MyReview() {
  return (
    <div className="w-full">
      <h2 className="text-xl font-medium text-primaryBlue md:text-2xl">
        My Review
      </h2>
      <div className="mt-5 md:mt-8">
        <button className="flex w-full items-center justify-between rounded-md border bg-white p-4 shadow-md xl:w-[80%]">
          <Image
            src={product1}
            height={80}
            width={80}
            alt="Review Image"
            className="rounded"
          />

          <div className="w-[70%]">
            <div className="flex gap-2">
              <FaStar className="text-yellow-400"/>
              <FaStar className="text-yellow-400"/>
              <FaStar className="text-yellow-400"/>
              <FaStar className="text-yellow-400"/>
              <FaStar />

            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
