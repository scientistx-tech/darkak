import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaEye, FaRandom, FaShoppingCart } from "react-icons/fa";
import { FaFacebook, FaPinterest, FaXTwitter, FaLink } from "react-icons/fa6";
import Link from "next/link";
import { toast } from "react-toastify";
import { Tooltip } from "antd";
import { useAddToWishListMutation } from "@/redux/services/client/myWishList";

interface RightIconsProps {
  hovered: boolean;
  success: () => void;
  productId: number | string;
}

export default function RightIcons({
  hovered,
  success,
  productId,
}: RightIconsProps) {
  const [addToWishList, { isLoading }] = useAddToWishListMutation();
  const handleAddToWishlist = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent parent click actions
    try {
      const result = await addToWishList({ productId }).unwrap();
      toast.success("Item added to wishlist!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add to wishlist");
    }
  };
  return (
    <motion.div
      className="absolute right-3 top-5 z-30 flex flex-col gap-3 text-xl text-secondaryBlue"
      initial={{ opacity: 0, y: -10 }}
      animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.8 }}
    >
      {/* <Link href="/wishlist"> */}
      <div
        onClick={handleAddToWishlist}
        className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-primaryBlue"
      >
        {isLoading ? (
          <svg
            className="h-5 w-5 animate-spin text-primaryBlue"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        ) : (
          <FaHeart />
        )}
      </div>
      {/* </Link> */}
      <Link href="/product">
        <FaEye className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-primaryBlue" />
      </Link>

      <Tooltip
        className=""
        placement="bottomRight"
        color="#5694FF"
        title={
          <div className="flex gap-3 p-1 text-white">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-lg transition-transform hover:scale-125 hover:text-white" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPinterest className="text-lg transition-transform hover:scale-125 hover:text-white" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="text-lg transition-transform hover:scale-125 hover:text-white" />
            </a>
            <div
              className="cursor-pointer text-lg transition-transform hover:scale-125 hover:text-white"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                success();
              }}
            >
              <FaLink />
            </div>
          </div>
        }
      >
        <FaRandom className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-primaryBlue" />
      </Tooltip>
    </motion.div>
  );
}
