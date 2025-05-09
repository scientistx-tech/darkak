"use client";

import React, { useEffect, useState } from "react";
import SendButton from "@/components/Button/SendButton";
import { useGetUserQuery } from "@/redux/services/authApis";
import { useUpdateUserMutation } from "@/redux/services/userApis";
import ClientLoading from "@/app/(root)/components/ClientLoading";
import { toast } from "react-toastify";

export default function EditProfile({ refetch }: any) {
  const { data: user, isLoading, isError } = useGetUserQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  // console.log(user);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    anniversary: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: user.dob ? user.dob.split("T")[0] : "",
        gender: user.gender || "",
      }));
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updateUser({
        name: profile.name,
        phone: profile.phone,
        dob: profile.dob,
        gender: profile.gender,
      }).unwrap();
      refetch();
      toast.success("Profile Updated Successfully!");
    } catch (err) {
      console.error("Update Failed:", err);
      toast.error("Failed to update profile.");
    }
  };

  if (isLoading) return <ClientLoading />;
  if (isError) return <p className="text-red-500">Failed to load profile.</p>;

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
            className="peer mt-2 w-full rounded-lg border border-gray-300 px-6 py-3"
            placeholder="Enter Your Name"
            value={profile.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            className="peer mt-2 w-full rounded-lg border border-gray-300 px-6 py-3"
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
            className="peer mt-2 w-full rounded-lg border border-gray-300 px-6 py-3"
            value={profile.dob}
            onChange={(e) => handleChange("dob", e.target.value)}
          />
        </div>

        {/* Gender */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700">
            Gender
          </label>
          <select
            className="peer mt-2 w-full rounded-lg border border-gray-300 px-6 py-3"
            value={profile.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Update Button */}
      <div className="mt-10 flex justify-center">
        <SendButton
          link={handleSubmit}
          text={isUpdating ? "Updating..." : "Update Profile"}
        />
      </div>
    </div>
  );
}
