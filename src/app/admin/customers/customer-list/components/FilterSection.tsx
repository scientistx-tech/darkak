import { useState } from "react";
import { DateRangePicker } from "./DateRangePicker";

export const FilterSection: React.FC = () => {
  const [orderDateRange, setOrderDateRange] = useState("");
  const [joiningDateRange, setJoiningDateRange] = useState("");

  return (
    <div className="mb-4 flex space-x-4 rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <DateRangePicker label="Order Date" onChange={setOrderDateRange} />
      <DateRangePicker
        label="Customer Joining Date"
        onChange={setJoiningDateRange}
      />
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Customer Status</label>
        <select className="rounded border p-2 text-sm">
          <option>Select status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Sort By</label>
        <select className="rounded border p-2 text-sm">
          <option>Select Customer sorting order</option>
          <option>Name (A-Z)</option>
          <option>Name (Z-A)</option>
        </select>
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Choose First</label>
        <input
          type="text"
          placeholder="Ex: *100"
          className="rounded border p-2 text-sm"
        />
      </div>
      <div className="flex items-end space-x-2">
        <button className="rounded border p-2 text-sm">Reset</button>
        <button className="rounded bg-blue-600 p-2 text-sm text-white">
          Filter
        </button>
      </div>
    </div>
  );
};
