'use client';
import Image from 'next/image';
import React from 'react';
import { FaEye } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';
import { Skeleton } from '@/components/ui/skeleton';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Button from '@/app/admin/components/Button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderInvoicePDF from '@/app/admin/orders/[id]/components/OrderInvoicePDF';
import { MdFileDownload } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { FaLeftLong } from 'react-icons/fa6';
import MiniButton from '@/app/admin/orders/[id]/components/MiniButton';

const CustomerTable = ({ data }: any) => {
  const router = useRouter();
  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-6 text-gray-800">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <FaLeftLong
          onClick={() => router.back()}
          className="h-8 w-8 cursor-pointer rounded-full bg-gray-3 p-2 text-slate-800 hover:bg-gray-4"
        />
        <h2 className="flex items-center gap-2 text-2xl font-bold">🧑‍⚕️ Customer Details</h2>
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Basic Info */}
        <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow">
          <Image
            src={data?.user?.image || '/images/icon/icon_user.png'} // replace with real image path
            alt="Profile"
            className="rounded-md object-cover"
            width={200}
            height={200}
          />
          <div>
            <h3 className="text-lg font-semibold">{data?.user?.name}</h3>
            <p>
              Contact: <span className="text-gray-600">{data?.user?.phone}</span>
            </p>
            <p>
              Email: <span className="text-gray-600">{data?.user?.email}</span>
            </p>
            <p>
              Joined Date:{' '}
              <span className="text-gray-600">
                {' '}
                {new Date(data?.user?.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}{' '}
              </span>
            </p>
          </div>
        </div>

        {/* Addresses */}
        <div className="space-y-4 rounded-lg bg-white p-4 shadow">
          <h4 className="font-semibold">Saved Address</h4>

          <div className="text-sm">
            <p className="font-semibold">Home (Shipping Address)</p>
            <p>Name: {data?.user?.name}</p>
            <p>Phone: {data?.user?.phone}</p>
            <p>
              Address:{' '}
              {data?.user?.address
                ? `${data?.user?.address?.area}, ${data?.user?.address?.sub_district}, ${data?.user?.address?.district}, ${data?.user?.address?.division}`
                : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
        {[
          {
            label: 'Total Orders',
            count: data?.totalOrder,
            icon: '/images/icon/icon_order.png',
          },
          {
            label: 'Ongoing',
            count: data?.pending + data?.confirm + data?.packaging,
            icon: '/images/icon/icon_order_ongoing.png',
          },
          {
            label: 'Completed',
            count: data?.delivered,
            icon: '/images/icon/icon_order_completed.png',
          },
          {
            label: 'Canceled',
            count: data?.cancelled,
            icon: '/images/icon/icon_order_cancelled.png',
          },
          {
            label: 'Shipped',
            count: data?.out_for_delivery,
            icon: '/images/icon/icon_order_shipped.png',
          },
          {
            label: 'Failed',
            count: data?.failed_to_delivery,
            icon: '/images/icon/icon_order_failed.png',
          },
          {
            label: 'Returned',
            count: data?.returned,
            icon: '/images/icon/icon_order_returned.png',
          },
        ].map(({ label, count, icon }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 rounded-lg bg-white p-4 text-center shadow"
          >
            <p className="text-lg font-bold">{count}</p>
            <div className="flex items-center gap-2">
              <Image src={icon as string} alt={`${label}-${count}`} width={30} height={30} />
              <p className="text-sm text-gray-600">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="rounded-lg bg-white p-4 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-semibold">Orders ({data?.order?.length})</h4>
          {/* <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search orders"
              className="rounded-md border px-3 py-1 text-sm"
            />
          </div> */}
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-t text-base text-slate-900 [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
              <TableHead>SL</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>

              <TableHead>Store</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead className="text-center">Order Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.order?.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-red-500">
                  No Data to Show
                </TableCell>
              </TableRow>
            ) : (
              data?.order?.map((order: any, i: number) => (
                <TableRow key={order.id} className="text-black">
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{order?.orderId}</TableCell>

                  <TableCell>
                    {new Date(order.date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>

                  <TableCell>{order.order_type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <p>{order.subTotal + order.deliveryFee}</p>
                      <div className="flex">
                        {order.paid ? (
                          <p className="mt-1 rounded border border-teal-600 bg-teal-100 p-0.5 text-xs text-teal-600">
                            Paid
                          </p>
                        ) : (
                          <p className="mt-1 rounded border border-rose-600 bg-rose-100 p-0.5 text-xs text-rose-600">
                            Unpaid
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      {order.status === 'pending' ? (
                        <p className="rounded-lg border border-blue-700 bg-blue-50 px-2 py-0.5 text-center font-bold text-blue-700">
                          Pending
                        </p>
                      ) : order.status === 'confirmed' ? (
                        <p className="rounded-lg border border-green-700 bg-green-50 px-2 py-0.5 text-center font-bold text-green-700">
                          Confirmed
                        </p>
                      ) : order.status === 'packaging' ? (
                        <p className="rounded-lg border border-yellow-700 bg-yellow-50 px-2 py-0.5 text-center font-bold text-yellow-700">
                          Packaging
                        </p>
                      ) : order.status === 'out_for_delivery' ? (
                        <p className="rounded-lg border border-yellow-700 bg-yellow-50 px-2 py-0.5 text-center font-bold text-yellow-700">
                          Out For Delivery
                        </p>
                      ) : order.status === 'delivered' ? (
                        <p className="rounded-lg border border-green-700 bg-green-50 px-2 py-0.5 text-center font-bold text-green-700">
                          Delivered
                        </p>
                      ) : order.status === 'returned' ? (
                        <p className="rounded-lg border border-red-700 bg-red-50 px-2 py-0.5 text-center font-bold text-red-700">
                          Returned
                        </p>
                      ) : order.status === 'cancelled' ? (
                        <p className="rounded-lg border border-red-700 bg-red-50 px-2 py-0.5 text-center font-bold text-red-700">
                          Cancelled
                        </p>
                      ) : order.status === 'failed_to_delivery' ? (
                        <p className="rounded-lg border border-red-700 bg-red-50 px-2 py-0.5 text-center font-bold text-red-700">
                          Failed To Deliver
                        </p>
                      ) : (
                        <p className="rounded-lg border border-red-700 bg-red-50 px-2 py-0.5 text-center font-bold text-red-700">
                          Pre Order
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        onClick={() => {
                          router.push(`/admin/orders/${order.id}`);
                        }}
                        className="rounded-full bg-blue-100 p-1 text-base text-blue-700"
                      >
                        <FaEye />
                      </Button>

                      <MiniButton orderDetails={order} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerTable;
