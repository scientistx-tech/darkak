'use client';

import React, { useState } from 'react';
import { Input, Select, Button, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function BillingSection() {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'wallet'>('cash');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>();

  const customer = [
    { value: '', label: 'Walking Customer' },
    { value: 'xyz', label: 'Mr. XYZ' },
    { value: 'akash', label: 'Md. Akash' },
  ];

  const filterOption = (input: string, option?: { children: React.ReactNode }) =>
      String(option?.children).toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <div className="mt-5 rounded-lg bg-white p-4 shadow-sm">
        <div className="mb-4 flex w-full justify-end">
          <Button
            onClick={() => setOpen(true)}
            type="default"
            className="border-blue-600 text-blue-600"
          >
            View All Hold Orders <span className="ml-2 text-red-500">0</span>
          </Button>
        </div>
        {/* Top Customer Row */}
        <div className="mb-4 flex w-full flex-1 items-center justify-between gap-8">
          <Select
            showSearch
            allowClear
            value={selectedCustomer}
            placeholder="Select Customer"
            className="w-full"
            onChange={(value) => setSelectedCustomer(value)}
            filterOption={filterOption}
          >
            {customer.map((cat) => (
              <Option key={cat.value} value={cat.value}>
                {cat.label}
              </Option>
            ))}
          </Select>

          <Button
            onClick={() => setOpen2(true)}
            type="primary"
            className="bg-green-600 hover:bg-green-700"
          >
            Add New Customer
          </Button>
        </div>

        {/* Cart Action Row */}
        <div className="mb-4 flex w-full flex-1 items-end justify-between">
          <div className="w-1/2">
            <p className="font-medium text-black">Customer Information</p>
            <p>
              <span className="mr-5 text-black">Name:</span>Mr. XYZ
            </p>
            <p>
              <span className="mr-4 text-black">Phone:</span>0123456789
            </p>
          </div>
          <Button danger>Clear Cart</Button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-4 border-b py-2 font-semibold text-gray-700">
          <div>Item</div>
          <div>Qty</div>
          <div>Price</div>
          <div>Delete</div>
        </div>

        {/* Product Items */}
        {[
          { name: 'Storage Large...', qty: 8, price: 480 },
          { name: 'Bronze floral...', qty: 1, price: 19 },
        ].map((item, idx) => (
          <div key={idx} className="grid grid-cols-4 items-center border-b py-2">
            <div className="truncate">{item.name}</div>
            <div>
              <Input type="number" defaultValue={item.qty} className="w-20" />
            </div>
            <div className="font-medium text-gray-700">${item.price.toFixed(2)}</div>
            <div>
              <Button danger shape="circle" icon={<DeleteOutlined />} />
            </div>
          </div>
        ))}

        {/* Summary Section */}
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Sub Total :</span>
            <span>$499.00</span>
          </div>
          <div className="flex justify-between">
            <span>Product Discount :</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between">
            <span>Extra Discount :</span>
            <span className="flex items-center gap-1">
              $0.00{' '}
              <button>
                <EditOutlined className="text-blue-500" />
              </button>
            </span>
          </div>
          <div className="flex justify-between">
            <span>Coupon Discount :</span>
            <span>
              $0.00{' '}
              <button>
                <EditOutlined className="text-blue-500" />
              </button>
            </span>
          </div>
          <div className="flex justify-between">
            <span>Tax :</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-semibold text-black">
            <span>Total :</span>
            <span>$499.00</span>
          </div>
        </div>

        {/* Paid By */}
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700">Paid By:</p>
          <div className="flex gap-3">
            {['cash', 'card', 'wallet'].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method as 'cash' | 'card' | 'wallet')}
                className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                  paymentMethod === method
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <Button danger className="w-1/2 py-2">
            Cancel Order
          </Button>
          <Button type="primary" className="w-1/2 py-2">
            Place Order
          </Button>
        </div>
      </div>

      {/* View All Hold Orders */}
      <Modal
        title="View All Hold Orders"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      {/* Add New Customer */}
      <Modal
        title="Add New Customer"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={open2}
        onCancel={() => setOpen2(false)}
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
