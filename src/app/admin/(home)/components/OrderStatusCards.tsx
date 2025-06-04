import React from "react";
import {
  Clock,
  CheckCircle,
  Package,
  Truck,
  Home,
  XCircle,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

interface OrdersCount {
  pending?: number;
  confirmed?: number;
  packaging?: number;
  out_for_delivery?: number;
  delivered?: number;
  cancelled?: number;
  returned?: number;
  failed_to_delivery?: number;
}

interface OrderStatusCardsProps {
  ordersCount: OrdersCount[];
}

const OrderStatusCards: React.FC<OrderStatusCardsProps> = ({ ordersCount }) => {
  // Extract values from array of objects
  const getOrderCountValue = (key: keyof OrdersCount): number => {
    const item = ordersCount.find((count) => count[key] !== undefined);
    return item ? item[key] || 0 : 0;
  };

  const pending = getOrderCountValue("pending");
  const confirmed = getOrderCountValue("confirmed");
  const packaging = getOrderCountValue("packaging");
  const outForDelivery = getOrderCountValue("out_for_delivery");
  const delivered = getOrderCountValue("delivered");
  const cancelled = getOrderCountValue("cancelled");
  const returned = getOrderCountValue("returned");
  const failedToDelivery = getOrderCountValue("failed_to_delivery");

  return (
    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Pending */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="flex justify-between p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium">Pending</span>
          </div>
          <div className="rounded-md bg-amber-100 px-2 py-1 text-sm font-medium text-amber-800">
            {pending}
          </div>
        </div>
      </div>

      {/* Confirmed */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="flex justify-between p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Confirmed</span>
          </div>
          <div className="rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
            {confirmed}
          </div>
        </div>
      </div>

      {/* Packaging */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="flex justify-between p-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium">Packaging</span>
          </div>
          <div className="rounded-md bg-yellow-100 px-2 py-1 text-sm font-medium text-yellow-800">
            {packaging}
          </div>
        </div>
      </div>

      {/* Out for delivery */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="flex justify-between p-4">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Out for delivery</span>
          </div>
          <div className="rounded-md bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800">
            {outForDelivery}
          </div>
        </div>
      </div>

      {/* Delivered */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="flex justify-between p-4">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">Delivered</span>
          </div>
          <div className="rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
            {delivered}
          </div>
        </div>
      </div>

      {/* Cancelled */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="flex justify-between p-4">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium">Cancelled</span>
          </div>
          <div className="rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800">
            {cancelled}
          </div>
        </div>
      </div>

      {/* Returned */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="flex justify-between p-4">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-indigo-500" />
            <span className="text-sm font-medium">Returned</span>
          </div>
          <div className="rounded-md bg-indigo-100 px-2 py-1 text-sm font-medium text-indigo-800">
            {returned}
          </div>
        </div>
      </div>

      {/* Failed to delivery */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="flex justify-between p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium">Failed to delivery</span>
          </div>
          <div className="rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-800">
            {failedToDelivery}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusCards;
