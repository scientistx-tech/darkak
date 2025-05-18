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
import {
  useDeleteProductAttributeMutation,
  useGetProductAttributesQuery,
} from "@/redux/services/admin/adminProductApis";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { toast } from "react-toastify";
import AddAttributes from "./AddAttributes";

export default function AttributeSetup() {
  const [queryParams, setQueryParams] = useState({});
  const [search, setSearch] = useState("");
  const [isEditable, setIsEditable] = useState<{
    status: boolean;
    value: {
      id: string;
      title: string;
    };
  }>({ status: false, value: { id: "", title: "" } });

  // redux hooks
  const { data, isLoading, error, refetch } =
    useGetProductAttributesQuery(queryParams);
  const [deleteProductAttribute] = useDeleteProductAttributeMutation();

  const handleDelete = async (attributeId: string) => {
    try {
      await deleteProductAttribute(attributeId).unwrap();
      toast.success("Attribute deleted successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to delete Attribute.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="">
        <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold">
          <span className="text-yellow-600">📋</span>{" "}
          {isEditable.status ? "Edit Attribute" : "Attribute Setup"}
        </h1>

        <AddAttributes
          refetch={refetch}
          value={isEditable.value}
          setIsEditable={setIsEditable}
        />
        {/* Attribute List */}
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">
              Attribute list{" "}
              <span className="rounded-full bg-gray-200 px-2 py-1 text-sm">
                {data?.data?.length}
              </span>
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Attribute Name"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setQueryParams((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }));
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          {error ? (
            <p className="px-6 text-red-500">
              Error Occurs during Loading Attributes.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
                  <TableHead>SL</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-center">Product Count</TableHead>
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
                  data?.data?.map(
                    (
                      doc: {
                        id: string;
                        title: string;
                        _count: { products: number };
                      },
                      i: string,
                    ) => (
                      <TableRow key={i} className="h-auto">
                        <TableCell>{doc.id}</TableCell>

                        <TableCell>{doc.title}</TableCell>
                        <TableCell className="text-center">
                          {doc._count.products}
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center justify-center gap-x-2">
                            <button
                              onClick={() => {
                                setIsEditable({ status: true, value: doc });
                              }}
                              // className="bg-blue text-white"
                            >
                              <MdOutlineEdit className="h-8 w-8 cursor-pointer rounded border-2 border-blue-500 p-1 text-blue-500" />
                            </button>
                            <button
                              onClick={() => handleDelete(doc.id)}
                              className=""
                            >
                              <MdDelete className="h-8 w-8 rounded border-2 border-red-500 p-1 text-red-500" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
