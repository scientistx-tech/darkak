import React from "react";
import { Wallet, DollarSign, TrendingUp, Receipt } from "lucide-react";

interface FinancialCardsProps {
  toalInhouseEarning: number;
  deliveryCharge: number;
  pendingAmount: number;
  totalTax: number;
}

const FinancialCards: React.FC<FinancialCardsProps> = ({
  toalInhouseEarning,
  deliveryCharge,
  pendingAmount,
  totalTax,
}) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* In-house Earning */}
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-dark">
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center justify-center rounded-full bg-green-100 p-2">
              <Wallet className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-500 dark:text-white">
              Wallet
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {formatCurrency(toalInhouseEarning)}
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-white">
            Total Earning
          </p>
        </div>
      </div>

      {/* Delivery Charge */}
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-dark">
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center justify-center rounded-full bg-red-100 p-2">
              <DollarSign className="h-5 w-5 text-red-500" />
            </div>
            <span className="text-sm text-gray-500 dark:text-white">
              Delivery Charge Earned
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {formatCurrency(deliveryCharge)}
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-white">
            Delivery Charge
          </p>
        </div>
      </div>

      {/* Pending Amount */}
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-dark">
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center justify-center rounded-full bg-blue-100 p-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-sm text-gray-500 dark:text-white">
              Pending Amount
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {formatCurrency(pendingAmount)}
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-white">
            Pending Amount
          </p>
        </div>
      </div>

      {/* Total Tax */}
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-dark">
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center justify-center rounded-full bg-purple-100 p-2">
              <Receipt className="h-5 w-5 text-purple-500" />
            </div>
            <span className="text-sm text-gray-500 dark:text-white">
              Total Tax Collected
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {formatCurrency(totalTax)}
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-white">
            Total Tax
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialCards;
