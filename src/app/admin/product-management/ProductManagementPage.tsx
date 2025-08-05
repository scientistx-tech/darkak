'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Skeleton } from 'antd';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@/components/shared/Pagination';
import {
  useGetProductsQuery,
  useUpdateProductStockMutation,
} from '@/redux/services/admin/adminProductApis';
import { useGetBrandsQuery } from '@/redux/services/admin/adminBrandApis';
import {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetSubSubCategoriesQuery,
} from '@/redux/services/admin/adminCategoryApis';
import { toast } from 'react-toastify';

export default function ProductManagementPage() {
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [queryParams, setQueryParams] = useState({});
  const { data, isLoading, error, refetch } = useGetProductsQuery(queryParams);
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>('');
  const [selectedSubSubCategoryId, setSelectedSubSubCategoryId] = useState<string>('');
  const [selectedStock, setSelectedStock] = useState<string>('');

  const { data: brandsData } = useGetBrandsQuery({});

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useGetCategoriesQuery({});

  const {
    data: subCategoriesData,
    isLoading: isSubCategoriesLoading,
    error: subCategoriesError,
    refetch: refetchSubCategories,
  } = useGetSubCategoriesQuery({ categoryId: selectedCategoryId });

  const {
    data: subSubCategoriesData,
    isLoading: isSubSubCategoriesLoading,
    error: subSubCategoriesError,
    refetch: refetchSubSubCategories,
  } = useGetSubSubCategoriesQuery({ subCategoryId: selectedSubCategoryId });
  const [search, setSearch] = useState('');
  const [code, setCode] = useState('');
  const [sku, setSku] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [stockUpdates, setStockUpdates] = useState<any>({});
  const [productStock, setProductStock] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const [updateStockApi, { isLoading: stockLoading }] = useUpdateProductStockMutation();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      page: currentPage,
    }));
    // Update the URL with the current page
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(currentPage));
    router.replace(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleOpenModal = (product: any) => {
    setSelectedProduct(product);
    setProductStock(product?.stock);
    const initStock: any = {};
    product?.options?.forEach((v: any, index: number) => {
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

  const handleSubmit = async () => {
    try {
      const body = {
        productId: selectedProduct?.id,
        stock: productStock,
        options: selectedProduct?.options?.map((s: any, i: number) => ({
          id: s.id,
          stock: stockUpdates[i],
        })),
      };
      await updateStockApi(body).unwrap();
      setModalVisible(false);
      toast.success('Stock updated!');
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
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
            {brandsData?.data &&
              brandsData?.data?.map((brand: any, i: number) => (
                <option key={brand?.id} value={brand?.id}>
                  {brand?.title}
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
            {categoriesData?.data &&
              categoriesData?.data?.map((cat: any, i: number) => (
                <option key={cat?.id} value={cat?.id}>
                  {cat?.title}
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
            {subCategoriesData?.data &&
              subCategoriesData?.data?.map((subCat: any, i: number) => (
                <option key={subCat?.id} value={subCat?.id}>
                  {subCat?.title}
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
            {subSubCategoriesData?.data &&
              subSubCategoriesData?.data?.map((subSubCat: any, i: number) => (
                <option key={subSubCat?.id} value={subSubCat?.id}>
                  {subSubCat?.title}
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
              setCurrentPage(1);
              setQueryParams({
                ...(selectedBrandId && { brandId: selectedBrandId }),
                ...(selectedCategoryId && { categoryId: selectedCategoryId }),
                ...(selectedSubCategoryId && {
                  subCategoryId: selectedSubCategoryId,
                }),
                ...(selectedSubSubCategoryId && {
                  subSubCategoryId: selectedSubSubCategoryId,
                }),
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
                  setQueryParams((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }));
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
                  setQueryParams((prev) => ({
                    ...prev,
                    code: e.target.value,
                  }));
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
                  setQueryParams((prev) => ({
                    ...prev,
                    optionCode: e.target.value,
                  }));
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
          {error ? (
            <p className="px-6 text-red-500">Error loading Products.</p>
          ) : (
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr className="text-left text-sm md:text-base">
                  <th className="border px-3 py-2">No</th>
                  <th className="border px-3 py-2">Thumb</th>
                  <th className="border px-3 py-2">Product Name</th>
                  <th className="border px-3 py-2">Price</th>
                  <th className="border px-3 py-2">Total Stock</th>
                  <th className="border px-3 py-2">Variants</th>
                  <th className="border px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading &&
                  Array.from({ length: 10 }).map((_, i) => (
                    <tr key={i}>
                      <td colSpan={10}>
                        <Skeleton className="h-8" />
                      </td>
                    </tr>
                  ))}

                {!isLoading && data?.data.length <= 0 ? (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-red-500">
                      No Data to Show
                    </td>
                  </tr>
                ) : (
                  data?.data?.map((product: any, j: number) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="border px-3 py-2">{j + 1}</td>
                      <td className="border px-3 py-2">
                        <Image src={product.thumbnail} alt={product.title} width={50} height={50} />
                      </td>
                      <td className="border px-3 py-2">{product.title}</td>
                      <td className="border px-3 py-2">৳{product.price}</td>
                      <td className="border px-3 py-2">{product.stock}</td>
                      <td className="border px-3 py-2">
                        {product?.options?.map((v: any, i: number) => (
                          <div key={i}>
                            <span className="text-xs md:text-sm">
                              {v.item.title} : {v.stock} pcs
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
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={data?.totalPage || 0}
      />
      {/* Modal */}
      <Modal
        title={`Update Stock for ${selectedProduct?.title}`}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        loading={stockLoading}
        okText="Update"
      >
        <div className="my-2">
          <p className="mb-1 font-medium">Product Total Stock</p>
          <Input
            type="number"
            min={0}
            value={productStock?.toString()}
            onChange={(e) => setProductStock(Number(e.target.value))}
          />
        </div>
        {selectedProduct?.options?.map((v: any, index: number) => (
          <div key={index} className="mb-4">
            <p className="mb-1 font-medium">
              {v.item?.title}-{v.title}
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
