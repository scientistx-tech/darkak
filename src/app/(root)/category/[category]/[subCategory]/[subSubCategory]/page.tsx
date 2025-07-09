'use client';

import React, { useEffect, useState } from 'react';
import CategoryPage from '@/components/category/CategoryPage';
import { useParams, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Page() {
  const searchParams = useSearchParams();
  const params = useParams();
  const { subSubCategory } = params;

  console.log('subC', subSubCategory);

  const [sidebarFilters, setSidebarFilters] = useState<{ [key: string]: any }>({});
  const [data, setData] = useState<any>({});
  const [visibleCount, setVisibleCount] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [queryObject, setQueryObject] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const queryObj: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      queryObj[key] = value;
    });
    setQueryObject(queryObj);
  }, [searchParams]);

  // Add currentPage to sidebarFilters before calling useGetAllProductsQuery
  const filtersWithPageAndLimit = {
    subSubCategoryId: decodeURIComponent(String(subSubCategory)).replace(/-/g, ' '),
    page: String(visibleCount),
    limit: '20',
    ...queryObject,
    ...sidebarFilters,
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
  );
}
