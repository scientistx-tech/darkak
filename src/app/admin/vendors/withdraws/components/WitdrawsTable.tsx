import { EyeFilled } from "@ant-design/icons";
import React, { useState } from "react";

interface Withdrawal {
  id: number;
  amount: number;
  name: string;
  requestTime: string;
  status: string;
}

const withdrawals: Withdrawal[] = [
  {
    id: 1,
    amount: 500.0,
    name: "Not found",
    requestTime: "2022-11-20 01:41:01",
    status: "Pending",
  },
  {
    id: 2,
    amount: 4000.0,
    name: "Not found",
    requestTime: "2022-11-20 01:40:43",
    status: "Approved",
  },
  {
    id: 3,
    amount: 500.0,
    name: "kamrujaman joy",
    requestTime: "2022-10-12 08:39:01",
    status: "Denied",
  },
  {
    id: 4,
    amount: 600.0,
    name: "kamrujaman joy",
    requestTime: "2022-10-12 07:01:17",
    status: "Approved",
  },
  {
    id: 5,
    amount: 500.0,
    name: "kamrujaman joy",
    requestTime: "2022-10-12 07:01:09",
    status: "Pending",
  },
  {
    id: 6,
    amount: 1000.0,
    name: "Hanover Electronics",
    requestTime: "2022-10-12 06:42:09",
    status: "Approved",
  },
  {
    id: 7,
    amount: 500.0,
    name: "Hanover Electronics",
    requestTime: "2022-10-12 06:41:57",
    status: "Pending",
  },
];

// Withdraw Table Component
const WithdrawTable: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredWithdrawals = withdrawals.filter(
    (withdrawal) =>
      filterStatus === "All" || withdrawal.status === filterStatus,
  );

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      {/* Upper Section with Filter and Buttons */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-black dark:text-white">
          Withdraw Request Table <span className="text-blue-500">12</span>
        </h1>
        <div className="flex space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Denied">Denied</option>
          </select>
          <button className="rounded-[10px] bg-green-600 p-2 text-sm text-white hover:bg-green-700">
            Export
          </button>
        </div>
      </div>

      {/* Table Section */}
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-600">
            <th className="p-2 text-black dark:text-white">SL</th>
            <th className="p-2 text-black dark:text-white">Amount</th>
            <th className="p-2 text-black dark:text-white">Name</th>
            <th className="p-2 text-black dark:text-white">Request Time</th>
            <th className="p-2 text-black dark:text-white">Status</th>
            <th className="p-2 text-black dark:text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredWithdrawals.map((withdrawal) => (
            <tr
              key={withdrawal.id}
              className="border-b border-gray-300 dark:border-gray-600"
            >
              <td className="p-2 text-black dark:text-white">
                {withdrawal.id}
              </td>
              <td className="p-2 text-black dark:text-white">
                ${withdrawal.amount.toFixed(2)}
              </td>
              <td className="p-2 text-black dark:text-white">
                {withdrawal.name}
              </td>
              <td className="p-2 text-black dark:text-white">
                {withdrawal.requestTime}
              </td>
              <td className="p-2">
                {withdrawal.status === "Pending" && (
                  <span className="text-blue-500 dark:text-blue-400">
                    {withdrawal.status}
                  </span>
                )}
                {withdrawal.status === "Approved" && (
                  <span className="text-green-600 dark:text-green-400">
                    {withdrawal.status}
                  </span>
                )}
                {withdrawal.status === "Denied" && (
                  <span className="text-red-600 dark:text-red-400">
                    {withdrawal.status}
                  </span>
                )}
              </td>
              <td className="p-2 text-blue-600 dark:text-blue-400">
                {withdrawal.status === "Pending" ? (
                  "Action disabled"
                ) : (
                  <button className="hover:underline">
                    <EyeFilled />{" "}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default WithdrawTable;
