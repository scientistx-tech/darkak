'use client';

import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Image from 'next/image';
import { IProduct } from '../type';

export default function PosProductCard({
  data,
  onPress,
}: {
  data: IProduct;
  onPress: (
    product: {
      productId: number;
      title: string;
      stock: number;
      totalPrice: number;
      ae_sku_attr?: string;
      options?: { optionId: number; itemId: number }[];
    },
    quantity?: number
  ) => void;
}) {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(data.stock ? 1 : 0);
  const [selectedOptions, setSelectedOptions] = useState<{
    [itemId: number]: number;
  }>({});

  const price = data?.price ?? 0;
  const discount = data?.discount ?? 0;
  const discountType = data?.discount_type ?? 'flat';

  let finalPrice = price;

  if (discountType === 'percentage') {
    finalPrice = price - (price * discount) / 100;
  } else if (discountType === 'flat') {
    finalPrice = price - discount;
  }
  const optionprice =
    data?.items
      ?.flatMap((opt) => opt.options)
      .filter((d) => Object.entries(selectedOptions).some(([key, val]) => val === d.id))
      .reduce((acc, val) => acc + (val.price || 0), 0) || 0;

  const subTotal = (finalPrice + optionprice) * qty;

  return (
    <>
      {/* Product Card */}
      <div
        onClick={() => setOpen(true)}
        className="group relative cursor-pointer rounded-lg border p-3 shadow-sm transition"
      >
        {/* Hover quantity (visible on hover) */}
        <div className="absolute right-2 top-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {data.stock}
        </div>

        <img
          src={data?.thumbnail}
          alt={data?.meta_alt || ''}
          className="mx-auto h-28 object-contain"
        />
        <div className="mt-3 text-center">
          <p className="text-sm font-medium text-gray-800">{data?.title}</p>
          <p className="text-sm font-semibold text-blue-600">৳{finalPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Modal */}
      <Modal title={null} open={open} onCancel={() => setOpen(false)} footer={null} centered>
        <div className="flex flex-col items-center gap-6 p-4 md:p-6 lg:flex-row">
          <div className="w-full md:w-1/3">
            <img src={data?.thumbnail} alt="preview" className="h-40 w-40 object-contain" />
          </div>
          <div className="w-2/3">
            <span
              className={`mb-1 inline-block rounded-full ${data?.stock ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} px-2 py-1 text-xs`}
            >
              {data.stock ? 'In Stock' : 'Out Of Stock'}
            </span>
            <h2 className="mb-2 text-xl font-semibold">{data.title}</h2>
            <p className="mb-2 font-semibold">
              Total Stock: <span className="text-green-500">{data.stock}</span>
            </p>
            <p className="text-lg font-bold text-blue-600">৳{finalPrice.toFixed(2)}</p>

            {data?.items?.map((item, i: number) => (
              <div key={item.id} className="mt-4 flex flex-col gap-4 md:flex-row">
                <p className="text-sm font-medium">{item?.title}:</p>
                <div className="flex flex-wrap gap-3">
                  {item.options.map((option, idx: number) => {
                    const isOutOfStock = Number(option.stock) <= 0;
                    return (
                      <div
                        key={option.id}
                        onClick={() => {
                          if (isOutOfStock) return;
                          setQty(1);
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [item.id]: option.id,
                          }));
                        }}
                        className={`cursor-pointer rounded-full border-2 px-4 py-0.5 transition-colors duration-200 ${
                          selectedOptions[item.id] === option.id
                            ? 'border-primaryBlue bg-primaryBlue text-white shadow-2'
                            : isOutOfStock
                              ? 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400'
                              : 'border-blue-300 bg-white text-primaryBlue'
                        }`}
                        title={isOutOfStock ? 'This option is stock out' : ''}
                        style={isOutOfStock ? { pointerEvents: 'none' } : {}}
                      >
                        {option.title} {option.price ? `৳${option.price}` : ''}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="mt-3 flex items-center gap-2">
              <label className="text-sm font-medium">Qty:</label>
              <div className="flex items-center gap-2 rounded-md border px-2 py-1">
                <button
                  onClick={() => setQty((prev) => Math.max(0, prev - 1))}
                  className="px-2 text-lg"
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  onClick={() => setQty((prev) => Math.min(prev + 1, data.stock))}
                  disabled={qty >= data.stock} // disable when max reached
                  className={`px-2 text-lg ${qty >= data.stock ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  +
                </button>
              </div>
            </div>
            <p className="my-4 ml-auto text-sm font-semibold">
              Total Price: <span className="text-blue-600">৳{subTotal.toFixed(2)}</span>
            </p>
            <Button
              type="primary"
              block
              disabled={qty ? false : true}
              className="mt-5"
              onClick={() => {
                setOpen(false);
                onPress({
                  productId: data.id,
                  stock: data.stock,
                  title: data.title,
                  totalPrice: finalPrice + optionprice,
                  options: Object.entries(selectedOptions).map(([key, val]) => ({
                    itemId: parseInt(key),
                    optionId: val,
                  })),
                  //ae_sku_attr:data.ae
                });
              }}
            >
              Add to cart
            </Button>
          </div>
        </div>

        <div className="mt-4 space-y-1 border-t pt-3 text-sm text-gray-600">
          <p>
            <span className="font-medium">SKU:</span> {data.code}
          </p>
          <p>
            <span className="font-medium">Categories:</span> {data?.category?.title || 'N/A'}
          </p>
          <p>
            <span className="font-medium">Brand:</span> {data?.brand?.title || 'N/A'}
          </p>
        </div>
      </Modal>
    </>
  );
}
