import React, { useState } from "react";
import { EyeFilled } from "@ant-design/icons";

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

  const filteredVendors = vendors.filter((vendor) =>
    vendor.shopName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
          <button className="rounded-[10px] bg-green-600 p-2 text-sm text-white hover:bg-green-700">
            Export
          </button>
          <button className="rounded-[10px] bg-blue-600 p-2 text-sm text-white hover:bg-blue-700">
            Add New Vendor
          </button>
        </div>
      </div>

      {/* Table Section */}
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-600">
            <th className="p-2 text-black dark:text-white">SL</th>
            <th className="p-2 text-black dark:text-white">Shop Name</th>
            <th className="p-2 text-black dark:text-white">Vendor Name</th>
            <th className="p-2 text-black dark:text-white">Contact Info</th>
            <th className="p-2 text-black dark:text-white">Status</th>
            <th className="p-2 text-black dark:text-white">Total Products</th>
            <th className="p-2 text-black dark:text-white">Total Orders</th>
            <th className="p-2 text-black dark:text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.map((vendor) => (
            <tr
              key={vendor.id}
              className="border-b border-gray-300 dark:border-gray-600"
            >
              <td className="p-2 text-black dark:text-white">{vendor.id}</td>
              <td className="flex items-center p-2 text-black dark:text-white">
                <span className="mr-2 h-5 w-5 rounded-full bg-gray-300"></span>
                {vendor.shopName}
              </td>
              <td className="p-2 text-black dark:text-white">
                {vendor.vendorName}
              </td>
              <td className="whitespace-pre-line p-2 text-black dark:text-white">
                {vendor.contactInfo}
              </td>
              <td className="p-2 text-green-600 dark:text-green-400">
                {vendor.status}
              </td>
              <td className="p-2 text-black dark:text-white">
                {vendor.totalProducts}
              </td>
              <td className="p-2 text-black dark:text-white">
                {vendor.totalOrders}
              </td>
              <td className="p-2 text-blue-600 dark:text-blue-400">
                <button className="hover:underline">
                  <EyeFilled />{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
