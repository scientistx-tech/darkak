"use client";

import { useParams } from "next/navigation";
import AddressCard from "./components/AddressCard";
import CustomerInfo from "./components/CustomerInfo";
import OrderStatusPanel from "./components/OrderStatusPanel";
import OrderSummary from "./components/OrderSummary";
import PrintButton from "./components/PrintButton";
import { useGetOrderDetailsQuery } from "@/redux/services/admin/adminOrderApis";
import { FaLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FruadCheck from "./components/FruadCheck";

export default function OrderDetailsPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const {
    data: orderDetailsData,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(id as string);

  console.log("Order ID:", id);

  console.log("Order Details Data:", orderDetailsData);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaLeftLong
            onClick={() => router.back()}
            className="h-8 w-8 cursor-pointer rounded-full bg-gray-3 dark:bg-gray-dark dark:text-white  p-2 text-slate-800 hover:bg-gray-4"
          />
          <Image
            width={40}
            height={40}
            src="/images/icon/icon_order.png"
            alt=""
          />
          <h1 className="text-xl font-bold dark:text-white ">Order Details</h1>
        </div>
        <div className="flex gap-2">
          <PrintButton orderDetails={orderDetailsData} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <OrderSummary orderDetails={orderDetailsData} />
        </div>
        <div className="space-y-4">
          {orderDetailsData?.status !== "cancelled" &&
            orderDetailsData?.status !== "failed_to_delivery" &&
            orderDetailsData?.status !== "delivered" && (
              <OrderStatusPanel
                orderDetails={orderDetailsData}
                refetch={refetch}
              />
            )}
          <CustomerInfo orderDetails={orderDetailsData} />
          <FruadCheck orderDetails={orderDetailsData} />
          <AddressCard
            orderDetails={orderDetailsData}
            title="Shipping address"
          />
          <AddressCard
            orderDetails={orderDetailsData}
            title="Billing address"
          />
        </div>
      </div>
    </div>
  );
}
