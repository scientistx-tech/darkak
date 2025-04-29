"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { FaShoppingCart } from "react-icons/fa";

import product1 from "@/Data/Demo/product-2-1.png";
import product2 from "@/Data/Demo/product-2-3.png";
import product3 from "@/Data/Demo/product-2-4.png";

interface WishlistItem {
  id: number;
  name: string;
  price: string;
  brand: string;
  image: any;
}

const initialWishlist: WishlistItem[] = [
  {
    id: 1,
    name: "Gaming Laptop",
    price: "$999",
    brand: "Asus",
    image: product1,
  },
  { id: 2, name: "Sneakers", price: "$120", brand: "Nike", image: product2 },
  { id: 3, name: "Travel Bag", price: "$75", brand: "Zara", image: product3 },
];

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = () => {
    if (deleteId !== null) {
      setWishlist((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="w-full">
      <div className="flex h-[60px] md:h-[100px] w-full items-center justify-center bg-gradient-to-r from-[#00153B] to-[#00286EF2]">
        <p className="text-xl text-white md:text-2xl">Wishlist</p>
      </div>

      <div className="flex justify-center px-2 py-6 md:container md:mx-auto md:px-2 md:py-6 xl:px-4 xl:py-12">
        <div className="flex w-full flex-col gap-6 md:w-[60%]">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="relative flex items-center justify-start md:justify-between gap-4 rounded-xl border p-4 shadow-sm"
            >
              {/* Product Image */}
              <div className="h-[80px] w-[80px] flex-shrink-0 overflow-hidden rounded-md md:h-[120px] md:w-[120px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>

              <div className="w-[80%]">
                {/* Info */}
                <div className="flex-1 space-y-1">
                  <p className="text-base font-semibold text-[#00153B] md:text-lg">
                    Product Name: {item.name}
                  </p>
                  <p className="text-[#00153B]">Brand: {item.brand}</p>
                  <p className="font-medium text-[#00153B]">
                    Price: {item.price}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col items-end justify-end md:justify-center gap-2 md:gap-4">
                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="h-[35px] w-[35px] rounded-full border text-red-500 transition-all duration-300 hover:border-red-500 md:h-[40px] md:w-[40px]"
                  >
                    <DeleteOutlined className="md:text-xl" />
                  </button>

                  <div className="flex items-center justify-evenly gap-4">
                    <Link href="/easy-checkout">
                      <p className="text-primbg-primaryWhite scale-90 cursor-pointer rounded-full hover:bg-primary px-4 py-2 text-sm font-medium text-secondaryWhite transition-all duration-300 bg-primaryBlue hover:text-white md:scale-100 md:px-6 md:font-semibold lg:text-base">
                        BUY NOW
                      </p>
                    </Link>

                    <Link href="/cart">
                      <div className="h-[35px] w-[35px] flex justify-center items-center rounded-full border text-primaryBlue transition-all duration-300 hover:border-primaryBlue md:h-[40px] md:w-[40px]">
                        <FaShoppingCart className="md:text-xl"/>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        title="Are you sure you want to remove this item?"
        open={deleteId !== null}
        onOk={handleDelete}
        onCancel={() => setDeleteId(null)}
        okText="Yes, Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default WishlistPage;
