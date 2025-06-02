"use client";
import { DeleteFilled, EyeFilled } from "@ant-design/icons";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import * as Yup from "yup";
import { Rating } from "react-simple-star-rating";
import * as Switch from "@radix-ui/react-switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useChangeCustomerReviewStatusMutation } from "@/redux/services/admin/adminCustomerList";
import { toast } from "react-toastify";

interface Review {
  id: number;
  product: {
    title: string;
  };
  name: string;
  customer: string;
  rate: number;
  message: string;
  reply: string;
  date: string;
  isActive: boolean;
}

interface ReviewTableProps {
  data: Review[];
  isLoading: boolean;
  error: FetchBaseQueryError;
  refetch: () => void;
}

export const ReviewTable: React.FC<ReviewTableProps> = ({
  data,
  isLoading,
  error,
  refetch,
}) => {
  const [changeReviewStatus] = useChangeCustomerReviewStatusMutation();
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-semibold">
          Customer Reviews List <span className="text-blue-500">23</span>
        </h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by Product or Customer"
            className="rounded border px-6 py-2 text-sm"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead>SL</TableHead>
            <TableHead>Review ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading &&
            Array.from({ length: 8 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={8}>
                  <Skeleton className="h-8" />
                </TableCell>
              </TableRow>
            ))}

          {!isLoading && data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No Reviews Found.
              </TableCell>
            </TableRow>
          ) : (
            data?.map((review: any, i: number) => (
              <TableRow key={review.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{review?.id}</TableCell>
                <TableCell>{review?.product?.title}</TableCell>
                <TableCell>{review?.name}</TableCell>
                <TableCell>
                  <Rating
                    readonly
                    size={18}
                    initialValue={review?.rate}
                    SVGstyle={{ display: "inline-block" }}
                    fillColor="#facc15" // Tailwind yellow-400
                    emptyColor="#d1d5db" // Tailwind gray-300
                  />
                </TableCell>
                <TableCell>{review?.message}</TableCell>
                <TableCell>
                  {new Date(review?.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>

                <TableCell>
                  <Switch.Root
                    checked={review?.isActive}
                    onCheckedChange={async (checked) => {
                      try {
                        const res = await changeReviewStatus(
                          review.id,
                        ).unwrap();
                        refetch();
                        toast.success(res?.message || "Review Status Updated!");
                      } catch (err: any) {
                        toast.error(
                          err?.data?.message ||
                            "Failed to Update Review status",
                        );
                      }
                    }}
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
                  >
                    <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
                  </Switch.Root>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
