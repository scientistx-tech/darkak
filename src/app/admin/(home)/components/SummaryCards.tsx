import React from "react";
import { ShoppingBag, Store, Box, Users } from "lucide-react";

interface SummaryCardsProps {
  totalOrder: number;
  totalStore: number;
  totalProduct: number;
  totalCustomer: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalOrder,
  totalStore,
  totalProduct,
  totalCustomer,
}) => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Order */}
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-dark">
        <div className="flex justify-between p-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-white">Total order</h3>
            <p className="mt-1 text-xl font-semibold dark:text-white">{totalOrder}</p>
          </div>
          <div className="flex items-center justify-center rounded-full bg-orange-100 p-2">
            <ShoppingBag className="h-6 w-6 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Total Stores */}
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-dark">
        <div className="flex justify-between p-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-white">Total Stores</h3>
            <p className="mt-1 text-xl font-semibold dark:text-white">{totalStore}</p>
          </div>
          <div className="flex items-center justify-center rounded-full bg-blue-100 p-2">
            <Store className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Total Products */}
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-dark">
        <div className="flex justify-between p-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-white">
              Total Products
            </h3>
            <p className="mt-1 text-xl font-semibold dark:text-white">{totalProduct}</p>
          </div>
          <div className="flex items-center justify-center rounded-full bg-yellow-100 p-2">
            <Box className="h-6 w-6 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Total Customers */}
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-dark ">
        <div className="flex justify-between p-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-white">
              Total Customers
            </h3>
            <p className="mt-1 text-xl font-semibold dark:text-white">{totalCustomer}</p>
          </div>
          <div className="flex items-center justify-center rounded-full bg-purple-100 p-2">
            <Users className="h-6 w-6 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
