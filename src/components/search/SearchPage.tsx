import React from "react";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "@/types/apiTypes";

interface SearchPageProps {
    products: Product[];
    isLoading: boolean;
    error?: string;
}

export default function SearchPage({ products, isLoading, error }: SearchPageProps) {

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Search Results ({products.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
