'use client';

import React, { useState } from 'react';
import { Select, Input, Pagination } from 'antd';
import PosProductCard from './PosProductCard';

const { Option } = Select;

export default function ProductSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>();
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<string | undefined>();
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [searchName, setSearchName] = useState('');
  const [searchSKU, setSearchSKU] = useState('');

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home', label: 'Home & Living' },
  ];

  const subCategories = [
    { value: 'mobiles', label: 'Mobiles' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'furniture', label: 'Furniture' },
  ];

  const subSubCategories = [
    { value: 'smartphones', label: 'Smartphones' },
    { value: 'tshirts', label: 'T-Shirts' },
    { value: 'chairs', label: 'Chairs' },
  ];

  const brands = [
    { value: 'samsung', label: 'Samsung' },
    { value: 'nike', label: 'Nike' },
    { value: 'ikea', label: 'IKEA' },
  ];

  const filterOption = (input: string, option?: { children: React.ReactNode }) =>
    String(option?.children).toLowerCase().includes(input.toLowerCase());

  return (
    <div className="mt-5 rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-2 flex flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Category Select */}
        <div className="w-full sm:w-1/3">
          <p className="mb-2 text-[15px] text-primary">Category:</p>
          <Select
            showSearch
            allowClear
            value={selectedCategory}
            placeholder="Select Category"
            className="w-full"
            onChange={(value) => setSelectedCategory(value)}
            filterOption={filterOption}
          >
            {categories.map((cat) => (
              <Option key={cat.value} value={cat.value}>
                {cat.label}
              </Option>
            ))}
          </Select>
        </div>

        {/* Sub Category Select */}
        <div className="w-full sm:w-1/3">
          <p className="mb-2 text-[15px] text-primary">Sub Category:</p>
          <Select
            showSearch
            allowClear
            value={selectedSubCategory}
            placeholder="Select Sub Category"
            className="w-full"
            onChange={(value) => setSelectedSubCategory(value)}
            filterOption={filterOption}
          >
            {subCategories.map((cat) => (
              <Option key={cat.value} value={cat.value}>
                {cat.label}
              </Option>
            ))}
          </Select>
        </div>

        {/* Sub Sub Category Select */}
        <div className="w-full sm:w-1/3">
          <p className="mb-2 text-[15px] text-primary">Sub Sub Category:</p>
          <Select
            showSearch
            allowClear
            value={selectedSubSubCategory}
            placeholder="Select Sub Sub Category"
            className="w-full"
            onChange={(value) => setSelectedSubSubCategory(value)}
            filterOption={filterOption}
          >
            {subSubCategories.map((cat) => (
              <Option key={cat.value} value={cat.value}>
                {cat.label}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Brand Select */}
        <div className="w-full sm:w-1/3">
          <p className="mb-2 text-[15px] text-primary">Select Brand:</p>
          <Select
            showSearch
            allowClear
            value={selectedBrand}
            placeholder="Select Brand"
            className="w-full"
            onChange={(value) => setSelectedBrand(value)}
            filterOption={filterOption}
          >
            {brands.map((brand) => (
              <Option key={brand.value} value={brand.value}>
                {brand.label}
              </Option>
            ))}
          </Select>
        </div>

        {/* Product Name Search */}
        <div className="w-full sm:w-1/3">
          <p className="mb-2 text-[15px] text-primary">Product Name:</p>
          <Input
            placeholder="Search product name..."
            className="w-full"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        {/* Product SKU Search */}
        <div className="w-full sm:w-1/3">
          <p className="mb-2 text-[15px] text-primary">Product SKU:</p>
          <Input
            placeholder="Search product SKU..."
            className="w-full"
            value={searchSKU}
            onChange={(e) => setSearchSKU(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4 flex flex-col items-center justify-end gap-4 sm:flex-row">
        <button className="rounded-md bg-red-500 px-3 py-1.5 font-medium text-white hover:opacity-80">
          Reset
        </button>
        <button className="rounded-md bg-primary px-3 py-1.5 font-medium text-white hover:opacity-80">
          Show Data
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PosProductCard />
        <PosProductCard />
        <PosProductCard />
        <PosProductCard />
        <PosProductCard />
        <PosProductCard />
        <PosProductCard />
        <PosProductCard />
        <PosProductCard />
        <PosProductCard />
        <PosProductCard />
      </div>

      <div className="mt-5 flex w-full items-center justify-center">
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
}
