"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Drawer, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "@/components/shared/NavLink";
import {
  DownOutlined,
  UpOutlined,
  MenuOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  HeartOutlined, ShoppingCartOutlined, UserOutlined,
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
            className="mx-auto hidden w-full grid-cols-3 items-center overflow-hidden bg-[#5694FF] px-4 text-white md:grid lg:px-6"
          >
            <p>Get Ready For Summer Offers</p>
            <p className="text-center">Use code 2025 and get 10% Off</p>

            <div
              className="relative flex cursor-pointer items-center justify-end gap-2"
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

        {/* Main Header */}
        <div className="mx-auto flex h-[65px] w-full items-center justify-between bg-[#E6EFFF] px-4 text-secondary md:h-[70px] lg:px-6">
          <button className="w-[10%] text-2xl md:hidden" onClick={showDrawer}>
            <MenuOutlined
              className={`text-2xl transition-transform duration-500 ${
                animateClose2 ? "rotate-animation" : ""
              }`}
            />
          </button>

          <Link href="/" className="hidden md:block">
            <p className="font-serif text-3xl font-semibold text-primary">
              Darkak
            </p>
          </Link>

          <div className="hidden md:grid grid-flow-col gap-8">
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
              href="/blogs"
              className={`font-serif text-lg hover:text-primary`}
            >
              Blogs
            </NavLink>

            <NavLink
              href="/contact-us"
              className={`font-serif text-lg hover:text-primary`}
            >
              Contact Us
            </NavLink>
          </div>

          <div className="hidden md:flex w-[30%] justify-center rounded-full bg-white">
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

          <div className="hidden md:grid grid-flow-col gap-5">
          <Link
              href="/"
              className="text-2xl"
            >
              <UserOutlined />
              
            </Link> 

            <Link
              href="/"
              className="text-2xl"
            >
              <HeartOutlined />
              <div className="absolute ml-[15px] mt-[-33px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-secondary text-white group-hover:bg-primary group-hover:text-white">
                <p className="text-[10px] font-semibold">12</p>
              </div>
            </Link>

            <Link
              href="/"
              className="text-2xl"
            >
              <ShoppingCartOutlined />
              <div className="absolute ml-[15px] mt-[-33px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-secondary text-white group-hover:bg-primary group-hover:text-white">
                <p className="text-[10px] font-semibold">10</p>
              </div>
            </Link>
          </div>

          <div className="md:hidden">Logo</div>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <Drawer
        title=""
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width={300}
      >
        <div className="w-full">mobile</div>
      </Drawer>
    </div>
  );
};

export default Header;
