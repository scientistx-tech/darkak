import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { MdFileDownload } from "react-icons/md";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderInvoicePDF from "@/app/admin/orders/[id]/components/OrderInvoicePDF";
import { FaEye } from "react-icons/fa";
import Button from "@/app/admin/components/Button";
import { useGetVendorsOrderQuery } from "@/redux/services/admin/adminVendorApis";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import MiniButton from "@/app/admin/orders/[id]/components/MiniButton";

const OrderTab = ({ id }: { id: string }) => {
  const { data, isLoading, error, refetch } = useGetVendorsOrderQuery({
    id: Number(id),
  });

  const router = useRouter();
  console.log(data, "order");
  return (
    <div className="mt-8 bg-white dark:bg-gray-dark dark:shadow-card md:p-5">
      <div className="my-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center justify-between rounded bg-white p-6 shadow-2">
          <div className="flex items-center gap-2">
            <Image
              src="/images/icon/icon_order_ongoing.png"
              alt="ongoing order"
              width={50}
              height={50}
            />
            <p>Pending</p>
          </div>
          <div>{data?.totalPending}</div>
        </div>
        <div className="flex items-center justify-between rounded bg-white p-6 shadow-2">
          <div className="flex items-center gap-2">
            <Image
              src="/images/icon/icon_order_completed.png"
              alt="delivered order"
              width={50}
              height={50}
            />
            <p>Delivered</p>
          </div>
          <div>{data?.totalDelivered}</div>
        </div>
        <div className="flex items-center justify-between rounded bg-white p-6 shadow-2 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <Image
              src="/images/icon/icon_order_shipped.png"
              alt="total order"
              width={50}
              height={50}
            />
            <p>Total</p>
          </div>
          <div>{data?.totalOrders}</div>
        </div>
      </div>
      {error ? (
        <p className="px-6 text-red-500">Error loading brands.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="whitespace-nowrap border-t text-base text-slate-900 [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
              <TableHead>SL</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Customer Info</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead className="text-center">Order Status</TableHead>
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

            {!isLoading && data?.orders?.length <= 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-8 text-center text-red-500"
                >
                  No Data to Show
                </TableCell>
              </TableRow>
            ) : (
              data?.orders?.map((order: any, i: number) => (
                <TableRow key={order.id} className="text-black">
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{order?.orderId}</TableCell>
                  <TableCell>{order.date}</TableCell>
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
                      {order.status === "pending" ? (
                        <p className="rounded-lg border border-blue-700 bg-blue-50 px-2 py-0.5 text-center font-bold text-blue-700">
                          Pending
                        </p>
                      ) : order.status === "confirmed" ? (
                        <p className="rounded-lg border border-green-700 bg-green-50 px-2 py-0.5 text-center font-bold text-green-700">
                          Confirmed
                        </p>
                      ) : order.status === "packaging" ? (
                        <p className="rounded-lg border border-yellow-700 bg-yellow-50 px-2 py-0.5 text-center font-bold text-yellow-700">
                          Packaging
                        </p>
                      ) : order.status === "out_for_delivery" ? (
                        <p className="rounded-lg border border-yellow-700 bg-yellow-50 px-2 py-0.5 text-center font-bold text-yellow-700">
                          Out For Delivery
                        </p>
                      ) : order.status === "delivered" ? (
                        <p className="rounded-lg border border-green-700 bg-green-50 px-2 py-0.5 text-center font-bold text-green-700">
                          Delivered
                        </p>
                      ) : order.status === "returned" ? (
                        <p className="rounded-lg border border-red-700 bg-red-50 px-2 py-0.5 text-center font-bold text-red-700">
                          Returned
                        </p>
                      ) : order.status === "cancelled" ? (
                        <p className="rounded-lg border border-red-700 bg-red-50 px-2 py-0.5 text-center font-bold text-red-700">
                          Cancelled
                        </p>
                      ) : order.status === "failed_to_delivery" ? (
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
      )}

      {/* <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        total={orderData?.total}
        limit={orderData?.limit}
      /> */}
    </div>
  );
};

export default OrderTab;
