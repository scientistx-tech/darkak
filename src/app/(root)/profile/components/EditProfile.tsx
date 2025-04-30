"use client";

import SendButton from "@/components/Button/SendButton";
import React, { useState } from "react";

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

  const handleSubmit = () => {
    // You can replace this with an API call or form submission logic
    console.log("Profile Updated:", profile);
    alert("Profile Updated Successfully!");
  };
  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border bg-gradient-to-tr from-white via-[#ecf3ff] to-white p-10 shadow-2xl">
      <h2 className="mb-6 text-center text-2xl font-semibold text-primaryBlue md:mb-12 md:text-4xl">
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
        <SendButton link={handleSubmit} text="Update Profile" />
      </div>
    </div>
  );
}
