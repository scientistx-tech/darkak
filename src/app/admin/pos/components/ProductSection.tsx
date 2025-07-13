import React from 'react';
import PosProductCard from './PosProductCard';

export default function ProductSection() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm mt-5">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Select */}
        <select
          className="w-full sm:w-1/2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm  outline-none "
          defaultValue=""
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home & Living</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search product name..."
          className="w-full sm:w-1/2 rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm outline-none "
        />
      </div>

      {/* Placeholder for Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <PosProductCard />
        <PosProductCard />
        <PosProductCard />
        <PosProductCard />
      </div>
    </div>
  );
}
