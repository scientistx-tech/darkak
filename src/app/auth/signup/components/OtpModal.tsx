"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useVerifyEmailOTPMutation } from "@/redux/services/authApis";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";

type Props = {
  isVisible: boolean;
  email: string;
  onClose: () => void;
  onResendOtp?: () => void; // optional: pass resend logic
};

const OtpModal: React.FC<Props> = ({
  isVisible,
  onClose,
  email,
  onResendOtp,
}) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [verifyOtp, { isLoading }] = useVerifyEmailOTPMutation();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      dispatch(setUser(res));
      if (res.token) {
        toast.success("Registration Successfull");
        router.push("/");
      }
    } catch (err: any) {
      setError(err?.data?.message || "Failed to verify OTP.");
    }
  };

  const handleResendOtp = () => {
    if (onResendOtp) onResendOtp();
    setTimer(60); // restart timer
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-center text-xl font-semibold text-gray-800">
          Verify Email
        </h2>
        <p className="mb-2 text-center text-sm text-gray-500">
          OTP has been sent to <span className="font-medium">{email}</span>
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-lg tracking-widest outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter 6-digit OTP"
        />

        {error && (
          <p className="mb-3 text-center text-sm text-red-500">{error}</p>
        )}

        <div className="mb-4 flex justify-between">
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Submit OTP"}
          </button>
        </div>

        <div className="mt-3 text-center">
          {timer > 0 ? (
            <p className="text-sm text-gray-500">
              Resend OTP in <span className="font-semibold">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OtpModal;
