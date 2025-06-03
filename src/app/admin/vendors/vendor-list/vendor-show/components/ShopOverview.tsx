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
  console.log("id from shop Ov", id);
  const { data, isLoading, error, refetch } = useGetVendorDetailsByIdAdminQuery(
    { id: Number(id) },
  );
  const [changeStatus] = useChangeVendorStatusMutation();

  const router = useRouter();
  console.log(data, "over");

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
      <div className="rounded bg-white p-6 shadow">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="rounded bg-blue-100 p-4">
              <Image
                src={data?.seller?.shop_logo}
                alt={data?.seller?.store_name}
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <div>
              <h2
                style={{ textShadow: " #fc0 1px 0 10px" }}
                className="text-xl font-semibold"
              >
                {data?.seller?.store_name}
              </h2>
              <p className="text-sm text-gray-500">⭐ 0 Ratings | 0 Reviews</p>
              <button
                onClick={() => router.push(`/vendors/shop-view/${id}`)}
                className="mt-2 flex items-center gap-1 rounded border border-blue-500 bg-white px-4 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50"
              >
                <FaGlobeAmericas className="text-lg" />
                <p> View live</p>
              </button>
            </div>
          </div>
          <button
            onClick={handleVendorStatus}
            className={`flex items-center gap-2 rounded ${data?.seller?.status === "approved" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"} px-4 py-2 text-white`}
          >
            {data?.seller?.status === "approved" ? (
              <MdDoDisturbOff />
            ) : (
              <FaConciergeBell />
            )}

            <p>
              {data?.seller?.status === "approved"
                ? "Suspend this Vendor"
                : "Active this Vendor"}
            </p>
          </button>
        </div>

        <div className="grid gap-6 text-sm md:grid-cols-3">
          {/* Shop Info */}
          <div className="rounded bg-gray-2 p-3">
            <p className="text-lg">
              Total products:{" "}
              <span
                style={{ textShadow: "#fc0 1px 0 10px" }}
                className="text-2xl font-semibold text-blue-700"
              >
                {data?.seller?.user?._count?.products}
              </span>
            </p>
            <p className="mt-3 text-lg">
              Total orders:{" "}
              <span
                style={{ textShadow: "#fc0 1px 0 10px" }}
                className="text-2xl font-semibold text-blue-950"
              >
                {data?.totalOrder}
              </span>
            </p>
          </div>

          <div className="text-base">
            <h3 className="mb-2 font-medium">Shop Information</h3>
            <p className="mt-2">Shop name: {data?.seller?.store_name}</p>
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
          <div className="text-base">
            <h3 className="mb-2 font-medium">Vendor Information</h3>
            <p>Name: {data?.seller?.user?.name}</p>
            <p>Email: {data?.seller?.user?.email}</p>
            <p>Phone: {data?.seller?.user?.phone}</p>
          </div>
        </div>
      </div>

      {/* Vendor Wallet Section */}
      <div className="mt-6 rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">💰 Vendor Wallet</h2>
        <div className="grid grid-cols-1 gap-4 text-center text-sm md:grid-cols-4">
          <div className="rounded border p-4 shadow-sm">
            <p className="text-2xl font-bold text-green-600">
              ৳{data?.withdrawableBalance}
            </p>
            <p className="text-gray-500">Withdrawable Balance</p>
          </div>
          <div className="rounded border p-4 shadow-sm">
            <p className="text-2xl font-bold text-yellow-500">
              ৳{data?.pendingWithdraws}
            </p>
            <p className="text-gray-500">Pending Withdraw</p>
          </div>
          <div className="rounded border p-4 shadow-sm">
            <p className="text-2xl font-bold text-purple-600">
              ৳{data?.alreadyWithdraw}
            </p>
            <p className="text-gray-500">Already Withdrawn</p>
          </div>
          <div className="rounded border p-4 shadow-sm">
            <p className="text-2xl font-bold text-pink-600">
              ৳{data?.totalCommition}
            </p>
            <p className="text-gray-500">Total Commission Given</p>
          </div>
          <div className="col-span-1 rounded border p-4 shadow-sm md:col-span-2">
            <p className="text-2xl font-bold text-blue-600">
              ৳{data?.totalDeliveryCharge}
            </p>
            <p className="text-gray-500">Total Delivery Charge Earned</p>
          </div>
          <div className="col-span-1 rounded border p-4 shadow-sm md:col-span-2">
            <p className="text-2xl font-bold text-blue-600">
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
{
  /* Main Vendor Card */
}
<div className="rounded bg-white p-6 shadow">
  <div className="mb-6 flex items-start justify-between">
    <div className="flex gap-4">
      <div className="rounded bg-blue-100 p-4">
        <span className="text-3xl">⚡</span>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Hanover Electronics</h2>
        <p className="text-sm text-gray-500">⭐ 0 Ratings | 0 Reviews</p>
        <button className="mt-2 rounded border border-blue-500 bg-white px-4 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50">
          View live
        </button>
      </div>
    </div>
    <button className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
      Suspend this vendor
    </button>
  </div>

  <div className="grid gap-6 text-sm md:grid-cols-3">
    {/* Shop Info */}
    <div className="rounded bg-gray-2 p-3">
      <p className="text-lg">
        Total products:{" "}
        <span
          style={{ textShadow: "#fc0 1px 0 10px" }}
          className="text-2xl font-semibold text-blue-700"
        >
          20
        </span>
      </p>
      <p className="mt-3 text-lg">
        Total orders:{" "}
        <span
          style={{ textShadow: "#fc0 1px 0 10px" }}
          className="text-2xl font-semibold text-blue-950"
        >
          6
        </span>
      </p>
    </div>

    <div className="text-base">
      <h3 className="mb-2 font-medium">Shop Information</h3>
      <p className="mt-2">Shop name: Hanover Electronics</p>
      <p>Phone: +10111111111</p>
      <p>Address: Mirpur</p>
      <p>
        Status: <span className="font-medium text-green-600">Active</span>
      </p>
    </div>

    {/* Vendor Info */}
    <div className="text-base">
      <h3 className="mb-2 font-medium">Vendor Information</h3>
      <p>Name: Hanover Electronics</p>
      <p>Email: seller@seller.com</p>
      <p>Phone: +10011111111</p>
    </div>
  </div>
</div>;

{
  /* Vendor Wallet Section */
}
<div className="mt-6 rounded bg-white p-6 shadow">
  <h2 className="mb-4 text-lg font-semibold">💰 Vendor Wallet</h2>
  <div className="grid grid-cols-1 gap-4 text-center text-sm md:grid-cols-4">
    <div className="rounded border p-4 shadow-sm">
      <p className="text-2xl font-bold text-green-600">৳9,590.01</p>
      <p className="text-gray-500">Withdrawable Balance</p>
    </div>
    <div className="rounded border p-4 shadow-sm">
      <p className="text-2xl font-bold text-yellow-500">৳500.00</p>
      <p className="text-gray-500">Pending Withdraw</p>
    </div>
    <div className="rounded border p-4 shadow-sm">
      <p className="text-2xl font-bold text-purple-600">৳1,000.00</p>
      <p className="text-gray-500">Already Withdrawn</p>
    </div>
    <div className="rounded border p-4 shadow-sm">
      <p className="text-2xl font-bold text-pink-600">৳1,827.00</p>
      <p className="text-gray-500">Total Commission Given</p>
    </div>
    <div className="col-span-1 rounded border p-4 shadow-sm md:col-span-2">
      <p className="text-2xl font-bold text-blue-600">৳0.00</p>
      <p className="text-gray-500">Total Delivery Charge Earned</p>
    </div>
    <div className="col-span-1 rounded border p-4 shadow-sm md:col-span-2">
      <p className="text-2xl font-bold text-blue-600">৳0.00</p>
      <p className="text-gray-500">Total Tax Given</p>
    </div>
  </div>
</div>;
