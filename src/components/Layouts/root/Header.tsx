"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import { Drawer } from "antd";
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
        <div className="mx-auto flex h-[60px] w-full items-center justify-between bg-primary px-4 text-secondary md:h-[80px] lg:px-6">
          <button className="w-[10%] text-2xl md:hidden" onClick={showDrawer}>
            <MenuOutlined
              className={`text-2xl transition-transform duration-500 ${
                animateClose2 ? "rotate-animation" : ""
              }`}
            />
          </button>

          <Link href="/" className="hidden md:block">
            <Image
              alt="logo"
              src={Logo}
              className="h-[40px] w-[40px] md:h-[60px] md:w-[60px]"
            />
          </Link>

          <div className="flex w-[65%] justify-center">
            <input
              className="w-[90%] rounded-bl-md rounded-tl-md p-1.5 pl-4 pr-3 outline-none md:w-[350px]"
              placeholder="Search.."
            />

            <button className="rounded-br-md rounded-tr-md bg-secondary p-1.5 pl-5 pr-5 text-white">
              <SearchOutlined className="text-xl" />
            </button>
          </div>

          <div className="flex w-[15%] md:w-auto">
            <Link
              href="/profile"
              className="mr-4 hidden text-xl hover:text-white md:block md:text-2xl"
            >
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
        <div className="hidden h-[40px] w-full items-center justify-evenly border border-b bg-white md:flex">
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


          <div className="w-full mt-5 flex justify-evenly items-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" opacity-60 hover:opacity-100 hover:text-blue-500 cursor-pointer"
            >
              <FacebookOutlined className="text-[35px]" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" opacity-60 hover:opacity-100 hover:text-blue-500 cursor-pointer"
            >
              <TwitterOutlined className="text-[35px]" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" opacity-60 hover:opacity-100 hover:text-blue-500 cursor-pointer"
            >
              <InstagramOutlined className="text-[35px]" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" opacity-60 hover:opacity-100 hover:text-blue-500 cursor-pointer"
            >
              <YoutubeOutlined className="text-[35px]" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" opacity-60 hover:opacity-100 hover:text-blue-500 cursor-pointer"
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
