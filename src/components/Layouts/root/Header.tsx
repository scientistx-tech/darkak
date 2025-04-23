"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Drawer, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "@/components/shared/NavLink";
import {
  MenuOutlined,
  CloseOutlined,
  DownOutlined,
  UpOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { motion } from "framer-motion";
import Bangla from "@/Data/Img/BanglaLag.svg";
import English from "@/Data/Img/EnglishLag.svg";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [selectedLang, setSelectedLang] = useState("English");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    setIsDropdownOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  //  For Drawer
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full">
      <motion.div
        animate={{ y: show ? 0 : -130 }}
        transition={
          show
            ? { type: "spring", stiffness: 130, damping: 30 }
            : { type: "spring", stiffness: 50 }
        }
        className="fixed top-0 z-50 w-full"
      >
        {/* Top Bar */}
        {lastScrollY < 45 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 40 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mx-auto hidden w-full grid-cols-3 items-center overflow-visible bg-[#5694FF] px-4 text-white md:grid md:px-6"
          >
            <p>Get Ready For Summer Offers</p>
            <p className="text-center">Use code 2025 and get 10% Off</p>

            {/* DropDown-menu */}
            <div className="flex w-full items-center justify-end">
              <div
                className="relative flex cursor-pointer justify-end gap-2"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                ref={dropdownRef}
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
                  <div className="absolute top-0 z-30 mt-4 w-[100px] bg-transparent py-2 text-black transition-opacity duration-300 ease-in-out">
                    <div className="h-[8px] w-full bg-transparent" />
                    <div className="bg-white shadow-lg">
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
            </div>
          </motion.div>
        )}

        {/* Main Header */}
        <div className="mx-auto flex h-[65px] w-full items-center justify-between bg-[#E6EFFF] px-4 text-secondary md:h-[70px] md:px-6">
          <Link href="/" className="">
            <p className="font-serif text-2xl font-semibold text-primary md:text-3xl">
              Darkak
            </p>
          </Link>

          <div className="hidden grid-flow-col gap-8 md:grid">
            <NavLink href="/" className="font-serif text-lg hover:text-primary">
              Home
            </NavLink>

            <NavLink
              href="/shop"
              className={`font-serif text-lg hover:text-primary`}
            >
              Shop
            </NavLink>

            <NavLink
              href="/category"
              className={`font-serif text-lg hover:text-primary`}
            >
              Category
            </NavLink>

            <NavLink
              href="/contact-us"
              className={`font-serif text-lg hover:text-primary`}
            >
              Contact Us
            </NavLink>
          </div>

          <div className="hidden w-[30%] justify-center rounded-full bg-white md:flex">
            <input
              className="w-[75%] rounded-bl-full rounded-tl-full p-1.5 pl-4 pr-3 outline-none"
              placeholder="Search.."
            />

            <div className="flex w-[25%] justify-between">
              <button className="w-[30%]">
                <MenuFoldOutlined />
              </button>

              <button className="w-[70%] rounded-br-full rounded-tr-full bg-primary p-1.5 pl-5 pr-5 text-white opacity-70 hover:opacity-100">
                <SearchOutlined className="text-xl" />
              </button>
            </div>
          </div>

          <div className="hidden grid-flow-col gap-5 md:grid">
            <Link
              href="/profile"
              className={`text-2xl transition-all duration-300 hover:scale-110 hover:text-primary ${
                pathname === "/profile" ? "text-primary" : ""
              }`}
            >
              <UserOutlined />
            </Link>

            <Link
              href="/wishlist"
              className={`group text-2xl transition-all duration-300 hover:scale-110 hover:text-primary ${
                pathname === "/wishlist" ? "text-primary" : ""
              }`}
            >
              <HeartOutlined />
              <div
                className={`absolute ml-[15px] mt-[-33px] flex h-[15px] w-[15px] items-center justify-center rounded-full text-white group-hover:bg-primary group-hover:text-white ${
                  pathname === "/wishlist" ? "bg-primary" : "bg-secondary"
                }`}
              >
                <p className="text-[10px] font-semibold">12</p>
              </div>
            </Link>

            <Link
              href="/cart"
              className={`group text-2xl transition-all duration-300 hover:scale-110 hover:text-primary ${
                pathname === "/cart" ? "text-primary" : ""
              }`}
            >
              <ShoppingCartOutlined />
              <div
                className={`absolute ml-[15px] mt-[-33px] flex h-[15px] w-[15px] items-center justify-center rounded-full text-white group-hover:bg-primary group-hover:text-white ${
                  pathname === "/cart" ? "bg-primary" : "bg-secondary"
                }`}
              >
                <p className="text-[10px] font-semibold">10</p>
              </div>
            </Link>
          </div>

          <button
            onClick={open ? onClose : showDrawer}
            className="transition-all duration-500 ease-in-out hover:scale-110 md:hidden"
          >
            <div className="relative h-6 w-6">
              <span
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              >
                <MenuOutlined className="text-xl" />
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  open ? "opacity-100" : "opacity-0"
                }`}
              >
                <CloseOutlined className="text-xl" />
              </span>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <Drawer
        title={null}
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        className="custom-drawer"
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex h-full flex-col bg-white px-6 py-5">Mobile</div>
      </Drawer>
    </div>
  );
};

export default Header;
