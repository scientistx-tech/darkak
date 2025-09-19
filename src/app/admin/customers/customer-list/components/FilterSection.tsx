import { format } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FilterSection({
  setQueryParams,
}: {
  setQueryParams: ({}) => void;
}) {
  const [orderDateRange, setOrderDateRange] = useState<(Date | null)[]>([
    null,
    null,
  ]);
  const [joiningDateRange, setJoiningDateRange] = useState<(Date | null)[]>([
    null,
    null,
  ]);
  const [sort, setSort] = useState("");

  const formatDate = (date: any) => (date ? format(date, "yyyy-MM-dd") : "");

  const [orderDateFrom, orderDateTo] = orderDateRange;
  const [joiningDateFrom, joiningDateTo] = joiningDateRange;

  const handleFilter = () => {
    const params: Record<string, string> = {
      orderDateFrom: orderDateFrom ? formatDate(orderDateFrom) : "",
      orderDateTo: orderDateTo ? formatDate(orderDateTo) : "",
      joiningDateFrom: joiningDateFrom ? formatDate(joiningDateFrom) : "",
      joiningDateTo: joiningDateTo ? formatDate(joiningDateTo) : "",
      sort,
    };

    // Remove keys with empty values
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value),
    );

    setQueryParams(filteredParams);
  };

  const handleReset = () => {
    setOrderDateRange([null, null]);
    setJoiningDateRange([null, null]);
    setSort("");
    setQueryParams({});
  };

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
      <div className="grid grid-cols-3 gap-4">
        {/* Order Date */}
        <div className="w-full">
          <label className="mb-1 block font-medium">Order Date</label>
          <DatePicker
            selectsRange
            startDate={orderDateFrom}
            endDate={orderDateTo}
            onChange={(update) => setOrderDateRange(update)}
            isClearable
            placeholderText="Select date range"
            className="w-full rounded border border-gray-300 px-3 py-2"
            wrapperClassName="w-full"
          />
        </div>

        {/* Customer Joining Date */}
        <div className="w-full">
          <label className="mb-1 block font-medium">
            Customer Joining Date
          </label>
          <DatePicker
            selectsRange
            startDate={joiningDateFrom}
            endDate={joiningDateTo}
            onChange={(update) => setJoiningDateRange(update)}
            isClearable
            placeholderText="Select date range"
            className="w-full rounded border border-gray-300 px-3 py-2"
            wrapperClassName="w-full"
          />
        </div>
        {/* Sort By Dropdown */}
        <div>
          <label className="mb-1 block font-medium">Sort By</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2"
          >
            <option>Select sorting order</option>
            <option value="older">Older</option>
            <option value="newer">Newer</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        {/* Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleReset}
            className="flex-1 rounded bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300"
          >
            Reset
          </button>
          <button
            onClick={handleFilter}
            className="flex-1 rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
