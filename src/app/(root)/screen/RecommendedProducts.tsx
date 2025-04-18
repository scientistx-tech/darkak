import ProductCard from "@/components/shared/ProductCard";
import { Product } from "../types/ProductType";

const dummyProducts: Product[] = new Array(8).fill(null).map((_, i) => ({
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

const RecommendedProducts: React.FC = () => {
  return (
    <section className=" py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primaryDarkBlue">
          RECOMMENDED PRODUCTS
        </h2>
        <span className="text-2xl">→</span>
      </div>

      <div className="grid grid-cols-2 justify-center gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 xl:gap-8">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
