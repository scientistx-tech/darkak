'use client';

import React, { useState, useEffect } from 'react';
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
import { toast } from 'react-toastify';
import {
  useChangeWatchProductStatusMutation,
  useDeleteWatchProductMutation,
  useGetWatchProductsQuery,
} from '../electronics-slider/watchSliderApi';
import { useSelector } from 'react-redux';
import { useGetSubCategoriesQuery } from '@/redux/services/admin/adminCategoryApis';
import { useGetBrandsQuery } from '@/redux/services/admin/adminBrandApis';
import Loader from '@/components/shared/Loader';
import Link from 'next/link';

export default function ProductListPage() {
  // Filters state
  const [search, setSearch] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [status, setStatus] = useState(''); // '' | 'publish' | 'unpublish'
  const [sortBy, setSortBy] = useState(''); // '' | 'seller' | 'arrival'
  const [availability, setAvailability] = useState(''); // '' | 'in' | 'out'

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useGetWatchProductsQuery({
    search,
    subCategoryId,
    brandId,
    status,
    sortBy,
    availability,
  });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteWatchProductMutation();
  const token = useSelector((state: any) => state.auth.token);
  const [changeStatus, { isLoading: isChangingStatus }] = useChangeWatchProductStatusMutation();
  const {
    data: subCategoriesData,
    isLoading: isSubCategoriesLoading,
    error: subCategoriesError,
    refetch: refetchSubCategories,
  } = useGetSubCategoriesQuery({});
  const { data: brandsData } = useGetBrandsQuery({});

  // New handler for toggle switches
  const handleToggleStatus = async (id: number, type: 'drafted' | 'seller' | 'arival') => {
    try {
      await changeStatus({ id, status: type }).unwrap();
      toast.success(`Product ${type} status updated`);
      refetch();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteProduct(id).unwrap();
      toast.success('Product deleted successfully');
      refetch();
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Filter Products</h3>
      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
        <input
          type="text"
          placeholder="Search by name"
          className="w-full max-w-xs rounded border p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full max-w-xs rounded border p-2"
          value={subCategoryId}
          onChange={(e) => setSubCategoryId(e.target.value)}
        >
          <option value="">All Categories</option>
          {/* Populate with real subcategories */}
          {subCategoriesData?.data &&
            subCategoriesData?.data?.map((subCat: any, i: number) => (
              <option key={subCat?.id} value={subCat?.id}>
                {subCat?.title}
              </option>
            ))}
        </select>

        <select
          className="w-full max-w-xs rounded border p-2"
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
        >
          <option value="">All Brands</option>
          {/* Populate with real brands */}
          {brandsData?.data &&
            brandsData?.data?.map((brand: any, i: number) => (
              <option key={brand?.id} value={brand?.id}>
                {brand?.title}
              </option>
            ))}
        </select>

        <select
          className="w-full max-w-xs rounded border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="publish">Published</option>
          <option value="unpublish">Unpublished</option>
        </select>

        <select
          className="w-full max-w-xs rounded border p-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="seller">Best Seller</option>
          <option value="arrival">New Arrivals</option>
        </select>

        <select
          className="w-full max-w-xs rounded border p-2"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">Availability</option>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      <h1 className="mb-4 text-2xl font-semibold">Product List</h1>

      {isLoading ? (
        <Loader />
      ) : (
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
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product: any, index: any) => (
                <TableRow key={product.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={product?.thumbnail || '/placeholder.png'}
                        alt={product.thumbnail_alt}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                      <span className="font-medium">{product.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p>Sales: {product.product?._count?.order_items || 0}</p>
                    <p>Price: ৳{product?.product?.offerPrice || product.product?.price || 'N/A'}</p>
                    <p>Stock: {product.product?.stock ?? 'N/A'}</p>
                  </TableCell>
                  <TableCell>
                    <Switch.Root
                      className="relative h-[24px] w-[42px] rounded-full bg-gray-300 data-[state=checked]:bg-green-500"
                      checked={product.publish}
                      onCheckedChange={() => handleToggleStatus(product.id, 'drafted')}
                      disabled={isChangingStatus}
                    >
                      <Switch.Thumb className="block h-5 w-5 translate-x-1 rounded-full bg-white shadow-md transition-transform data-[state=checked]:translate-x-[18px]" />
                    </Switch.Root>
                  </TableCell>

                  <TableCell>
                    <Switch.Root
                      className="relative h-[24px] w-[42px] rounded-full bg-gray-300 data-[state=checked]:bg-blue-500"
                      checked={product.seller}
                      onCheckedChange={() => handleToggleStatus(product.id, 'seller')}
                      disabled={isChangingStatus}
                    >
                      <Switch.Thumb className="block h-5 w-5 translate-x-1 rounded-full bg-white shadow-md transition-transform data-[state=checked]:translate-x-[18px]" />
                    </Switch.Root>
                  </TableCell>

                  <TableCell>
                    <Switch.Root
                      className="relative h-[24px] w-[42px] rounded-full bg-gray-300 data-[state=checked]:bg-purple-500"
                      checked={product.arrival}
                      onCheckedChange={() => handleToggleStatus(product.id, 'arival')}
                      disabled={isChangingStatus}
                    >
                      <Switch.Thumb className="block h-5 w-5 translate-x-1 rounded-full bg-white shadow-md transition-transform data-[state=checked]:translate-x-[18px]" />
                    </Switch.Root>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/landing-page/watch/product-list/${product.id}`}
                        className="text-blue-600 hover:text-blue-800"
                        // Implement edit logic
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800"
                        disabled={isDeleting}
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
