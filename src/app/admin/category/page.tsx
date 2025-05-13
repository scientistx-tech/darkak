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
import React from "react";
import Button from "../components/Button";
import AddData from "./AddData";
import { useGetCategoriesQuery } from "@/redux/services/admin/adminCategoryApis";
import { useDeleteCategoryMutation } from "@/redux/services/admin/adminCategoryApis";
import { toast } from "react-toastify";
import Link from "next/link";

function CategoryTable() {
  const { data, isLoading, error, refetch } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleDelete = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId).unwrap();
      toast.success("Category deleted successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex justify-between px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <AddData refetch={refetch} />
      </div>
      <div className="flex justify-between px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          All Categories
        </h2>
      </div>

      {error ? (
        <p className="px-6 text-red-500">Error loading categories.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
              <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
                Icon
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Product Count</TableHead>
              <TableHead>Edit</TableHead>
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

            {!isLoading &&
              data?.data?.map((doc, i) => (
                <TableRow key={i}>
                  <TableCell className="pl-5 sm:pl-6 xl:pl-7.5">
                    <Image
                      src={doc.icon}
                      className="aspect-[5/5] w-15 rounded-[5px] object-cover"
                      width={60}
                      height={50}
                      alt={`${doc.title} image`}
                    />
                  </TableCell>
                  <TableCell>{doc.title}</TableCell>
                  <TableCell>{doc._count.products}</TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/category/${doc.id}`}
                      className="rounded-md bg-blue px-4 py-2 text-white"
                    >
                      Edit
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(doc.id)}
                      className="bg-red-500 text-white"
                    >
                      Delete
                    </Button>
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
