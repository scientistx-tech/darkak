"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaCamera, FaBell, FaClipboardList, FaShippingFast, FaPenNib } from "react-icons/fa";

const ProfilePage: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+8801234567890");
  const [address, setAddress] = useState("Dhaka, Bangladesh");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 rounded-2xl shadow-2xl bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">My Profile</h2>

      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="relative w-40 h-40">
          <Image
            src={profileImage || "/default-avatar.png"}
            alt="Profile"
            className="rounded-full object-cover w-full h-full border-4 border-primary"
          />
          
          <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer">
            <FaCamera className="text-primary" />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <button className="bg-primary text-white hover:bg-secondary mt-2">Save Changes</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LinkCard
          title="Notifications"
          icon={<FaBell className="text-2xl" />}
          href="/notifications"
        />
        <LinkCard
          title="Order History"
          icon={<FaClipboardList className="text-2xl" />}
          href="/order-history"
        />
        <LinkCard
          title="Track Order"
          icon={<FaShippingFast className="text-2xl" />}
          href="/track-order"
        />
        <LinkCard
          title="Write a Blog"
          icon={<FaPenNib className="text-2xl" />}
          href="/write-blog"
        />
      </div>
    </div>
  );
};

const LinkCard = ({ title, icon, href }: { title: string; icon: React.ReactNode; href: string }) => {
  return (
    <a
      href={href}
      className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl shadow transition-all duration-300"
    >
      <div className="text-primary">{icon}</div>
      <span className="text-lg font-medium text-gray-800 dark:text-gray-100">{title}</span>
    </a>
  );
};

export default ProfilePage;
