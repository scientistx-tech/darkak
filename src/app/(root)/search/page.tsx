'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import FilterSidebar from '@/components/search/FilterSidebar';
import ProductGrid from '@/components/search/ProductGrid';
import { useGetAllProductsQuery } from '@/redux/services/client/products';
import Pagination from '@/components/shared/Pagination';

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const keyword = searchParams.get('keyword')?.toLowerCase().trim() || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    const [currentPage, setCurrentPage] = useState(page);
    const pageSize = 16;

    const { data, isLoading, isError } = useGetAllProductsQuery({});
    console.log("🚀 ~ SearchPage ~ data:", data)

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('page', newPage.toString());
        router.push(`/search?${newParams.toString()}`);
    };

    // Filter and paginate on client
    const allProducts = data?.data || [];

    const filteredProducts = keyword
        ? allProducts.filter((product: any) =>
            JSON.stringify(product).toLowerCase().includes(keyword)
        )
        : allProducts;

    const limit = 16;
    const total = filteredProducts.length;

    const startIdx = (currentPage - 1) * limit;
    const endIdx = startIdx + limit;
    const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

    return (
        <div className='w-full'>
            <div className="h-[65px] w-full md:h-[109px]" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
                <div className="col-span-1">
                    <FilterSidebar products={filteredProducts} />
                </div>
                <div className="col-span-3">
                    <ProductGrid products={paginatedProducts} />
                    <Pagination
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        total={total}
                        limit={pageSize}
                        align="right"
                    />
                </div>
            </div>
        </div>
    );
}
