import {
  useChangeVendorStatusMutation,
  useGetVendorDetailsByIdAdminQuery,
} from "@/redux/services/admin/adminVendorApis";
import Image from "next/image";
import React from "react";
import { MdDoDisturbOff } from "react-icons/md";
import { FaGlobeAmericas } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaConciergeBell } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ShopOverview = ({ id }: { id: string }) => {
  const { data, isLoading, error, refetch } = useGetVendorDetailsByIdAdminQuery(
    { id: Number(id) },
  );
  const [changeStatus] = useChangeVendorStatusMutation();
  const router = useRouter();

  const handleVendorStatus = async () => {
    try {
      const res = await changeStatus(id).unwrap();
      toast.success(res?.message || "Successfully updated status");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  return (
    <div>
      {/* Main Vendor Card */}
      <div className="rounded bg-white p-4 shadow md:p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded bg-blue-100 p-2 sm:h-28 sm:w-28 md:h-32 md:w-32">
              <Image
                src={data?.seller?.shop_logo}
                alt={data?.seller?.store_name}
                width={100}
                height={100}
                className="h-full w-full rounded object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2
                style={{ textShadow: " #fc0 1px 0 10px" }}
                className="text-lg font-semibold sm:text-xl"
              >
                {data?.seller?.store_name}
              </h2>
              <p className="text-xs text-gray-500 sm:text-sm">
                ⭐ 0 Ratings | 0 Reviews
              </p>
              <button
                onClick={() => router.push(`/vendors/shop-view/${id}`)}
                className="mt-2 flex items-center justify-center gap-1 rounded border border-blue-500 bg-white px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 sm:justify-normal sm:px-4 sm:py-1 sm:text-sm"
              >
                <FaGlobeAmericas className="text-lg" />
                <span>View live</span>
              </button>
            </div>
          </div>
          <button
            onClick={handleVendorStatus}
            className={`flex items-center justify-center gap-2 rounded px-3 py-2 text-xs text-white sm:justify-normal sm:text-sm md:px-4 md:py-2 ${
              data?.seller?.status === "approved"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {data?.seller?.status === "approved" ? (
              <MdDoDisturbOff />
            ) : (
              <FaConciergeBell />
            )}
            <span>
              {data?.seller?.status === "approved"
                ? "Suspend this Vendor"
                : "Active this Vendor"}
            </span>
          </button>
        </div>

        <div className="grid gap-4 text-sm md:grid-cols-3">
          {/* Shop Info */}
          <div className="rounded bg-gray-2 p-3">
            <p className="text-base sm:text-lg">
              Total products:{" "}
              <span
                style={{ textShadow: "#fc0 1px 0 10px" }}
                className="text-xl font-semibold text-blue-700"
              >
                {data?.seller?.user?._count?.products}
              </span>
            </p>
            <p className="mt-3 text-base sm:text-lg">
              Total orders:{" "}
              <span
                style={{ textShadow: "#fc0 1px 0 10px" }}
                className="text-xl font-semibold text-blue-950"
              >
                {data?.totalOrder}
              </span>
            </p>
          </div>

          <div className="text-sm sm:text-base">
            <h3 className="mb-2 font-medium">Shop Information</h3>
            <p className="mt-2 break-words">
              Shop name: {data?.seller?.store_name}
            </p>
            <p>Phone: {data?.seller?.user?.phone}</p>
            <p>Address: {data?.seller?.store_address}</p>
            <p>
              Status:{" "}
              {data?.seller?.status === "approved" ? (
                <span className="font-medium text-green-600">Active</span>
              ) : (
                <span className="font-medium text-red-600">Inactive</span>
              )}{" "}
            </p>
          </div>

          {/* Vendor Info */}
          <div className="text-sm sm:text-base">
            <h3 className="mb-2 font-medium">Vendor Information</h3>
            <p>Name: {data?.seller?.user?.name}</p>
            <p>Email: {data?.seller?.user?.email}</p>
            <p>Phone: {data?.seller?.user?.phone}</p>
          </div>
        </div>
      </div>

      {/* Vendor Wallet Section */}
      <div className="mt-6 rounded bg-white p-4 shadow md:p-6">
        <h2 className="mb-4 text-base font-semibold sm:text-lg">
          💰 Vendor Wallet
        </h2>
        <div className="grid grid-cols-1 gap-4 text-center text-xs sm:text-sm md:grid-cols-4">
          <div className="rounded border p-3 shadow-sm sm:p-4">
            <p className="text-xl font-bold text-green-600 sm:text-2xl">
              ৳{data?.withdrawableBalance}
            </p>
            <p className="text-gray-500">Withdrawable Balance</p>
          </div>
          <div className="rounded border p-3 shadow-sm sm:p-4">
            <p className="text-xl font-bold text-yellow-500 sm:text-2xl">
              ৳{data?.pendingWithdraws}
            </p>
            <p className="text-gray-500">Pending Withdraw</p>
          </div>
          <div className="rounded border p-3 shadow-sm sm:p-4">
            <p className="text-xl font-bold text-purple-600 sm:text-2xl">
              ৳{data?.alreadyWithdraw}
            </p>
            <p className="text-gray-500">Already Withdrawn</p>
          </div>
          <div className="rounded border p-3 shadow-sm sm:p-4">
            <p className="text-xl font-bold text-pink-600 sm:text-2xl">
              ৳{data?.totalCommition}
            </p>
            <p className="text-gray-500">Total Commission Given</p>
          </div>
          <div className="col-span-1 rounded border p-3 shadow-sm sm:p-4 md:col-span-2">
            <p className="text-xl font-bold text-blue-600 sm:text-2xl">
              ৳{data?.totalDeliveryCharge}
            </p>
            <p className="text-gray-500">Total Delivery Charge Earned</p>
          </div>
          <div className="col-span-1 rounded border p-3 shadow-sm sm:p-4 md:col-span-2">
            <p className="text-xl font-bold text-blue-600 sm:text-2xl">
              ৳{data?.totalTax}
            </p>
            <p className="text-gray-500">Total Tax Given</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOverview;
