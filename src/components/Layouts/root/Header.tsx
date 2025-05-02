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
  HomeOutlined,
  ShopOutlined,
  AppstoreOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import { AnimatePresence, motion } from "framer-motion";
import Bangla from "@/Data/Img/BanglaLag.svg";
import English from "@/Data/Img/EnglishLag.svg";
import HeadLineText from "./HeadLineText";

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
            className="mx-auto hidden w-full grid-cols-3 items-center overflow-visible bg-[#003084] px-4 text-white md:grid md:px-6"
          >
            <p>Get Ready For Summer Offers</p>
            <p className="text-center">Use code 2025 and get 10% Off</p>

            {/* DropDown-menu */}
            <div className="flex w-full items-center justify-end">
              <div
                className="relative flex cursor-pointer items-center gap-2 rounded-md p-2 transition hover:bg-primaryDarkBlue"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                ref={dropdownRef}
              >
                <Image
                  alt="Language"
                  src={selectedLang === "Bangla" ? Bangla : English}
                  width={20}
                  height={20}
                />
                <p className="text-sm font-medium uppercase text-primaryWhite">
                  {selectedLang}
                </p>

                {isDropdownOpen ? <UpOutlined /> : <DownOutlined />}

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute right-0 top-9 z-30 w-[120px] rounded-md bg-primaryBlue shadow-md "
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <p
                        className="cursor-pointer px-4 py-2 text-sm uppercase text-primaryWhite hover:bg-primaryDarkBlue"
                        onClick={() => handleLanguageChange("English")}
                      >
                        English
                      </p>
                      <p
                        className="cursor-pointer px-4 py-2 text-sm uppercase text-primaryWhite hover:bg-primaryDarkBlue"
                        onClick={() => handleLanguageChange("Bangla")}
                      >
                        Bangla
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
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

              <button className="w-[70%] rounded-br-full rounded-tr-full bg-primaryBlue p-1.5 pl-5 pr-5 text-white transition-all duration-300 hover:bg-primaryDarkBlue">
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
                <p className="text-[10px] font-semibold">3</p>
              </div>
            </Link>
          </div>

          {/* For mobile menu Button */}
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
                {/* <CloseOutlined className="text-xl" /> */}
              </span>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        className="custom-drawer"
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex h-full w-full flex-col justify-between bg-white/90 px-5 py-6 text-gray-800 shadow-lg backdrop-blur-md sm:max-w-[360px]">
          <div className="w-full">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between border-b pb-4">
              <Link href="/" onClick={onClose}>
                <h1 className="font-serif text-2xl font-extrabold tracking-wide text-primary">
                  Darkak
                </h1>
              </Link>
              <button onClick={onClose}>
                <CloseOutlined className="text-xl text-gray-700 transition duration-200 hover:text-primaryBlue" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-7 flex items-center overflow-hidden rounded border border-primaryBlue bg-white pl-3 shadow-md">
              <SearchOutlined className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-3/4 border-none bg-transparent py-2 text-sm outline-none"
              />
              <button className="w-1/4 bg-primaryBlue py-2 text-white transition-all duration-300 hover:bg-primaryDarkBlue">
                Search
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-4 text-base font-medium">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-3 hover:text-primary"
              >
                <HomeOutlined />
                Home
              </Link>
              <Link
                href="/shop"
                onClick={onClose}
                className="flex items-center gap-3 hover:text-primary"
              >
                <ShopOutlined />
                Shop
              </Link>
              <Link
                href="/category"
                onClick={onClose}
                className="flex items-center gap-3 hover:text-primary"
              >
                <AppstoreOutlined />
                Category
              </Link>
              <Link
                href="/contact-us"
                onClick={onClose}
                className="flex items-center gap-3 hover:text-primary"
              >
                <PhoneOutlined />
                Contact Us
              </Link>

              <Link
                href="/about-us"
                onClick={onClose}
                className="flex items-center gap-3 hover:text-primary"
              >
                <InfoCircleOutlined />
                About Us
              </Link>
            </nav>

            {/* Language Switcher */}
            <div className="mt-6 flex items-center gap-3">
              <Image
                src={selectedLang === "Bangla" ? Bangla : English}
                alt="lang"
                width={22}
                height={22}
              />
              <select
                value={selectedLang}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="rounded-md border border-gray-300 px-2 py-1 text-sm outline-none"
              >
                <option value="English">English</option>
                <option value="Bangla">Bangla</option>
              </select>
            </div>

            {/* Bottom Icons */}
            <div className="mt-10 grid grid-cols-3 gap-4 text-center text-sm">
              <Link href="/profile" onClick={onClose}>
                <div className="flex flex-col items-center justify-center hover:text-primary">
                  <UserOutlined className="text-xl" />
                  <span className="mt-1">Profile</span>
                </div>
              </Link>
              <Link href="/wishlist" onClick={onClose}>
                <div className="relative flex flex-col items-center hover:text-primary">
                  <HeartOutlined className="text-xl" />
                  <span className="absolute -top-1 right-7 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-primaryBlue text-[10px] text-white">
                    12
                  </span>
                  <span className="mt-1">Wishlist</span>
                </div>
              </Link>
              <Link href="/cart" onClick={onClose}>
                <div className="relative flex flex-col items-center hover:text-primary">
                  <ShoppingCartOutlined className="text-xl" />
                  <span className="absolute -top-1 right-7 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-primaryBlue text-[10px] text-white">
                    3
                  </span>
                  <span className="mt-1">Cart</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="border-b-2 border-t-2 border-primaryBlue bg-[#f0f8ff] text-sm text-gray-700">
            <HeadLineText />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
