import {
  useCreateDeliveryMutation,
  useGetAllCourierQuery,
} from "@/redux/services/admin/adminCourierApis";
import {
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,
} from "@/redux/services/admin/adminOrderApis";
import * as Switch from "@radix-ui/react-switch";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CourierModal from "./CourierModal";

export default function OrderStatusPanel({ orderDetails, refetch }: any) {
  const [orderStatus, setOrderStatus] = useState<string>(orderDetails?.status);
  const [paymentStatus, setPaymentStatus] = useState<boolean>(
    orderDetails?.paid,
  );
  const [selectedCourierMedium, setSelectedCourierMedium] = useState<{
    id: number;
    title: string;
  }>({ id: 0, title: "" });
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openCourierModal, setOpenCourierModal] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string>("");
  const [openCourierBox, setOpenCourierBox] = useState<boolean>(false);
  const [changeOrderStatus] = useUpdateOrderStatusMutation();
  const [changePaymentStatus] = useUpdatePaymentStatusMutation();
  const {
    data,
    isLoading,
    error,
    refetch: courierRefetch,
  } = useGetAllCourierQuery({});

  const ordersStatus = [
    {
      id: 1,
      name: "Pending",
      value: "pending",
      children: [
        {
          id: 1,
          name: "Confirmed",
          value: "confirmed",
        },
        {
          id: 2,
          name: "Cancel & Restock",
          value: "cancelled",
        },
      ],
    },
    {
      id: 2,
      name: "Confirmed",
      value: "confirmed",
      children: [
        {
          id: 1,
          name: "Packaging",
          value: "packaging",
        },
        {
          id: 2,
          name: "Cancel & Restock",
          value: "cancelled",
        },
      ],
    },
    {
      id: 3,
      name: "Packaging",
      value: "packaging",
      children: [
        {
          id: 1,
          name: "Out For Delivery",
          value: "out_for_delivery",
        },
        {
          id: 2,
          name: "Failed To Delivery",
          value: "failed_to_delivery",
        },
      ],
    },
    {
      id: 4,
      name: "Failed To Delivery",
      value: "failed_to_delivery",
    },
    {
      id: 7,
      name: "Out For Delivery",
      value: "out_for_delivery",
      children: [
        {
          id: 1,
          name: "Delivered",
          value: "delivered",
        },
        {
          id: 2,
          name: "Cancel & Restock",
          value: "cancelled",
        },
      ],
    },

    {
      id: 5,
      name: "Returned",
      value: "returned",
    },
  ];

  useEffect(() => {
    if (orderDetails?.status) {
      setOrderStatus(orderDetails.status);
    }
    if (orderDetails?.paid !== undefined) {
      setPaymentStatus(orderDetails.paid);
    }
  }, [orderDetails]);

  const availableStatus =
    ordersStatus.find((status: any) => status.value === orderStatus)
      ?.children || [];

  const handleOk = () => {
    setConfirmLoading(true);

    if (!failedMessage) {
      toast.error("Please write a message for failed delivery.");
      setConfirmLoading(false);
      return;
    }

    changeOrderStatus({
      id: orderDetails?.id,
      data: { status: "failed_to_delivery", message: failedMessage },
    })
      .unwrap()
      .then(() => {
        refetch();
        toast.success("Order status updated!");
      })
      .catch(() => {
        toast.error("Failed to update order status");
      });

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="space-y-4 rounded border bg-white p-4 shadow">
      <h2 className="mb-3 text-center text-lg font-bold text-black">
        Order and Shipping Info
      </h2>
      <div>
        <label className="block text-sm font-medium text-slate-900">
          Change Order Status
        </label>
        <select
          value={orderStatus}
          onChange={(e) => {
            setOrderStatus(e.target.value);
            if (e.target.value === "out_for_delivery") {
              setOpenCourierBox(true);
            } else if (e.target.value === "failed_to_delivery") {
              setOpen(true);
            } else {
              changeOrderStatus({
                id: orderDetails?.id,
                data: { status: e.target.value },
              })
                .unwrap()
                .then(() => {
                  refetch();
                  toast.success("Order status updated!");
                })
                .catch(() => {
                  toast.error("Failed to update order status");
                });
            }
          }}
          className="mt-1 w-full rounded border p-2 text-slate-900"
        >
          <option value="">Select Status</option>
          {availableStatus.length > 0 &&
            availableStatus.map((status: any) => (
              <option key={status.id} value={status.value}>
                {status.name}
              </option>
            ))}
        </select>
      </div>

      {openCourierBox && (
        <div>
          <label className="">Select Courier</label>
          <select
            className="mt-1 w-full rounded border p-2 text-slate-900"
            value={selectedCourierMedium.id}
            onChange={(e) => {
              // Handle courier selection change if neededPsideba
              const selectedId = Number(e.target.value);
              const selected =
                data?.data && data?.data?.find((c: any) => c.id === selectedId);
              setSelectedCourierMedium({
                id: selectedId,
                title: selected?.title,
              });
              setOpenCourierModal(true);
            }}
          >
            <option value="">Select Courier</option>
            {data?.data &&
              data?.data?.map((courier: any) => (
                <option key={courier?.id} value={courier?.id}>
                  {courier?.title}
                </option>
              ))}
          </select>
        </div>
      )}

      <div className="flex items-center justify-between border p-2">
        <span className="text-sm font-medium text-slate-900">
          Payment Status
        </span>
        <div>
          <span className="mr-2 font-semibold">
            {orderDetails?.paid ? (
              <p className="inline text-green-600">Paid</p>
            ) : (
              <p className="inline text-red-600">Unpaid</p>
            )}
          </span>
          <Switch.Root
            checked={orderDetails?.paid}
            onCheckedChange={async (checked) => {
              try {
                const res = await changePaymentStatus(
                  orderDetails?.id,
                ).unwrap();
                refetch();
                toast.success("Payment status updated!");
              } catch (err) {
                toast.error("Failed to update payment status");
              }
            }}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
          >
            <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
          </Switch.Root>
        </div>
      </div>

      <Modal
        title="Leave a message"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <textarea
          onChange={(e) => setFailedMessage(e.target.value)}
          name="failedMessage"
          id=""
          rows={4}
          className="w-full rounded border p-2 text-slate-900"
          placeholder="Write a message"
        ></textarea>
      </Modal>

      {selectedCourierMedium.title !== "" && (
        <CourierModal
          orderDetails={orderDetails}
          openCourierModal={openCourierModal}
          setOpenCourierModal={setOpenCourierModal}
          refetch={refetch}
          selectedCourierMedium={selectedCourierMedium?.title}
          selectedCourierId={selectedCourierMedium?.id}
        />
      )}
    </div>
  );
}
