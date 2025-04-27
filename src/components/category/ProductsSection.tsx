import React from "react";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "@/app/(root)/types/ProductType";

const dummyProducts: Product[] = new Array(7).fill(null).map((_, i) => ({
  id: `prod-${i}`,
  name: "iPhone 15 Pro Max",
  images: [
    "/images/dummy/dummy.png",
    "/images/dummy/dummy1.png",
    "/images/dummy/dummy2.png",
  ],
  price: 800,
  originalPrice: 1000,
  storage: "12GB/512GB",
  discount: 20,
  rating: 4.5,
  reviews: 65,
}));

const ProductsSection = () => {
  return (
    <section className="mt-[62px] flex w-full gap-x-7 p-4 md:p-6 lg:p-8 xl:p-10">
      <div className="w-1/5 bg-green-300">left</div>
      <div className="grid w-4/5 grid-cols-2 gap-7 lg:grid-cols-3 xl:grid-cols-4">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
