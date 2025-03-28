"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Slider } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import img from "@/Data/Img/Rectangle 129.png";
import icon1 from "@/Data/Icon/dress.png";
import icon2 from "@/Data/Icon/fashion-accessories.png";
import icon3 from "@/Data/Icon/drill.png";
import icon4 from "@/Data/Icon/grocery-cart.png";
import icon5 from "@/Data/Icon/gadgets.png";

export default function ShopPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [page, setPage] = useState(1);

  const [availability, setAvailability] = useState({
    inStock: true,
    outOfStock: false,
  });

  const handleCheckboxChange = (type: "inStock" | "outOfStock") => {
    setAvailability((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const pageTitles = [
    "Categories - 1",
    "Categories - 2",
    "Categories - 3",
    "Categories - 4",
    "Categories - 5",
    "Categories - 6",
    "Categories - 7",
    "Categories - 8",
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
            className="flex h-[100px] w-[100px] flex-col items-center justify-center rounded-xl border-[2px] border-primary bg-gradient-to-br from-primary to-white transition-all duration-300 hover:border-secondary"
          >
            <Image alt="icon" src={item.icon} className="h-[60px] w-[60px]" />
            <p className="mt-0 font-semibold text-secondary">{item.label}</p>
          </button>
        ))}
      </div>

      <div className="mt-10 flex w-full">
        {/* Left-Side */}
        <div className="w-[25%] p-5">
          {/* Categories */}
          <div className="w-full bg-white shadow-md">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full justify-between rounded p-3 text-xl font-medium text-secondary transition-all duration-200 hover:bg-gray-200"
            >
              <p>Product Categories</p>
              {isOpen ? <MinusOutlined /> : <PlusOutlined />}
            </button>

            <div
              className={`overflow-hidden rounded transition-all duration-500 ease-in-out ${
                isOpen ? "opacity-100" : "max-h-0 p-0 opacity-0"
              } `}
            >
              <div className="mb-2 h-0.5 w-full bg-primary" />
              {pageTitles.map((title, index) => (
                <button
                  onClick={() => setPage(index + 1)}
                  key={index}
                  className="group relative mb-1 mt-2 inline-flex w-full items-center justify-start overflow-hidden bg-gray-50 py-2 pl-4 font-semibold text-secondary transition-all duration-150 ease-in-out hover:pl-10 hover:pr-6"
                >
                  <span className="absolute bottom-0 left-0 h-1 w-full bg-secondary transition-all duration-150 ease-in-out group-hover:h-full"></span>
                  <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                    <ArrowRightOutlined className="h-5 w-5 text-green-400" />
                  </span>
                  <span className="absolute left-0 -translate-x-12 pl-2.5 duration-200 ease-out group-hover:translate-x-0">
                    <ArrowRightOutlined className="h-5 w-5 text-green-400" />
                  </span>
                  <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                    {title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mt-5 w-full rounded bg-white shadow-md">
            <button
              onClick={() => setIsOpen2(!isOpen2)}
              className="flex w-full justify-between rounded p-3 text-xl font-medium text-secondary transition-all duration-200 hover:bg-gray-200"
            >
              <p>Availability</p>
              {isOpen2 ? <MinusOutlined /> : <PlusOutlined />}
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen2 ? "opacity-100" : "max-h-0 p-0 opacity-0"
              }`}
            >
              <div className="mb-2 h-0.5 w-full bg-primary" />

              <div className="lex w-full flex-col p-3 text-xl">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer accent-primary"
                    checked={availability.inStock}
                    onChange={() => handleCheckboxChange("inStock")}
                  />
                  <span>In Stock</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer accent-primary"
                    checked={availability.outOfStock}
                    onChange={() => handleCheckboxChange("outOfStock")}
                  />
                  <span>Out of Stock</span>
                </label>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mt-5 w-full rounded bg-white shadow-md">
            <button
              onClick={() => setIsOpen3(!isOpen3)}
              className="flex w-full justify-between rounded p-3 text-xl font-medium text-secondary transition-all duration-200 hover:bg-gray-200"
            >
              <p>Price</p>
              {isOpen3 ? <MinusOutlined /> : <PlusOutlined />}
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen3 ? "opacity-100" : "max-h-0 p-0 opacity-0"
              }`}
            >
              <div className="mb-2 h-0.5 w-full bg-primary" />

              <div className="flex w-full flex-col p-3">
                <Slider
                  range
                  min={0}
                  max={2000}
                  value={priceRange}
                  onChange={(value) => setPriceRange(value as [number, number])}
                  trackStyle={[{ backgroundColor: "black" }]}
                  handleStyle={[
                    { backgroundColor: "#333", borderColor: "#333" },
                    { backgroundColor: "#333", borderColor: "#333" },
                  ]}
                />
                <p className="mt-3 text-center text-lg font-medium">
                  BDT {priceRange[0]} - BDT {priceRange[1]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right-Side */}
        <div className="ml-[5%] w-[70%] rounded bg-white p-5">
          {/* Right-Header */}
          <div className="flex h-[50px] w-full items-center justify-between rounded-md bg-primary text-xl font-medium text-secondary">
            <p className="pl-[2.5%]">{pageTitles[page - 1]}</p>

            <div className="mr-[2.5%] flex items-center gap-2">
              <p>Sort By:</p>
              <select className="rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="default">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="h-[1000px]">kjkjk</div>
        </div>
      </div>
    </div>
  );
}
