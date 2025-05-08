"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SVG from "@/Data/Img/LoginPage.svg";
import EmailInput from "./EmailInput";
import OTPInputs from "./OTPInputs";
import {
  usePasswordResetMailMutation,
  useVerifyEmailOTPMutation,
} from "@/redux/services/authApis";
import { toast } from "react-toastify";

const ForgotPasswordPage: React.FC = () => {
  // const router = useRouter();
  const [email, setEmail] = useState("");
  // const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  // const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const [sendOtp, { isLoading: sendingOtp }] = usePasswordResetMailMutation();
  const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyEmailOTPMutation();

  useEffect(() => {
    if (isOtpSent && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer <= 0) {
      setResendDisabled(false);
    }
  }, [isOtpSent, timer]);

  // const handleOtpChange = (index: number, value: string) => {
  //   const newOtp = [...otp];
  //   newOtp[index] = value;
  //   setOtp(newOtp);
  // };

  const handleSendOtp = async () => {
    if (!email) return toast.info("Please enter your email.");

    try {
      await sendOtp(email).unwrap();
      toast.success("Please check your email!");
      setIsOtpSent(true);
      // setIsSubmitEnabled(true);
      setTimer(60);
      setResendDisabled(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP.");
    }
  };

  // const handleVerifyOtp = async () => {
  //   const fullOtp = otp.join("");
  //   if (!email || fullOtp.length !== 6) {
  //     alert("Please enter the full OTP.");
  //     return;
  //   }

  //   try {
  //     await verifyOtp({ email, otp: fullOtp }).unwrap();
  //     router.push("/auth/change-password"); // Navigate after verification
  //   } catch (error) {
  //     console.error("OTP verification failed:", error);
  //     alert("Invalid OTP. Please try again.");
  //   }
  // };

  return (
    <div className="flex h-screen items-center justify-center bg-[#E6EFFF]">
      <Image
        alt="img"
        src={SVG}
        className="absolute left-[12.5%] top-4 hidden h-[200px] w-[200px] opacity-45 md:block"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="z-10 flex w-[90%] flex-col items-center justify-center rounded-lg bg-white p-6 shadow md:w-[60%]"
      >
        <p className="mb-1 text-2xl font-medium text-secondary">
          Reset Password
        </p>
        <p className="text-[15px]">
          We will send a verification to your e-mail
        </p>

        <EmailInput value={email} onChange={setEmail} />

        <button
          className={`my-4 w-[90%] rounded-lg bg-[#003084] py-2 font-semibold text-white transition hover:bg-[#00153B] md:w-[70%] ${
            sendingOtp && "opacity-50"
          }`}
          onClick={handleSendOtp}
          disabled={sendingOtp}
        >
          {isOtpSent ? "Resend OTP" : "Send for OTP"}
        </button>

        {/* <p className="text-[15px]">Your 6-digit code goes here</p>
        <OTPInputs otp={otp} onChange={handleOtpChange} /> */}

        {isOtpSent && (
          <p className="text-[14px]">
            <button
              className={`font-medium text-secondary ${
                resendDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-transparent hover:text-primary"
              }`}
              onClick={handleSendOtp}
              disabled={resendDisabled}
            >
              Resend OTP
            </button>{" "}
            in <span className="text-primary">{timer}s</span>
          </p>
        )}

        {/* <button
          className={`mt-4 w-[90%] rounded-lg bg-[#003084] py-2 font-semibold text-white transition hover:bg-[#00153B] md:w-[70%] ${
            !isSubmitEnabled || verifyingOtp
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
          onClick={handleVerifyOtp}
          disabled={!isSubmitEnabled || verifyingOtp}
        >
          Submit
        </button> */}

        <div className="mt-5 flex font-medium">
          <p>Don&apos;t Have an account?</p>
          <Link
            href="/auth/signup"
            className="ml-1 text-primary transition-all hover:text-primaryBlue hover:underline"
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
            className="text-primary transition-all hover:text-primaryBlue hover:underline"
          >
            Continue as a Guest
          </Link>
        </div>
      </motion.div>

      <Image
        alt="img"
        src={SVG}
        className="absolute bottom-4 right-[12.5%] hidden h-[200px] w-[200px] opacity-45 md:block"
      />
    </div>
  );
};

export default ForgotPasswordPage;
