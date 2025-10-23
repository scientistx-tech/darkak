'use client';
import React, { useState, useMemo } from 'react';
import OnlineFilter, { FilterValues } from '../components/OnlineFilter';
import PaymentTable, { PaymentItem } from '../components/PaymentTable';

const sampleData: PaymentItem[] = [
  {
    id: '1',
    productImage:
      'https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000',
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
  {
    id: '4',
    productImage:
      'https://plus.unsplash.com/photo-1581091012184-79a22d5a07ef?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000',
    productTitle: 'Laptop Pro 16"',
    productId: 'L23456',
    customerName: 'Nadia Islam',
    customerEmail: 'nadia@example.com',
    customerPhone: '01711223344',
    orderNumber: 'ORD-2025-004',
    orderDate: '2025-10-20',
    amount: 85000,
    paymentStatus: 'Successful',
    paymentType: 'Visa Card',
    transactionId: 'TXN-111222333',
  },
  {
    id: '5',
    productImage:
      'https://plus.unsplash.com/photo-1602524201822-7a7d45b6b6f2?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000',
    productTitle: 'Bluetooth Speaker',
    productId: 'B67890',
    customerName: 'Sakina Rahman',
    customerEmail: 'sakina@example.com',
    customerPhone: '01799887766',
    orderNumber: 'ORD-2025-005',
    orderDate: '2025-10-21',
    amount: 3200,
    paymentStatus: 'Pending',
    paymentType: 'MasterCard',
    transactionId: 'TXN-444555666',
  },
  {
    id: '6',
    productImage:
      'https://plus.unsplash.com/photo-1602524201835-8b8d77b6b7e3?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000',
    productTitle: 'Gaming Mouse',
    productId: 'G11223',
    customerName: 'Rafiq Ahmed',
    customerEmail: 'rafiq@example.com',
    customerPhone: '01766778899',
    orderNumber: 'ORD-2025-006',
    orderDate: '2025-10-22',
    amount: 1800,
    paymentStatus: 'Cancelled',
    paymentType: 'Bkash',
    transactionId: 'TXN-777888999',
  },
  {
    id: '7',
    productImage:
      'https://plus.unsplash.com/photo-1602524201839-9b9e77b7c7f4?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000',
    productTitle: 'Digital Camera',
    productId: 'C33445',
    customerName: 'Arif Khan',
    customerEmail: 'arif@example.com',
    customerPhone: '01755667788',
    orderNumber: 'ORD-2025-007',
    orderDate: '2025-10-23',
    amount: 45000,
    paymentStatus: 'Successful',
    paymentType: 'Visa Card',
    transactionId: 'TXN-101112131',
  },
  {
    id: '8',
    productImage:
      'https://plus.unsplash.com/photo-1602524201842-8c8f88b8d8f5?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000',
    productTitle: 'Tablet Mini',
    productId: 'T55667',
    customerName: 'Fahim Talukder',
    customerEmail: 'fahim@example.com',
    customerPhone: '01733445566',
    orderNumber: 'ORD-2025-008',
    orderDate: '2025-10-24',
    amount: 22000,
    paymentStatus: 'Pending',
    paymentType: 'MasterCard',
    transactionId: 'TXN-141516171',
  },
  {
    id: '9',
    productImage:
      'https://plus.unsplash.com/photo-1602524201845-7d7f99c9e9f6?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000',
    productTitle: 'Smartphone X',
    productId: 'S77889',
    customerName: 'Imran Hossain',
    customerEmail: 'imran@example.com',
    customerPhone: '01722334455',
    orderNumber: 'ORD-2025-009',
    orderDate: '2025-10-25',
    amount: 60000,
    paymentStatus: 'Successful',
    paymentType: 'Mobile Banking',
    transactionId: 'TXN-181920212',
  },
  {
    id: '10',
    productImage:
      'https://plus.unsplash.com/photo-1602524201848-6e6f00a0b0f7?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000',
    productTitle: 'Smartwatch Lite',
    productId: 'W99001',
    customerName: 'Rumana Sultana',
    customerEmail: 'rumana@example.com',
    customerPhone: '01711223399',
    orderNumber: 'ORD-2025-010',
    orderDate: '2025-10-25',
    amount: 2800,
    paymentStatus: 'Cancelled',
    paymentType: 'Bkash',
    transactionId: 'TXN-222333444',
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
      <h2 className="mb-4 text-xl font-semibold">All Payments</h2>
      <OnlineFilter onFilterChange={handleFilterChange} />
      <PaymentTable data={filteredData} itemsPerPage={5} />
    </div>
  );
}
