"use client";

import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaHeart,
  FaMapMarkerAlt,
} from "react-icons/fa";

const PersonalInfo: React.FC = () => {
  const userInfo = {
    name: "Mr. xyz",
    email: "example@gmail.com",
    phone: "0123456789",
    dob: "01 Apr 2025",
    maritalStatus: "Married",
    anniversary: "01 Apr 2025",
    address: "Kazipara, Mirpur-10, Dhaka",
  };

  return (
    <div className="w-full rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-[#f0f4ff] to-[#e4ecff] p-10 shadow-xl transition-all hover:shadow-2xl">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-[#1e3a8a]">
          Personal Profile
        </h2>
      </div>

      {/* Information */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <InfoItem icon={<FaUser />} label="Name" value={userInfo.name} />
        <InfoItem icon={<FaEnvelope />} label="Email" value={userInfo.email} />
        <InfoItem icon={<FaPhone />} label="Phone" value={userInfo.phone} />
        <InfoItem
          icon={<FaBirthdayCake />}
          label="Date of Birth"
          value={userInfo.dob}
        />
        <InfoItem
          icon={<FaHeart />}
          label="Marital Status"
          value={userInfo.maritalStatus}
        />
        <InfoItem
          icon={<FaBirthdayCake />}
          label="Anniversary Date"
          value={userInfo.anniversary}
        />
        <InfoItem
          icon={<FaMapMarkerAlt />}
          label="Address"
          value={userInfo.address}
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
