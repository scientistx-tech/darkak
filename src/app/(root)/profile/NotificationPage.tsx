"use client";

import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";

import product1 from "@/Data/Demo/product-2-1.png";
import product2 from "@/Data/Demo/product-2-3.png";
import product3 from "@/Data/Demo/product-2-4.png";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      image: product1,
      name: "Elegant T-Shirt",
      message: "Your order has been shipped!",
    },
    {
      id: 2,
      image: product2,
      name: "Running Shoes",
      message: "Your delivery is out for shipping!",
    },
    {
      id: 3,
      image: product3,
      name: "Stylish Backpack",
      message: "Your item has been delivered!",
    },
  ]);

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-3xl border bg-gradient-to-tr from-[#ffffff80] via-[#ecf3ff90] to-[#ffffff80] p-10 shadow-2xl backdrop-blur-md">
      <h2 className="mb-12 text-center text-4xl font-bold text-primaryBlue">
        ✨ Notifications
      </h2>

      <div className="space-y-8">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationComponent
              key={notification.id}
              image={notification.image}
              name={notification.name}
              message={notification.message}
              onDelete={() => handleDelete(notification.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No notifications found.</p>
        )}
      </div>
    </div>
  );
}

// Notification Component
interface NotificationProps {
  image: any;
  name: string;
  message: string;
  onDelete: () => void;
}

const NotificationComponent: React.FC<NotificationProps> = ({
  image,
  name,
  message,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#cfd8dc] bg-white/70 p-5 shadow-md backdrop-blur-lg transition-all hover:scale-[1.02] hover:shadow-xl">
      <div className="flex items-center gap-5">
        <Image
          src={image}
          alt={name}
          width={70}
          height={70}
          className="h-[70px] w-[70px] rounded-xl object-cover ring-2 ring-primaryBlue"
        />
        <div>
          <h3 className="text-xl font-semibold text-[#1a237e]">{name}</h3>
          <p className="text-gray-500">{message}</p>
        </div>
      </div>

      <button
        onClick={onDelete}
        className="group relative rounded-full bg-red-500 p-3 text-white transition-all hover:bg-red-600"
      >
        <FaTrash size={18} />
        <span className="absolute right-full mr-2 hidden rounded-md bg-black px-2 py-1 text-xs text-white group-hover:block">
          Delete
        </span>
      </button>
    </div>
  );
};
