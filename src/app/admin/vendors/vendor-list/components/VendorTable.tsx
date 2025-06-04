import React, { useState } from "react";
import { EyeFilled } from "@ant-design/icons";
import {
  useChangeVendorStatusMutation,
  useGetAllVendorsQuery,
} from "@/redux/services/admin/adminVendorApis";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as Switch from "@radix-ui/react-switch";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Vendor {
  id: number;
  shopName: string;
  vendorName: string;
  contactInfo: string;
  status: string;
  totalProducts: number;
  totalOrders: number;
}

export const VendorTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const {
    data: vendorsData,
    isLoading,
    error,
    refetch,
  } = useGetAllVendorsQuery({ shop_name: searchTerm });
  const [changeStatus] = useChangeVendorStatusMutation();

  const handleVendorStatus = async (id: number) => {
    try {
      const res = await changeStatus(id).unwrap();
      toast.success(res?.message || "Successfully updated status");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <input
          type="text"
          placeholder="Search by shop name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="order-2 w-2/3 rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white md:w-1/3 lg:order-1"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => router.push("/admin/vendors/add-new-vendor")}
            className="order-1 rounded-[10px] bg-blue-600 p-2 text-sm text-white hover:bg-blue-700 lg:order-2"
          >
            Add New Vendor
          </button>
        </div>
      </div>

      {/* Table Section */}
      <Table>
        <TableHeader>
          <TableRow className="whitespace-nowrap border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead>Shop Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={6}>
                  <Skeleton className="h-8" />
                </TableCell>
              </TableRow>
            ))}

          {!isLoading && vendorsData?.vendors?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No Vendor Found.
              </TableCell>
            </TableRow>
          ) : (
            vendorsData?.vendors?.map((doc: any) => (
              <TableRow className="whitespace-nowrap" key={doc.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src={doc?.shop_logo}
                      alt={`shop_logo_${doc?.id}`}
                      width={20}
                      height={20}
                    />
                    <p>{doc?.store_name}</p>
                  </div>
                </TableCell>
                <TableCell>{doc?.store_address}</TableCell>
                <TableCell>{doc?.user?._count?.products}</TableCell>
                <TableCell>
                  <button
                    onClick={() => {
                      window.open(doc?.whats_app_link, "_blank");
                    }}
                    className="rounded-xl bg-green-400 px-3 py-1 text-white"
                  >
                    Message On What&apos;s App
                  </button>
                </TableCell>
                <TableCell>
                  <Switch.Root
                    checked={doc?.status === "approved"}
                    onCheckedChange={async (checked) => {
                      handleVendorStatus(doc?.id);
                    }}
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
                  >
                    <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
                  </Switch.Root>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        router.push(
                          `/admin/vendors/vendor-list/vendor-show/${doc?.id}`,
                        );
                      }}
                      className="text-teal-600 hover:underline"
                    >
                      View
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
