"use client";

import React, { useState } from "react";
import { PlusOutlined, MinusOutlined, CheckOutlined } from "@ant-design/icons";
import { Input, Button, notification, Checkbox, Modal } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import product1 from "@/Data/Demo/product-2-1.png";
import product2 from "@/Data/Demo/product-2-3.png";
import product3 from "@/Data/Demo/product-2-4.png";
import SendButton from "@/components/Button/SendButton";

const initialProducts = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    variant: "128GB, AUS, Black Titanium",
    price: 132500,
    image: product1,
    quantity: 1,
  },
  {
    id: 2,
    name: "Galaxy A56 5G",
    variant: "Graphite, 8/128GB",
    price: 43000,
    image: product2,
    quantity: 1,
  },
  {
    id: 3,
    name: "Xiaomi Pad 7",
    variant: "Black, 8/256GB, Without Book Cover",
    price: 45500,
    image: product3,
    quantity: 1,
  },
];

const EasyCheckout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [agree, setAgree] = useState(true);

  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const handleConfirm = () => {
    console.log("Form Submitted:");
    console.log("Full Name:", fullName);
    console.log("Phone or Email:", phone);
    console.log("Address:", address);
    console.log("Payment Method:", paymentMethod);
    console.log("Agreed to Terms:", agree);

    if (!fullName || !phone || !address) {
      api.warning({
        message: "Warning",
        description: "Please fill in all required fields.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (phone.includes("@") && !emailRegex.test(phone)) {
      api.error({
        message: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    if (!agree) {
      api.warning({
        message: "Agreement Required",
        description: "Please accept the terms and conditions.",
      });
      return;
    }

    api.success({
      message: "Success",
      description: "Your order has been confirmed.",
    });

    setTimeout(() => {
      router.push("/checkout-done");
    }, 1000);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  // For right side

  const [products, setProducts] = useState(initialProducts);

  const updateQuantity = (id: number, type: "inc" | "dec") => {
    const updated = products.map((item) => {
      if (item.id === id) {
        let newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQty < 1 ? 1 : newQty };
      }
      return item;
    });
    setProducts(updated);
  };

  const subtotal = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="px-2 py-6 md:container md:mx-auto md:px-4 xl:px-6">
      {/* Animated Info Alert */}
      <AnimatePresence mode="wait">
        <motion.div
          key={paymentMethod}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="mb-6 rounded border border-primaryBlue bg-[#E6EFFF] px-2 py-1.5 text-center text-primaryBlue md:px-4 md:py-3"
        >
          {paymentMethod === "cash" ? (
            <>
              অর্ডার সংক্রান্ত যেকোনো প্রয়োজনে কথা বলুন আমাদের কাস্টমার সার্ভিস
              প্রতিনিধির সাথে - <strong> 01915665089</strong>
            </>
          ) : (
            <>
              অনলাইন পেমেন্ট সংক্রান্ত সহায়তার জন্য হেল্পলাইন -{" "}
              <strong> 01915665089</strong>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Payment Method */}
      <div className="flex w-full flex-col gap-4 p-4 md:flex-row md:p-0">
        {/* left-side */}
        <div className="w-full md:w-1/2">
          {contextHolder}
          <p className="text-xl font-medium md:text-2xl">Payment Method</p>

          <div className="mt-5 flex w-full justify-evenly rounded border border-primaryBlue bg-[#E6EFFF] px-2 py-1 transition-all duration-500 md:w-[90%] md:px-3 md:py-2">
            <button
              className={`flex items-center gap-2 rounded px-3 py-1 font-medium transition-all duration-300 md:px-3 md:py-1.5 ${
                paymentMethod === "cash"
                  ? "bg-primaryBlue text-white"
                  : "text-black hover:bg-slate-50 hover:text-primaryBlue"
              }`}
              onClick={() => setPaymentMethod("cash")}
            >
              {paymentMethod === "cash" && (
                <CheckOutlined className="text-xl" />
              )}
              Cash on Delivery
            </button>

            <button
              className={`flex items-center gap-2 rounded px-3 py-1.5 font-medium transition-all duration-300 ${
                paymentMethod === "online"
                  ? "bg-primaryBlue text-white"
                  : "text-black hover:bg-slate-50 hover:text-primaryBlue"
              }`}
              onClick={() => setPaymentMethod("online")}
            >
              {paymentMethod === "online" && (
                <CheckOutlined className="text-xl" />
              )}
              Online Payment
            </button>
          </div>

          <div className="mt-5 md:mt-10">
            <h2 className="mb-3 text-lg font-semibold">Billing Details</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Full Name <span className="text-primaryBlue">*</span>
                </label>
                <Input
                  placeholder="Full Name"
                  className="border border-primaryBlue px-3 py-2"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Phone Number or Email{" "}
                  <span className="text-primaryBlue">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Phone or Email"
                    className="border border-primaryBlue px-3 py-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <Button type="primary">Verify</Button>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Full Address <span className="text-primaryBlue">*</span>
                </label>
                <Input.TextArea
                  placeholder="Address"
                  className="border border-primaryBlue px-3 py-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <Checkbox
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                required
              >
                I have read and agree to the{" "}
                <button onClick={showModal} className="text-primaryBlue">
                  Terms and Conditions
                </button>{" "}
                and{" "}
                <button onClick={showModal2} className="text-primaryBlue">
                  Privacy Policy
                </button>
              </Checkbox>
            </form>

            <div className="mt-5">
              <SendButton link={handleConfirm} text="Confirm Order" />
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full md:w-1/2 md:pl-[10%]">
          <h2 className="mb-0 mt-5 text-lg font-semibold md:mb-3">
            Your Order
          </h2>

          {products.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 border-b pb-3 pt-3"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="rounded"
              />
              <div className="flex-1">
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="text-xs text-gray-600">{item.variant}</div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="font-semibold text-black">
                  {item.price * item.quantity}
                </div>

                <div className="flex">
                  <button
                    onClick={() => updateQuantity(item.id, "dec")}
                    className="bg-primaryBlue px-1.5 py-1 text-white opacity-80 transition-all duration-300 hover:opacity-100"
                  >
                    <MinusOutlined />
                  </button>
                  <p className="w-[30px] border border-primaryBlue text-center text-xl text-black opacity-80">
                    {item.quantity}
                  </p>
                  <button
                    onClick={() => updateQuantity(item.id, "inc")}
                    className="bg-primaryBlue px-1.5 py-1 text-white opacity-80 transition-all duration-300 hover:opacity-100"
                  >
                    <PlusOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-3 flex items-center gap-2">
            <Input placeholder="Coupon Code" className="flex-1" />
            <Button type="primary">Apply</Button>
          </div>

          <div className="mt-5 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>BDT {subtotal}</span>
            </div>
            <div className="flex justify-between text-primaryBlue">
              <span>Delivery Charge</span>
              <span>will be added</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-black">
              <span>Total</span>
              <span>BDT {subtotal}</span>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Terms and Conditions"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      <Modal
        title="Privacy Policy"
        open={isModalOpen2}
        onCancel={handleCancel2}
        footer={false}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default EasyCheckout;
