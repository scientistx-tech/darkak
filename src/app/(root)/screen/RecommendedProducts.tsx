"use client";
import { motion } from "framer-motion";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "../types/ProductType";
import { useGetNewArivalProductsQuery } from "@/redux/services/client/products";

// const dummyProducts: Product[] = new Array(8).fill(null).map((_, i) => ({
//   id: `prod-${i}`,
//   name: "iPhone 15 Pro Max",
//   images: [
//     "/images/dummy/dummy.jpg",
//     "/images/dummy/dummy1.jpg",
//     "/images/dummy/dummy2.jpg",
//   ],
//   price: 800,
//   originalPrice: 1000,
//   storage: "12GB/512GB",
//   discount: 20,
//   rating: 4.5,
//   reviews: 65,
// }));

// Framer motion variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const RecommendedProducts: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetNewArivalProductsQuery({});

  console.log("res data", data);

  return (
    <motion.section
      className="py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primaryDarkBlue">
          RECOMMENDED PRODUCTS
        </h2>
        <span className="text-2xl">→</span>
      </div>

      <div className="grid grid-cols-2 justify-center gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-6">
        {data?.data.map((product: any) => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RecommendedProducts;
