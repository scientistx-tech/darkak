"use client";
import { motion } from "framer-motion";
import ProductCard from "@/components/shared/ProductCard";
import { useGetFeaturedQuery } from "@/redux/services/client/products";
import Link from "next/link";

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
  const { data, error, isLoading, refetch } = useGetFeaturedQuery("");
  if (data?.data?.length === 0) {
    return null;
  }
  return (
    <motion.section
      className="mt-15"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primaryDarkBlue">
          FEATURED PRODUCTS
        </h2>
        <Link href="/more/featured" className="">
          <span className="cursor-pointer text-2xl">→</span>
        </Link>
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
