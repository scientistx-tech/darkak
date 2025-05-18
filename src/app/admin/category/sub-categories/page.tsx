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
import Button from "../../components/Button";
// import AddData from "./AddData";
import {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
} from "@/redux/services/admin/adminCategoryApis";
import { useDeleteSubCategoryMutation } from "@/redux/services/admin/adminCategoryApis";
import { toast } from "react-toastify";
import Link from "next/link";
import { Switch } from "@/components/FormElements/switch";
import { MdOutlineEdit } from "react-icons/md";

import { MdDelete } from "react-icons/md";
import AddData from "../categories/AddData";
import AddSubCategories from "./AddSubCategories";

function CategoryTable() {
  const [isEditable, setIsEditable] = useState<{
    status: boolean;
    value: {
      id: string;
      title: string;
      categoryId: string;
    };
  }>({ status: false, value: { id: "", title: "", categoryId: "" } });
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();
  const {
    data: subCategoriesData,
    isLoading,
    error,
    refetch,
  } = useGetSubCategoriesQuery();
  const [deleteCategory] = useDeleteSubCategoryMutation();

  const handleDelete = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId).unwrap();
      toast.success("Sub Category deleted successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to delete sub category.");
    }
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex justify-between px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <AddSubCategories
          categories={
            Array.isArray(categoriesData?.data)
              ? categoriesData.data.map((cat) => ({
                  ...cat,
                  isActive: true,
                  _count: Array.isArray(cat._count) ? cat._count : [cat._count],
                }))
              : []
          }
          refetch={refetch}
          value={isEditable.value}
          setIsEditable={setIsEditable}
        />
      </div>
      <div className="flex justify-between px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-xl font-bold text-dark dark:text-white">
          All Sub Categories{" "}
          <button className="rounded-full bg-gray-3 px-4 py-1 text-sm dark:bg-blue-500">
            {subCategoriesData?.data?.length}
          </button>
        </h2>
      </div>

      {error ? (
        <p className="px-6 text-red-500">Error loading categories.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
              <TableHead>Serial</TableHead>

              <TableHead>Sub Category Name</TableHead>
              <TableHead>Category Name</TableHead>

              <TableHead className="text-center">Action</TableHead>
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

            {!isLoading &&
              subCategoriesData?.data?.map((doc, i) => (
                <TableRow key={i} className="h-auto">
                  <TableCell>{i + 1}</TableCell>

                  <TableCell>{doc.title}</TableCell>

                  <TableCell>{doc?.category?.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-x-2">
                      <button
                        onClick={() => {
                          setIsEditable({
                            status: true,
                            value: {
                              id: String(doc.id),
                              title: doc.title,
                              categoryId: String(doc.categoryId),
                            },
                          });
                        }}
                        // className="bg-blue text-white"
                      >
                        <MdOutlineEdit className="h-8 w-8 cursor-pointer rounded border-2 border-blue-500 p-1 text-blue-500" />
                      </button>
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
