import React from "react";

const FilterOrders = () => {
  return (
    <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-dark">
      <h3 className="mb-4 text-lg font-semibold dark:text-white">Filter Order</h3>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
        <div>
          <label className="mb-1 block text-sm font-medium dark:text-gray-300">Order Type</label>
          <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:bg-gray-700 dark:text-white">
            <option>All</option>
            <option value="">In House Order</option>
            <option value="">Vendor Order</option>
            <option value="">POS Order</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium dark:text-gray-300">Store</label>
          <select
            disabled
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value="in-house">In House</option>
            <option value="in-house">In House</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium dark:text-gray-300">Customer</label>
          <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:bg-gray-700 dark:text-white">
            <option>Select from dropdown</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium dark:text-gray-300">Data Type</label>
          <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:bg-gray-700 dark:text-white">
            <option>Select from dropdown</option>
            <option value="">This Year</option>
            <option value="">This Month</option>
            <option value="">This Week</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button className="rounded bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200">
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
