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
import Button from "../components/Button";
import AddBrand from "./AddBrand";
import {
  useGetBrandsQuery,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} from "@/redux/services/admin/adminBrandApis";
import { toast } from "react-toastify";
import * as yup from "yup";

// Yup schema
const brandSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

function BrandTable() {
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
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex justify-between px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <AddBrand refetch={refetch} />
      </div>
      <div className="flex justify-between px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          All Brands
        </h2>
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
  );
}

export default BrandTable;
