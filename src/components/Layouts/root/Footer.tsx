import Link from "next/link";
import React from "react";

import {
  PinterestOutlined,
  FacebookOutlined,
  WhatsAppOutlined,
  LinkedinOutlined,
  XOutlined,
} from "@ant-design/icons";

import img1 from "@/Data/Img/app_store_badge.svg";
import img2 from "@/Data/Img/google_play_badge.svg";
import imgBg from "@/Data/Img/Rectangle 136.jpeg";
import Image from "next/image";
import FooterNav from "./FooterNav";

function Footer() {
  return (
    <div className="w-full">
      <div className="h-[100px] w-full bg-slate-400" />
      <div className="relative h-[500px] w-full bg-gradient-to-b from-[#00153B] to-[#003084]">
        <Image
          alt=""
          src={imgBg}
          className="absolute h-full w-full object-cover opacity-10"
        />
        <div className="absolute w-full flex">
          <div className="w-2/3 pl-5 md:pl-10">
            <div className="mt-[-65px] flex w-[50%] flex-col items-center justify-center rounded-md bg-[#F1F6FF] px-3 py-6 shadow-2xl">
              <p className="text-xl font-semibold text-[#003084]">
                SUBSCRIBE TO OUR NEWSLETTER
              </p>
              <div className="mt-5 w-[80%] rounded-full bg-white">
                <input
                  className="w-2/3 rounded-l-full border-none py-2 pl-4 outline-none"
                  type="text"
                  placeholder="Your email goes here..."
                />
                <button className="w-1/3 rounded-r-full bg-primary py-2 text-white hover:bg-[#003084]">
                  SUBSCRIBE
                </button>
              </div>
            </div>

            <div className="w-full mt-[70px] flex">
              <div className="flex w-2/3">
                <div className="w-1/2 flex flex-col">
                  <p className="mb-5 text-xl text-[#BBD4FF]">Quick Links</p>

                  <Link href="/" className="text-[#F6F6F6] hover:text-white">Home</Link>
                  <Link href="/shop" className="mt-3 text-[#F6F6F6] hover:text-white">Shop</Link>
                  <Link href="/product" className="mt-3 text-[#F6F6F6] hover:text-white">Product</Link>
                  <Link href="/contact-us" className="mt-3 text-[#F6F6F6] hover:text-white">Contact Us</Link>
                </div>
                <div className="w-1/2"></div>
              </div>
              <div className="w-1/3"></div>
            </div>
          </div>

          <div className="w-1/3">Left</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

// <p className="">
//           &copy; {new Date().getFullYear()} - DARKAK, All rights are reserved.
//         </p>
