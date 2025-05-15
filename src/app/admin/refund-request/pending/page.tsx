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

// Yup schema
const brandSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

const PendingRefundRequest = () => {
  const { data, isLoading, error, refetch } = useGetBrandsQuery();
  const [deleteBrand] = useDeleteBrandMutation();
  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{
    title: string;
    icon: File | null;
  }>({
    title: "",
    icon: null,
  });

  const handleDelete = async (brandId: number) => {
    try {
      await deleteBrand(brandId).unwrap();
      toast.success("Brand deleted successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to delete brand.");
    }
  };

  const handleEdit = (doc: any) => {
    setEditingId(doc.id);
    setEditData({ title: doc.title, icon: null });
  };

  const handleUpdate = async (brandId: number) => {
    try {
      // Validate using Yup
      await brandSchema.validate(editData);

      const formData = new FormData();
      formData.append("title", editData.title);
      if (editData.icon) {
        formData.append("icon", editData.icon);
      }

      await updateBrand({ categoryId: String(brandId), formData }).unwrap();
      toast.success("Brand updated successfully!");
      setEditingId(null);
      refetch();
    } catch (err: any) {
      if (err.name === "ValidationError") {
        toast.error(err.message);
      } else {
        toast.error("Failed to update brand.");
      }
    }
  };

  return (
    <div className="min-h-screen">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
        🏠 Pending Refund Request{" "}
        <span className="rounded-full bg-gray-200 px-2 py-0.5 text-sm">
          194
        </span>
      </h2>
      <div className="mt-8 bg-white p-5 dark:bg-gray-dark dark:shadow-card">
        {/* search box and export button */}
        <div className="flex items-center justify-between pb-6">
          {/* search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search brand"
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
            <button className="flex items-center gap-2 rounded-md border-2 border-blue-400 px-4 py-2 text-sm font-medium text-blue-400">
              <img
                width={20}
                height={20}
                src="/images/icon/icon-excel.svg"
                alt=""
              />
              Export
            </button>
          </div>
        </div>
        {error ? (
          <p className="px-6 text-red-500">Error loading brands.</p>
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
                data?.data?.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="pl-5 sm:pl-6 xl:pl-7.5">
                      {editingId === doc.id ? (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              icon: e.target.files?.[0] || null,
                            })
                          }
                        />
                      ) : (
                        <Image
                          src={doc.icon}
                          className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                          width={60}
                          height={50}
                          alt={`${doc.title} image`}
                        />
                      )}
                    </TableCell>

                    <TableCell>
                      {editingId === doc.id ? (
                        <input
                          type="text"
                          className="w-full rounded-md border px-2 py-1"
                          value={editData.title}
                          onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                          }
                        />
                      ) : (
                        doc.title
                      )}
                    </TableCell>

                    <TableCell>{doc._count.products}</TableCell>

                    <TableCell>
                      {editingId === doc.id ? (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleUpdate(doc.id)}
                            className="bg-green-600 text-white"
                          >
                            {isUpdating ? "plz wait.." : "save"}
                          </Button>
                          <Button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-500 text-white"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleEdit(doc)}
                          className="bg-blue text-white"
                        >
                          Edit
                        </Button>
                      )}
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
    </div>
  );
};

export default PendingRefundRequest;
