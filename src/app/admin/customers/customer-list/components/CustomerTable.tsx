import { useState } from "react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  isBlocked: boolean;
}

const customers: Customer[] = [
  {
    id: 1,
    name: "Robert Downey",
    email: "robert@customer.com",
    phone: "+15551112222",
    totalOrders: 137,
    isBlocked: false,
  },
  {
    id: 2,
    name: "Chris Evans",
    email: "chris@customer.com",
    phone: "+15553334444",
    totalOrders: 5,
    isBlocked: false,
  },
  {
    id: 3,
    name: "Tom Holland",
    email: "test@customer.com",
    phone: "+15557778888",
    totalOrders: 1,
    isBlocked: false,
  },
];

export const CustomerTable: React.FC = () => {
  const [customerList, setCustomerList] = useState<Customer[]>(customers);

  const toggleBlock = (id: number) => {
    setCustomerList(
      customerList.map((customer) =>
        customer.id === id
          ? { ...customer, isBlocked: !customer.isBlocked }
          : customer,
      ),
    );
  };

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-semibold">
          Customer list <span className="text-blue-500">7</span>
        </h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by Name or Email"
            className="rounded border p-2 text-sm"
          />
          <button className="flex items-center rounded bg-green-600 p-2 text-sm text-white">
            <span className="mr-1">Export</span>
          </button>
        </div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">SL</th>
            <th className="p-2">Customer Name</th>
            <th className="p-2">Contact Info</th>
            <th className="p-2">Total Order</th>
            <th className="p-2">Block / Unblock</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {customerList.map((customer) => (
            <tr key={customer.id} className="border-b">
              <td className="p-2">{customer.id}</td>
              <td className="p-2">{customer.name}</td>
              <td className="p-2">
                <div>{customer.email}</div>
                <div>{customer.phone}</div>
              </td>
              <td className="p-2">{customer.totalOrders}</td>
              <td className="p-2">
                <button
                  onClick={() => toggleBlock(customer.id)}
                  className={`h-6 w-12 rounded-full p-1 ${customer.isBlocked ? "bg-gray-300" : "bg-blue-600"}`}
                >
                  <div
                    className={`h-4 w-4 transform rounded-full bg-white shadow-md ${
                      customer.isBlocked ? "translate-x-0" : "translate-x-6"
                    }`}
                  />
                </button>
              </td>
              <td className="flex space-x-2 p-2">
                <button className="text-blue-500">👁️</button>
                <button className="text-red-500">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
