"use client";
import { useGetVendorsProductQuery } from "@/redux/services/admin/adminVendorApis";
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
import { Button, Modal } from "antd";
import { FaBarcode, FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteProductMutation,
  useUpdateDraftStatusMutation,
  useUpdateFeatureStatusMutation,
  useUpdateTodaysDealStatusMutation,
} from "@/redux/services/admin/adminProductApis";

const Products = ({ id }: { id: string }) => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [deleteProduct] = useDeleteProductMutation();
  const [changeDealStatus] = useUpdateTodaysDealStatusMutation();
  const [changeFeatureStatus] = useUpdateFeatureStatusMutation();
  const [changePublishedStatus] = useUpdateDraftStatusMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error, refetch } = useGetVendorsProductQuery({
    id: Number(id),
  });

  const router = useRouter();

  console.log("data", data);

  const handleDelete = async (productId: number) => {
    try {
      await deleteProduct(productId).unwrap();
      toast.success("Product deleted successfully!");
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      toast.error("Failed to delete Product.");
    }
  };

  return (
    <div className="mt-8 rounded-md bg-white font-medium text-slate-900">
      <div className="p-4">
        <span>
          Products <p className="inline">{data?.length || 0}</p>
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="whitespace-nowrap border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead>SL</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Added By</TableHead>
            <TableHead>Info</TableHead>
            <TableHead>Total Stock</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Today&apos;s Deal</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading &&
            Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={10}>
                  <Skeleton className="h-8" />
                </TableCell>
              </TableRow>
            ))}

          {!isLoading && data?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="py-8 text-center text-red-500">
                No Data to Show
              </TableCell>
            </TableRow>
          ) : (
            data?.map((doc: any, i: number) => (
              <TableRow className="whitespace-nowrap" key={doc.id}>
                <TableCell>{i + 1}</TableCell>

                <TableCell>
                  {doc?.thumbnail ? (
                    <Image
                      src={doc?.thumbnail}
                      className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                      width={60}
                      height={60}
                      alt={`${doc?.title || "Product"} image`}
                    />
                  ) : (
                    <div className="flex aspect-[6/5] w-15 items-center justify-center rounded-[5px] bg-gray-200 text-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </TableCell>

                <TableCell>{doc?.title}</TableCell>
                <TableCell>
                  {doc?.user?.isAdmin
                    ? "Admin"
                    : doc?.user?.isModerator
                      ? "Moderator"
                      : "Seller"}
                </TableCell>
                <TableCell className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold">Num of Sale:</p>
                    <p>{doc?._count?.order_items}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">Base Price:</p>
                    <p>{doc?.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">Rating:</p>
                    <p>{doc?._count?.review} </p>
                  </div>
                </TableCell>
                <TableCell>{doc?.stock}</TableCell>
                <TableCell>
                  <Switch.Root
                    checked={!doc?.drafted}
                    onCheckedChange={async (checked) => {
                      try {
                        const res = await changePublishedStatus({
                          id: doc?.id,
                          data: { status: !checked },
                        }).unwrap();
                        refetch();
                        toast.success("Published status updated!");
                      } catch (err) {
                        toast.error("Failed to update published status");
                      }
                    }}
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
                  >
                    <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
                  </Switch.Root>
                </TableCell>
                <TableCell>
                  <Switch.Root
                    checked={doc?.deal}
                    onCheckedChange={async (checked) => {
                      try {
                        const res = await changeDealStatus({
                          id: doc?.id,
                          data: { status: checked },
                        }).unwrap();
                        refetch();
                        toast.success("Todays Deal status updated!");
                      } catch (err) {
                        toast.error("Failed to update deal status");
                      }
                    }}
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
                  >
                    <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
                  </Switch.Root>
                </TableCell>
                <TableCell>
                  <Switch.Root
                    checked={doc?.feature}
                    onCheckedChange={async (checked) => {
                      try {
                        const res = await changeFeatureStatus({
                          id: doc?.id,
                          data: { status: checked },
                        }).unwrap();
                        refetch();
                        toast.success("Featured status updated!");
                      } catch (err) {
                        toast.error("Failed to update feature status");
                      }
                    }}
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
                  >
                    <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
                  </Switch.Root>
                </TableCell>
                <TableCell className="">
                  {/* <ButtonSelf
                    onClick={() => handleDelete(doc?.id)}
                    className="mr-2 bg-red-50 p-1 text-blue-700"
                  >
                    <FaBarcode className="" />
                  </ButtonSelf> */}
                  <ButtonSelf
                    onClick={() => router.push(`/product/${doc?.slug}`)}
                    className="mr-2 bg-red-50 p-1 text-yellow-700"
                  >
                    <FaEye className="" />
                  </ButtonSelf>

                  <>
                    <Button
                      type="default"
                      onClick={() => {
                        setSelectedProductId(doc?.id);
                        setIsModalOpen(true);
                      }}
                      className="mr-2 border-none bg-red-50 p-1 text-red-700 shadow-none hover:bg-red-100 hover:text-red-800"
                    >
                      <FaTrashAlt className="" />
                    </Button>
                  </>

                  <ButtonSelf
                    onClick={() => router.push(`/admin/product/edit/${doc.id}`)}
                    className="mr-2 bg-green-50 p-1 text-green-700"
                  >
                    <FaEdit className="" />
                  </ButtonSelf>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Modal
        title="Confirm Deletion"
        open={isModalOpen}
        onOk={() => {
          if (selectedProductId !== null) {
            handleDelete(selectedProductId);
          }
        }}
        onCancel={() => setIsModalOpen(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </div>
  );
};

export default Products;
