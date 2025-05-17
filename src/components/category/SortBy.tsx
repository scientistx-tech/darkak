"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export interface SortItem {
  id: number;
  name: string;
}

export const sortingItems: SortItem[] = [
  {
    id: 1,
    name: "Alphabet",
  },
  {
    id: 2,
    name: "Price",
  },
];

const SortBy = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sortingItem, setSortingItem] = useState<string>("Alphabet");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSort = (name: string) => {
    setSortingItem(name);
    setIsOpen(false);
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
    <div className="mt-10 md:mt-16 lg:mt-[77px] flex items-center justify-between bg-[#5694FF] px-3 md:px-6 lg:px-[64px] py-4">
      <div>
        <p className="text-sm md:text-xl lg:text-3xl font-semibold text-white">Phone & accessories</p>
      </div>
      <div className="flex items-center gap-x-2 md:gap-x-4 lg:gap-x-6 text-white">
        <p className="text-sm md:text-xl lg:text-3xl font-semibold">Sort By</p>
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown();
            }}
            className="inline-flex items-center rounded-full bg-white px-2 md:px-4 lg:px-8 py-1 md:py-2 lg:py-3 text-center text-xs lg:text-base font-medium text-[#003084]"
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
            <div className="absolute right-0 mt-2 w-32 lg:w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm z-50">
              <ul className="py-2 text-xs md:text-base text-[#003084]">
                {sortingItems.map((item) => (
                  <li
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSort(item.name);
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
