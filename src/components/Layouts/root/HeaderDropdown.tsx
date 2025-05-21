"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavLink from "@/components/shared/NavLink";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { useGetProductCategoriesQuery } from "@/redux/services/client/categories";

import img1 from "@/Data/Demo/product-2-1.png";
import img2 from "@/Data/Demo/product-2-3.png";
import img3 from "@/Data/Demo/product-2-4.png";

const shimmer = "animate-pulse bg-secondaryLiteBlue rounded-md h-6 mb-2";

export default function Test() {
  const [hoveredMain, setHoveredMain] = useState<string | null>(null);
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [subCategoryTop, setSubCategoryTop] = useState<number>(0);
  const mainRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const {
    data: categories,
    isLoading,
    error,
  } = useGetProductCategoriesQuery("");

  const handleMainHover = (catName: string) => {
    setHoveredMain(catName);
    setHoveredSub(null);

    const mainItem = mainRefs.current[catName];
    if (mainItem) {
      const { top } = mainItem.getBoundingClientRect();
      const containerTop =
        mainItem.offsetParent?.getBoundingClientRect().top || 0;
      setSubCategoryTop(top - containerTop);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => {
        setIsDropdownOpen(false);
        setHoveredMain(null);
        setHoveredSub(null);
      }}
    >
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

      {isDropdownOpen && (
        <div className="absolute left-[-50px] top-full z-50 flex bg-transparent">
          {/* Main Categories */}
          <div className="mt-4 flex min-w-[200px] flex-col rounded bg-primaryBlue p-4 text-white shadow-lg">
            {isLoading ? (
              [...Array(5)].map((_, i) => <div key={i} className={shimmer} />)
            ) : error ? (
              <p className="text-sm text-red-500">Failed to load.</p>
            ) : (
              categories?.map((cat) => (
                <div
                  key={cat.title}
                  ref={(el) => {
                    mainRefs.current[cat.title] = el;
                  }}
                  onMouseEnter={() => handleMainHover(cat.title)}
                  className={`flex cursor-pointer items-center justify-between px-3 py-2 transition-all duration-200 ${
                    hoveredMain === cat.title
                      ? "bg-secondaryBlue"
                      : "hover:bg-secondaryBlue"
                  }`}
                >
                  <Link href="/" className="w-full flex items-center gap-2">
                    <Image
                      src={cat.icon}
                      alt={cat.title}
                      width={28}
                      height={28}
                      className="rounded-md"
                    />
                    {cat.title}
                  </Link>
                  <FaAngleRight />
                </div>
              ))
            )}
          </div>

          {/* Subcategories */}
          {hoveredMain && (
            <div
              className="absolute left-[200px] z-50 min-w-[200px] rounded bg-primaryBlue p-4 text-white shadow-lg"
              style={{ top: subCategoryTop }}
            >
              {isLoading
                ? [...Array(4)].map((_, i) => (
                    <div key={i} className={shimmer} />
                  ))
                : hoveredMain &&
                  categories
                    ?.find((c) => c.title === hoveredMain)
                    ?.sub_category.map((sub) => (
                      <div
                        key={sub.title}
                        onMouseEnter={() => {
                          if (sub.sub_sub_category) setHoveredSub(sub.title);
                          else setHoveredSub(null);
                        }}
                        className={`flex cursor-pointer items-center justify-between px-3 py-2 transition-all duration-200 hover:bg-secondaryBlue ${
                          hoveredSub === sub.title
                            ? "bg-secondaryBlue"
                            : "hover:bg-secondaryBlue"
                        }`}
                      >
                        <Link href="/" className="w-full">
                          {sub.title}
                        </Link>
                        {sub.sub_sub_category && <FaAngleRight />}
                      </div>
                    ))}
            </div>
          )}

          {/* Sub-subcategories */}
          {hoveredMain && hoveredSub && (
            <div
              className="absolute left-[400px] z-50 min-w-[200px] rounded bg-primaryBlue p-4 text-white shadow-lg"
              style={{ top: subCategoryTop }}
            >
              {isLoading
                ? [...Array(3)].map((_, i) => (
                    <div key={i} className={shimmer} />
                  ))
                : hoveredMain &&
                  hoveredSub &&
                  categories
                    ?.find((c) => c.title === hoveredMain)
                    ?.sub_category.find((s) => s.title === hoveredSub)
                    ?.sub_sub_category.map((item) => (
                      <Link
                        key={item.title}
                        href="/"
                        className="block rounded px-3 py-2 transition-all duration-200 hover:bg-secondaryBlue"
                      >
                        {item.title}
                      </Link>
                    ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
