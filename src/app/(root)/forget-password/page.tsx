"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUserPassWordChangeMutation } from "@/redux/services/authApis";

const ChangePasswordPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");
  const code = searchParams.get("code");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [changePassword, { isLoading }] = useUserPassWordChangeMutation();

  useEffect(() => {
    if (!id || !code) {
      setError("Invalid or missing verification link.");
    }
  }, [id, code]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // console.log(id, code, password);

    try {
      const response = await changePassword({
        id,
        code,
        password,
      }).unwrap();

      setSuccessMessage("Password changed successfully!");
      setError("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (err: any) {
      console.log(err);

      setError(err?.data?.message || "Failed to change password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#E6EFFF] px-4">
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow"
      >
        <h2 className="mb-4 text-center text-2xl font-semibold text-secondary">
          Change Password
        </h2>

        {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
        {successMessage && (
          <p className="mb-2 text-sm text-green-600">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded bg-[#003084] py-2 font-semibold text-white hover:bg-[#00153B] disabled:opacity-60"
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ChangePasswordPage;
