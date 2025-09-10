"use client"
import React from "react";

// Helper functions
const getThisYearRange = () => {
  const now = new Date();
  return {
    fromDate: new Date(now.getFullYear(), 0, 1), // Jan 1
    toDate: new Date(now.getFullYear(), 11, 31), // Dec 31
  };
};

const getThisMonthRange = () => {
  const now = new Date();
  return {
    fromDate: new Date(now.getFullYear(), now.getMonth(), 1),
    toDate: new Date(now.getFullYear(), now.getMonth() + 1, 0), // last day of month
  };
};

const getThisWeekRange = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday
  const start = new Date(now);
  start.setDate(now.getDate() - dayOfWeek); // start of week (Sunday)
  const end = new Date(start);
  end.setDate(start.getDate() + 6); // end of week (Saturday)
  return { fromDate: start, toDate: end };
};

// Format date as yyyy-mm-dd
const formatDate = (date: Date) =>
  date.toISOString().split("T")[0];

const dateOptions = [
  { label: "This Year", range: getThisYearRange() },
  { label: "This Month", range: getThisMonthRange() },
  { label: "This Week", range: getThisWeekRange() },
];


const FilterOrders = ({ onChange, value }: { onChange: (d: any) => void, value: any }) => {

  return (
    <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-dark">
      <h3 className="mb-4 text-lg font-semibold dark:text-white">Filter Order</h3>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
       
        <div>
          <label className="mb-1 block text-sm font-medium dark:text-gray-300">Search</label>
          <input onChange={(e) => onChange({ ...value, search: e.target.value })}
            value={value?.search} className="w-full outline-none rounded border border-gray-300 px-3 py-2 text-sm dark:bg-gray-700 dark:text-white" placeholder="Order Id..." />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium dark:text-gray-300">Data Type</label>
          <select value={
            value?.fromDate && value?.toDate
              ? `${value.fromDate}_${value.toDate}`
              : ""
          }
            onChange={(e) => {
              const selected = dateOptions.find(
                (opt) =>
                  formatDate(opt.range.fromDate) +
                  "_" +
                  formatDate(opt.range.toDate) ===
                  e.target.value
              );
              if (selected) {
                onChange({
                  ...value,
                  fromDate: formatDate(selected.range.fromDate),
                  toDate: formatDate(selected.range.toDate),
                });
              }
            }} className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:bg-gray-700 dark:text-white">
            <option value="">Select from dropdown</option>
            {dateOptions.map((opt) => (
              <option
                key={opt.label}
                value={
                  formatDate(opt.range.fromDate) +
                  "_" +
                  formatDate(opt.range.toDate)
                }
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={() => onChange({})} className="rounded bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200">
          Reset
        </button>
        <button className="rounded bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          Show data
        </button>
      </div>
    </div>
  );
};

export default FilterOrders;
