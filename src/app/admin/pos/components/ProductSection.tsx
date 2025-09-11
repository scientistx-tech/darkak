'use client';

import React, { useState } from 'react';
import { Select, Input, Pagination, message } from 'antd';
import PosProductCard from './PosProductCard';
import {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetSubSubCategoriesQuery,
} from '@/redux/services/admin/adminCategoryApis';
import { useGetBrandsQuery } from '@/redux/services/admin/adminBrandApis';
import { useGetProductsQuery } from '@/redux/services/admin/adminProductApis';
import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { IProduct } from '../type';

const { Option } = Select;

type ProductSectionProps = {
  cart: {
    productId: number;
    title: string;
    stock: number;
    totalPrice: number;
    quantity: number;
    ae_sku_attr?: string;
    tax: number
    options: {
      optionId: number;
      itemId: number;
    }[];
  }[];
  addToCart: (
    product: {
      productId: number;
      title: string;
      stock: number;
      totalPrice: number;
      ae_sku_attr?: string;
      options?: { optionId: number; itemId: number }[];
      tax: number
    },
    quantity?: number
  ) => void;
};

export default function ProductSection({ cart, addToCart }: ProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>();
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<string | undefined>();
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [searchName, setSearchName] = useState('');
  const [searchSKU, setSearchSKU] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    search: searchSKU || searchName,
    brandId: selectedBrand || '',
    categoryId: selectedCategory || '',
    subSubCategoryId: selectedSubSubCategory || '',
    subCategoryId: selectedSubCategory || '',
    page: page.toString(),
    limit: limit.toString(),
  });
  const { data: brandsData } = useGetBrandsQuery({});
  const { data: categoriesData } = useGetCategoriesQuery({});
  const { data: subCategoriesData } = useGetSubCategoriesQuery({
    categoryId: selectedCategory || '',
  });
  const { data: subSubCategoriesData } = useGetSubSubCategoriesQuery({
    subCategoryId: selectedSubCategory || '',
  });

  const filterOption = (input: string, option?: { children: React.ReactNode }) =>
    String(option?.children).toLowerCase().includes(input.toLowerCase());

  // Reset all filters
  const handleReset = () => {
    setSelectedCategory(undefined);
    setSelectedSubCategory(undefined);
    setSelectedSubSubCategory(undefined);
    setSelectedBrand(undefined);
    setSearchName('');
    setSearchSKU('');
    setProducts([]);
    setPage(1);
  };
  //console.log(data)

  // Fetch products using filters (mocked)
  const handleShowData = async () => {
    try {
      // Replace with your real product fetch API
      const filters = {
        categoryId: selectedCategory,
        subCategoryId: selectedSubCategory,
        subSubCategoryId: selectedSubSubCategory,
        brandId: selectedBrand,
        name: searchName,
        sku: searchSKU,
        page,
      };

      console.log('Fetching with filters:', filters);

      // Dummy data, replace this with actual API request
      const fakeResults = new Array(10)
        .fill(null)
        .map((_, i) => ({ id: i + 1, title: `Product ${i + 1}` }));
      setProducts(fakeResults);
    } catch (error) {
      message.error('Failed to fetch products');
    }
  };

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
            onChange={(value) => {
              setSelectedCategory(value);
              setSelectedSubCategory(undefined);
              setSelectedSubSubCategory(undefined);
            }}
            filterOption={filterOption}
          >
            {categoriesData?.data?.map((cat: any) => (
              <Option key={cat?.id} value={cat?.id}>
                {cat?.title}
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
            onChange={(value) => {
              setSelectedSubCategory(value);
              setSelectedSubSubCategory(undefined);
            }}
            filterOption={filterOption}
          >
            {subCategoriesData?.data?.map((subCat: any) => (
              <Option key={subCat?.id} value={subCat?.id}>
                {subCat?.title}
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
            {subSubCategoriesData?.data?.map((subSubCat: any) => (
              <Option key={subSubCat?.id} value={subSubCat?.id}>
                {subSubCat?.title}
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
            {brandsData?.data?.map((brand: any) => (
              <Option key={brand?.id} value={brand?.id}>
                {brand?.title}
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
        <button
          onClick={handleReset}
          className="rounded-md bg-red-500 px-3 py-1.5 font-medium text-white hover:opacity-80"
        >
          Reset
        </button>
        <button
          onClick={handleShowData}
          className="rounded-md bg-primary px-3 py-1.5 font-medium text-white hover:opacity-80"
        >
          Show Data
        </button>
      </div>
      {isLoading &&
        Array.from({ length: 10 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell colSpan={10}>
              <Skeleton className="h-8" />
            </TableCell>
          </TableRow>
        ))}
      {!isLoading && data?.data.length <= 0 ? (
        <p className="col-span-full my-6 text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.data?.map((doc: IProduct, i: number) => (
            <PosProductCard onPress={addToCart} data={doc} key={doc.id} />
          ))}
        </div>
      )}
      {/* Product Grid */}

      <div className="mt-5 flex w-full items-center justify-center">
        <Pagination
          current={page}
          total={Math.round(data?.totalPage * limit) || 0} // Replace with dynamic total if paginating from server
          pageSize={limit}
          onShowSizeChange={setLimit}
          showSizeChanger={false}
          onChange={(p) => {
            setPage(p);
            /// handleShowData(); // Re-fetch on page change
          }}
        />
      </div>
    </div>
  );
}
