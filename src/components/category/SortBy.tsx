"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export interface SortItem {
  value: string;
  name: string;
}

export const sortingItems: SortItem[] = [
  {
    value: "newer",
    name: "Newer",
  },
  {
    value: "popular",
    name: "Popular",
  },
  {
    value: "older",
    name: "Older",
  },
  {
    value: "low-to-high",
    name: "Low to High Price",
  },
  {
    value: "high-to-low",
    name: "High to Low Price",
  },
];

const SortBy = ({ setSortBy }: { setSortBy: (value: string) => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sortingItem, setSortingItem] = useState<string>("Newer");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSort = (name: string, value: string) => {
    setSortingItem(name);
    setIsOpen(false);
    setSortBy(value);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="mt-10 flex items-center justify-between px-3 py-4 md:px-6 lg:px-[64px]">
      <div>
        {/* <p className="text-sm font-semibold text-white md:text-xl lg:text-3xl">
          Phone & accessories
        </p> */}
      </div>
      <div className="flex items-center gap-x-2 text-black md:gap-x-4 lg:gap-x-6">
        <p className="text-sm font-semibold md:text-xl lg:text-3xl">Sort By</p>
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown();
            }}
            className="inline-flex items-center rounded-full bg-white px-2 py-1 text-center text-xs font-medium text-[#003084] md:px-4 md:py-2 lg:px-8 lg:py-3 lg:text-base"
            type="button"
          >
            {sortingItem}
            <IoIosArrowDown
              height={5}
              width={5}
              className={`ml-2 text-[#003084] ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 w-32 divide-y divide-gray-100 rounded-lg bg-white shadow-sm lg:w-44">
              <ul className="py-2 text-xs text-[#003084] md:text-base">
                {sortingItems.map((item) => (
                  <li
                    key={item.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSort(item.name, item.value);
                    }}
                    className="block cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortBy;
