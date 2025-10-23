'use client';
import React, { useState, useMemo } from 'react';
import OnlineFilter, { FilterValues } from '../components/OnlineFilter';
import PaymentTable, { PaymentItem } from '../components/PaymentTable';

const sampleData: PaymentItem[] = [
  {
    id: '1',
    productImage:
      'https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000',
    productTitle: 'Smart Watch Pro',
    productId: 'W12345',
    customerName: 'Tasnim Shahriar',
    customerEmail: 'tasnim@example.com',
    customerPhone: '01712345678',
    orderNumber: 'ORD-2025-001',
    orderDate: '2025-10-22',
    amount: 3500,
    paymentStatus: 'Successful',
    paymentType: 'Visa Card',
    transactionId: 'TXN-123456789',
  },
  {
    id: '2',
    productImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlndpwDalSNF8TzBG6T7kGv73l0IOReNJpKw&s',
    productTitle: 'iPhone 14 Case',
    productId: 'P56789',
    customerName: 'Shakib Hossen',
    customerEmail: 'shakib@example.com',
    customerPhone: '01798765432',
    orderNumber: 'ORD-2025-002',
    orderDate: '2025-10-23',
    amount: 1200,
    paymentStatus: 'Pending',
    paymentType: 'MasterCard',
    transactionId: 'TXN-123451239',
  },
  {
    id: '3',
    productImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlndpwDalSNF8TzBG6T7kGv73l0IOReNJpKw&s',
    productTitle: 'Wireless Headphones',
    productId: 'P99999',
    customerName: 'Rakib Hossen',
    customerEmail: 'rakib@example.com',
    customerPhone: '01763545432',
    orderNumber: 'ORD-2025-003',
    orderDate: '2025-10-24',
    amount: 2500,
    paymentStatus: 'Cancelled',
    paymentType: 'Mobile Banking',
    transactionId: 'TXN-987654321',
  },
];

export default function Page() {
  const [filters, setFilters] = useState<FilterValues>({});

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const filteredData = useMemo(() => {
    return sampleData.filter((item) => {
      const matchPaymentType =
        !filters.paymentType ||
        item.paymentType.toLowerCase().includes(filters.paymentType.toLowerCase());

      const matchTransactionId =
        !filters.transactionId ||
        item.transactionId.toLowerCase().includes(filters.transactionId.toLowerCase());

      const matchPhoneNumber =
        !filters.phoneNumber ||
        item.customerPhone.toLowerCase().includes(filters.phoneNumber.toLowerCase());

      const matchDateRange =
        !filters.dateRange ||
        (item.orderDate >= filters.dateRange[0] && item.orderDate <= filters.dateRange[1]);

      return matchPaymentType && matchTransactionId && matchPhoneNumber && matchDateRange;
    });
  }, [filters]);

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Ali Express</h2>
      <OnlineFilter onFilterChange={handleFilterChange} />
      <PaymentTable data={filteredData} itemsPerPage={5} />
    </div>
  );
}

