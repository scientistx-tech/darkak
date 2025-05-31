import { useToggleBlockUserMutation } from "@/redux/services/admin/adminCustomerList";
import { User } from "@/types/admin/customerListTyes";
import { DeleteFilled, EyeFilled } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "react-toastify";

interface CustomerTableProps {
  data: User[];
  refetch: () => void;
  setSearch: (value: string) => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  data,
  refetch,
  setSearch,
}) => {
  const [toggleBlockUser, { isLoading }] = useToggleBlockUserMutation();

  const toggleBlock = async (id: number) => {
    try {
      const res = await toggleBlockUser(id).unwrap();
      refetch();
      toast.success(res.message || "User block status updated");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-semibold">
          Customer list{" "}
          <span className="text-blue-500">{data?.length ?? 0}</span>
        </h2>
        <div className="flex space-x-2">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name or Email"
            className="w-full rounded border px-12 py-2 text-sm"
          />
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
          {data.map((customer, index) => (
            <tr key={customer.id} className="border-b">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{customer.name}</td>
              <td className="p-2">
                <div>{customer.email}</div>
                <div>{customer.phone}</div>
              </td>
              <td className="p-2">{customer._count.orders}</td>
              <td className="p-2">
                <button
                  onClick={() => toggleBlock(customer.id)}
                  disabled={isLoading}
                  className={`h-6 w-12 rounded-full p-1 transition-colors duration-300 ${
                    customer.isBlocked ? "bg-gray-300" : "bg-blue-600"
                  }`}
                  title={customer.isBlocked ? "Unblock" : "Block"}
                >
                  <div
                    className={`h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                      customer.isBlocked ? "translate-x-0" : "translate-x-6"
                    }`}
                  />
                </button>
              </td>
              <td className="flex space-x-2 p-2">
                <button className="text-blue-500">
                  <EyeFilled />{" "}
                </button>
                <button className="text-red-500">
                  <DeleteFilled />{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
