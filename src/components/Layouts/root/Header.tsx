"use client";

import React, { useState, useRef, useEffect } from "react";

import Image from "next/image";
import { Drawer, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DownOutlined,
  UpOutlined,
  SearchOutlined,
  HeartOutlined,
  UserOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
  PlusOutlined,
  MinusOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TikTokOutlined,
  AlignLeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { FaPhoneVolume } from "react-icons/fa";
import { motion } from "framer-motion";
import Bangla from "@/Data/Img/BanglaLag.svg";
import English from "@/Data/Img/EnglishLag.svg";
import Logo from "@/Data/Img/Logo.svg";
import NavLink from "@/components/shared/NavLink";
import img1 from "@/Data/Demo/product-cat-1.png";
import img2 from "@/Data/Demo/menu-product-img-1.jpg";
import img3 from "@/Data/Demo/menu-product-img-2.jpg";

const { SubMenu } = Menu;

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

  // Mobile Screen
  const [open, setOpen] = useState(false);
  const [animateClose, setAnimateClose] = useState(false);
  const [animateClose2, setAnimateClose2] = useState(false);

  const showDrawer = () => {
    setAnimateClose2(true);

    setTimeout(() => {
      setOpen(true);
      setAnimateClose2(false);
    }, 500);
  };
  const onClose2 = () => {
    setAnimateClose(true);

    setTimeout(() => {
      setOpen(false);
      setAnimateClose(false);
    }, 500);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [submenuOpen, setSubmenuOpen] = useState(true);
  const [submenuOpen2, setSubmenuOpen2] = useState(false);
  const [submenuOpen3, setSubmenuOpen3] = useState(false);

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
    setSubmenuOpen2(false);
    setSubmenuOpen3(false);
  };

  const toggleSubmenu2 = () => {
    setSubmenuOpen2(!submenuOpen2);
    setSubmenuOpen(false);
    setSubmenuOpen3(false);
  };

  const toggleSubmenu3 = () => {
    setSubmenuOpen3(!submenuOpen3);
    setSubmenuOpen(false);
    setSubmenuOpen2(false);
  };

  // new-box
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleCategoryMenu = () => {
    setIsCategoryMenuOpen((prev) => !prev);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // dropdown for shop

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  // dropdown for product

  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  const handleMouseEnter2 = () => {
    setDropdownOpen2(true);
  };

  const handleMouseLeave2 = () => {
    setDropdownOpen2(false);
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
        className={`fixed top-0 z-50 w-full`}
      >
        {/* Top-Box */}
        {lastScrollY < 45 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 40 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mx-auto hidden h-[40px] w-full grid-cols-3 items-center bg-secondary px-4 text-white md:grid lg:px-6"
          >
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
                <div className="absolute top-0 z-30 w-[100px] bg-transparent py-2 text-black transition-opacity duration-300 ease-in-out">
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
        <div className="mx-auto flex h-[55px] w-full items-center justify-between bg-white px-4 text-secondary md:h-[70px] lg:px-6">
          <button className="w-[10%] text-2xl md:hidden" onClick={showDrawer}>
            <MenuOutlined
              className={`text-2xl transition-transform duration-500 ${
                animateClose2 ? "rotate-animation" : ""
              }`}
            />
          </button>

          <Link href="/" className="hidden md:block">
            {/* <Image
              alt="logo"
              src={Logo}
              className="h-[40px] w-[40px] md:h-[60px] md:w-[60px]"
            /> */}
            <p className="font-serif text-3xl font-semibold text-primary">
              Darkak
            </p>
          </Link>

          <div className="flex w-[50%] justify-center">
            <input
              className="w-[90%] rounded-bl-md rounded-tl-md border-2 border-primary p-1.5 pl-4 pr-3 outline-none md:w-[350px]"
              placeholder="Search.."
            />

            <button className="rounded-br-md rounded-tr-md bg-primary p-1.5 pl-5 pr-5 text-white">
              <SearchOutlined className="text-xl" />
            </button>
          </div>

          <div className="flex w-[30%] items-center justify-center md:w-auto">
            <Link
              href="/profile"
              className="group mr-4 hidden items-center text-xl md:flex md:text-2xl"
            >
              <div
                className={`flex h-[40px] w-[40px] items-center justify-center rounded-full border border-slate-200 group-hover:text-primary ${
                  pathname === "/profile" ? "text-primary" : "text-secondary"
                }`}
              >
                <UserOutlined />
              </div>

              <div className="ml-3">
                <p className="text-[13px] font-medium opacity-70">
                  Hell, Sign In
                </p>
                <p className="mt-[-12px] text-[15px] font-medium">
                  Your Account
                </p>
              </div>
            </Link>

            <Link
              href=""
              className="group mr-4 text-xl hover:text-primary md:text-2xl"
            >
              <HeartOutlined />
              <div className="absolute ml-[15px] mt-[-33px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-red-600 text-white group-hover:bg-primary group-hover:text-white">
                <p className="text-[10px] font-semibold">12</p>
              </div>
            </Link>

            <Link
              href=""
              className="group text-xl hover:text-primary md:text-2xl"
            >
              <ShoppingCartOutlined />
              <div className="absolute ml-[15px] mt-[-33px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-red-600 text-white group-hover:bg-primary group-hover:text-white">
                <p className="text-[10px] font-semibold">6</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Nav-Bar */}
        <div className="hidden h-[50px] w-full items-center justify-between border border-b bg-white px-4 text-secondary md:flex lg:px-6">
          {/* <NavLink
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
          </NavLink> */}

          <div
            className="relative flex items-center justify-center"
            ref={dropdownRef}
          >
            {/* Dropdown Trigger */}
            <button
              onClick={toggleCategoryMenu}
              className="flex h-[50px] w-[250px] items-center justify-evenly bg-primary text-white shadow-md transition-all duration-300 ease-in-out hover:bg-secondary cursor-pointer"
            >
              <AlignLeftOutlined className="text-xl" />
              <p>All Categories</p>
              {isCategoryMenuOpen ? (
                <UpOutlined className="text-[10px]" />
              ) : (
                <DownOutlined className="text-[10px]" />
              )}
            </button>

            {/* All Categories Dropdown Menu */}
            <div
              className={`absolute left-0 top-[50px] z-10 w-[250px] overflow-visible bg-white shadow-lg transition-all duration-300 ease-in-out ${
                isCategoryMenuOpen
                  ? "scale-100 opacity-100"
                  : "pointer-events-auto scale-95 opacity-0"
              }`}
            >
              {/* Category 1 */}
              <div className="group relative">
                {/* Main Category Button */}
                <button className="flex w-full items-center justify-between border-l p-3 transition-transform duration-300 hover:border-primary hover:text-primary">
                  <Image alt="" src={img1} className="h-[50px] w-[45px]" />
                  <p className="font-semibold">Category 1</p>
                  <RightOutlined className="text-[15px]" />
                </button>

                {/* Sub Menu - fixed */}
                <div className="invisible absolute left-full top-0 z-50 min-w-[220px] rounded-md bg-white opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[15px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 1</p>
                  </Link>
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[20px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 2</p>
                  </Link>
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[20px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 3</p>
                  </Link>

                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[20px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 4</p>
                  </Link>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-slate-200" />
              </div>

              {/* Category 2 */}
              <div className="group relative">
                {/* Main Category Button */}
                <button className="flex w-full items-center justify-between border-l p-3 transition-transform duration-300 hover:border-primary hover:text-primary">
                  <Image alt="" src={img1} className="h-[50px] w-[45px]" />
                  <p className="font-semibold">Category 2</p>
                  <RightOutlined className="text-[15px]" />
                </button>

                {/* Sub Menu - fixed */}
                <div className="invisible absolute left-full top-0 z-50 min-w-[220px] rounded-md bg-white opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[15px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 1</p>
                  </Link>
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[20px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 2</p>
                  </Link>
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[20px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 3</p>
                  </Link>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-slate-200" />
              </div>

              {/* Category 3 */}
              <div className="group relative">
                {/* Main Category Button */}
                <button className="flex w-full items-center justify-between border-l p-3 transition-transform duration-300 hover:border-primary hover:text-primary">
                  <Image alt="" src={img1} className="h-[50px] w-[45px]" />
                  <p className="font-semibold">Category 3</p>
                  <RightOutlined className="text-[15px]" />
                </button>

                {/* Sub Menu - fixed */}
                <div className="invisible absolute left-full top-0 z-50 min-w-[220px] rounded-md bg-white opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[15px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 1</p>
                  </Link>
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[20px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 2</p>
                  </Link>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-slate-200" />
              </div>

              {/* Category 4 */}
              <div className="group relative">
                {/* Main Category Button */}
                <button className="flex w-full items-center justify-between border-l p-3 transition-transform duration-300 hover:border-primary hover:text-primary">
                  <Image alt="" src={img1} className="h-[50px] w-[45px]" />
                  <p className="font-semibold">Category 2</p>
                  <RightOutlined className="text-[15px]" />
                </button>

                {/* Sub Menu - fixed */}
                <div className="invisible absolute left-full top-0 z-50 min-w-[220px] rounded-md bg-white opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[15px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 1</p>
                  </Link>
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[20px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 2</p>
                  </Link>
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[20px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 3</p>
                  </Link>
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[20px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 4</p>
                  </Link>
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[20px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 5</p>
                  </Link>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-slate-200" />
              </div>

              {/* Category 5 */}
              <div className="group relative">
                {/* Main Category Button */}
                <button className="flex w-full items-center justify-between border-l p-3 transition-transform duration-300 hover:border-primary hover:text-primary">
                  <Image alt="" src={img1} className="h-[50px] w-[45px]" />
                  <p className="font-semibold">Category 2</p>
                  <RightOutlined className="text-[15px]" />
                </button>

                {/* Sub Menu - fixed */}
                <div className="invisible absolute left-full top-0 z-50 min-w-[220px] rounded-md bg-white opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[15px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 1</p>
                  </Link>
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[20px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 2</p>
                  </Link>
                  <Link
                    href="/sub-category"
                    className="flex items-center border-b border-gray-200 px-4 py-3 transition-all duration-200 hover:bg-gray-100 hover:text-primary"
                  >
                    <div className="h-[20px] w-[2px] bg-transparent group-hover:bg-primary" />
                    <p className="ml-3">Sub Category 3</p>
                  </Link>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-slate-200" />
              </div>
            </div>

            {/* nav-bar */}
            <div className="ml-10 grid grid-flow-col gap-6">
              <NavLink
                href="/"
                className="font-serif text-[18px] hover:text-primary"
              >
                Home
              </NavLink>

              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* New Badge */}
                <div className="absolute ml-[20px] mt-[-11px] flex h-[15px] w-[32px] items-center justify-center bg-red-500">
                  <p className="text-[10px] text-white">Hot</p>
                </div>

                {/* Shop Link */}
                <NavLink
                  href="/shop"
                  className={`font-serif text-[18px] transition-colors duration-300 ${
                    dropdownOpen ? "text-primary" : "hover:text-primary"
                  }`}
                >
                  Shop <DownOutlined className="text-[12px]" />
                </NavLink>

                {/* Dropdown Content */}
                <div
                  className={`absolute top-10 z-30 ml-[-25vw] flex w-[90vw] justify-between rounded-lg bg-white p-6 shadow-xl transition-all duration-300 ease-in-out ${dropdownOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"} `}
                >
                  {/* Left-side */}
                  <div className="flex w-[50%] items-start justify-between">
                    <div className="group flex w-1/3 flex-col p-3">
                      <p className="text-[15px] font-medium text-secondary transition-all duration-300 group-hover:text-primary">
                        Shop Page
                      </p>
                      <div className="mb-5 mt-2 h-[1px] w-full bg-slate-300" />

                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                    </div>

                    <div className="group flex w-1/3 flex-col p-3">
                      <p className="text-[15px] font-medium text-secondary transition-all duration-300 group-hover:text-primary">
                        Featured Collection
                      </p>
                      <div className="mb-5 mt-2 h-[1px] w-full bg-slate-300" />

                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                    </div>

                    <div className="group flex w-1/3 flex-col p-3">
                      <p className="text-[15px] font-medium text-secondary transition-all duration-300 group-hover:text-primary">
                        New Arrivals
                      </p>
                      <div className="mb-5 mt-2 h-[1px] w-full bg-slate-300" />

                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                      <Link
                        href="/"
                        className="mb-1 text-[15px] text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        Sub Category
                      </Link>
                    </div>
                  </div>

                  {/* Right-side */}
                  <div className="flex w-[50%] items-start justify-between">
                    {/* Image 1 */}
                    <div className="w-1/2 p-5">
                      <div className="group relative h-[250px] w-full overflow-hidden rounded-md">
                        <Image
                          src={img2}
                          alt="img"
                          fill
                          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        />

                        <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
                          <Link href="/your-link">
                            <span className="group/button group relative inline-block overflow-hidden rounded-lg border border-gray-100 bg-gray-100 px-5 py-2 font-medium text-gray-600 shadow-inner">
                              <span className="absolute left-0 top-0 h-0 w-0 border-t-2 border-gray-600 transition-all duration-200 ease-in-out group-hover/button:w-full"></span>
                              <span className="absolute bottom-0 right-0 h-0 w-0 border-b-2 border-gray-600 transition-all duration-200 ease-in-out group-hover/button:w-full"></span>
                              <span className="absolute left-0 top-0 h-0 w-full bg-gray-600 transition-all delay-200 duration-300 ease-in-out group-hover/button:h-full"></span>
                              <span className="absolute bottom-0 left-0 h-0 w-full bg-gray-600 transition-all delay-200 duration-300 ease-in-out group-hover/button:h-full"></span>
                              <span className="absolute inset-0 h-full w-full bg-gray-900 opacity-0 transition-all delay-300 duration-300 ease-in-out group-hover/button:opacity-100"></span>
                              <span className="relative z-10 transition-colors delay-200 duration-300 ease-in-out group-hover/button:text-white">
                                View More
                              </span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="w-1/2 p-5">
                      <div className="group relative h-[250px] w-full overflow-hidden rounded-md">
                        <Image
                          src={img3}
                          alt="img"
                          fill
                          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        />

                        <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
                          <Link href="/your-link">
                            <span className="group/button group relative inline-block overflow-hidden rounded-lg border border-gray-100 bg-gray-100 px-5 py-2 font-medium text-gray-600 shadow-inner">
                              <span className="absolute left-0 top-0 h-0 w-0 border-t-2 border-gray-600 transition-all duration-200 ease-in-out group-hover/button:w-full"></span>
                              <span className="absolute bottom-0 right-0 h-0 w-0 border-b-2 border-gray-600 transition-all duration-200 ease-in-out group-hover/button:w-full"></span>
                              <span className="absolute left-0 top-0 h-0 w-full bg-gray-600 transition-all delay-200 duration-300 ease-in-out group-hover/button:h-full"></span>
                              <span className="absolute bottom-0 left-0 h-0 w-full bg-gray-600 transition-all delay-200 duration-300 ease-in-out group-hover/button:h-full"></span>
                              <span className="absolute inset-0 h-full w-full bg-gray-900 opacity-0 transition-all delay-300 duration-300 ease-in-out group-hover/button:opacity-100"></span>
                              <span className="relative z-10 transition-colors delay-200 duration-300 ease-in-out group-hover/button:text-white">
                                View More
                              </span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="relative"
                onMouseEnter={handleMouseEnter2}
                onMouseLeave={handleMouseLeave2}
              >
                {/* New Badge */}
                <div className="absolute ml-[20px] mt-[-11px] flex h-[15px] w-[32px] items-center justify-center bg-primary">
                  <p className="text-[10px] text-white">New</p>
                </div>

                {/* Shop Link */}
                <NavLink
                  href="/product"
                  className={`font-serif text-[18px] transition-colors duration-300 ${
                    dropdownOpen2 ? "text-primary" : "hover:text-primary"
                  }`}
                >
                  Product <DownOutlined className="text-[12px]" />
                </NavLink>

                {/* Dropdown Content */}
                <div
                  className={`absolute top-10 z-30 ml-[-30vw] flex w-[90vw] justify-between rounded-lg bg-white p-6 shadow-xl transition-all duration-300 ease-in-out ${dropdownOpen2 ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"} `}
                >
                  {/* Left-side */}
                  <div className="flex w-full items-start justify-between">
                    Working.....
                  </div>

                  
                </div>
              </div>

             

              <NavLink
                href="/blogs"
                className="font-serif text-[18px] hover:text-primary"
              >
                Blogs
              </NavLink>

              <NavLink
                href="/contact-us"
                className="font-serif text-[18px] hover:text-primary"
              >
                Contact Us
              </NavLink>
            </div>
          </div>

          <a
            href="tel:+8801915665089"
            className="group mr-4 hidden items-center text-xl md:flex md:text-2xl"
          >
            <FaPhoneVolume className="-rotate-45 text-primary transition-all duration-300 group-hover:rotate-45" />

            <div className="ml-3">
              <p className="text-[13px] font-medium opacity-70">Hotline:</p>
              <p className="mt-[-15px] text-[15px] font-medium">
                +880 1915665089
              </p>
            </div>
          </a>
        </div>
      </motion.div>

      {/* Mobile Screen */}
      <Drawer
        title=""
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width={300}
        // drawerStyle={{ backgroundColor: "#0A2C8C" }}
      >
        <div className="w-full">
          <div className="mt-[-15px] flex items-center justify-between">
            <p className="font-serif text-3xl font-semibold">
              Darkak<span className="text-primary">Mart</span>
            </p>
            <button onClick={onClose2}>
              <CloseOutlined
                className={`text-2xl transition-transform duration-500 ${
                  animateClose ? "rotate-animation" : ""
                }`}
              />
            </button>
          </div>
          <div className="mt-3 h-[1px] w-full bg-yellow-200" />

          <div className="mt-3">
            <Link
              href="/"
              onClick={onClose}
              className="font-serif text-xl hover:text-blue-600"
            >
              Home
            </Link>

            {/* Shop */}
            <div className="mt-5 flex w-full items-center justify-between">
              <div className="absolute ml-[20px] mt-[-35px] flex h-[15px] w-[32px] items-center justify-center bg-red-500 text-white">
                <p className="text-[10px]">New</p>
              </div>
              <Link
                href="/shop"
                onClick={onClose}
                className="font-serif text-xl hover:text-blue-600"
              >
                Shop
              </Link>

              <button onClick={toggleSubmenu} className="w-[15%]">
                {submenuOpen ? (
                  <MinusOutlined className="text-xl" />
                ) : (
                  <PlusOutlined className="text-xl" />
                )}
              </button>
            </div>
            <div
              className={`mb-4 ml-[10%] mt-3 flex flex-col overflow-hidden opacity-70 transition-all duration-500 ${
                submenuOpen ? "max-h-[300px]" : "max-h-0"
              }`}
            >
              <Link
                href="/"
                onClick={onClose}
                className="font-serif text-lg hover:text-blue-600"
              >
                Women&quot;s Fashion
              </Link>

              <Link
                href="/"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                Men&quot;s Fashion
              </Link>

              <Link
                href="/"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                Baby Fashion
              </Link>

              <Link
                href="/"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                Accessories
              </Link>

              <Link
                href="/"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                Footwear
              </Link>
            </div>

            {/* Categories */}
            <div className="mt-2 flex w-full items-center justify-between">
              <div className="absolute ml-[50px] mt-[-35px] flex h-[15px] w-[32px] items-center justify-center bg-blue-600 text-white">
                <p className="text-[10px]">Hot</p>
              </div>
              <Link
                href="/categories"
                onClick={onClose}
                className="font-serif text-xl hover:text-blue-600"
              >
                Categories
              </Link>

              <button onClick={toggleSubmenu2} className="w-[15%]">
                {submenuOpen2 ? (
                  <MinusOutlined className="text-xl" />
                ) : (
                  <PlusOutlined className="text-xl" />
                )}
              </button>
            </div>
            <div
              className={`ml-[10%] mt-3 flex flex-col overflow-hidden opacity-70 transition-all duration-500 ${
                submenuOpen2 ? "max-h-[350px]" : "max-h-0"
              }`}
            >
              <Link
                href="/categories"
                onClick={onClose}
                className="font-serif text-lg hover:text-blue-600"
              >
                Featured Product
              </Link>

              <Link
                href="/categories"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                New Arrivals
              </Link>

              <Link
                href="/categories"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                Summer Styles
              </Link>

              <Link
                href="/categories"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                Winter Fashion
              </Link>

              <Link
                href="/categories"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                Footwear
              </Link>

              <Link
                href="/categories"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                Accessories
              </Link>

              <Link
                href="/categories"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                Footwear
              </Link>

              <Link
                href="/categories"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                Men
              </Link>

              <Link
                href="/categories"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                Women
              </Link>
            </div>

            {/* Blog */}
            <Link
              href="/Blog"
              onClick={onClose}
              className="font-serif text-xl hover:text-blue-600"
            >
              Blog
            </Link>

            {/* Pages */}
            <div className="mt-5 flex w-full items-center justify-between">
              <Link
                href="/categories"
                onClick={onClose}
                className="font-serif text-xl hover:text-blue-600"
              >
                Pages
              </Link>

              <button onClick={toggleSubmenu3} className="w-[15%]">
                {submenuOpen3 ? (
                  <MinusOutlined className="text-xl" />
                ) : (
                  <PlusOutlined className="text-xl" />
                )}
              </button>
            </div>
            <div
              className={`ml-[10%] mt-3 flex flex-col overflow-hidden opacity-70 transition-all duration-500 ${
                submenuOpen3 ? "max-h-[300px]" : "max-h-0"
              }`}
            >
              <Link
                href="/contact"
                onClick={onClose}
                className="font-serif text-lg hover:text-blue-600"
              >
                Contact
              </Link>

              <Link
                href="/about-us"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                About Us
              </Link>

              <Link
                href="/services"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                Services
              </Link>

              <Link
                href="/faq"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                FAQ
              </Link>

              <Link
                href="/size-chart"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                Size Chart
              </Link>

              <Link
                href="/purchase-now"
                onClick={onClose}
                className="mt-2 font-serif text-lg hover:text-blue-600"
              >
                Purchase Now
              </Link>
            </div>
          </div>

          <div className="mt-3 h-[1px] w-full bg-yellow-200" />

          <div className="mt-5 flex w-full items-center justify-evenly">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer opacity-60 hover:text-blue-500 hover:opacity-100"
            >
              <FacebookOutlined className="text-[35px]" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer opacity-60 hover:text-blue-500 hover:opacity-100"
            >
              <TwitterOutlined className="text-[35px]" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer opacity-60 hover:text-blue-500 hover:opacity-100"
            >
              <InstagramOutlined className="text-[35px]" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer opacity-60 hover:text-blue-500 hover:opacity-100"
            >
              <YoutubeOutlined className="text-[35px]" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer opacity-60 hover:text-blue-500 hover:opacity-100"
            >
              <TikTokOutlined className="text-[35px]" />
            </a>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
