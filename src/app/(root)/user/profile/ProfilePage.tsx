"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaCamera,
  FaBell,
  FaClipboardList,
  FaShippingFast,
  FaPen,
  FaStar,
  FaMapMarkerAlt,
} from "react-icons/fa";

import profile from "@/Data/Img/blank-profile-picture.webp";
import PersonalInfo from "./components/PersonalInfo";
import EditProfile from "./components/EditProfile";
import NotificationPage from "./components/NotificationPage";
import OrderHistory from "./components/OrderHistory";
import TrackOrder from "./components/TrackOrder";
import ReviewHistory from "./components/ReviewHistory";
import ReturnAndRefund from "./components/ReturnAndRefund";

const ProfilePage: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string>("");

  const [activeTab, setActiveTab] = useState<string>("personal"); // default active page

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex h-[60px] w-full items-center justify-center bg-gradient-to-r from-[#00153B] to-[#00286EF2] md:h-[100px]">
        <p className="text-xl text-white md:text-2xl">Profile</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-6 px-2 py-8 md:container md:mx-auto md:flex-row">
        {/* Left Sidebar */}
        <div className="flex w-full flex-col items-center gap-4 md:w-1/3">
          {/* Profile Picture */}
          <div className="relative">
            <Image
              src={profileImage || profile}
              alt="Profile"
              width={200}
              height={200}
              className="h-[200px] w-[200px] rounded-full border-[5px] border-primaryBlue object-cover"
            />
            <label className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-white p-2 shadow-md">
              <FaCamera className="text-gray-600" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Menu */}
          <div className="mt-6 flex w-full flex-col gap-2">
            <button
              onClick={() => setActiveTab("personal")}
              className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
                activeTab === "personal"
                  ? "bg-primaryBlue text-white"
                  : "bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white"
              }`}
            >
              <FaUser />
              Personal information
            </button>

            <button
              onClick={() => setActiveTab("edit")}
              className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
                activeTab === "edit"
                  ? "bg-primaryBlue text-white"
                  : "bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white"
              }`}
            >
              <FaPen />
              Edit profile
            </button>

            <button
              onClick={() => setActiveTab("notification")}
              className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
                activeTab === "notification"
                  ? "bg-primaryBlue text-white"
                  : "bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white"
              }`}
            >
              <FaBell />
              Notification
            </button>

            <button
              onClick={() => setActiveTab("order")}
              className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
                activeTab === "order"
                  ? "bg-primaryBlue text-white"
                  : "bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white"
              }`}
            >
              <FaClipboardList />
              Order History
            </button>

            <button
              onClick={() => setActiveTab("review")}
              className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
                activeTab === "review"
                  ? "bg-primaryBlue text-white"
                  : "bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white"
              }`}
            >
              <FaStar />
              My Review
            </button>

            <button
              onClick={() => setActiveTab("track")}
              className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
                activeTab === "track"
                  ? "bg-primaryBlue text-white"
                  : "bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white"
              }`}
            >
              <FaMapMarkerAlt />
              Track Order
            </button>

            <button
              onClick={() => setActiveTab("return")}
              className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 transition-all duration-300 ${
                activeTab === "return"
                  ? "bg-primaryBlue text-white"
                  : "bg-[#E6EEFF] hover:bg-primaryBlue hover:text-white"
              }`}
            >
              <FaShippingFast />
              Return & Refund
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-2/3">
          <AnimatePresence mode="wait">
            {activeTab === "personal" && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <PersonalInfo />
              </motion.div>
            )}

            {activeTab === "edit" && (
              <motion.div
                key="edit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <EditProfile />
              </motion.div>
            )}

            {activeTab === "notification" && (
              <motion.div
                key="notification"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <NotificationPage />
              </motion.div>
            )}

            {activeTab === "order" && (
              <motion.div
                key="order"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <OrderHistory />
              </motion.div>
            )}

            {activeTab === "track" && (
              <motion.div
                key="track"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <TrackOrder />
              </motion.div>
            )}
            {activeTab === "return" && (
              <motion.div
                key="return"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ReturnAndRefund />
              </motion.div>
            )}
            {activeTab === "review" && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ReviewHistory />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
