"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";
import { setLocalStorage } from "@/utils/localStorage";
import InputField from "../signup/components/InputField";
import SocialButton from "../signup/components/SocialButton";
import { useEmailLoginMutation } from "@/redux/services/authApis";
import { toast } from "react-toastify";
import { setUser } from "@/redux/slices/authSlice";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useEmailLoginMutation();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  setLocalStorage("path", pathname);

  useEffect(() => {
    if (user?.isAdmin) return router.replace("/admin");
    if(user?.isSeller) return router.replace('/seller')
      if(user) return router.replace('/user/profile')
   
  }, [user, router]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setUser(res));
      toast.success("Login successful!");
      // router.push("/");
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed!");
    }
  };

  if (user) return null;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primaryBlue px-4">
    

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

        <SocialButton />

        <div className="mb-4 flex items-center justify-between">
          <div className="h-[1px] w-[45%] bg-gray-200" />
          <p className="text-xs text-gray-400">OR</p>
          <div className="h-[1px] w-[45%] bg-gray-200" />
        </div>

        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          id="password"
          label="Enter Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPasswordToggle={true}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <div className="mb-4 text-right">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-red-500 underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full rounded-lg bg-primaryBlue py-2 font-semibold text-white transition hover:bg-primary disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?
          <Link
            href="/auth/signup"
            className="ml-1 text-[#5694FF] underline hover:text-[#003084]"
          >
            Register Now
          </Link>
        </div>

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

      
    </div>
  );
};

export default LoginPage;
