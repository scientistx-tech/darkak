'use client';

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import CategoryPage from '@/components/category/CategoryPage';

export default function Page() {
  const params = useParams();
  const { category } = params;

  return (
    <div className="w-full">
      <div className="h-[65px] w-full md:h-[109px]" />
      <CategoryPage />
    </div>
  );
}
