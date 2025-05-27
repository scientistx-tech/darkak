"use client";

import React from "react";
import Image from "next/image";
import { useGetNotificationsQuery } from "@/redux/services/client/notification";

export default function NotificationPage() {
  const { data, isLoading, isError, error, refetch } =
    useGetNotificationsQuery();

  const [notifications, setNotifications] = React.useState(
    data?.notification || [],
  );

  React.useEffect(() => {
    if (data?.notification) {
      setNotifications(data.notification);
    }
  }, [data]);

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-3xl border bg-gradient-to-tr from-[#ffffff80] via-[#ecf3ff90] to-[#ffffff80] p-10 shadow-2xl backdrop-blur-md">
      <h2 className="mb-6 text-center text-2xl font-semibold text-primaryBlue md:mb-12 md:text-4xl">
        ✨ Notifications
      </h2>

      {isLoading && (
        <p className="animate-pulse text-center text-gray-500">
          Loading notifications...
        </p>
      )}

      {isError && (
        <p className="text-center text-red-500">
          Failed to load notifications.{" "}
          <button onClick={refetch} className="underline">
            Try again
          </button>
        </p>
      )}

      {!isLoading && notifications.length === 0 && (
        <p className="text-center text-gray-600">No notifications found.</p>
      )}

      <div className="space-y-4">
        {!isLoading &&
          notifications.map((notification) => (
            <NotificationComponent
              key={notification.id}
              image={notification.image}
              name={notification.title}
              message={notification.message}
              onDelete={() => handleDelete(notification.id)}
            />
          ))}
      </div>
    </div>
  );
}

// Notification Component
interface NotificationProps {
  image: string | null;
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
    <div className="flex items-center justify-between rounded-2xl border border-[#cfd8dc] bg-white/70 p-4 shadow-md backdrop-blur-lg transition-all hover:scale-[1.02] hover:shadow-xl">
      <div className="flex items-center gap-5">
        <Image
          src={image || "https://cdn.pixabay.com/photo/2015/12/16/17/41/bell-1096280_1280.png"} // fallback image
          alt={name}
          width={70}
          height={70}
          className="h-[70px] w-[70px] rounded-xl object-cover "
        />
        <div>
          <h3 className="text-xl font-semibold text-[#1a237e]">{name}</h3>
          <p className="text-gray-500">{message}</p>
        </div>
      </div>

      {/* Uncomment if you want a delete button */}
      {/* <button
        onClick={onDelete}
        className="group relative rounded-full bg-red-500 p-3 text-white transition-all hover:bg-red-600"
      >
        <FaTrash size={18} />
        <span className="absolute right-full mr-2 hidden rounded-md bg-black px-2 py-1 text-xs text-white group-hover:block">
          Delete
        </span>
      </button> */}
    </div>
  );
};
