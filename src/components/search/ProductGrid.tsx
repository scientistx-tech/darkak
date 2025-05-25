'use client';

import { Product } from '@/app/(root)/types/ProductType';
import ProductCard from '@/components/shared/ProductCard';

interface Props {
    products: Product[];
}

const ProductGrid: React.FC<Props> = ({ products }) => {
    return (
        <>
            {products.length === 0 ? (
                <p className="p-4 text-gray-500">No products found.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ProductGrid;
