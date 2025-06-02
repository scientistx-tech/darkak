"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import * as Switch from "@radix-ui/react-switch";
import "react-datepicker/dist/react-datepicker.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import {
  useDeleteCouponMutation,
  useGetAllCuponQuery,
  useUpdateCouponStatusMutation,
} from "@/redux/services/admin/adminCuponApis";
import { toast } from "react-toastify";
import AddCoupon from "../AddCoupon";
import RequireAccess from "@/components/Layouts/RequireAccess";

const Page = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isEditable, setIsEditable] = useState<{ status: boolean; value: {} }>({
    status: false,
    value: {},
  });
  const {
    data: couponsData,
    isLoading,
    error,
    refetch,
  } = useGetAllCuponQuery({ search: searchValue });
  const [updateCouponStatus] = useUpdateCouponStatusMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  return (
    <RequireAccess permission="coupon">
      <div className="text-slate-900">
        <div className="flex items-center gap-x-1">
          <Image
            src="/images/icon/icon_cupon.png"
            alt="cupon_icon"
            width={20}
            height={20}
          />
          <p className="text-xl font-bold">
            Cupon {isEditable.status ? "Edit" : "Setup"}
          </p>
        </div>

        {/* add / eidt form */}
        <AddCoupon
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          refetch={refetch}
        />

        {/* data table */}
        <div className="mt-10 rounded-lg bg-white p-6 shadow-md">
          {/* button */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <p>Coupon List</p>
              <p className="rounded-full bg-gray-4 px-2 text-black">
                {couponsData?.total}
              </p>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search by title or Cupon code"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                className="w-fit rounded-md border-2 border-gray-3 px-6 py-2 outline-none"
              />
            </div>
          </div>

          <div className="my-8 text-slate-900">
            <Table>
              <TableHeader>
                <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
                  <TableHead>SL</TableHead>
                  <TableHead>Cupon</TableHead>
                  <TableHead>Cupon Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>User Limit</TableHead>
                  <TableHead>Discount Bearer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
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

                {!isLoading && couponsData?.coupons?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No scripts found.
                    </TableCell>
                  </TableRow>
                ) : (
                  couponsData?.coupons?.map((doc: any, i: number) => (
                    <TableRow key={doc.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <p>{doc?.title}</p>
                          <span>
                            <p className="inline font-bold">Code: </p>
                            {doc?.code}{" "}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{doc?.type}</TableCell>
                      <TableCell>{`${new Date(
                        doc?.start_date,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })} - ${new Date(doc?.end_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}`}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <p className="font-medium">Limit:</p>
                            <p>{doc?.limit}</p>
                          </span>
                          <span className="flex items-center gap-1">
                            <p className="font-medium">Used:</p>
                            <p>{doc?._count?.coupon_used}</p>
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">
                        {doc?.bearer}
                      </TableCell>
                      <TableCell>
                        <Switch.Root
                          checked={doc.status === "published" ? true : false}
                          onCheckedChange={async (checked) => {
                            console.log(checked, "chec");
                            try {
                              const res = await updateCouponStatus(
                                doc.id,
                              ).unwrap();
                              refetch();
                              toast.success("Coupon Status Updated!");
                            } catch (err: any) {
                              toast.error(
                                err?.data?.message ||
                                  "Failed to update published status",
                              );
                            }
                          }}
                          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
                        >
                          <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
                        </Switch.Root>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setIsEditable({
                                status: true,
                                value: doc,
                              });
                              window.scroll({ top: 0, behavior: "smooth" });
                            }}
                            className="text-blue-800 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={async () => {
                              try {
                                const res = await deleteCoupon(
                                  doc?.id,
                                ).unwrap();
                                toast.success(
                                  res?.message || "successfully Deleted Coupon",
                                );
                                refetch();
                              } catch (error: any) {
                                toast.error(
                                  error?.data?.message ||
                                    "Failed to Delete Coupon",
                                );
                              }
                            }}
                            className="text-red-800 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </RequireAccess>
  );
};

export default Page;
