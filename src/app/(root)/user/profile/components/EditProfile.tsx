"use client";

import React, { use, useEffect, useState } from "react";
import SendButton from "@/components/Button/SendButton";
import { useGetUserQuery } from "@/redux/services/authApis";
import {
  useUpdateUserAddressMutation,
  useUpdateUserMutation,
} from "@/redux/services/userApis";
import ClientLoading from "@/app/(root)/components/ClientLoading";
import { toast } from "react-toastify";
import InputField from "./InputField";
import SelectField from "./SelectField";
import {
  rawDistricts,
  rawDivisions,
  rawSubDistricts,
} from "../../../../../../public/addressData";

export default function EditProfile({ refetch, data }: any) {
  const [updateUserAddress, { isLoading: isUpdatingAddress }] =
    useUpdateUserAddressMutation();

  const divisions = rawDivisions;
  const districts = rawDistricts;
  const subDistricts = rawSubDistricts;

  const [address, setAddress] = useState({
    area: "",
    division: "",
    divisionId: "",
    district: "",
    districtId: "",
    sub_district: "",
  });
  useEffect(() => {
    if (data.address) {
      const selectedDivision = divisions.find(
        (d) => d.name === data.address.division
      );
      const selectedDistrict = districts.find(
        (d) => d.name === data.address.district
      );
      const selectedSubDistrict = subDistricts.find(
        (sd) => sd.name === data.address.sub_district
      );

      setAddress({
        area: data.address.area,
        division: selectedDivision?.name || "",
        divisionId: selectedDivision?.id || "",
        district: selectedDistrict?.name || "",
        districtId: selectedDistrict?.id || "",
        sub_district: selectedSubDistrict?.name || "",
      });
    }
  }, [data]);
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

  //address part

  const handleDivisionChange = (value: string) => {
    const selected = divisions.find((d) => d.name === value);
    setAddress((prev) => ({
      ...prev,
      division: selected?.name || "",
      divisionId: selected?.id || "",
      district: "",
      districtId: "",
      sub_district: "",
    }));
  };

  const handleDistrictChange = (value: string) => {
    const selected = districts.find((d) => d.name === value);
    setAddress((prev) => ({
      ...prev,
      district: selected?.name || "",
      districtId: selected?.id || "",
      sub_district: "",
    }));
  };

  const handleSubDistrictChange = (value: string) => {
    setAddress((prev) => ({
      ...prev,
      sub_district: value,
    }));
  };

  const handleAreaChange = (value: string) => {
    setAddress((prev) => ({ ...prev, area: value }));
  };

  const handleAddressSubmit = async () => {
    const finalAddress = {
      area: address.area,
      division: address.division,
      district: address.district,
      sub_district: address.sub_district,
    };

    try {
      await updateUserAddress(finalAddress).unwrap();
      refetch()
      toast.success("Address updated successfully!");
    } catch (error) {
      console.error("Address update failed:", error);
      toast.error("Failed to update address.");
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
      {/* <hr className="mt-6" /> */}
      <h2 className="my-10 text-center text-2xl font-semibold text-primaryBlue md:text-4xl">
        Address Details
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SelectField
          label="Division"
          value={address.division}
          onChange={handleDivisionChange}
          options={[
            { label: "Select Division", value: "" },
            ...divisions.map((d) => ({
              label: d.name,
              value: d.name,
            })),
          ]}
        />

        <SelectField
          label="District"
          value={address.district}
          onChange={handleDistrictChange}
          options={[
            { label: "Select District", value: "" },
            ...districts
              .filter((d) => d.divisionId === address.divisionId)
              .map((d) => ({
                label: d.name,
                value: d.name,
              })),
          ]}
        />

        <SelectField
          label="Sub-District"
          value={address.sub_district}
          onChange={handleSubDistrictChange}
          options={[
            { label: "Select Sub-District", value: "" },
            ...subDistricts
              .filter((sd) => sd.districtId === address.districtId)
              .map((sd) => ({
                label: sd.name,
                value: sd.name,
              })),
          ]}
        />
      </div>
      <div className="pt-3 md:max-w-[50%] md:pr-3">
        <InputField
          label="Area"
          value={address.area}
          placeholder="Enter Area"
          onChange={handleAreaChange}
        />
      </div>
      <div className="mt-10 flex justify-center">
        <SendButton
          link={handleAddressSubmit}
          text={isUpdatingAddress ? "Updating Address..." : "Update Address"}
        />
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
