'use client';
import React, { useState } from 'react';
import OnlineFilter from '../components/OnlineFilter';
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
    paymentType: 'Master Card',
    transactionId: 'TXN-123451239',
  },

  {
    id: '3',
    productImage:
      'data:image/jpeg;base64,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',
    productTitle: 'Wireless Headphones',
    productId: 'P56789',
    customerName: 'Rakib Hossen',
    customerEmail: 'rakib@example.com',
    customerPhone: '01763545432',
    orderNumber: 'ORD-2025-002',
    orderDate: '2025-10-23',
    amount: 1200,
    paymentStatus: 'Cancelled',
    paymentType: 'Bkash',
    transactionId: 'TXN-987654321',
  },
];

export default function page() {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Applied Filters:', newFilters);
  };
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">All Payments</h2>
      <OnlineFilter onFilterChange={handleFilterChange} />
      <PaymentTable data={sampleData} itemsPerPage={5} />
    </div>
  );
}
