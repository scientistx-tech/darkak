import {
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,
} from "@/redux/services/admin/adminOrderApis";
import * as Switch from "@radix-ui/react-switch";
import { useState } from "react";
import { toast } from "react-toastify";

export default function OrderStatusPanel({ orderDetails, refetch }: any) {
  const [orderStatus, setOrderStatus] = useState<string>(orderDetails?.status);
  const [paymentStatus, setPaymentStatus] = useState<boolean>(
    orderDetails?.paid,
  );

  const [changeOrderStatus] = useUpdateOrderStatusMutation();
  const [changePaymentStatus] = useUpdatePaymentStatusMutation();

  const ordersStatus = [
    {
      id: 1,
      name: "Pending",
      value: "pending",
    },
    {
      id: 2,
      name: "Delivered",
      value: "delivered",
    },
    {
      id: 3,
      name: "Cancelled",
      value: "cancelled",
    },
    {
      id: 4,
      name: "Confirmed",
      value: "confirmed",
    },
    {
      id: 5,
      name: "Returned",
      value: "returned",
    },
    {
      id: 6,
      name: "Failed To Delivery",
      value: "failed_to_delivery",
    },
    {
      id: 7,
      name: "Out For Delivery",
      value: "out_for_delivery",
    },
    {
      id: 8,
      name: "Packeging",
      value: "packeging",
    },
  ];
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
          }}
          className="mt-1 w-full rounded border p-2 text-slate-900"
        >
          {ordersStatus.length > 0 &&
            ordersStatus.map((status: any) => (
              <option key={status.id} value={status.value}>
                {status.name}
              </option>
            ))}
        </select>
      </div>

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
    </div>
  );
}
