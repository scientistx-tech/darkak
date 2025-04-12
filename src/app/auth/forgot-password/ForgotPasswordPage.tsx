"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import SVG from "@/Data/Img/LoginPage.svg";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleResend = () => {
    setTimer(60);
    setResendDisabled(true);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Image
        alt="img"
        src={SVG}
        className="absolute left-[12.5%] top-4 hidden h-[200px] w-[200px] opacity-45 md:block"
      />

      <div className="z-10 flex w-[90%] flex-col items-center justify-center rounded-lg bg-white p-6 shadow md:w-[60%]">
        <p className="mb-1 text-2xl font-medium text-secondary">
          Reset Password
        </p>

        <p className="text-[15px]">
          We will send a verification to your e-mail
        </p>

        {/* Email or Phone Input */}
        <div className="relative mt-5 w-[90%] md:w-[70%]">
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
            className={`absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-400 ${email ? "top-[-2px] bg-white px-1 text-sm text-primary" : ""}`}
          >
            Email or Phone
          </label>
        </div>

        <button className="mb-5 mt-5 w-[90%] rounded-lg border border-primary bg-primary py-1.5 text-xl font-medium text-secondary hover:bg-transparent hover:text-primary md:w-[70%]">
          Send for OTP
        </button>

        <p className="text-[15px]">Your 6-digit code goes here</p>

        {/* OTP Input Here */}
        <div className="relative mb-4 mt-2 flex w-[90%] justify-evenly md:w-[70%]">
          <input
            type="text"
            id="otp"
            maxLength={1}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="peer block w-[50px] rounded border border-gray-300 bg-white p-2 text-center leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />

          <input
            type="text"
            id="otp"
            maxLength={1}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="peer block w-[50px] rounded border border-gray-300 bg-white p-2 text-center leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />

          <input
            type="text"
            id="otp"
            maxLength={1}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="peer block w-[50px] rounded border border-gray-300 bg-white p-2 text-center leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />

          <input
            type="text"
            id="otp"
            maxLength={1}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="peer block w-[50px] rounded border border-gray-300 bg-white p-2 text-center leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />

          <input
            type="text"
            id="otp"
            maxLength={1}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="peer block w-[50px] rounded border border-gray-300 bg-white p-2 text-center leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />

          <input
            type="text"
            id="otp"
            maxLength={1}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="peer block w-[50px] rounded border border-gray-300 bg-white p-2 text-center leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
        </div>

        {/* Resend OTP Timer */}
        <p className="text-[14px]">
          <button
            className={`font-medium text-secondary ${resendDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-transparent hover:text-primary"}`}
            onClick={handleResend}
            disabled={resendDisabled}
          >
            Resend OTP
          </button>{" "}
          in <span className="text-primary">{timer}s</span>
        </p>

        <button className="mt-5 w-[90%] rounded-lg border border-primary bg-primary py-1.5 text-xl font-medium text-secondary hover:bg-transparent hover:text-primary md:w-[70%]">
          Submit
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
          <div className="h-[1px] w-[45%] bg-yellow-200" />
          <p className="text-[10px]">OR</p>
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
        className="absolute bottom-4 right-[12.5%] hidden h-[200px] w-[200px] opacity-45 md:block"
      />
    </div>
  );
};

export default ForgotPasswordPage;
