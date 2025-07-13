'use client';

import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Image from 'next/image';

const product = {
  name: 'Waterproof Seat Protector',
  price: 25,
  stock: 'In stock',
  image:
    'data:image/jpeg;base64,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', // Replace with actual image path
  sku: 'GNR5QQ',
  category: 'Automotive',
  brand: 'Electronic Store',
  totalStock: 104,
};

export default function PosProductCard() {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);

  const totalPrice = qty * product.price;

  return (
    <>
      {/* Product Card */}
      <div
        onClick={() => setOpen(true)}
        className="group relative cursor-pointer rounded-lg border p-3 shadow-sm transition"
      >
        {/* Hover quantity (visible on hover) */}
        <div className="absolute right-2 top-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {product.totalStock}
        </div>

        <img src={product.image} alt={product.name} className="mx-auto h-28 object-contain" />
        <div className="mt-3 text-center">
          <p className="text-sm font-medium text-gray-800">{product.name}</p>
          <p className="text-sm font-semibold text-blue-600">${product.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Modal */}
      <Modal title={null} open={open} onCancel={() => setOpen(false)} footer={null} centered>
        <div className="flex flex-col items-center gap-6 p-4 md:p-6 lg:flex-row">
          <div className="w-full md:w-1/3">
            <img src={product.image} alt="preview" className="h-40 w-40 object-contain" />
          </div>
          <div className="w-2/3">
            <span className="mb-1 inline-block rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">
              {product.stock}
            </span>
            <h2 className="mb-2 text-xl font-semibold">{product.name}</h2>
            <p className="mb-2 font-semibold">
              Total Stock: <span className="text-green-500">{product.totalStock}</span>
            </p>
            <p className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p>

            <div className="mt-3 flex items-center gap-2">
              <label className="text-sm font-medium">Qty:</label>
              <div className="flex items-center gap-2 rounded-md border px-2 py-1">
                <button
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  className="px-2 text-lg"
                >
                  −
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty((prev) => prev + 1)} className="px-2 text-lg">
                  +
                </button>
              </div>
              <p className="ml-auto text-sm font-semibold">
                Total Price: <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
              </p>
            </div>

            <Button
              type="primary"
              block
              className="mt-5"
              onClick={() => {
                console.log(`Add to cart ${qty}x ${product.name}`);
                setOpen(false);
              }}
            >
              Add to cart
            </Button>
          </div>
        </div>

        <div className="mt-4 space-y-1 border-t pt-3 text-sm text-gray-600">
          <p>
            <span className="font-medium">SKU:</span> {product.sku}
          </p>
          <p>
            <span className="font-medium">Categories:</span> {product.category}
          </p>
          <p>
            <span className="font-medium">Brand:</span> {product.brand}
          </p>
        </div>
      </Modal>
    </>
  );
}
