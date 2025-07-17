'use client';

import ContentFaqCard from '@/components/shared/ContentFaqCard';
import VendorCard from '@/components/shared/VendorCard';
import { useGetAllVendorsQuery } from '@/redux/services/admin/adminVendorApis';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { useGetHomeContentQuery } from '@/redux/services/client/homeContentApi';

export default function VendorPage() {
  const [search, setSearch] = useState<string>('');
  const {
    data: vendorsData,
    isLoading,
    error,
    refetch,
  } = useGetAllVendorsQuery({ shop_name: search });

  return (
    <div className="w-full px-6 py-3 md:px-12 md:py-6">
      {/* Header */}
      <div className="flex w-full flex-col items-center justify-between rounded-lg bg-gradient-to-r from-primary to-[#e5effe] px-6 py-6 md:flex-row">
        {/* Text Section */}
        <div className="w-full text-white md:w-1/2">
          <h1 className="text-2xl font-bold">ALL STORES</h1>
          <p className="mt-1">Find your desired stores and shop your favourite products</p>
        </div>

        {/* Search Box */}
        <div className="mt-3 flex w-full justify-end md:mt-0 md:w-1/2">
          <div className="flex w-full max-w-md">
            <input
              type="text"
              placeholder="Search Store"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-l-md border-[1.5px] border-blue-300 px-4 py-2 outline-none focus:border-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="rounded-r-md bg-primary px-4 text-white hover:bg-blue-800">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Body-Par */}

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {vendorsData?.vendors?.map((vendor: any, i: number) => (
          <VendorCard
            key={i}
            shopLink={`/vendors/shop-view/${vendor?.id}`}
            shopBanner={vendor?.shop_banner}
            shopLogo={vendor?.shop_logo}
            shopName={vendor?.store_name}
            shopRating={vendor?.averageRate || 0}
            shopReviews={vendor?.reviews?.length || 0}
            shopTotalProduct={vendor?.user?._count?.products}
          />
        ))}
      </div>
    </div>
  );
}
