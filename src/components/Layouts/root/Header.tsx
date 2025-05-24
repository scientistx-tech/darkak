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
  AppstoreOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import { AnimatePresence, motion } from "framer-motion";
import Bangla from "@/Data/Img/BanglaLag.svg";
import English from "@/Data/Img/EnglishLag.svg";
import HeadLineText from "./HeadLineText";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/redux/slices/authSlice";
import HeaderDropdown from "./HeaderDropdown";

import logo from "@/Data/Icon/PNG.png";
import { auth } from "@/utils/firebase";
import { useGetMyCartQuery } from "@/redux/services/client/myCart";
import { useGetMyWishListQuery } from "@/redux/services/client/myWishList";
import {
  useGetBestSellingProductsQuery,
  useGetNewArivalProductsQuery,
  useGetMostVisitedProductsQuery,
  useGetTopRatedProductsQuery,
} from "@/redux/services/client/products";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAllCategoriesQuery } from "@/redux/services/client/allCategories";
import { useGetProductCategoriesQuery } from "@/redux/services/client/categories";
import { FaSpinner } from "react-icons/fa";
import ProductCard from "@/components/shared/ProductCard";

const Header: React.FC = () => {
  const { data: cart, refetch: cartRefetch } = useGetMyCartQuery();
  const { data: wishlist, refetch: wishRefetch } = useGetMyWishListQuery({
    page: 1,
    limit: 100,
  });
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const carts = useSelector((state: RootState) => state.auth.cart);
  const wishs = useSelector((state: RootState) => state.auth.wish);

  const pathname = usePathname();
  const [selectedLang, setSelectedLang] = useState("English");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [isOpen, setIsOpen] = useState(false);

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
  useEffect(() => {
    wishRefetch();
  }, [wishs]);
  useEffect(() => {
    cartRefetch();
  }, [carts]);

  //  For Drawer
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleLogOut = () => {
    dispatch(clearUser());
    auth.signOut();
  };

  // Search functionality
  const {
    data: categories,
    isLoading,
    error,
  } = useGetProductCategoriesQuery("");
  console.log("🚀 ~ categories:", categories);

  const { data: bestSelling } = useGetBestSellingProductsQuery(
    { search: debouncedSearch, limit: "10", page: "1" },
    { skip: !debouncedSearch }
  );

  const { data: mostVisited } = useGetMostVisitedProductsQuery(
    { search: debouncedSearch, limit: "10", page: "1", visitorId: "sazzad123" },
    { skip: !debouncedSearch }
  );

  const { data: newArrival } = useGetNewArivalProductsQuery(
    { search: debouncedSearch, limit: "10", page: "1" },
    { skip: !debouncedSearch }
  );

  const { data: topRated } = useGetTopRatedProductsQuery(
    { search: debouncedSearch, limit: "10", page: "1" },
    { skip: !debouncedSearch }
  );

  const mergedProducts = [
    ...(bestSelling?.data ?? []),
    ...(mostVisited?.data ?? []),
    ...(newArrival?.data ?? []),
    ...(topRated?.data ?? [])
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if the clicked element or any of its parents has the 'ignore-click-outside' class
      let targetElement: HTMLElement | null = event.target as HTMLElement;
      let shouldIgnore = false;

      // Traverse up the DOM tree to check for the ignore class
      while (targetElement) {
        if (targetElement.classList?.contains('ignore-click-outside')) {
          shouldIgnore = true;
          break;
        }
        targetElement = targetElement.parentElement;
      }

      if (dropdownRef.current && !shouldIgnore && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    setIsOpen(!!debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="w-full bg-black relative">
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
            className="mx-auto hidden w-full grid-cols-3 items-center overflow-visible bg-primary px-4 text-white md:grid md:px-6 lg:px-12"
          >
            <p>🎉 Eid Mubarak & Grand Opening Celebration! 🎉</p>
            <p className="text-center">✨ Flat 30% OFF on All Products! ✨</p>

            {/* DropDown-menu */}
            <div className="flex w-full items-center justify-end gap-2">
              <div
                className="relative flex cursor-pointer items-center gap-1 rounded-md p-2 transition hover:bg-primaryDarkBlue"
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

                <p className="text-sm">
                  {isDropdownOpen ? <UpOutlined /> : <DownOutlined />}
                </p>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute right-0 top-9 z-30 w-[120px] rounded-md bg-primaryBlue shadow-md"
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
              {/* Login & Register Buttons */}
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="rounded-md bg-secondaryLiteBlue px-4 py-1 text-sm text-primaryDarkBlue transition hover:bg-primaryDarkBlue hover:text-primaryWhite"
                >
                  Log Out
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/auth/login"
                    className="rounded-md bg-secondaryLiteBlue px-4 py-1 text-sm text-primaryDarkBlue transition hover:bg-primaryDarkBlue hover:text-primaryWhite"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="rounded-md border border-primary px-4 py-1 text-sm text-primaryWhite transition hover:bg-primaryDarkBlue"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Main Header */}
        <div className="mx-auto flex h-[65px] w-full items-center justify-between bg-primaryBlue px-4 text-white md:h-[70px] md:px-6 lg:px-12">
          <Link href="/" className="">
            <Image alt="Darkak-Logo" src={logo} height={50} className="" />
          </Link>

          <div className="hidden grid-flow-col items-center gap-8 md:grid">
            {/* Home Link */}
            <NavLink href="/" className="font-serif text-lg hover:text-primary">
              Home
            </NavLink>
            <div className="relative font-serif text-lg">
              <HeaderDropdown />
            </div>

            {/* Contact Us Link */}
            <NavLink
              href="/contact-us"
              className="font-serif text-lg hover:text-primary"
            >
              Contact Us
            </NavLink>
          </div>

          <div className="relative w-[30%]">
            <div className="hidden justify-center rounded-full bg-white md:flex">
              <input
                className="ignore-click-outside w-[75%] text-black rounded-bl-full rounded-tl-full p-1.5 pl-4 pr-3 outline-none"
                placeholder="Search.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  if (searchTerm.trim() !== "") {
                    setIsOpen(true);
                  }
                }}
              />
              <div className="flex w-[25%] justify-between">
                <button className="w-[30%] text-black">
                  <MenuFoldOutlined />
                </button>
                <button className="w-[70%] rounded-br-full rounded-tr-full border-none bg-primary p-1.5 pl-5 pr-5 text-white">
                  <SearchOutlined className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          <div className="hidden grid-flow-col gap-5 md:grid">
            <Link
              href="/user/profile"
              className={`text-2xl transition-all duration-300 hover:scale-110 hover:text-primary ${pathname === "/user/profile" ? "opacity-100" : "opacity-70"
                }`}
            >
              <UserOutlined />
            </Link>

            <Link
              href="/user/wishlist"
              className="group text-2xl transition-all duration-300 hover:scale-110 hover:text-primary"
            >
              <HeartOutlined
                className={` ${pathname === "/user/wishlist" ? "opacity-100" : "opacity-70"
                  }`}
              />
              <div
                className={`absolute ml-[15px] mt-[-33px] flex h-[15px] w-[15px] items-center justify-center rounded-full text-black group-hover:bg-primary group-hover:text-white ${pathname === "/user/wishlist"
                  ? "bg-primary text-white"
                  : "bg-white"
                  }`}
              >
                <p className="text-[10px] font-semibold">
                  {wishlist ? wishlist.data.length : "0"}
                </p>
              </div>
            </Link>

            <Link
              href="/user/cart"
              className="group text-2xl transition-all duration-300 hover:scale-110 hover:text-primary"
            >
              <ShoppingCartOutlined
                className={` ${pathname === "/user/cart" ? "opacity-100" : "opacity-70"
                  }`}
              />
              <div
                className={`absolute ml-[15px] mt-[-33px] flex h-[15px] w-[15px] items-center justify-center rounded-full text-black group-hover:bg-primary group-hover:text-white ${pathname === "/user/cart"
                  ? "bg-primary text-white"
                  : "bg-white"
                  }`}
              >
                <p className="text-[10px] font-semibold">
                  {cart ? cart.cart.length : "0"}
                </p>
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
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${open ? "opacity-0" : "opacity-100"
                  }`}
              >
                <MenuOutlined className="text-xl" />
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"
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
        styles={{ body: { padding: 0 } }}
      >
        <div className="flex h-full flex-col justify-between px-5 py-6 text-gray-800 shadow-lg backdrop-blur-md">
          <div className="w-full">
            {/* Header */}
            <div className="mb-6 flex h-[50px] items-center justify-between bg-primaryBlue">
              <Link href="/" onClick={onClose} className="ml-5">
                <Image alt="Darkak-Logo" src={logo} height={35} className="" />
              </Link>
              <button onClick={onClose} className="mr-5">
                <CloseOutlined className="text-xl text-white transition duration-200 hover:text-primary" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="mb-7 flex items-center overflow-hidden rounded border border-primaryBlue bg-white pl-3 shadow-md">
                <SearchOutlined className="mr-2 text-gray-500" />
                <input
                  placeholder="Search products..."
                  className="w-3/4 border-none bg-transparent py-2 text-sm outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => {
                    if (searchTerm.trim() !== "") {
                      setIsOpen(true);
                    }
                  }}
                />
                <button className="w-1/4 bg-primaryBlue py-2 text-white transition-all duration-300 hover:bg-primaryDarkBlue">
                  Search
                </button>
              </div>
              {/* {isOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-10 left-1/2 -translate-x-1/2 z-50 mt-2 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] flex flex-col lg:flex-row bg-white border shadow-lg rounded-lg h-full"
                >
                  <div className="w-full lg:w-[30%] border-b lg:border-b-0 lg:border-r p-4">
                    <h4 className="font-bold text-base mb-2 text-black">Categories</h4>
                    <ul>
                      {categories
                        ?.flatMap((category) =>
                          category.sub_category.flatMap((subCat) =>
                            subCat.sub_sub_category.filter((subSub) =>
                              subSub.title.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                          )
                        )
                        .map((matchedSubSub) => (
                          <li key={matchedSubSub.id} className="mb-1 text-black">
                            <a
                              className="text-sm hover:text-secondaryBlue"
                              href={`/category?search=${matchedSubSub.title.toLowerCase()}`}
                            >
                              {matchedSubSub.title}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="w-full lg:w-[70%] p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[400px]">
                    {mergedProducts?.map((product) => (
                      <div key={product._id} className="border p-2 rounded shadow-sm">
                        <img
                          src={product.thumbnail || "/placeholder.png"}
                          alt={product.name}
                          className="h-20 object-contain mx-auto"
                        />
                        <div className="mt-1 text-sm">{product.name}</div>
                        <div className="text-primary font-semibold">{product.price}৳</div>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
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
              {/* <Link
                href="/shop"
                onClick={onClose}
                className="flex items-center gap-3 hover:text-primary"
              >
                <ShopOutlined />
                Shop
              </Link> */}
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
            <div className="mt-6 flex items-center gap-2">
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
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="rounded-md bg-secondaryLiteBlue px-4 py-1 text-sm text-primaryDarkBlue transition hover:bg-primaryDarkBlue hover:text-primaryWhite"
                >
                  Log Out
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/auth/login"
                    className="rounded-md bg-secondaryLiteBlue px-4 py-1 text-sm text-primaryDarkBlue transition hover:bg-primaryDarkBlue hover:text-primaryWhite"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="rounded-md border border-primary px-4 py-1 text-sm text-primaryDarkBlue transition hover:bg-primaryDarkBlue hover:text-primaryWhite"
                  >
                    Register
                  </Link>
                </div>
              )}
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
                    {wishlist ? wishlist.data.length : "0"}
                  </span>
                  <span className="mt-1">Wishlist</span>
                </div>
              </Link>
              <Link href="/cart" onClick={onClose}>
                <div className="relative flex flex-col items-center hover:text-primary">
                  <ShoppingCartOutlined className="text-xl" />
                  <span className="absolute -top-1 right-7 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-primaryBlue text-[10px] text-white">
                    {cart ? cart.cart.length : "0"}
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

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-24 lg:top-[100px] left-1/2 -translate-x-1/2 z-50 mt-2 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] flex flex-col lg:flex-row bg-white border shadow-lg rounded-lg max-h-[80vh]"
        >
          <div className="w-full lg:w-[30%] border-b lg:border-b-0 lg:border-r p-4">
            <h4 className="font-bold text-base mb-2 text-black">Categories</h4>
            <ul>
              {categories
                ?.flatMap((category) =>
                  category.sub_category.flatMap((subCat) =>
                    subCat.sub_sub_category.filter((subSub) =>
                      subSub.title.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                  )
                )
                .map((matchedSubSub) => (
                  <li key={matchedSubSub.id} className="mb-1 text-black">
                    <a
                      className="text-sm hover:text-secondaryBlue"
                      href={`/category?search=${matchedSubSub.title.toLowerCase()}`}
                    >
                      {matchedSubSub.title}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div className="w-full lg:w-[70%] p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[400px]">
            {isLoading ? (
              <div className="flex justify-center items-center w-full py-10">
                <FaSpinner size={40} color="#3b82f6" className="animate-spin text-blue-500 text-3xl" />
              </div>
            ) : (
              mergedProducts?.map((product) => (
                <div key={product._id}>
                  <ProductCard product={product} setIsOpen={setIsOpen} />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
