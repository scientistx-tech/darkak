"use client";

import React from "react";
import ClientLoading from "@/app/(root)/components/ClientLoading";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaHeart,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { User } from "@/types/userTypes";

// Props for PersonalInfo component
interface PersonalInfoProps {
  data?: User;
  isLoading: boolean;
  isError: boolean;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  data,
  isLoading,
  isError,
}) => {
  if (isLoading) return <ClientLoading />;
  if (isError || !data)
    return <p className="text-red-500">Failed to load user data.</p>;

  const user = data;

  return (
    <div className="w-full rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-[#f0f4ff] to-[#e4ecff] p-10 shadow-xl transition-all hover:shadow-2xl">
      <div className="mb-6 flex items-center justify-between md:mb-12">
        <h2 className="text-3xl font-semibold text-[#1e3a8a]">
          Personal Profile
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <InfoItem icon={<FaUser />} label="Name" value={user.name} />
        <InfoItem icon={<FaEnvelope />} label="Email" value={user.email} />
        <InfoItem
          icon={<FaPhone />}
          label="Phone"
          value={user.phone ?? "N/A"}
        />
        <InfoItem
          icon={<FaBirthdayCake />}
          label="Date of Birth"
          value={user.dob?.split("T")[0] ?? "N/A"}
        />
        <InfoItem
          icon={<FaHeart />}
          label="Gender"
          value={user.gender ?? "N/A"}
        />
        <InfoItem
          icon={<FaMapMarkerAlt />}
          label="Address"
          value="Not Provided"
          fullWidth
        />
      </div>
    </div>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  fullWidth?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({
  icon,
  label,
  value,
  fullWidth,
}) => {
  return (
    <div
      className={`flex items-start gap-4 ${fullWidth ? "md:col-span-2" : ""}`}
    >
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a8a] text-white">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 text-lg font-semibold text-[#00153B]">{value}</p>
      </div>
    </div>
  );
};

export default PersonalInfo;
