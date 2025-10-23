'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export interface PaymentItem {
  id: string;
  productImage: string;
  productTitle: string;
  productId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderNumber: string;
  orderDate: string;
  amount: number;
  paymentStatus: 'Cancelled' | 'Pending' | 'Successful';
  paymentType: string; // 🔹 e.g., "Bkash", "Visa Card", "Master Card"
  transactionId: string; // 🔹 Transaction ID
}

export interface PaymentTableProps {
  data: PaymentItem[];
  itemsPerPage?: number;
}

const PaymentTable: React.FC<PaymentTableProps> = ({ data, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Successful':
        return 'bg-green-100 text-green-600';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'Cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border bg-white p-4 shadow-sm">
      {/* Table Header */}
      <div className="mb-2 grid min-w-[1000px] grid-cols-8 border-b pb-2 font-semibold text-gray-700">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center">SL</div>
          <div className="text-center">Product</div>
        </div>
        <div className="text-center">Product Info</div>
        <div className="text-center">Customer Info</div>
        <div className="text-center">Order No</div>
        <div className="text-center">Order Date</div>
        <div className="text-center">Payment Details</div> {/* 🆕 New Column */}
        <div className="text-center">Amount (BDT)</div>
        <div className="text-center">Payment Status</div>
      </div>

      {/* Table Body */}
      {currentData.length > 0 ? (
        currentData.map((item, index) => (
          <div
            key={item.id}
            className="grid min-w-[1000px] grid-cols-8 items-center border-b py-3 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            <div className="grid grid-cols-2 gap-2">
              {/* SL */}
              <div className="text-center">{startIndex + index + 1}</div>

              {/* Product Thumbnail */}
              <div className="flex justify-center">
                <div className="relative h-15 w-15 overflow-hidden rounded-md border">
                  <img src={item.productImage} alt={item.productTitle} className="object-cover" />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="group relative text-center">
              <p className="font-medium">{item.productTitle}</p>
              <p className="flex items-center justify-center gap-1 text-xs text-gray-500">
                ID:
                <span className="text-blue-500">{item.productId}</span>
                {/* Copy button, hidden by default, shows on hover */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(item.productId);
                    // alert('Product ID copied!');
                  }}
                  className="ml-2 hidden items-center justify-center rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300 group-hover:inline-flex"
                >
                  Copy
                </button>
              </p>
            </div>

            {/* Customer Info */}
            <div className="text-center">
              <p className="font-medium">{item.customerName}</p>
              <p className="text-xs text-gray-500">{item.customerEmail}</p>
              <p className="text-xs text-gray-500">{item.customerPhone}</p>
            </div>

            {/* Order Number */}
            <div className="text-center">{item.orderNumber}</div>

            {/* Order Date */}
            <div className="text-center">{item.orderDate}</div>

            {/* 🆕 Payment Details */}
            <div className="text-center">
              <p className="font-medium">{item.paymentType}</p>
              <p className="text-xs text-gray-500">
                TXN: <span className="text-blue-500">{item.transactionId}</span>
              </p>
            </div>

            {/* Amount */}
            <div className="text-center font-semibold">৳{item.amount.toLocaleString('en-BD')}</div>

            {/* Payment Status */}
            <div className="text-center">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                  item.paymentStatus
                )}`}
              >
                {item.paymentStatus}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="py-6 text-center text-gray-500">No payment data found.</div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            className={`rounded-md border px-3 py-1 ${
              currentPage === 1
                ? 'cursor-not-allowed border-gray-200 text-gray-400'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`rounded-md border px-3 py-1 ${
                currentPage === i + 1
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className={`rounded-md border px-3 py-1 ${
              currentPage === totalPages
                ? 'cursor-not-allowed border-gray-200 text-gray-400'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
