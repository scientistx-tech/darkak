"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetVendorsReviewQuery } from "@/redux/services/admin/adminVendorApis";
import { Skeleton } from "@/components/ui/skeleton";

const Reviews = ({ id }: { id: string }) => {
  const { data, isLoading, error, refetch } = useGetVendorsReviewQuery({
    id: Number(id),
  });
  return (
    <div className="mt-8 rounded-md bg-white font-medium text-slate-900">
      <div className="flex flex-col items-start justify-between gap-4 p-4 md:flex-row md:items-center">
        <span>
          Reviews <p className="inline">{data?.products?.length || 0}</p>
        </span>
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:gap-3">
          <input
            placeholder="Search by product name"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none md:w-72"
            type="text"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow className="whitespace-nowrap border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
              <TableHead>SL</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-8" />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading && data?.products?.length <= 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-red-500"
                >
                  No Data to Show
                </TableCell>
              </TableRow>
            ) : (
              data?.products?.map((doc: any, i: number) => (
                <TableRow className="whitespace-nowrap" key={doc.id}>
                  {/* Table data here */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Reviews;
