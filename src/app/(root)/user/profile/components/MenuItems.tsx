import React from "react";
import {
  FaUser,
  FaBell,
  FaClipboardList,
  FaShippingFast,
  FaPen,
  FaStar,
  FaMapMarkerAlt,
} from "react-icons/fa";

// Define the type for allowed tab names
type TabKey =
  | "personal"
  | "edit"
  | "notification"
  | "order"
  | "review"
  | "track"
  | "return";

// Props interface
interface MenuItemsProps {
  activeTab: String;
  setActiveTab: (tab: TabKey) => void;
}

const MenuItems: React.FC<MenuItemsProps> = ({ setActiveTab, activeTab }) => {
  return (
    <div>
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
  );
};

export default MenuItems;
