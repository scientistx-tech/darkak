"use client";
import React, { useState } from "react";
import Link from "next/link";
import NavLink from "@/components/shared/NavLink";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

// Dummy category data
const categories = [
  {
    name: "Category1",
    href: "/category1",
    subcategories: [
      { name: "Subcat 1.1", href: "/category1/subcat1" },
      { name: "Subcat 1.2", href: "/category1/subcat2" },
    ],
  },
  {
    name: "Category2",
    href: "/category2",
    subcategories: [
      { name: "Subcat 2.1", href: "/category2/subcat1" },
      { name: "Subcat 2.2", href: "/category2/subcat2" },
    ],
  },
  {
    name: "Category3",
    href: "/category3",
    subcategories: [
      { name: "Subcat 3.1", href: "/category3/subcat1" },
      { name: "Subcat 3.2", href: "/category3/subcat2" },
    ],
  },
  {
    name: "Category4",
    href: "/category4",
    subcategories: [
      { name: "Subcat 4.1", href: "/category4/subcat1" },
      { name: "Subcat 4.2", href: "/category4/subcat2" },
    ],
  },
  {
    name: "Category5",
    href: "/category5",
    subcategories: [
      { name: "Subcat 5.1", href: "/category5/subcat1" },
      { name: "Subcat 5.2", href: "/category5/subcat2" },
    ],
  },
];

export default function Test() {
  const [hoveredMain, setHoveredMain] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => {
        setIsDropdownOpen(false);
        setHoveredMain(null);
      }}
    >
      {/* Top Level Link */}
      <NavLink
        href="#"
        className="group flex cursor-pointer items-center gap-2 font-serif text-lg text-secondaryWhite transition-colors duration-300 hover:text-secondaryBlue"
      >
        Category
        <FaAngleDown
          className={`transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </NavLink>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute left-[-30px] top-full z-50 mt-4 flex gap-4">
          {/* Main Categories */}
          <div className="flex flex-col rounded bg-primaryBlue p-4 shadow-lg min-w-[200px] text-white">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="flex justify-between items-center py-2 px-3 hover:bg-secondaryBlue cursor-pointer"
                onMouseEnter={() => setHoveredMain(cat.name)}
              >
                <Link href={cat.href}>{cat.name}</Link>
                <FaAngleRight />
              </div>
            ))}
          </div>

          {/* Subcategories */}
          {hoveredMain && (
            <div className="flex flex-col rounded bg-secondaryBlue p-4 shadow-lg min-w-[200px] text-white">
              {categories
                .find((cat) => cat.name === hoveredMain)
                ?.subcategories.map((sub) => (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    className="py-2 px-3 hover:bg-primaryBlue rounded"
                  >
                    {sub.name}
                  </Link>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
