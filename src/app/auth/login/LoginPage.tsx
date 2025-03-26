"use client";

import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { FaFacebook, FaGoogle, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import SVG from "@/Data/Img/LoginPage.svg";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Image
        alt="img"
        src={SVG}
        className="absolute left-[12.5%] top-5 hidden h-[200px] w-[200px] opacity-45 md:block"
      />

      <div className="z-10 flex w-[90%] flex-col items-center justify-center rounded-lg bg-white p-6 shadow md:w-[60%]">
        <p className="mb-1 text-2xl font-medium text-secondary">
          Login to Your Account
        </p>

        <p className="text-[15px]">Login using social network</p>

        <div className="mb-2 mt-5 flex w-[90%] items-center justify-center gap-3 md:w-[70%]">
          <button className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary text-3xl text-secondary hover:bg-secondary hover:text-primary">
            <FaFacebook />
          </button>

          <button className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary text-3xl text-secondary hover:bg-secondary hover:text-primary">
            <FaGoogle />
          </button>

          <button className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary text-2xl text-secondary hover:bg-secondary hover:text-primary">
            <FaPhoneAlt />
          </button>
        </div>

        <div className="mb-2 flex w-[90%] items-center justify-around md:w-[70%]">
          <div className="h-[1px] w-[45%] bg-yellow-200" />{" "}
          <p className="text-[10px]">OR</p>{" "}
          <div className="h-[1px] w-[45%] bg-yellow-200" />
        </div>

        {/* Email or Phone Input */}
        <div className="relative mb-4 w-[90%] md:w-[70%]">
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer block w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
          <label
            htmlFor="email"
            className={`absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-400 ${email ? "-top-[2px] bg-white px-1 text-sm text-primary" : ""} `}
          >
            Email or Phone
          </label>
        </div>

        {/* Password Input */}
        <div className="relative mb-4 w-[90%] md:w-[70%]">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer block w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
          <label
            htmlFor="password"
            className={`absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-400 ${password ? "-top-[2px] bg-white px-1 text-sm text-primary" : ""} `}
          >
            Password
          </label>
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </button>
        </div>

        <div className="mb-4 flex w-[90%] justify-end md:w-[70%]">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-red-500 underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button className="w-[90%] rounded-lg border border-primary bg-primary py-1.5 text-xl font-medium text-secondary hover:bg-transparent hover:text-primary md:w-[70%]">
          Login
        </button>

        <div className="mt-5 flex font-medium">
          <p>Don&apos;t Have an account?</p>
          <Link
            href="/auth/signup"
            className="ml-1 text-secondary underline hover:text-primary"
          >
            Register Now
          </Link>
        </div>

        <div className="mt-3 flex w-[90%] items-center justify-around md:w-[70%]">
          <div className="h-[1px] w-[45%] bg-yellow-200" />{" "}
          <p className="text-[10px]">OR</p>{" "}
          <div className="h-[1px] w-[45%] bg-yellow-200" />
        </div>

        <div className="mt-3 flex font-medium">
          <Link
            href="/"
            className="ml-1 text-secondary underline hover:text-primary"
          >
            Continue as a Guest
          </Link>
        </div>
      </div>

      <Image
        alt="img"
        src={SVG}
        className="absolute bottom-5 right-[12.5%] hidden h-[200px] w-[200px] opacity-45 md:block"
      />
    </div>
  );
};

export default LoginPage;
