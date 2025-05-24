"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Price = ({
  onPriceChange,
}: {
  onPriceChange?: (range: { lowPrice: string; highPrice: string }) => void;
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");

  const handleOpenClose = () => {
    setOpen((pre) => !pre);
  };

  // Notify parent on price change
  React.useEffect(() => {
    if (typeof onPriceChange === "function") {
      onPriceChange({ lowPrice, highPrice });
    }
  }, [lowPrice, highPrice, onPriceChange]);

  return (
    <div
      className={`rounded-md bg-blue-100 px-4 ${open ? "pb-8" : "pb-2"} pt-4 shadow-md`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#003084]">Price Range</h2>
        <button
          onClick={handleOpenClose}
          className="flex size-[30px] items-center justify-center rounded-full bg-[#003084]"
        >
          <IoIosArrowDown
            size={20}
            color="white"
            className={`${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {open && (
        <div className={`space-y-2`}>
          <div className="flex items-center justify-between">
            <label className="mb-1 text-sm font-semibold text-[#003084]">
              From
            </label>
            <input
              type="number"
              placeholder="00"
              value={lowPrice}
              onChange={(e) => setLowPrice(e.target.value)}
              className="rounded-full border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="mb-1 text-sm font-semibold text-[#003084]">
              To
            </label>
            <input
              type="number"
              placeholder="00"
              value={highPrice}
              onChange={(e) => setHighPrice(e.target.value)}
              className="rounded-full border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Price;
