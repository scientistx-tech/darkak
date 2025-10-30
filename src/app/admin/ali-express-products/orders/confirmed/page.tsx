'use client';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import {
  useGetBrandsQuery,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} from '@/redux/services/admin/adminBrandApis';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Button from '../../../components/Button';
import { CiCirclePlus } from 'react-icons/ci';
import { useGetOrdersQuery } from '@/redux/services/admin/adminOrderApis';
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdFileDownload } from 'react-icons/md';
import Pagination from '@/components/shared/Pagination';
import { useRouter } from 'next/navigation';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderInvoicePDF from '../[id]/components/OrderInvoicePDF';
import FilterOrders from '../all/FilterOrders';
import RequireAccess from '@/components/Layouts/RequireAccess';
import { useGetAliExpressOrdersQuery } from '@/redux/services/admin/adminAli-ExpressOrderApi';
import MiniButton from '@/app/admin/orders/[id]/components/MiniButton';
const ConfirmedOrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const {
    data: orderData,
    isLoading,
    error,
    refetch,
  } = useGetAliExpressOrdersQuery({
    page: String(currentPage),
    search,
    status: 'confirmed',
  });



  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [currentPage, search]);

  return (
    <RequireAccess permission="order-confirm">
      <div className="min-h-screen">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold dark:text-white">
          🏠 Confirmed Orders{' '}
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-sm text-green-600">
            {orderData?.total}
          </span>
        </h2>

        <FilterOrders value={search} onChange={setSearch} />

        <div className="mt-8 bg-white p-5 dark:bg-gray-dark dark:text-white dark:shadow-card">
          {/* search box and export button */}
          <div className="flex items-center justify-between pb-6">
            <span>Order List</span>
            {/* more buttons*/}
            <div className="flex items-center gap-x-2">
              {/* <button className="flex items-center gap-2 rounded-md border-2 border-blue-400 px-4 py-2 text-sm font-medium text-blue-400">
              <Image
                width={20}
                height={20}
                src="/images/icon/icon-excel.svg"
                alt=""
              />
              Export
            </button> */}

              {/* search box */}

            </div>
          </div>
          {error ? (
            <p className="px-6 text-red-500">Error loading brands.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
                  <TableHead>SL</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Customer Info</TableHead>
                  <TableHead className="">Courier Status</TableHead>

                  <TableHead>Store</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead className="text-center">Action</TableHead>
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

                {!isLoading && orderData?.data?.length <= 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center text-red-500">
                      No Data to Show
                    </TableCell>
                  </TableRow>
                ) : (
                  orderData?.data?.map((order: any, i: number) => (
                    <TableRow key={order.id}>
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
                      <TableCell className="flex items-start">
                        <div className="flex flex-col gap-2">
                          <p>{order.name}</p>
                          <div>
                            <Image
                              width={20}
                              height={20}
                              src="/images/icon/icon_phone.png"
                              alt="phone"
                              className="mr-2 inline-block"
                            />
                            {order.phone}
                          </div>
                        </div>
                      </TableCell>{' '}
                      <TableCell>
                        {order?.courier_status === null
                          ? 'N/A'
                          : order?.courier_status.split('_').join(' ')}
                      </TableCell>
                      <TableCell>ali-express</TableCell>
                      <TableCell>
                        {order.subTotal + order.deliveryFee}

                        <div className="flex">
                          {order.paid ? (
                            <p className="mt-1 rounded border border-teal-600 bg-teal-100 p-0.5 text-xs font-bold text-teal-600">
                              Paid
                            </p>
                          ) : (
                            <p className="mt-1 rounded border border-rose-600 bg-rose-100 p-0.5 text-xs font-bold text-rose-600">
                              Unpaid
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="flex items-center justify-center gap-2">
                        <Button
                          onClick={() => {
                            router.push(`/admin/orders/${order.id}`);
                          }}
                          className="rounded-full bg-blue-100 p-1 text-base text-blue-700"
                        >
                          <FaEye />
                        </Button>
                        <MiniButton orderDetails={order} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}

          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            total={orderData?.total}
            limit={orderData?.limit}
          />
        </div>
      </div>
    </RequireAccess>
  );
};

export default ConfirmedOrderList;
