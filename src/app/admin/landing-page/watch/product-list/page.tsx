'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import * as Switch from '@radix-ui/react-switch';
import { Pencil, Trash2 } from 'lucide-react';




import img1 from '@/Data/Demo/thumb-1920-831859.jpg';
import img2 from '@/Data/Demo/thumb-1920-479220.jpg';

export default function ProductListPage() {
  const products = [
    {
      id: 1,
      name: 'Classic Silver Watch',
      img: img1,
      sales: 120,
      basePrice: 2500,
      stock: 20,
      published: true,
      seller: true,
      arrival: false,
    },
    {
      id: 2,
      name: 'Luxury Golden Watch',
      img: '/watch2.jpg',
      sales: 75,
      basePrice: 3200,
      stock: 10,
      published: false,
      seller: false,
      arrival: true,
    },
    {
      id: 3,
      name: 'Luxury Golden Watch',
      img: img2,
      sales: 75,
      basePrice: 3200,
      stock: 10,
      published: true,
      seller: true,
      arrival: true,
    },
  ];

  return (
    <div className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Filter Products</h3>
      <div className="mb-4 flex gap-4">
        <input type="text" placeholder="Search by name" className="w-full rounded border p-2" />

        <select className="w-full rounded border p-2">
          <option value="">All Categories</option>
          <option value="">Watches Categories</option>
          <option value="">Watches Categories</option>
          <option value="">Watches Categories</option>
        </select>
        <select className="w-full rounded border p-2">
          <option value="">All Brand</option>
          <option value="">Watches Brand</option>
          <option value="">Watches Brand</option>
          <option value="">Watches Brand</option>
        </select>
        <select className="w-full rounded border p-2">
          <option value="">Status</option>
          <option value="">Published</option>
          <option value="">Unpublished</option>
        </select>
        <select className="w-full rounded border p-2">
          <option value="">Sort by</option>
          <option value="">Best Seller</option>
          <option value="">New Arrivals</option>
        </select>
        <select className="w-full rounded border p-2">
          <option value="">Avaiabilty</option>
          <option value="">In Stock</option>
          <option value="">Out of Stock</option>
        </select>
      </div>

      <h1 className="mb-4 text-2xl font-semibold">Product List</h1>
      <Table>
        <TableHeader className="bg-blue-100">
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Info</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Arrivals</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                  <span className="font-medium">{product.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <p>Sales: {product.sales}</p>
                <p>Price: ৳{product.basePrice}</p>
                <p>Stock: {product.stock}</p>
              </TableCell>
              <TableCell>
                <Switch.Root
                  className="relative h-[24px] w-[42px] rounded-full bg-gray-300 data-[state=checked]:bg-green-500"
                  checked={product.published}
                >
                  <Switch.Thumb className="block h-5 w-5 translate-x-1 rounded-full bg-white shadow-md transition-transform data-[state=checked]:translate-x-[18px]" />
                </Switch.Root>
              </TableCell>
              <TableCell>
                <Switch.Root
                  className="relative h-[24px] w-[42px] rounded-full bg-gray-300 data-[state=checked]:bg-blue-500"
                  checked={product.seller}
                >
                  <Switch.Thumb className="block h-5 w-5 translate-x-1 rounded-full bg-white shadow-md transition-transform data-[state=checked]:translate-x-[18px]" />
                </Switch.Root>
              </TableCell>
              <TableCell>
                <Switch.Root
                  className="relative h-[24px] w-[42px] rounded-full bg-gray-300 data-[state=checked]:bg-purple-500"
                  checked={product.arrival}
                >
                  <Switch.Thumb className="block h-5 w-5 translate-x-1 rounded-full bg-white shadow-md transition-transform data-[state=checked]:translate-x-[18px]" />
                </Switch.Root>
              </TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
