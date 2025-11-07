import React from "react";
import { Package } from "lucide-react";
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  _count: {
    order_items: number;
  };
}

interface TopSellingProductsProps {
  products: Product[];
}

const TopSellingProducts: React.FC<TopSellingProductsProps> = ({
  products,
}) => {
  // Limit to top 5 products
  const topFiveProducts = products.slice(0, 5);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-dark">
      <div className="border-b p-4">
        <h3 className="text-md font-semibold dark:text-white">Top Selling Products</h3>
      </div>
      <div className="divide-y">
        {topFiveProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4"
          >
            <div className="flex items-center space-x-3">
              <div className="rounded-md bg-gray-100 p-1">
                {product.thumbnail ? (
                  <Image height={400} width={400}
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                ) : (
                  <Package className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <div>
                <h4 className="line-clamp-1 text-sm font-medium  dark:text-white">
                  {product.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-white">
                  {formatCurrency(product.price)}
                </p>
              </div>
            </div>
            <div className="flex items-center dark:text-red-500 font-semibold">
            Sold: 
              <span className="text-xs font-medium dark:text-white">
               {product._count.order_items}
              </span>
            </div>
          </div>
        ))}

        {topFiveProducts.length === 0 && (
          <div className="p-4 text-center text-gray-500 dark:text-white">
            No products data available
          </div>
        )}
      </div>
    </div>
  );
};

export default TopSellingProducts;
