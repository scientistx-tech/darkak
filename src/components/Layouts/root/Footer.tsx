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
import Image from "next/image";

function Footer() {
  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-4 bg-secondary p-10 md:h-[450px]">
        <div className="">
          <p className="mb-10 text-xl font-semibold text-primary md:w-[80%]">
            Get 10% Discount on first LOGIN
          </p>

          <Link
            href="/auth/login"
            className="rounded-full border border-primary bg-primary p-2 pl-4 pr-4 text-secondary hover:bg-transparent hover:text-primary"
          >
            Register now
          </Link>

          <p className="mt-8 font-semibold text-white opacity-80">
            Stay Connected
          </p>

          <div className="mt-2 flex items-center justify-between md:w-[80%]">
            <a className="cursor-pointer rounded-full border border-primary bg-primary p-1.5 pl-2.5 pr-2.5 text-2xl text-secondary hover:bg-transparent hover:text-primary">
              <FacebookOutlined />
            </a>

            <a className="cursor-pointer rounded-full border border-primary bg-primary p-1.5 pl-2.5 pr-2.5 text-2xl text-secondary hover:bg-transparent hover:text-primary">
              <WhatsAppOutlined />
            </a>

            <a className="cursor-pointer rounded-full border border-primary bg-primary p-1.5 pl-2.5 pr-2.5 text-2xl text-secondary hover:bg-transparent hover:text-primary">
              <LinkedinOutlined />
            </a>

            <a className="cursor-pointer rounded-full border border-primary bg-primary p-1.5 pl-2.5 pr-2.5 text-2xl text-secondary hover:bg-transparent hover:text-primary">
              <XOutlined />
            </a>

            <p className="cursor-pointer rounded-full border border-primary bg-primary p-1.5 pl-2.5 pr-2.5 text-2xl text-secondary hover:bg-transparent hover:text-primary">
              <PinterestOutlined />
            </p>
          </div>

          <div className="mt-8 flex">
            <a className="cursor-pointer opacity-60 hover:opacity-90">
              <Image alt="logo" src={img1} className="h-[50px] w-[200px] md:w-auto" />
            </a>

            <a className="cursor-pointer opacity-60 hover:opacity-90">
              <Image alt="logo" src={img2} className="h-[50px] w-[200px] md:w-auto" />
            </a>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-xl font-semibold text-primary">Quick Links</p>

          <Link
            href="/"
            className="mt-5 font-semibold text-white opacity-60 hover:opacity-90"
          >
            Home
          </Link>
          <Link
            href="/"
            className="mt-2 font-semibold text-white opacity-60 hover:opacity-90"
          >
            Profile
          </Link>
          <Link
            href="/"
            className="mt-2 font-semibold text-white opacity-60 hover:opacity-90"
          >
            Product
          </Link>
          <Link
            href="/"
            className="mt-2 font-semibold text-white opacity-60 hover:opacity-90"
          >
            Blogs
          </Link>
          <Link
            href="/"
            className="mt-2 font-semibold text-white opacity-60 hover:opacity-90"
          >
            Contact Us
          </Link>
        </div>

        <div className="flex flex-col">
          <p className="text-xl font-semibold text-primary">
            Product Categories
          </p>

          <Link
            href="/"
            className="mt-5 font-semibold text-white opacity-60 hover:opacity-90"
          >
            Categories-1
          </Link>
          <Link
            href="/"
            className="mt-2 font-semibold text-white opacity-60 hover:opacity-90"
          >
            Categories-2
          </Link>
          <Link
            href="/"
            className="mt-2 font-semibold text-white opacity-60 hover:opacity-90"
          >
            Categories-3
          </Link>
          <Link
            href="/"
            className="mt-2 font-semibold text-white opacity-60 hover:opacity-90"
          >
            Categories-4
          </Link>
          <Link
            href="/"
            className="mt-2 font-semibold text-white opacity-60 hover:opacity-90"
          >
            Categories-5
          </Link>
        </div>

        <div className="flex flex-col">
          <p className="mb-5 text-xl font-semibold text-primary">DARKAK</p>

          <p>
            Darkak is a Bangladeshi e-commerce site offering quality products,
            fast delivery, and secure payments for a seamless shopping
            experience.
          </p>

          <p className="mb-5 mt-5 font-semibold text-white opacity-80">
            Contact:
          </p>

          <p>
            <samp className="text-white opacity-60">Email:</samp>{" "}
            info@darkak.com.bd{" "}
          </p>
          <p>
            {" "}
            <samp className="text-white opacity-60">Phone:</samp> 01915665089
          </p>
          <p>
            {" "}
            <samp className="text-white opacity-60">Address:</samp> Upashahar ,
            Bogura -5800
          </p>
        </div>
      </div>

      <div className="flex h-[50px] w-full items-center justify-center bg-[#D9D9D9]">
        <p className="">
          &copy; {new Date().getFullYear()} - DARKAK, All rights are reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
