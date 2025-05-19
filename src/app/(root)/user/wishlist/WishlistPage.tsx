"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FaShoppingCart } from "react-icons/fa";
import { WishlistItem } from "@/types/client/myWishlistType";
import {
  useGetMyWishListQuery,
  useDeleteWishListMutation,
} from "@/redux/services/client/myWishList";
import ClientLoading from "../../components/ClientLoading";

const WishlistPage: React.FC = () => {
  const { data, isLoading, isError, refetch } = useGetMyWishListQuery({
    page: 1,
    limit: 10,
  });
  const [wishlist, setWishlist] = useState<WishlistItem[] | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [deleteWishList, { isLoading: isDeleting }] =
    useDeleteWishListMutation();

  useEffect(() => {
    setWishlist(data?.data || null);
  }, [data]);
  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        await deleteWishList(deleteId).unwrap();
        setWishlist(
          (prev) => prev?.filter((item) => item.id !== deleteId) || null,
        );
        setDeleteId(null);
      } catch (error) {
        console.error("Failed to delete wishlist item:", error);
      }
    }
  };
  if (isLoading) return <ClientLoading></ClientLoading>;
  if (isError) return <div>Failed to load cart.!</div>;
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-2xl font-bold text-primaryBlue">
            Your wishlist is empty!
          </p>
          <Link href="/" className="text-xl text-primaryBlue underline">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="flex h-[60px] w-full items-center justify-center bg-gradient-to-r from-[#00153B] to-[#00286EF2] md:h-[100px]">
        <p className="text-xl text-white md:text-2xl">Wishlist</p>
      </div>

      <div className="flex justify-center px-2 py-6 md:container md:mx-auto md:px-2 md:py-6 xl:px-4 xl:py-12">
        <div className="flex w-full flex-col gap-6 md:w-[60%]">
          {isLoading ? (
            <div className="text-center">
              <Spin tip="Loading Wishlist..." />
            </div>
          ) : (
            wishlist?.map((item) => (
              <div
                key={item.id}
                className="relative flex items-center justify-start gap-4 rounded-xl border p-4 shadow-sm md:justify-between"
              >
                {/* Product Image */}
                <div className="h-[80px] w-[80px] flex-shrink-0 overflow-hidden rounded-md md:h-[120px] md:w-[120px]">
                  <Image
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>

                <div className="w-[80%]">
                  {/* Info */}
                  <div className="flex-1 space-y-1">
                    <p className="text-base font-semibold text-[#00153B] md:text-lg">
                      Product Name: {item.product.title}
                    </p>
                    <p className="text-[#00153B]">
                      Brand: {item.product.brand.title}
                    </p>
                    <p className="font-medium text-[#00153B]">
                      Price: {item.product.price}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-end justify-end gap-2 md:flex-col md:justify-center md:gap-4">
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="h-[35px] w-[35px] rounded-full border text-red-500 transition-all duration-300 hover:border-red-500 md:h-[40px] md:w-[40px]"
                    >
                      <DeleteOutlined className="md:text-xl" />
                    </button>

                    <div className="flex items-center justify-evenly gap-4">
                      <Link href="/easy-checkout">
                        <p className="text-primbg-primaryWhite scale-90 cursor-pointer rounded-full bg-primaryBlue px-4 py-2 text-sm font-medium text-secondaryWhite transition-all duration-300 hover:bg-primary hover:text-white md:scale-100 md:px-6 md:font-semibold lg:text-base">
                          BUY NOW
                        </p>
                      </Link>

                      <Link href="/cart">
                        <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full border text-primaryBlue transition-all duration-300 hover:border-primaryBlue md:h-[40px] md:w-[40px]">
                          <FaShoppingCart className="md:text-xl" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        title="Are you sure you want to remove this item?"
        open={deleteId !== null}
        onOk={handleDelete}
        onCancel={() => setDeleteId(null)}
        okText={isDeleting ? "Deleting..." : "Yes, Delete"}
        cancelText="Cancel"
        confirmLoading={isDeleting}
      />
    </div>
  );
};

export default WishlistPage;
