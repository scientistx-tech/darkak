"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ButtonSelf from "../../../../components/Button";
import Image from "next/image";
import { toast } from "react-toastify";
import * as Switch from "@radix-ui/react-switch";
import { useGetVendorsTransactionQuery } from "@/redux/services/admin/adminVendorApis";
import { Skeleton } from "@/components/ui/skeleton";

const Transaction = ({ id }: { id: string }) => {
  const { data, isLoading, error, refetch } = useGetVendorsTransactionQuery({
    id: Number(id),
  });
  return (
    <div className="mt-8 rounded-md bg-white font-medium text-slate-900">
      <div className="flex flex-col items-start justify-between gap-4 p-4 md:flex-row md:items-center">
        <span>
          Transaction <p className="inline">{data?.data?.length || 0}</p>
        </span>
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:gap-3">
          <input
            placeholder="Search by order id or transaction id"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none md:w-72"
            type="text"
          />
          <select
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none md:w-48"
            name=""
            id=""
          >
            <option value="">All</option>
            <option value="hold">Hold</option>
            <option value="disburse">Disburse</option>
          </select>
          <button className="w-full rounded bg-blue-600 px-6 py-2 text-sm text-white transition hover:bg-blue-700 md:w-auto">
            Filter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table className="overflow-x-auto">
          <TableHeader>
            <TableRow className="border-t text-sm ">
              <TableHead>SL</TableHead>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Order Id</TableHead>
              <TableHead>Transaction id</TableHead>
              <TableHead>Order amount</TableHead>
              <TableHead>Vendor amount</TableHead>
              <TableHead>Admin commission</TableHead>
              <TableHead>Received by</TableHead>
              <TableHead>Delivered by</TableHead>
              <TableHead>Delivery charge</TableHead>
              <TableHead>Payment method </TableHead>
              <TableHead>Tax</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 14 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={14}>
                    <Skeleton className="h-8" />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading && data?.data?.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={14} className="py-8 text-center text-red-500">
                  No Data to Show
                </TableCell>
              </TableRow>
            ) : (
              data?.data?.map((doc: any, i: number) => (
                <TableRow className="" key={doc.id}>
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

export default Transaction;
