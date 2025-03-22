"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DownOutlined,
  UpOutlined,
  SearchOutlined,
  HeartOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import Bangla from "@/Data/Img/BanglaLag.svg";
import English from "@/Data/Img/EnglishLag.svg";
import Logo from "@/Data/Img/Logo.svg";
import NavLink from "@/components/shared/NavLink";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [selectedLang, setSelectedLang] = useState("English");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    setIsDropdownOpen(false);
  };

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY + 15) {
        setShow(false);
      } else if (currentScrollY < lastScrollY - 15) {
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="w-full">


      <motion.div
        animate={{ y: show ? 0 : -120 }}
        transition={
          show
            ? { type: "spring", stiffness: 120, damping: 30 }
            : { type: "spring", stiffness: 50 }
        }
        className={`fixed top-0 z-50 w-full`}
      >
        {/* Top-Box */}
        {lastScrollY < 45 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 40 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mx-auto grid grid-cols-3 h-[40px] w-full items-center  bg-secondary px-4 text-white lg:px-6">
            <p>Get Ready For Summer Offers</p>
            <p className="text-center">Use code 2025 and get 10% Off</p>

            <div
              className="relative flex cursor-pointer items-center justify-end gap-2"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Image
                alt=""
                src={selectedLang === "Bangla" ? Bangla : English}
                width={20}
                height={20}
              />
              <p className="uppercase">{selectedLang}</p>
              {isDropdownOpen ? <UpOutlined /> : <DownOutlined />}

              {isDropdownOpen && (
                <div className="absolute top-0 z-30 w-[100px]  bg-transparent py-2 text-black transition-opacity duration-300 ease-in-out">
                  <div className="mt-6 bg-white shadow-lg">
                    <p
                      className="px-4 py-1 uppercase hover:bg-gray-200"
                      onClick={() => handleLanguageChange("English")}
                    >
                      English
                    </p>
                    <p
                      className="px-4 py-1 uppercase hover:bg-gray-200"
                      onClick={() => handleLanguageChange("Bangla")}
                    >
                      Bangla
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
        {/* Header-Box */}
        <div className="mx-auto flex h-[80px] w-full items-center justify-between bg-primary px-4 text-secondary lg:px-6">
          <Link href="/">
            <Image alt="logo" src={Logo} className="h-[60px] w-[60px]" />
          </Link>

          <div>
            <input
              className="w-[350px] p-1.5 pl-4 pr-3 outline-none rounded-tl-md rounded-bl-md"
              placeholder="Search.."
            />

            <button className="bg-secondary p-1.5 pl-5 pr-5 text-white rounded-tr-md rounded-br-md">
              <SearchOutlined className="text-xl" />
            </button>
          </div>

          <div className="flex">
            <Link href="" className="mr-4 text-xl hover:text-white md:text-2xl">
              <UserOutlined />
            </Link>

            <Link
              href=""
              className="group mr-4 text-xl hover:text-white md:text-2xl"
            >
              <HeartOutlined />
              <div className="absolute ml-[15px] mt-[-33px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-black text-white group-hover:bg-white group-hover:text-black">
                <p className="text-[10px] font-semibold">12</p>
              </div>
            </Link>

            <Link
              href=""
              className="group text-xl hover:text-white md:text-2xl"
            >
              <ShoppingCartOutlined />
              <div className="absolute ml-[15px] mt-[-33px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-black text-white group-hover:bg-white group-hover:text-black">
                <p className="text-[10px] font-semibold">6</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Nav-Bar */}
        <div className="flex bg-white h-[40px] w-full items-center justify-evenly border border-b">
          <NavLink
            href="/"
            className="font-serif text-lg uppercase hover:text-secondary"

          >
            Home
          </NavLink>

          <NavLink
            href="/shop"
            className={`font-serif text-lg uppercase hover:text-secondary`}
          >
            Shop
          </NavLink>

          <NavLink
            href="/product"
            className={`font-serif text-lg uppercase hover:text-secondary`}
          >
            Product
          </NavLink>

          <NavLink
            href="/blogs"
            className={`font-serif text-lg uppercase hover:text-secondary`}
          >
            Blogs
          </NavLink>

          <NavLink
            href="/contact-us"
            className={`font-serif text-lg uppercase hover:text-secondary`}
          >
            Contact Us
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
