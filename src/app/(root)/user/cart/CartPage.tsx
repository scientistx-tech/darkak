"use client";

import React, { useState } from "react";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Modal, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

import product1 from "@/Data/Demo/product-2-1.png";
import product2 from "@/Data/Demo/product-2-3.png";
import product3 from "@/Data/Demo/product-2-4.png";
import ShopNowButton from "@/components/Button/ShopNowButton";

interface CartItem {
  id: number;
  name: string;
  brand: string;
  model: string;
  image: any;
  quantity: number;
  unitPrice: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Product Name 1",
      brand: "Product Brand",
      model: "Product Model",
      image: product1,
      quantity: 1,
      unitPrice: 1200,
    },
    {
      id: 2,
      name: "Product Name 2",
      brand: "Product Brand",
      model: "Product Model",
      image: product2,
      quantity: 1,
      unitPrice: 900,
    },
    {
      id: 3,
      name: "Product Name 3",
      brand: "Product Brand",
      model: "Product Model",
      image: product3,
      quantity: 1,
      unitPrice: 113050,
    },
  ]);

  const increaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const subTotal = cartItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );

  // For Delete Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const showModal = (id: number) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (itemToDelete !== null) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemToDelete));
      setItemToDelete(null);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const router = useRouter();

  // Message For Coupon / Voucher
  const [messageApi, contextHolder] = message.useMessage();
  const coupon = () => {
    messageApi.open({
      type: "success",
      content: "This coupon applied successfully!",
    });
  };

  const voucher = () => {
    messageApi.open({
      type: "warning",
      content: "This voucher is not found! Please try again.",
    });
  };
  return (
    <div className="w-full">
      {contextHolder}
      <div className="flex h-[60px] w-full items-center justify-center bg-gradient-to-r from-[#00153B] to-[#00286EF2] md:h-[100px]">
        <p className="text-xl text-white md:text-2xl">Shopping Cart</p>
      </div>

      <div className="px-1 py-6 md:container md:mx-auto md:px-2 md:py-6 xl:px-4 xl:py-12">
        <div className="w-full rounded-md bg-white p-2 shadow-md md:p-4">
          {/* Header */}
          <div className="mb-2 mt-5 flex items-center justify-between">
            <div className="flex w-[19%] items-center justify-center rounded-md bg-[#E6EFFF] py-2 md:w-[12%] xl:w-[10%]">
              Image
            </div>
            <div className="flex w-[42%] items-center justify-start rounded-md bg-[#E6EFFF] px-6 py-2 xl:w-[40%]">
              Product Name
            </div>
            <div className="hidden w-[20%] items-center justify-center rounded-md bg-[#E6EFFF] py-2 md:w-[12%] xl:flex xl:w-[10%]">
              Model
            </div>
            <div className="flex w-[19%] items-center justify-center rounded-md bg-[#E6EFFF] py-2 md:w-[12%] xl:w-[10%]">
              Quantity
            </div>
            <div className="hidden w-[12%] items-center justify-center rounded-md bg-[#E6EFFF] py-2 md:flex xl:w-[10%]">
              Unit Price
            </div>
            <div className="flex w-[19%] items-center justify-center rounded-md bg-[#E6EFFF] py-2 md:w-[12%] xl:w-[10%]">
              Total
            </div>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="mt-3 flex items-center justify-between rounded-md bg-[#E6EFFF]"
            >
              <div className="flex w-[19%] items-center justify-center rounded-md py-2 md:w-[12%] xl:w-[10%]">
                <Image
                  src={item.image}
                  alt="product image"
                  className="h-[50px] w-[50px] rounded-md md:h-[80px] md:w-[80px]"
                />
              </div>
              <div className="flex w-[42%] flex-col items-start justify-start rounded-md px-6 py-2 xl:w-[40%]">
                <p className="text-base font-bold text-primaryBlue md:text-xl">
                  {item.name}
                </p>
                <p className="hidden text-sm md:block xl:text-base">
                  <span className="text-black">Brand:</span> {item.brand}
                </p>
                <p className="text-sm xl:hidden xl:text-base">
                  <span className="text-black">Model:</span> {item.model}
                </p>
              </div>
              <div className="hidden w-[12%] items-center justify-center rounded-md py-2 xl:flex xl:w-[10%]">
                <p>
                  <span className="text-black">Model:</span> {item.model}
                </p>
              </div>
              <div className="flex w-[19%] items-center justify-center rounded-md py-2 md:w-[12%] xl:w-[10%]">
                <div className="flex">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="bg-primaryBlue px-1.5 py-1 text-white transition-all duration-300 hover:bg-primary md:rounded-bl-full md:rounded-tl-full md:px-3 md:py-1.5 md:text-xl"
                  >
                    <MinusOutlined />
                  </button>
                  <p className="border border-b-primaryBlue border-t-primaryBlue px-2 text-xl text-black md:py-1.5">
                    {item.quantity}
                  </p>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="bg-primaryBlue px-1.5 py-1 text-white transition-all duration-300 hover:bg-primary md:rounded-br-full md:rounded-tr-full md:px-3 md:py-1.5 md:text-xl"
                  >
                    <PlusOutlined />
                  </button>
                </div>
              </div>
              <div className="hidden w-[12%] items-center justify-center rounded-md py-2 text-black md:flex xl:w-[10%]">
                {item.unitPrice} TK
              </div>
              <div className="flex w-[19%] flex-col items-center justify-evenly rounded-md py-2 md:w-[12%] md:flex-row xl:w-[10%]">
                <p className="font-medium text-primaryDarkBlue">
                  {item.unitPrice * item.quantity} TK
                </p>
                <button
                  onClick={() => showModal(item.id)}
                  className="text-xl text-red-500 hover:text-red-600"
                >
                  <DeleteOutlined />
                </button>
              </div>
            </div>
          ))}

          {/* Totals */}
          <div className="mt-5 flex w-full flex-col items-end justify-center gap-2">
            <p className="text-black md:text-xl">
              Sub-Total:{" "}
              <span className="ml-2 text-primaryBlue md:ml-5">
                {subTotal} TK
              </span>
            </p>
            <p className="text-black md:text-xl">
              Delivery Charge:{" "}
              <span className="ml-2 text-primaryBlue md:ml-5">
                Will be added
              </span>
            </p>
            <p className="text-black md:text-xl">
              Discount: <span className="ml-2 text-primaryBlue md:ml-5">0</span>
            </p>
            <p className="text-black md:text-xl">
              Total:{" "}
              <span className="ml-2 text-primaryBlue md:ml-5">
                {subTotal} TK
              </span>
            </p>
          </div>

          {/* Coupon / Voucher */}
          <div className="mt-5 flex w-full flex-col justify-between gap-2 rounded-md bg-[#F6F9FF] px-6 py-2 md:flex-row">
            <div className="flex w-full rounded-full bg-[#E6EFFF] md:w-[40%]">
              <input
                placeholder="Promo/Coupon"
                className="w-1/2 rounded-md border-none bg-[#E6EFFF] px-3 py-2 outline-none placeholder:text-primaryBlue md:w-2/3"
              />
              <button
                onClick={coupon}
                className="w-1/2 rounded-full border-[5px] border-white bg-primaryBlue px-3 py-1 text-white transition-all duration-300 hover:bg-primary md:w-1/3"
              >
                Apply Coupon
              </button>
            </div>
            <div className="flex w-full rounded-full bg-[#E6EFFF] md:w-[40%]">
              <input
                placeholder="Gift voucher"
                className="w-1/2 rounded-md border-none bg-[#E6EFFF] px-3 py-2 outline-none placeholder:text-primaryBlue md:w-2/3"
              />
              <button
                onClick={voucher}
                className="w-1/2 rounded-full border-[5px] border-white bg-primaryBlue px-3 py-1 text-white transition-all duration-300 hover:bg-primary md:w-1/3"
              >
                Apply Voucher
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mb-10 mt-16 flex w-full items-center justify-between">
            <button
              onClick={() => router.back()}
              className="rounded-full bg-primaryBlue px-6 py-2.5 text-white transition-all duration-300 hover:bg-primary"
            >
              Continue Shopping
            </button>

            <ShopNowButton link="/easy-checkout" text="Check Out" />
          </div>
        </div>

        <Modal
          title="Are you sure?"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Yes, Delete"
          cancelText="Cancel"
        >
          <p>Do you really want to delete this product from your cart?</p>
        </Modal>
      </div>
    </div>
  );
};

export default CartPage;
