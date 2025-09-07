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
import * as Switch from "@radix-ui/react-switch";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";

import { toast } from "react-toastify";
import * as yup from "yup";
import ButtonSelf from "../../../admin/components/Button";
import { CiCirclePlus } from "react-icons/ci";

import { useRouter, useSearchParams } from "next/navigation";
import { FaBarcode, FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import Pagination from "@/components/shared/Pagination";
import RequireAccess from "@/components/Layouts/RequireAccess";
import { useGetBrandsSellerQuery } from "@/redux/services/seller/sellerBrandsApis";
import {
  useGetCategoriesSellerQuery,
  useGetSubCategoriesSellerQuery,
  useGetSubSubCategoriesSellerQuery,
} from "@/redux/services/seller/sellerCategoryApis";
import {
  useDeleteProductSellerMutation,
  useGetProductsSellerQuery,
  useUpdateDraftStatusSellerMutation,
  useUpdateFeatureStatusSellerMutation,
  useUpdateTodaysDealStatusSellerMutation,
} from "@/redux/services/seller/sellerProductApis";

const ProductList = () => {
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [queryParams, setQueryParams] = useState({});
  const [selectedBrandId, setSelectedBrandId] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] =
    useState<string>("");
  const [selectedSubSubCategoryId, setSelectedSubSubCategoryId] =
    useState<string>("");
  const [selectedStock, setSelectedStock] = useState<string>("");

  const { data, isLoading, error, refetch } =
    useGetProductsSellerQuery(queryParams);

  const { data: brandsData } = useGetBrandsSellerQuery({});

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useGetCategoriesSellerQuery({});

  const {
    data: subCategoriesData,
    isLoading: isSubCategoriesLoading,
    error: subCategoriesError,
    refetch: refetchSubCategories,
  } = useGetSubCategoriesSellerQuery({});

  const {
    data: subSubCategoriesData,
    isLoading: isSubSubCategoriesLoading,
    error: subSubCategoriesError,
    refetch: refetchSubSubCategories,
  } = useGetSubSubCategoriesSellerQuery({});

  const token = useSelector((state: any) => state.auth.token);

  const [deleteProduct] = useDeleteProductSellerMutation();
  const [changeDealStatus] = useUpdateTodaysDealStatusSellerMutation();
  const [changeFeatureStatus] = useUpdateFeatureStatusSellerMutation();
  const [changePublishedStatus] = useUpdateDraftStatusSellerMutation();

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [code, setCode] = useState("");
  const [sku, setSku] = useState("");

  const router = useRouter();

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      page: currentPage,
    }));
    // Update the URL with the current page
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(currentPage));
    router.replace(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    refetch();
  }, []);

  const handleOk = (id: any) => {
    handleDelete(id);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (productId: number) => {
    try {
      await deleteProduct(productId).unwrap();
      toast.success("Product deleted successfully!");
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      toast.error("Failed to delete Product.");
    }
  };

  console.log("query", queryParams);

  return (
    <RequireAccess permission="product-list">
      <div className="min-h-screen">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          🏠 In House Product List{" "}
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-sm">
            {data?.data.length || 0}
          </span>
        </h2>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold">Filter Products</h3>
          <div className="my-3 grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {/* Brand */}
            <div>
              <select
                value={selectedBrandId}
                className="w-full rounded border px-3 py-2"
                onChange={(e) => {
                  setSelectedBrandId(e.target.value);
                }}
                name=""
                id=""
              >
                <option value="">Select Brand</option>
                {brandsData?.data &&
                  brandsData?.data?.map((brand: any, i: number) => (
                    <option key={brand?.id} value={brand?.id}>
                      {brand?.title}
                    </option>
                  ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <select
                value={selectedCategoryId}
                className="w-full rounded border px-3 py-2"
                onChange={(e) => {
                  setSelectedCategoryId(e.target.value);
                }}
                name=""
                id=""
              >
                <option value="">Select Category</option>
                {categoriesData?.data &&
                  categoriesData?.data?.map((cat: any, i: number) => (
                    <option key={cat?.id} value={cat?.id}>
                      {cat?.title}
                    </option>
                  ))}
              </select>
            </div>

            {/* SubCategory */}
            <div>
              <select
                value={selectedSubCategoryId}
                className="w-full rounded border px-3 py-2"
                onChange={(e) => {
                  setSelectedSubCategoryId(e.target.value);
                }}
                name=""
                id=""
              >
                <option value="">Select Sub Category</option>
                {subCategoriesData?.data &&
                  subCategoriesData?.data?.map((subCat: any, i: number) => (
                    <option key={subCat?.id} value={subCat?.id}>
                      {subCat?.title}
                    </option>
                  ))}
              </select>
            </div>

            {/* SubSubCategory */}
            <div>
              <select
                value={selectedSubSubCategoryId}
                className="w-full rounded border px-3 py-2"
                onChange={(e) => {
                  setSelectedSubSubCategoryId(e.target.value);
                }}
                name=""
                id=""
              >
                <option value="">Select Sub Sub Category</option>
                {subSubCategoriesData?.data &&
                  subSubCategoriesData?.data?.map(
                    (subSubCat: any, i: number) => (
                      <option key={subSubCat?.id} value={subSubCat?.id}>
                        {subSubCat?.title}
                      </option>
                    ),
                  )}
              </select>
            </div>

            {/* stock in or stock out */}
            <div className="w-full">
              <select
                className="w-full rounded border px-3 py-2"
                value={selectedStock}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedStock(value);
                }}
              >
                <option value="">Select Avaiability</option>
                <option value="stock-in">In Stock</option>
                <option value="stock-out">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              className="rounded bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={() => {
                setSelectedBrandId("");
                setSelectedCategoryId("");
                setSelectedSubCategoryId("");
                setSelectedSubSubCategoryId("");
                setSelectedStock("");
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
              Show data
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white p-5 dark:bg-gray-dark dark:shadow-card">
          {/* search box and export button */}
          <div className="flex items-center justify-between pb-6">
            {/* search box */}
            <div className="flex flex-wrap items-center gap-4">
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
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by sku"
                  value={sku}
                  onChange={(e) => {
                    setSku(e.target.value);
                    setQueryParams((prev) => ({
                      ...prev,
                      optionCode: e.target.value,
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
                onClick={() => router.push("/seller/product/product-add")}
                className="flex items-center gap-x-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
              >
                <CiCirclePlus className="text-lg font-bold" />
                <p>Add New Product</p>
              </button>
            </div>
          </div>
          {error ? (
            <p className="px-6 text-red-500">Error loading Products.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="whitespace-nowrap border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
                  <TableHead>SL</TableHead>
                  <TableHead>Thumbnail</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Added By</TableHead>
                  <TableHead>Info</TableHead>
                  <TableHead>Total Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Today&apos;s Deal</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading &&
                  Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={10}>
                        <Skeleton className="h-8" />
                      </TableCell>
                    </TableRow>
                  ))}

                {!isLoading && data?.data.length <= 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="py-8 text-center text-red-500"
                    >
                      No Data to Show
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.data?.map((doc: any, i: number) => (
                    <TableRow className="whitespace-nowrap" key={doc.id}>
                      <TableCell>{i + 1}</TableCell>

                      <TableCell>
                        <Image
                          src={doc.thumbnail}
                          className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                          width={60}
                          height={60}
                          alt={`${doc.title} image`}
                        />
                      </TableCell>

                      <TableCell>{doc.title}</TableCell>
                      <TableCell>
                        {doc.user.isAdmin
                          ? "Admin"
                          : doc.user.isModerator
                            ? "Moderator"
                            : "Seller"}
                      </TableCell>
                      <TableCell className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold">Num of Sale:</p>
                          <p>{doc._count.order_items}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold">Base Price:</p>
                          <p>{doc.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold">Rating:</p>
                          <p>{doc._count.review} </p>
                        </div>
                      </TableCell>
                      <TableCell>{doc.stock}</TableCell>
                      <TableCell>
                        <p className="rounded-xl bg-teal-100 px-2 py-0.5 capitalize text-teal-600">
                          {doc.status}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Switch.Root
                          checked={!doc.drafted}
                          onCheckedChange={async (checked) => {
                            try {
                              const res = await changePublishedStatus({
                                id: doc.id,
                                data: { status: !checked },
                              }).unwrap();
                              refetch();
                              toast.success("Published status updated!");
                            } catch (err) {
                              toast.error("Failed to update published status");
                            }
                          }}
                          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
                        >
                          <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
                        </Switch.Root>
                      </TableCell>
                      <TableCell>
                        <Switch.Root
                          checked={doc.deal}
                          onCheckedChange={async (checked) => {
                            try {
                              const res = await changeDealStatus({
                                id: doc.id,
                                data: { status: checked },
                              }).unwrap();
                              refetch();
                              toast.success("Todays Deal status updated!");
                            } catch (err) {
                              toast.error("Failed to update deal status");
                            }
                          }}
                          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
                        >
                          <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
                        </Switch.Root>
                      </TableCell>
                      <TableCell>
                        <Switch.Root
                          checked={doc.feature}
                          onCheckedChange={async (checked) => {
                            try {
                              const res = await changeFeatureStatus({
                                id: doc.id,
                                data: { status: checked },
                              }).unwrap();
                              refetch();
                              toast.success("Featured status updated!");
                            } catch (err) {
                              toast.error("Failed to update feature status");
                            }
                          }}
                          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
                        >
                          <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
                        </Switch.Root>
                      </TableCell>

                      <TableCell className="">
                        <ButtonSelf
                          // onClick={() => handleDelete(doc.id)}
                          className="mr-2 bg-red-50 p-1 text-blue-700"
                        >
                          <FaBarcode className="" />
                        </ButtonSelf>
                        
                        <ButtonSelf
                          onClick={() => router.push(`/product/${doc.slug}`)}
                          className="mr-2 bg-red-50 p-1 text-yellow-700"
                        >
                          <FaEye className="" />
                        </ButtonSelf>

                        <>
                          <Button
                            type="default"
                            onClick={() => {
                              setSelectedProductId(doc.id);
                              setIsModalOpen(true);
                            }}
                            className="mr-2 border-none bg-red-50 p-1 text-red-700 shadow-none hover:bg-red-100 hover:text-red-800"
                          >
                            <FaTrashAlt className="" />
                          </Button>
                        </>

                        <ButtonSelf
                          onClick={() =>
                            router.push(`/seller/product/edit/${doc.id}`)
                          }
                          className="mr-2 bg-green-50 p-1 text-green-700"
                        >
                          <FaEdit className="" />
                        </ButtonSelf>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={data?.totalPage || 0}
          />
        </div>
        {/* <div className="pb-4 pt-4">
          <ResponsivePaginationComponent
            total={totalPages}
            current={page}
            onPageChange={(page) => setPage(page)}
          />
        </div> */}
        <Modal
          title="Product Delete"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModalOpen}
          onOk={() => {
            if (selectedProductId) handleOk(selectedProductId);
          }}
          onCancel={handleCancel}
          centered
        >
          <p className="text-base">Are you sure?</p>
        </Modal>
      </div>
    </RequireAccess>
  );
};

export default ProductList;
