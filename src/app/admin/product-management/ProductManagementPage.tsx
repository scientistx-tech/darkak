'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import Image from 'next/image';

const dummyProducts = [
  {
    id: 1,
    name: 'Smart Watch Ultra X',
    price: 12000,
    stock: 80,
    thumbnail: '/watch1.jpg',
    variants: [
      { color: 'Black', size: 'M', storage: '64GB', stock: 40 },
      { color: 'Silver', size: 'L', storage: '128GB', stock: 40 },
    ],
  },
  {
    id: 2,
    name: 'Digital Watch Pro',
    price: 9500,
    stock: 50,
    thumbnail: '/watch2.jpg',
    variants: [
      { color: 'Blue', size: 'S', storage: '32GB', stock: 25 },
      { color: 'Black', size: 'M', storage: '64GB', stock: 25 },
    ],
  },

  {
    id: 3,
    name: 'Digital Watch',
    price: 12500,
    stock: 130,
    thumbnail: '/watch2.jpg',
    variants: [
      { color: 'Blue', size: 'S', storage: '32GB', stock: 25 },
      { color: 'Black', size: 'M', storage: '64GB', stock: 25 },
      { color: 'Red', size: 'XL', storage: '64GB', stock: 5 },
      { color: 'Black', size: 'M', storage: '64GB', stock: 40 },
      { color: 'Silver', size: 'L', storage: '128GB', stock: 40 },
      { color: 'Blue', size: 'S', storage: '32GB', stock: 25 },
      { color: 'Black', size: 'M', storage: '64GB', stock: 25 },
      { color: 'Red', size: 'XL', storage: '64GB', stock: 5 },
      { color: 'Black', size: 'M', storage: '64GB', stock: 40 },
      { color: 'Silver', size: 'L', storage: '128GB', stock: 40 },
    ],
  },
];

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

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [stockUpdates, setStockUpdates] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = (product: any) => {
    setSelectedProduct(product);
    const initStock: any = {};
    product.variants.forEach((v: any, index: number) => {
      initStock[index] = v.stock;
    });
    setStockUpdates(initStock);
    setModalVisible(true);
  };

  const handleStockInput = (index: number, value: number) => {
    setStockUpdates((prev: any) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Updated stock for:', selectedProduct?.name, stockUpdates);
    setModalVisible(false);
    alert('Stock updated (check console).');
  };

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

        {/* Product List */}
        <div className="mt-10 w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm md:text-base">
                <th className="border px-3 py-2">ID</th>
                <th className="border px-3 py-2">Thumb</th>
                <th className="border px-3 py-2">Product Name</th>
                <th className="border px-3 py-2">Price</th>
                <th className="border px-3 py-2">Total Stock</th>
                <th className="border px-3 py-2">Variants</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{product.id}</td>
                  <td className="border px-3 py-2">
                    <Image src={product.thumbnail} alt={product.name} width={50} height={50} />
                  </td>
                  <td className="border px-3 py-2">{product.name}</td>
                  <td className="border px-3 py-2">৳{product.price}</td>
                  <td className="border px-3 py-2">{product.stock}</td>
                  <td className="border px-3 py-2">
                    {product.variants.map((v, i) => (
                      <div key={i}>
                        <span className="text-xs md:text-sm">
                          {v.color} | {v.size} | {v.storage} : {v.stock} pcs
                        </span>
                      </div>
                    ))}
                  </td>
                  <td className="border px-3 py-2">
                    <Button type="primary" onClick={() => handleOpenModal(product)}>
                      Update Stock
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={`Update Stock for ${selectedProduct?.name}`}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        okText="Update"
      >
        {selectedProduct?.variants.map((v: any, index: number) => (
          <div key={index} className="mb-4">
            <p className="mb-1 font-medium">
              {v.color} | {v.size} | {v.storage}
            </p>
            <Input
              type="number"
              min={0}
              value={stockUpdates[index]}
              onChange={(e) => handleStockInput(index, Number(e.target.value))}
            />
          </div>
        ))}
      </Modal>
    </div>
  );
}
