"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React, { useState } from "react";

import {
  useGetBrandsQuery,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} from "@/redux/services/admin/adminBrandApis";
import { toast } from "react-toastify";
import * as yup from "yup";
import Button from "../../components/Button";
import { CiCirclePlus } from "react-icons/ci";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/services/admin/adminProductApis";
import {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetSubSubCategoriesQuery,
} from "@/redux/services/admin/adminCategoryApis";
import { useRouter } from "next/navigation";

// Yup schema
const brandSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

const ProductList = () => {
  const [queryParams, setQueryParams] = useState({});
  const { data, isLoading, error, refetch } = useGetProductsQuery(queryParams);
  const { data: brandsData } = useGetBrandsQuery();
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();

  const {
    data: subCategoriesData,
    isLoading: isSubCategoriesLoading,
    error: subCategoriesError,
    refetch: refetchSubCategories,
  } = useGetSubCategoriesQuery();
  const {
    data: subSubCategoriesData,
    isLoading: isSubSubCategoriesLoading,
    error: subSubCategoriesError,
    refetch: refetchSubSubCategories,
  } = useGetSubSubCategoriesQuery();

  const [deleteProduct] = useDeleteProductMutation();
  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation();

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{
    title: string;
    icon: File | null;
  }>({
    title: "",
    icon: null,
  });
  const [filters, setFilters] = useState({
    brandId: "",
    categoryId: "",
    subCategoryId: "",
    subSubCategoryId: "",
  });
  const router = useRouter();

  const handleDelete = async (productId: number) => {
    try {
      await deleteProduct(productId).unwrap();
      toast.success("Product deleted successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to delete Product.");
    }
  };

  // const handleEdit = (doc: any) => {
  //   setEditingId(doc.id);
  //   setEditData({ title: doc.title, icon: null });
  // };

  // const handleUpdate = async (brandId: number) => {
  //   try {
  //     // Validate using Yup
  //     await brandSchema.validate(editData);

  //     const formData = new FormData();
  //     formData.append("title", editData.title);
  //     if (editData.icon) {
  //       formData.append("icon", editData.icon);
  //     }

  //     await updateBrand({ categoryId: String(brandId), formData }).unwrap();
  //     toast.success("Brand updated successfully!");
  //     setEditingId(null);
  //     refetch();
  //   } catch (err: any) {
  //     if (err.name === "ValidationError") {
  //       toast.error(err.message);
  //     } else {
  //       toast.error("Failed to update brand.");
  //     }
  //   }
  // };

  return (
    <div className="min-h-screen">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
        🏠 In House Product List{" "}
        <span className="rounded-full bg-gray-200 px-2 py-0.5 text-sm">
          {data?.data.length || 0}
        </span>
      </h2>

      <div className="rounded-xl bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">Filter Products</h3>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Brand</label>
            <select
              value={filters.brandId}
              onChange={(e) =>
                setFilters((f) => ({ ...f, brandId: e.target.value }))
              }
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option>Select from dropdown</option>
              {brandsData &&
                brandsData?.data?.map((subCat) => (
                  <option key={subCat.id} value={subCat.id}>
                    {subCat?.title}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Category</label>
            <select
              value={filters.categoryId}
              onChange={(e) =>
                setFilters((f) => ({ ...f, categoryId: e.target.value }))
              }
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option>Select from dropdown</option>
              {categoriesData &&
                categoriesData?.data?.map((subCat) => (
                  <option key={subCat.id} value={subCat.id}>
                    {subCat?.title}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Sub Category
            </label>
            <select
              value={filters.subCategoryId}
              onChange={(e) =>
                setFilters((f) => ({ ...f, subCategoryId: e.target.value }))
              }
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option>Select from dropdown</option>
              {subCategoriesData &&
                subCategoriesData?.data?.map((subCat) => (
                  <option key={subCat.id} value={subCat.id}>
                    {subCat?.title}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Sub Sub Category
            </label>
            <select
              value={filters.subSubCategoryId}
              onChange={(e) =>
                setFilters((f) => ({ ...f, subSubCategoryId: e.target.value }))
              }
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option>Select from dropdown</option>
              {subSubCategoriesData &&
                subSubCategoriesData?.data?.map((subCat) => (
                  <option key={subCat.id} value={subCat.id}>
                    {subCat?.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            className="rounded bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
            onClick={() => {
              setFilters({
                brandId: "",
                categoryId: "",
                subCategoryId: "",
                subSubCategoryId: "",
              });
              setQueryParams({});
            }}
          >
            Reset
          </button>
          <button
            className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
            onClick={() =>
              setQueryParams({
                ...(filters.brandId && { brandId: filters.brandId }),
                ...(filters.categoryId && { categoryId: filters.categoryId }),
                ...(filters.subCategoryId && {
                  subCategoryId: filters.subCategoryId,
                }),
                ...(filters.subSubCategoryId && {
                  subSubCategoryId: filters.subSubCategoryId,
                }),
              })
            }
          >
            Show data
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white p-5 dark:bg-gray-dark dark:shadow-card">
        {/* search box and export button */}
        <div className="flex items-center justify-between pb-6">
          {/* search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search brand"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setQueryParams((prev) => ({
                  ...prev,
                  search: e.target.value,
                }));
              }}
              className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 text-sm outline-none focus:outline-none"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M16.65 10.35a6.3 6.3 0 11-12.6 0 6.3 6.3 0 0112.6 0z"
                />
              </svg>
            </span>
          </div>
          {/* more buttons*/}
          <div className="flex items-center gap-x-2">
            {/* <button className="flex items-center gap-2 rounded-md border-2 border-blue-400 px-4 py-2 text-sm font-medium text-blue-400">
              <img
                width={20}
                height={20}
                src="/images/icon/icon-excel.svg"
                alt=""
              />
              Export
            </button> */}
            {/* <button className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-white">
              Limited Stocks
            </button> */}
            <button
              onClick={() => router.push("/admin/product/add-product")}
              className="flex items-center gap-x-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
            >
              <CiCirclePlus className="text-lg font-bold" />
              <p>Add New Product</p>
            </button>
          </div>
        </div>
        {error ? (
          <p className="px-6 text-red-500">Error loading brands.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
                <TableHead>SL</TableHead>
                <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
                  Product Thumbnail
                </TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={5}>
                      <Skeleton className="h-8" />
                    </TableCell>
                  </TableRow>
                ))}

              {!isLoading && data?.data.length <= 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-8 text-center text-red-500"
                  >
                    No Data to Show
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.map((doc: any, i: string) => (
                  <TableRow key={doc.id}>
                    <TableCell>{i + 1}</TableCell>

                    <TableCell>
                      <Image
                        src={doc.thumbnail}
                        className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                        width={60}
                        height={50}
                        alt={`${doc.title} image`}
                      />
                    </TableCell>

                    <TableCell>{doc.title}</TableCell>

                    <TableCell>{doc.price}</TableCell>

                    <TableCell>{doc.discount}</TableCell>
                    <TableCell>{doc.stock}</TableCell>

                    <TableCell>
                      <Button
                        onClick={() => handleDelete(doc.id)}
                        className="bg-red-500 text-white"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ProductList;
