"use client";

import React, { useEffect, useState } from "react";
import SendButton from "@/components/Button/SendButton";
import { useGetUserQuery } from "@/redux/services/authApis";
import { useUpdateUserMutation } from "@/redux/services/userApis";
import ClientLoading from "@/app/(root)/components/ClientLoading";
import { toast } from "react-toastify";
import InputField from "./InputField";
import SelectField from "./SelectField";

export default function EditProfile({ refetch }: any) {
  const { data: user, isLoading, isError } = useGetUserQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    anniversary: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        phone: user.phone || "",
        dob: user.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
        gender: user.gender || "",
        maritalStatus: user.marital_status || "",
        anniversary: user.anniversary_date
          ? new Date(user.anniversary_date).toISOString().split("T")[0]
          : "",
      });
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
        marital_status: profile.maritalStatus,
        anniversary_date:
          profile.maritalStatus === "single"
            ? undefined
            : profile.maritalStatus === "divorced"
              ? undefined
              : profile.anniversary,
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
        <InputField
          label="Name"
          value={profile.name}
          placeholder="Enter Your Name"
          onChange={(value) => handleChange("name", value)}
        />
        <InputField
          label="Phone"
          type="tel"
          value={profile.phone}
          placeholder="Enter Your Phone"
          onChange={(value) => handleChange("phone", value)}
        />
        <InputField
          label="Date of Birth"
          type="date"
          value={profile.dob}
          onChange={(value) => handleChange("dob", value)}
        />
        <SelectField
          label="Gender"
          value={profile.gender}
          onChange={(value) => handleChange("gender", value)}
          options={[
            { label: "Select Gender", value: "" },
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
        />
        <SelectField
          label="Marital Status"
          value={profile.maritalStatus}
          onChange={(value) => handleChange("maritalStatus", value)}
          options={[
            { label: "Select Marital Status", value: "" },
            { label: "Married", value: "married" },
            { label: "Single", value: "single" },
            { label: "Divorced", value: "divorced" },
          ]}
        />
        {profile.maritalStatus === "married" && (
          <InputField
            label="Anniversary Date"
            type="date"
            value={profile.anniversary}
            onChange={(value) => handleChange("anniversary", value)}
          />
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <SendButton
          link={handleSubmit}
          text={isUpdating ? "Updating..." : "Update Profile"}
        />
      </div>
    </div>
  );
}
