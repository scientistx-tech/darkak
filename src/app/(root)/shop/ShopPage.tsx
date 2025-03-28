"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PlusOutlined, MinusOutlined, SendOutlined } from "@ant-design/icons";

import img from "@/Data/Img/Rectangle 129.png";
import icon1 from "@/Data/Icon/dress.png";
import icon2 from "@/Data/Icon/fashion-accessories.png";
import icon3 from "@/Data/Icon/drill.png";
import icon4 from "@/Data/Icon/grocery-cart.png";
import icon5 from "@/Data/Icon/gadgets.png";

export default function ShopPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const pageTitles = [
    "New Arrivals",
    "Accessories",
    "Baby Fashion",
    "Women's Fashion",
    "Men's Fashion",
    "Summer Styles",
    "Winter Fashion",
    "Footwear",
    "Featured Product",
  ];

  return (
    <div className="relative w-full">
      {/* Banner Image */}
      <Image
        alt="img"
        src={img}
        className="h-[300px] w-full rounded opacity-60"
      />

      {/* Category Buttons (Floating on Banner) */}
      <div className="absolute z-10 mt-[-300px] flex h-[300px] w-full items-center justify-evenly">
        {[
          { icon: icon1, label: "Clothing" },
          { icon: icon2, label: "Accessories" },
          { icon: icon5, label: "Electronics" },
          { icon: icon4, label: "Groceries" },
          { icon: icon3, label: "Materials" },
        ].map((item, index) => (
          <button
            key={index}
            className="flex h-[100px] w-[100px] flex-col items-center justify-center rounded-xl border-[2px] border-primary bg-gradient-to-br from-primary to-white hover:border-secondary transition-all duration-300"
          >
            <Image alt="icon" src={item.icon} className="h-[60px] w-[60px]" />
            <p className="mt-0 font-semibold text-secondary">{item.label}</p>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="mt-10 flex w-full">
        {/* Left-Side (Product Categories) */}
        <div className="w-[25%] p-5">
          <div className="w-full bg-slate-200 rounded-lg shadow-md">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex justify-between p-3 text-xl font-medium text-secondary bg-gray-100 hover:bg-gray-300 transition-all duration-200"
            >
              <p>Product Categories</p>
              {isOpen ? <MinusOutlined /> : <PlusOutlined />}
            </button>

            {/* Animated Category List */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[500px] opacity-100 p-4" : "max-h-0 opacity-0 p-0"
              } bg-white border-t border-gray-300`}
            >
              {pageTitles.map((title, index) => (
                <button
                  key={index}
                  className={`tablet:h-[50px] btn group relative mt-3 inline-flex h-[40px] w-full border-2 items-center justify-start overflow-hidden rounded bg-white transition-all hover:bg-blue-600 ${
                    page === index + 1 ? "bg-blue-600 text-white" : ""
                  }`}
                  onClick={() => setPage(index + 1)}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-0 rounded bg-blue-600 transition-all duration-500 ease-out group-hover:w-full`}
                  ></span>
                  <span className="z-10 flex w-full px-3 transition-colors duration-300 ease-in-out text-black group-hover:text-white">
                    <SendOutlined className="mr-2" />
                    <p className="font-semibold">{title}</p>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right-Side Content */}
        <div className="ml-[5%] w-[70%] bg-slate-300 p-5">
          <h2 className="text-2xl font-bold">{pageTitles[page - 1]}</h2>
          <p className="mt-2 text-gray-700">Page {page} content goes here...</p>
        </div>
      </div>
    </div>
  );
}
