"use client";

import React, { useState } from "react";
import { FaPen } from "react-icons/fa";

export default function EditProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    maritalStatus: "",
    anniversary: "",
    address: "",
  });

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border bg-gradient-to-tr from-white via-[#ecf3ff] to-white p-10 shadow-2xl">
      <h2 className="mb-10 text-center text-3xl font-medium text-[#1A237E]">
        Edit Your Profile
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Name */}

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700">
            Name
          </label>
          <input
            className="peer mt-2 w-full rounded-lg border border-gray-300 px-6 py-3 text-gray-900 outline-none focus:border-[#4d77e5] focus:ring-1 focus:ring-[#4d77e5]"
            placeholder="Enter Your Name"
            value={profile.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="peer mt-2 w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-900 outline-none focus:border-[#4d77e5] focus:ring-1 focus:ring-[#4d77e5]"
            placeholder="Enter Your Email"
            value={profile.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            className="peer mt-2 w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-900 outline-none focus:border-[#4d77e5] focus:ring-1 focus:ring-[#4d77e5]"
            placeholder="Enter Your Phone"
            value={profile.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        {/* Date of Birth */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            className="peer mt-2 w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-900 outline-none focus:border-[#4d77e5] focus:ring-1 focus:ring-[#4d77e5]"
            value={profile.dob}
            onChange={(e) => handleChange("dob", e.target.value)}
          />
        </div>

        {/* Marital Status */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700">
            Marital Status
          </label>
          <select
            className="peer mt-2 w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-900 outline-none focus:border-[#4d77e5] focus:ring-1 focus:ring-[#4d77e5]"
            value={profile.maritalStatus}
            onChange={(e) => handleChange("maritalStatus", e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Married">Married</option>
            <option value="Single">Single</option>
            <option value="Divorced">Divorced</option>
          </select>
        </div>

        {/* Anniversary */}
        {profile.maritalStatus === "Married" && (
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700">
              Anniversary Date
            </label>
            <input
              type="date"
              className="peer mt-2 w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-900 outline-none focus:border-[#4d77e5] focus:ring-1 focus:ring-[#4d77e5]"
              value={profile.anniversary}
              onChange={(e) => handleChange("anniversary", e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Address */}
      <div className="relative mt-6">
        <label className="block text-sm font-semibold text-gray-700">
          Address
        </label>
        <textarea
          className="peer mt-2 w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-900 outline-none focus:border-[#4d77e5] focus:ring-1 focus:ring-[#4d77e5]"
          placeholder="Enter Your Address"
          value={profile.address}
          onChange={(e) => handleChange("address", e.target.value)}
          rows={3}
        />
      </div>

      {/* Update Button */}
      <div className="mt-10 flex justify-center">
        <button className="group relative inline-flex items-center overflow-hidden rounded-full border-2 border-primaryBlue px-12 py-3 text-lg font-medium text-primaryBlue hover:bg-gray-50 hover:text-white">
          <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-primaryBlue opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
          <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-300 group-hover:translate-x-0">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="relative">Update Profile</span>
        </button>
      </div>
    </div>
  );
}
