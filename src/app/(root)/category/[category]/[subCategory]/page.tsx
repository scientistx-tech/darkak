'use client';

import React from 'react';
import CategoryPage from '@/components/category/CategoryPage';
import { useParams, useSearchParams } from 'next/navigation';

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
