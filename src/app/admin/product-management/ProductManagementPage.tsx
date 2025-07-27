'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function ProductManagementPage() {
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
  const [selectedSubSubCategoryId, setSelectedSubSubCategoryId] = useState('');
  const [selectedStock, setSelectedStock] = useState('');
  const [search, setSearch] = useState('');
  const [code, setCode] = useState('');
  const [sku, setSku] = useState('');
  const [queryParams, setQueryParams] = useState({});

  const brandsData = {
    data: [
      { id: '1', title: 'Apple' },
      { id: '2', title: 'Samsung' },
    ],
  };
  const categoriesData = {
    data: [
      { id: '1', title: 'Electronics' },
      { id: '2', title: 'Watches' },
    ],
  };
  const subCategoriesData = { data: [{ id: '1', title: 'Smartwatches' }] };
  const subSubCategoriesData = { data: [{ id: '1', title: 'Fitness Watches' }] };

  return (
    <div className="w-full p-4">
      <p className="mb-6 text-2xl font-medium">Product Management</p>
      {/* Filter Products */}
      <div className="mb-6 rounded-xl bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">Filter Products</h3>
        <div className="my-3 grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {/* Brand */}
          <select
            value={selectedBrandId}
            onChange={(e) => setSelectedBrandId(e.target.value)}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Select Brand</option>
            {brandsData.data.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.title}
              </option>
            ))}
          </select>

          {/* Category */}
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Select Category</option>
            {categoriesData.data.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>

          {/* SubCategory */}
          <select
            value={selectedSubCategoryId}
            onChange={(e) => setSelectedSubCategoryId(e.target.value)}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Select Sub Category</option>
            {subCategoriesData.data.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.title}
              </option>
            ))}
          </select>

          {/* SubSubCategory */}
          <select
            value={selectedSubSubCategoryId}
            onChange={(e) => setSelectedSubSubCategoryId(e.target.value)}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Select Sub Sub Category</option>
            {subSubCategoriesData.data.map((subsub) => (
              <option key={subsub.id} value={subsub.id}>
                {subsub.title}
              </option>
            ))}
          </select>

          {/* Stock Availability */}
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Select Availability</option>
            <option value="stock-in">In Stock</option>
            <option value="stock-out">Out of Stock</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="rounded bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
            onClick={() => {
              setSelectedBrandId('');
              setSelectedCategoryId('');
              setSelectedSubCategoryId('');
              setSelectedSubSubCategoryId('');
              setSelectedStock('');
              setQueryParams({});
            }}
          >
            Reset
          </button>
          <button
            className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
            onClick={() => {
              setQueryParams({
                ...(selectedBrandId && { brandId: selectedBrandId }),
                ...(selectedCategoryId && { categoryId: selectedCategoryId }),
                ...(selectedSubCategoryId && { subCategoryId: selectedSubCategoryId }),
                ...(selectedSubSubCategoryId && { subSubCategoryId: selectedSubSubCategoryId }),
                ...(selectedStock && { stock: selectedStock }),
              });
            }}
          >
            Show Data
          </button>
        </div>
      </div>
      <div className="rounded-xl bg-white p-6 shadow">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search by title */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search title"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setQueryParams((prev) => ({ ...prev, search: e.target.value }));
                }}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 text-sm"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>

            {/* Search by code */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setQueryParams((prev) => ({ ...prev, code: e.target.value }));
                }}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 text-sm"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>

            {/* Search by SKU */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by SKU"
                value={sku}
                onChange={(e) => {
                  setSku(e.target.value);
                  setQueryParams((prev) => ({ ...prev, optionCode: e.target.value }));
                }}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 text-sm"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>

          <Link
            href="/admin/product/add-product"
            className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
          >
            Add Product
          </Link>
        </div>
      </div>

      {/* Product List */}
      <div>
        
      </div>
    </div>
  );
}
