"use client"
import Link from "next/link";
import React, { useMemo, useRef } from "react";
import { notification  } from 'antd';

import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

import img1 from "@/Data/Img/app_store_badge.svg";
import img2 from "@/Data/Img/google_play_badge.svg";
import imgBg from "@/Data/Img/Rectangle 136.jpeg";
import Image from "next/image";



function Footer() {
  const [api, contextHolder] = notification.useNotification();
  const inputRef = useRef<HTMLInputElement>(null);

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  const openNotification = (
    type: 'success' | 'error' | 'warning',
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
      placement: "topRight",
    });
  };

  const handleSubscribe = () => {
    const email = inputRef.current?.value.trim() || "";

    if (!email) {
      openNotification("warning", "Email Required", "Please enter your email.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      openNotification("error", "Invalid Email", "Please enter a valid email address.");
    } else {
      openNotification("success", "Subscribed", "You've successfully subscribed.");
      console.log(email);
      if (inputRef.current) inputRef.current.value = "";
    }
  };


  return (
    <div className="w-full">
      {contextHolder}
      <div className="h-[100px] w-full" />
      <div className="relative w-full bg-gradient-to-b from-[#00153B] to-[#003084] md:h-[500px]">
        <Image
          alt=""
          src={imgBg}
          className="hidden md:block h-full w-full object-cover opacity-10 md:absolute"
        />
        <div className="absolute flex w-full flex-col bg-[#003084] md:bg-transparent md:flex-row">
          {/* Left-side */}
          <div className="w-full pl-5 md:w-2/3 md:pl-10">
            <div className="right-5 mt-[-65px] flex w-[97%] flex-col items-center justify-center rounded-md bg-[#F1F6FF] px-3 py-6 shadow-2xl md:w-[50%]">
              <p className="text-xl font-semibold text-[#003084]">
                SUBSCRIBE TO OUR NEWSLETTER
              </p>
              <div className="mt-5 w-[80%] rounded-full bg-white">
                <input
                ref={inputRef}
                  className="w-2/3 rounded-l-full border-none py-2 pl-4 outline-none"
                  type="text"
                  placeholder="Your email goes here..."
                />
                <button onClick={handleSubscribe} className="w-1/3 rounded-r-full bg-primary py-2 text-white transition-all duration-500 ease-in-out hover:bg-[#003084]">
                  SUBSCRIBE
                </button>
              </div>
            </div>

            <div className="md:hidden flex w-full justify-end">
              <div className="bg-primary mt-[40px] w-[80%] rounded-bl-full rounded-tl-full px-3 py-2 text-white md:hidden">
                <p className="text-end font-medium">
                  Have a Great Time and keep shopping with DARKAK
                </p>
              </div>
            </div>

            <div className="mt-6 flex w-full flex-col md:flex-row">
              <div className="flex w-full flex-col md:w-2/3">
                <div className="flex w-full">
                  <div className="flex w-1/2 flex-col">
                    <p className="mb-5 text-xl text-[#BBD4FF]">Quick Links</p>

                    <Link href="/" className="text-[#F6F6F6] hover:text-white">
                      Home
                    </Link>
                    <Link
                      href="/shop"
                      className="mt-3 text-[#F6F6F6] hover:text-white"
                    >
                      Shop
                    </Link>
                    <Link
                      href="/product"
                      className="mt-3 text-[#F6F6F6] hover:text-white"
                    >
                      Product
                    </Link>
                    <Link
                      href="/contact-us"
                      className="mt-3 text-[#F6F6F6] hover:text-white"
                    >
                      Contact Us
                    </Link>
                  </div>
                  <div className="flex w-1/2 flex-col">
                    <p className="mb-5 text-xl text-[#BBD4FF]">Support</p>

                    <Link
                      href="/about-us"
                      className="text-[#F6F6F6] hover:text-white"
                    >
                      About Us
                    </Link>
                    <Link
                      href="/privacy-policy"
                      className="mt-3 text-[#F6F6F6] hover:text-white"
                    >
                      Privacy policy
                    </Link>
                    <Link
                      href="/terms-and-condition"
                      className="mt-3 text-[#F6F6F6] hover:text-white"
                    >
                      Terms and Condition
                    </Link>
                    <Link
                      href="/faq"
                      className="mt-3 text-[#F6F6F6] hover:text-white"
                    >
                      FAQ
                    </Link>
                  </div>
                </div>

                <p className="mt-8 hidden text-2xl text-[#BBD4FF] md:block">
                  Download Our Mobile App
                </p>
                <div className="mt-5 hidden justify-start gap-5 md:flex">
                  <button className="h-[50px] w-auto opacity-70 hover:opacity-100 transition-all duration-500 ease-in-out">
                    <Image src={img1} alt="" className="h-full w-full" />
                  </button>

                  <button className="h-[50px] w-auto opacity-70 hover:opacity-100 transition-all duration-500 ease-in-out">
                    <Image src={img2} alt="" className="h-full w-full" />
                  </button>
                </div>
              </div>
              <div className="mt-8 flex flex-col md:mt-0 md:w-1/3">
                <p className="mb-5 text-xl text-[#BBD4FF]">
                  Product Categories
                </p>

                <Link
                  href="/categories/"
                  className="text-[#F6F6F6] hover:text-white"
                >
                  Electronics
                </Link>
                <Link
                  href="/categories/"
                  className="mt-3 text-[#F6F6F6] hover:text-white"
                >
                  Clothing
                </Link>
                <Link
                  href="/categories/"
                  className="mt-3 text-[#F6F6F6] hover:text-white"
                >
                  Groceries
                </Link>
                <Link
                  href="/categories/"
                  className="mt-3 text-[#F6F6F6] hover:text-white"
                >
                  Accessories
                </Link>
                <Link
                  href="/categories/"
                  className="mt-3 text-[#F6F6F6] hover:text-white"
                >
                  Shoes
                </Link>
                <Link
                  href="/categories/"
                  className="mt-3 text-[#F6F6F6] hover:text-white"
                >
                  Books
                </Link>
              </div>

              <p className="mt-8 block text-2xl text-[#BBD4FF] md:hidden">
                Download Our Mobile App
              </p>
              <div className="mt-5 flex justify-start gap-5 md:hidden">
                <button className="h-[40px] w-auto">
                  <Image src={img1} alt="" className="h-full w-full" />
                </button>

                <button className="h-[40px] w-auto">
                  <Image src={img2} alt="" className="h-full w-full" />
                </button>
              </div>
            </div>
          </div>

          {/* Right-side */}
          <div className="flex w-full flex-col items-start justify-start pl-5 md:w-1/3 md:items-end md:pl-0">
            <div className="bg-primary mt-[-40px] hidden w-[100%] rounded-bl-full rounded-tl-full px-3 py-5 text-white md:block">
              <p className="text-end text-lg font-medium">
                Have a Great Time and keep shopping with DARKAK
              </p>
            </div>
            <div className="flex flex-col items-start justify-center md:items-end md:pr-10">
              <p className="mt-5 text-2xl font-medium text-[#BBD4FF] md:mt-16">
                Get 10% Discount on first LOGIN
              </p>

              <Link
                href="/auth/signup"
                className="mt-5 rounded-full border-[2px] border-primary bg-primary px-4 py-1 text-xl font-medium text-white transition-all duration-500 ease-in-out hover:bg-transparent hover:text-primary md:py-2"
              >
                Register now
              </Link>

              <p className="mt-8 text-xl text-[#BBD4FF]">Contact</p>

              <p className="mt-3 text-[#F6F6F6] opacity-55 transition-all duration-500 ease-in-out hover:text-white hover:opacity-100">
                Email:{" "}
                <a href="mailto:info@darkak.com.bd" className="hover:underline">
                  {" "}
                  info@darkak.com.bd
                </a>
              </p>
              <p className="mt-3 text-[#F6F6F6] opacity-55 transition-all duration-500 ease-in-out hover:text-white hover:opacity-100">
                Phone:{" "}
                <a href="tel:01915665089" className="hover:underline">
                  01915665089
                </a>
              </p>
              <p className="mt-3 text-[#F6F6F6] opacity-55 transition-all duration-500 ease-in-out hover:text-white hover:opacity-100">
                Address: Upashahar , Bogura -5800
              </p>

              <p className="mt-8 text-xl text-[#BBD4FF]">Stay Connected</p>

              <div className="mb-[100px] mt-3 flex gap-4 md:mb-0">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primaryDarkBlue flex h-[40px] w-[40px] items-center justify-center rounded-full text-lg text-white transition-all duration-500 ease-in-out hover:bg-primary"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primaryDarkBlue flex h-[40px] w-[40px] items-center justify-center rounded-full text-xl text-white transition-all duration-500 ease-in-out hover:bg-primary"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://wa.me/01915665089"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primaryDarkBlue flex h-[40px] w-[40px] items-center justify-center rounded-full text-xl text-white transition-all duration-500 ease-in-out hover:bg-primary"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

// <p className="">
//           &copy; {new Date().getFullYear()} - DARKAK, All rights are reserved.
//         </p>
