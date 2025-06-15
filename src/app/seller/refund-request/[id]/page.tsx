"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
// import { ArrowLeft, FileText, Calendar } from "lucide-react";
import { FaFileAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";
import { Router } from "lucide-react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import {
  useChangeRefunRequestStatusMutation,
  useGetSingleRefundRequestDetailsQuery,
} from "@/redux/services/admin/adminRefundRequest";
import {
  useChangeRefunRequestStatusSellerMutation,
  useGetSingleRefundRequestDetailsSellerQuery,
} from "@/redux/services/seller/sellerRefundRequest";

interface RefundData {
  id: number;
  requestedDate: string;
  status: "pending" | "approved" | "rejected";
  paymentMethod: string;
  orderId: string;
  product: {
    name: string;
    image: string;
    quantity: number;
    totalPrice: string;
    discount: string;
    couponDiscount: string;
    tax: string;
    subtotal: string;
    refundableAmount: string;
  };
  refundReason: string;
  vendor: {
    shopName: string;
    email: string;
    phone: string;
  };
  deliveryInfo: {
    assigned: boolean;
    deliverymanName?: string;
  };
  statusLog: Array<{
    id: number;
    changedBy: string;
    date: string;
    status: string;
    note?: string;
  }>;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-800">
          Pending
        </span>
      );
    case "approved":
      return (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
          Approved
        </span>
      );
    case "rejected":
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
          Rejected
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800">
          {status}
        </span>
      );
  }
};

const RefundDetails = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useRouter();
  const params = useParams();
  const { id } = params;

  const { data, isFetching, refetch } =
    useGetSingleRefundRequestDetailsSellerQuery(id);

  const [changeStatus] = useChangeRefunRequestStatusSellerMutation();

  const refundData = data?.request;

  const handleAction = async (
    action: "approved" | "rejected" | "refunded" | "under-review",
  ) => {
    setStatus(action);

    if (action === "rejected") {
      setOpen(true);
    } else {
      try {
        const payload = { status: action };
        const res = await changeStatus({
          id: refundData?.id,
          data: payload,
        }).unwrap();
        refetch();
        toast.success("Successfully updated status");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update status");
      } finally {
        setStatus("");
      }
    }
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const payload = {
      status,
      message, //optional
      payment_type: refundData?.payment_type, //optional
    };
    try {
      const res = await changeStatus({
        id: refundData?.id,
        data: payload,
      }).unwrap();
      refetch();
      toast.success("Successfully updated status");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    } finally {
      setConfirmLoading(false);
      setStatus("");
      setMessage("");
      setOpen(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => navigate.back()}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500">
              <span className="text-xs text-white">📋</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Refund Details
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Refund Summary */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Refund summary
                </h2>
              </div>
              <div className="space-y-4 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600">Refund id:</span>
                    <span className="ml-2 font-medium">{refundData?.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      Refund Requested Date:
                    </span>
                    <span className="ml-2 font-medium">
                      {" "}
                      {new Date(refundData?.date).toLocaleDateString("en-BD", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Refund status:</span>
                    <span className="ml-2">
                      {getStatusBadge(refundData?.status)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Payment method:</span>
                    <span className="ml-2 font-medium">
                      {refundData?.payment_type}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Order details:</span>
                    <button
                      onClick={() =>
                        navigate.push(
                          `/admin/orders/${refundData?.order_item?.orderId}`,
                        )
                      }
                      className="ml-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 outline-none hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Reason */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Refund Reason By Customer
                </h2>
              </div>
              <div className="p-6">
                <p className="mb-4 leading-relaxed text-gray-700">
                  {refundData?.order_item?.order?.failed_reason}
                </p>
                {/* <div className="flex gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <FaFileAlt className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <FaCalendarAlt className="h-5 w-5 text-green-600" />
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Action Buttons */}
            {(refundData?.status !== "refunded" ||
              refundData?.status !== "rejected") && (
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="p-4">
                  <div className="flex flex-col gap-3">
                    {refundData?.status === "pending" && (
                      <>
                        <button
                          className="w-full rounded-md bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          onClick={() => handleAction("rejected")}
                        >
                          Reject
                        </button>
                        <button
                          className="w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          onClick={() => handleAction("approved")}
                        >
                          Approve
                        </button>
                      </>
                    )}
                    {refundData?.status === "approved" && (
                      <button
                        className="w-full rounded-md bg-yellow-500 px-4 py-2 font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                        onClick={() => handleAction("under-review")}
                      >
                        Under Review
                      </button>
                    )}
                    {refundData?.status === "under-review" && (
                      <>
                        <button
                          className="w-full rounded-md bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          onClick={() => handleAction("rejected")}
                        >
                          Reject
                        </button>
                        <button
                          className="w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          onClick={() => handleAction("refunded")}
                        >
                          Refund
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Product Details */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-blue-600">
                  {refundData?.order_item?.product?.title}
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-6 text-center">
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-lg bg-gray-100 text-6xl">
                    <Image
                      src={refundData?.order_item?.product?.thumbnail}
                      alt={refundData?.order_item?.product?.title}
                      width={64}
                      height={64}
                      className="rounded"
                    />
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">QTY</span>
                    <span className="font-medium">
                      {refundData?.order_item?.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total price</span>
                    <span className="font-medium">
                      ৳{refundData?.order_item?.order?.subTotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total discount</span>
                    <span className="font-medium">
                      -{refundData?.order_item?.order?.discount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coupon discount</span>
                    <span className="font-medium">
                      -{refundData?.order_item?.order?.discount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total tax</span>
                    <span className="font-medium">
                      +{refundData?.order_item?.order?.tax}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ৳{refundData?.order_item?.order?.total}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="font-medium text-gray-600">
                      Refundable amount
                    </span>
                    <span className="text-lg font-bold">
                      ৳{refundData?.order_item?.order?.total}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Rejection note"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-6 w-full rounded border border-slate-700 outline-none"
          rows={6}
        />
      </Modal>
    </div>
  );
};

export default RefundDetails;
