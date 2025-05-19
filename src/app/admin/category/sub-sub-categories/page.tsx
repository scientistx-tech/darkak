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
import React from "react";
import {
  useDeleteSubSubCategoryMutation,
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetSubSubCategoriesQuery,
} from "@/redux/services/admin/adminCategoryApis";
import { toast } from "react-toastify";
import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddSubSubCategories from "./AddSubSubCategories";

function CategoryTable() {
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

  const [deleteCategory] = useDeleteSubSubCategoryMutation();

  const handleDelete = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId).unwrap();
      toast.success("Sub Sub Category deleted successfully!");
      refetchSubSubCategories();
    } catch (err:any) {
      toast.error(err.data.message);
    }
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex justify-between px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <AddSubSubCategories
          categories={
            categoriesData?.data
              ? categoriesData.data.map((cat) => ({
                  ...cat,
                  isActive: true,
                  _count: Array.isArray(cat._count) ? cat._count : [cat._count],
                }))
              : []
          }
          subCategories={
            subCategoriesData?.data
              ? subCategoriesData.data.map((subCat) => ({
                  id: subCat.id ?? 0,
                  title: subCat.title ?? "",
                  categoryId: subCat.categoryId ?? 0,
                  _count: subCat.hasOwnProperty("_count")
                    ? Array.isArray((subCat as any)._count)
                      ? (subCat as any)._count
                      : [(subCat as any)._count ?? { products: 0 }]
                    : [{ products: 0 }],
                  category: {
                    id:
                      subCat.category && "id" in subCat.category
                        ? ((subCat.category as any).id ?? 0)
                        : 0,
                    title: subCat.category?.title ?? "",
                    icon:
                      subCat.category && "icon" in subCat.category
                        ? ((subCat.category as any).icon ?? "")
                        : "",
                    serial:
                      subCat.category && "serial" in subCat.category
                        ? ((subCat.category as any).serial ?? 0)
                        : 0,
                    isActive:
                      subCat.category && "isActive" in subCat.category
                        ? ((subCat.category as any).isActive ?? true)
                        : true,
                    _count: Array.isArray((subCat.category as any)?._count)
                      ? (subCat.category as any)._count
                      : [(subCat.category as any)?._count ?? { products: 0 }],
                  },
                }))
              : []
          }
          refetch={refetchSubSubCategories}
        />
      </div>
      <div className="flex justify-between px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-xl font-bold text-dark dark:text-white">
          All Sub Sub Categories{" "}
          <button className="rounded-full bg-gray-3 px-4 py-1 text-sm dark:bg-blue-500">
            {subSubCategoriesData?.data?.length}
          </button>
        </h2>
      </div>

      {subSubCategoriesError ? (
        <p className="px-6 text-red-500">Error loading sub sub categories.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
              <TableHead>Serial</TableHead>
              <TableHead>Sub Sub Category Name</TableHead>
              <TableHead>Sub Category Name</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSubSubCategoriesLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-8" />
                  </TableCell>
                </TableRow>
              ))}

            {!isSubSubCategoriesLoading &&
              subSubCategoriesData?.data?.map((doc, i) => (
                <TableRow key={i} className="h-auto">
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{doc.title}</TableCell>
                  <TableCell>{doc.subCategory.title}</TableCell>
                  <TableCell>{doc.category.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-x-2">
                      <Link
                        href={`/admin/category/sub-sub-categories/${doc.id}`}
                        // className="bg-blue text-white"
                      >
                        <MdOutlineEdit className="h-8 w-8 cursor-pointer rounded border-2 border-blue-500 p-1 text-blue-500" />
                      </Link>
                      <button onClick={() => handleDelete(doc.id)} className="">
                        <MdDelete className="h-8 w-8 rounded border-2 border-red-500 p-1 text-red-500" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default CategoryTable;
