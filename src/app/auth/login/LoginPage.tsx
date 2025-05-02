"use client";

import React, { useEffect, useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { FaFacebook, FaGoogle, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SVG from "@/Data/Img/LoginPage.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { setLocalStorage } from "@/utils/localStorage";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const admin = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();
  setLocalStorage("path", pathname);

  useEffect(() => {
    if (!admin) {
      router.replace("/auth/login");
    } else {
      router.replace("/admin");
    }
  }, [admin, router]); // Runs when admin state changes

  if (admin) {
    return null; // Prevent rendering before redirect
  }
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#E6EFFF] px-4">
      {/* Decorative Image */}
      <Image
        alt="img"
        src={SVG}
        className="absolute -top-7 left-[12.5%] hidden h-[200px] w-[200px] opacity-45 md:block"
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="z-10 w-full max-w-md rounded-2xl bg-white px-8 py-10 shadow-lg"
      >
        <h2 className="mb-2 text-center text-3xl font-bold text-[#00153B]">
          Welcome Back
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Login using your social account or email
        </p>

        {/* Social Buttons */}
        <div className="mb-4 flex justify-center gap-4">
          {[FaFacebook, FaGoogle, FaPhoneAlt].map((Icon, index) => (
            <button
              key={index}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5694FF] text-white transition hover:bg-[#003084]"
            >
              <Icon size={20} />
            </button>
          ))}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="h-[1px] w-[45%] bg-gray-200" />
          <p className="text-xs text-gray-400">OR</p>
          <div className="h-[1px] w-[45%] bg-gray-200" />
        </div>

        {/* Email Input */}
        <div className="relative mb-4">
          <label
            htmlFor="email"
            className={`absolute  left-3 transform text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:text-gray-400 ${email ? "top-[-10px] bg-white px-1 text-sm text-primary" : "top-2"} `}
          >
            Email or Phone
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer block w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder=" "
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
        <label
            htmlFor="password"
            className={`absolute  left-3 transform text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:text-gray-400 ${password ? "top-[-10px] bg-white px-1 text-sm text-primary" : "top-2"} `}
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer block w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder=" "
            required
          />
         
          <button
            type="button"
            className="absolute right-4 top-2/4 -translate-y-2/4 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </button>
        </div>

        {/* Forgot password */}
        <div className="mb-4 text-right">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-red-500 underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button className="w-full rounded-lg bg-[#003084] py-2 font-semibold text-white transition hover:bg-[#00153B]">
          Login
        </button>

        {/* Register Prompt */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?
          <Link
            href="/auth/signup"
            className="ml-1 text-[#5694FF] underline hover:text-[#003084]"
          >
            Register Now
          </Link>
        </div>

        {/* Continue as Guest */}
        <div className="mt-6 text-center text-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="h-[1px] w-[45%] bg-gray-200" />
            <p className="text-xs text-gray-400">OR</p>
            <div className="h-[1px] w-[45%] bg-gray-200" />
          </div>
          <Link
            href="/"
            className="font-medium text-[#5694FF] underline hover:text-[#003084]"
          >
            Continue as a Guest
          </Link>
        </div>
      </motion.div>

      {/* Bottom SVG */}
      <Image
        alt="img"
        src={SVG}
        className="absolute -bottom-7 right-[12.5%] hidden h-[200px] w-[200px] opacity-45 md:block"
      />
    </div>
  );
};

export default LoginPage;
