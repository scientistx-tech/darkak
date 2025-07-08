'use client';

import React, { useEffect, useState } from 'react';
import CategoryPage from '@/components/category/CategoryPage';
import { useParams, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

type SidebarFilters = { [key: string]: any };

export default function CategoryPageServer() {
     // const searchParams = useSearchParams();
  // // Convert searchParams to a plain object
  // const query: Record<string, string> = {};
  // searchParams.forEach((value, key) => {
  //   query[key] = value;
  // });

  const [sidebarFilters, setSidebarFilters] = useState<{ [key: string]: any }>({});
  const [data, setData] = useState<any>({});
  const [visibleCount, setVisibleCount] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Add currentPage to sidebarFilters before calling useGetAllProductsQuery
  const filtersWithPageAndLimit = {
    page: String(visibleCount),
    limit: '20',
  };

  const fetchAllProducts = async () => {
    const queryString = filtersWithPageAndLimit
      ? `?${new URLSearchParams(filtersWithPageAndLimit).toString()}`
      : '';
    try {
      setIsLoading(true), setIsFetching(true);
      const response = await fetch(`https://api.darkak.com.bd/api/public/filter${queryString}`);
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setIsLoading(false), setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [sidebarFilters, visibleCount]);

  console.log('setSidebarFilters type:', typeof setSidebarFilters);
  return (
    <div className="w-full">
      <div className="h-[65px] w-full md:h-[109px]" />
      <CategoryPage
        data={data}
        sidebarFilters={sidebarFilters}
        setSidebarFilters={setSidebarFilters}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
      />
    </div>
  )
}
