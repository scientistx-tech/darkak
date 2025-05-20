"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavLink from "@/components/shared/NavLink";
import { FaAngleDown } from "react-icons/fa";

import img1 from "@/Data/Demo/product-2-1.png";
import img2 from "@/Data/Demo/product-2-3.png";
import img3 from "@/Data/Demo/product-2-4.png";
import img4 from "@/Data/Demo/menu-product-img-1.jpg";

export default function HeaderDropdown() {
  const [hoveredMain, setHoveredMain] = useState<string | null>(null);
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    {
      name: "Main Categories 1",
      img: img1,
      sub: [
        {
          name: "Sub Category 1",
          img: img2,
          sub: [
            { name: "Sub Sub Category 1", img: img3, href: "#" },
            { name: "Sub Sub Category 2", img: img4, href: "#" },
            { name: "Sub Sub Category 3", img: img3, href: "#" },
            { name: "Sub Sub Category 4", img: img2, href: "#" },
          ],
        },
        {
          name: "Sub Category 2",
          img: img2,
          sub: [
            { name: "Sub Sub Category 2", img: img4, href: "#" },
            { name: "Sub Sub Category 3", img: img3, href: "#" },
          ],
        },
      ],
    },
    {
      name: "Main Categories 2",
      img: img4,
      sub: [
        {
          name: "Sub Category 3",
          img: img2,
          sub: [
            { name: "Sub Sub Category 7", img: img3, href: "#" },
            { name: "Sub Sub Category 8", img: img4, href: "#" },
            { name: "Sub Sub Category 9", img: img3, href: "#" },
            { name: "Sub Sub Category 10", img: img2, href: "#" },
          ],
        },
      ],
    },

    {
      name: "Main Categories 3",
      img: img3,
      sub: [
        {
          name: "Sub Category 4",
          img: img2,
          sub: [],
        },
        {
          name: "Sub Category 5",
          img: img2,
          sub: [
            { name: "Sub Sub Category 11", img: img3, href: "#" },
            { name: "Sub Sub Category 12", img: img4, href: "#" },
            { name: "Sub Sub Category 13", img: img3, href: "#" },
            { name: "Sub Sub Category 14", img: img2, href: "#" },
          ],
        },
      ],
    },
  ];

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
        href="/category"
        className="group flex cursor-pointer items-center gap-2 font-serif text-lg hover:text-primary"
      >
        Category
        <FaAngleDown
          className={`text-white transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </NavLink>

      {isDropdownOpen && (
        <div className="absolute left-0 top-full z-50">
          <div className="mt-4 flex w-[900px] rounded-lg bg-white p-6 pt-4 shadow-2xl">
            {/* Main Categories */}
            <div className="w-1/3 border-r pr-4">
              <p className="mb-3 text-lg text-black opacity-60">
                Main Categories
              </p>
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  onMouseEnter={() => {
                    setHoveredMain(cat.name);
                    setHoveredSub(null);
                  }}
                  className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-black hover:bg-gray-100 ${
                    hoveredMain === cat.name ? "bg-gray-100" : ""
                  }`}
                >
                  <Image src={cat.img} alt={cat.name} width={32} height={32} />
                  <span className="text-sm">{cat.name}</span>
                </div>
              ))}
            </div>

            {/* Sub Categories */}
            <div className="w-1/3 border-r pl-4 pr-4">
              <p className="mb-3 text-lg text-black opacity-60">
                Sub Categories
              </p>
              {hoveredMain &&
                categories
                  .find((c) => c.name === hoveredMain)
                  ?.sub.map((sub) => (
                    <div
                      key={sub.name}
                      onMouseEnter={() => setHoveredSub(sub.name)}
                      className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-black hover:bg-gray-100 ${
                        hoveredSub === sub.name ? "bg-gray-100" : ""
                      }`}
                    >
                      <Image
                        src={sub.img}
                        alt={sub.name}
                        width={28}
                        height={28}
                      />
                      <span className="text-sm">{sub.name}</span>
                    </div>
                  ))}
            </div>

            {/* Sub-Sub Categories */}
            <div className="w-1/3 pl-4 pr-4">
              <p className="mb-3 text-lg text-black opacity-60">
                Sub Sub Categories
              </p>
              {hoveredMain &&
                hoveredSub &&
                categories
                  .find((c) => c.name === hoveredMain)
                  ?.sub.find((s) => s.name === hoveredSub)
                  ?.sub.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-black hover:bg-gray-100"
                    >
                      <Image
                        src={item.img}
                        alt={item.name}
                        width={28}
                        height={28}
                      />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
