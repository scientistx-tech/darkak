import React, { useState } from "react";
import { EyeFilled } from "@ant-design/icons";
import { useGetAllVendorsQuery } from "@/redux/services/admin/adminVendorApis";
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

const vendors: Vendor[] = [
  {
    id: 1,
    shopName: "Hanover Electronics",
    vendorName: "Hanover Electronics",
    contactInfo: "seller@seller.com\n+10011111111",
    status: "Active",
    totalProducts: 20,
    totalOrders: 5,
  },
  {
    id: 2,
    shopName: "Kids Corner",
    vendorName: "test seller 5",
    contactInfo: "test.seller5@gmail.com\n+10111000001",
    status: "Active",
    totalProducts: 11,
    totalOrders: 0,
  },
  {
    id: 3,
    shopName: "Athletic Venture",
    vendorName: "test seller 2",
    contactInfo: "test.seller2@gmail.com\n+1018855667755",
    status: "Active",
    totalProducts: 30,
    totalOrders: 0,
  },
  {
    id: 4,
    shopName: "Pets Store",
    vendorName: "test seller 4",
    contactInfo: "test.seller4@gmail.com\n+10188800000",
    status: "Active",
    totalProducts: 21,
    totalOrders: 0,
  },
  {
    id: 5,
    shopName: "Lingerie & co.",
    vendorName: "Test Seller 3",
    contactInfo: "test.seller3@gmail.com\n+10111111114",
    status: "Active",
    totalProducts: 37,
    totalOrders: 1,
  },
  {
    id: 6,
    shopName: "Phone Store",
    vendorName: "test test",
    contactInfo: "test1@gmail.com\n+10111111113",
    status: "Active",
    totalProducts: 14,
    totalOrders: 0,
  },
  {
    id: 7,
    shopName: "Footfinds",
    vendorName: "test seller",
    contactInfo: "test@gmail.com\n0111111111",
    status: "Active",
    totalProducts: 20,
    totalOrders: 0,
  },
  {
    id: 8,
    shopName: "Golden Jewellery",
    vendorName: "abc abc",
    contactInfo: "abc@gmail.com\n+10111111117",
    status: "Active",
    totalProducts: 25,
    totalOrders: 14,
  },
  {
    id: 9,
    shopName: "Book Store",
    vendorName: "kamrujaman joy",
    contactInfo: "test.seller@gmail.com\n+101633333339",
    status: "Active",
    totalProducts: 20,
    totalOrders: 23,
  },
  {
    id: 10,
    shopName: "Bicycle Shop",
    vendorName: "fatema subarna",
    contactInfo: "fatema@gmail.com\n+10111111111",
    status: "Active",
    totalProducts: 18,
    totalOrders: 57,
  },
];

export const VendorTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const {
    data: vendorsData,
    isLoading,
    error,
    refetch,
  } = useGetAllVendorsQuery({ shop_name: searchTerm });

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-6 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by shop name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => router.push("/admin/vendors/add-new-vendor")}
            className="rounded-[10px] bg-blue-600 p-2 text-sm text-white hover:bg-blue-700"
          >
            Add New Vendor
          </button>
        </div>
      </div>

      {/* Table Section */}
      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
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
              <TableRow key={doc.id}>
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
                    checked={!doc?.isBlocked}
                    onCheckedChange={async (checked) => {
                      // try {
                      //   const res = await changeModeratorStatus(
                      //     doc.id,
                      //   ).unwrap();
                      //   refetch();
                      //   toast.success(
                      //     res?.message || "Moderator Status Updated!",
                      //   );
                      // } catch (err: any) {
                      //   toast.error(
                      //     err?.data?.message ||
                      //       "Failed to Update Moderator status",
                      //   );
                      // }
                    }}
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
                  >
                    <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
                  </Switch.Root>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      // onClick={async () => {
                      //   await deleteModerator(doc.id)
                      //     .unwrap()
                      //     .then(() => {
                      //       refetch();
                      //       toast.success("Moderator Deleted Successfully");
                      //     })
                      //     .catch((error: any) => {
                      //       toast.error(error?.data?.message);
                      //     });
                      // }}
                      // disabled={isDeleting}
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
