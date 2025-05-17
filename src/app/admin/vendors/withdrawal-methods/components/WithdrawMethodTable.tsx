import { DeleteFilled, EditFilled } from "@ant-design/icons";
import React, { useState } from "react";

interface WithdrawMethod {
  id: number;
  methodName: string;
  methodFields: string;
  activeStatus: boolean;
  defaultMethod: boolean;
}

const initialMethods: WithdrawMethod[] = [
  {
    id: 1,
    methodName: "Bank",
    methodFields:
      "Name: Account number | Type: string | Placeholder: 1234 5667 8976 | Is Required: Yes",
    activeStatus: true,
    defaultMethod: false,
  },
  {
    id: 2,
    methodName: "bkash",
    methodFields:
      "Name: Mobile number | Type: number | Placeholder: +880111111111 | Is Required: Yes",
    activeStatus: true,
    defaultMethod: false,
  },
  {
    id: 3,
    methodName: "VISA Card",
    methodFields:
      "Name: Name | Type: string | Placeholder: Jhon Doe | Is Required: Yes\nName: Card number | Type: string | Placeholder: 1234 5667 8976 | Is Required: Yes",
    activeStatus: false,
    defaultMethod: true,
  },
];

export const WithdrawMethodTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [methods, setMethods] = useState(initialMethods);

  const handleToggleActiveStatus = (id: number) => {
    setMethods((prevMethods) =>
      prevMethods.map((method) =>
        method.id === id
          ? { ...method, activeStatus: !method.activeStatus }
          : method,
      ),
    );
  };

  const handleToggleDefaultMethod = (id: number) => {
    setMethods((prevMethods) =>
      prevMethods.map((method) =>
        method.id === id
          ? { ...method, defaultMethod: !method.defaultMethod }
          : { ...method, defaultMethod: false },
      ),
    );
  };

  const filteredMethods = methods.filter((method) =>
    method.methodName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      {/* Upper Section with Search and Button */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-black dark:text-white">
          Withdraw Method List <span className="text-blue-500">3</span>
        </h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search Method Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/3 rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <button className="rounded-[10px] bg-blue-600 p-2 text-sm text-white hover:bg-blue-700">
            + Add method
          </button>
        </div>
      </div>

      {/* Table Section */}
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-600">
            <th className="p-2 text-black dark:text-white">SL</th>
            <th className="p-2 text-black dark:text-white">Method Name</th>
            <th className="p-2 text-black dark:text-white">Method Fields</th>
            <th className="p-2 text-black dark:text-white">Active Status</th>
            <th className="p-2 text-black dark:text-white">Default Method</th>
            <th className="p-2 text-black dark:text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredMethods.map((method) => (
            <tr
              key={method.id}
              className="border-b border-gray-300 dark:border-gray-600"
            >
              <td className="p-2 text-black dark:text-white">{method.id}</td>
              <td className="p-2 text-black dark:text-white">
                {method.methodName}
              </td>
              <td className="whitespace-pre-line p-2 text-green-600 dark:text-green-400">
                {method.methodFields}
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleToggleActiveStatus(method.id)}
                  className={`h-6 w-12 rounded-full p-1 ${method.activeStatus ? "bg-gray-300" : "bg-blue-600"}`}
                >
                  <div
                    className={`h-4 w-4 transform rounded-full bg-white shadow-md ${
                      method.activeStatus ? "translate-x-0" : "translate-x-6"
                    }`}
                  />
                </button>
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleToggleDefaultMethod(method.id)}
                  className={`h-6 w-12 rounded-full p-1 ${method.defaultMethod ? "bg-gray-300" : "bg-blue-600"}`}
                >
                  <div
                    className={`h-4 w-4 transform rounded-full bg-white shadow-md ${
                      method.defaultMethod ? "translate-x-0" : "translate-x-6"
                    }`}
                  />
                </button>
              </td>
              <td className="flex space-x-2 p-2 text-blue-600 dark:text-blue-400">
                <button className="hover:underline">
                  <EditFilled />
                </button>
                <button className="hover:underline">
                  <DeleteFilled />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
