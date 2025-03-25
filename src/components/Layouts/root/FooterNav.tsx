"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FaHome,
  FaShoppingBag,
  FaBox,
  FaBlog,
  FaEnvelope,
} from "react-icons/fa";

const FooterNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-[60px] w-full items-center justify-evenly bg-black text-white">
      <Link
        href="/"
        className="flex flex-col items-center transition-all duration-300"
      >
        <FaHome
          size={24}
          className={`${pathname === "/" ? "text-primary" : "text-white"} transition-all duration-300 hover:text-primary`}
        />
      </Link>

      <Link
        href="/shop"
        className="flex flex-col items-center transition-all duration-300"
      >
        <FaShoppingBag
          size={24}
          className={`${pathname === "/shop" ? "text-primary" : "text-white"} transition-all duration-300 hover:text-primary`}
        />
      </Link>

      <Link
        href="/product"
        className="flex flex-col items-center transition-all duration-300"
      >
        <FaBox
          size={24}
          className={`${pathname === "/product" ? "text-primary" : "text-white"} transition-all duration-300 hover:text-primary`}
        />
      </Link>

      <Link
        href="/blogs"
        className="flex flex-col items-center transition-all duration-300"
      >
        <FaBlog
          size={24}
          className={`${pathname === "/blogs" ? "text-primary" : "text-white"} transition-all duration-300 hover:text-primary`}
        />
      </Link>

      <Link
        href="/contact-us"
        className="flex flex-col items-center transition-all duration-300"
      >
        <FaEnvelope
          size={24}
          className={`${pathname === "/contact-us" ? "text-primary" : "text-white"} transition-all duration-300 hover:text-primary`}
        />
      </Link>
    </div>
  );
};

export default FooterNav;
