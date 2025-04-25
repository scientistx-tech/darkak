"use client";

import React, { useState } from "react";
import { PlusOutlined, MinusOutlined, CheckOutlined } from "@ant-design/icons";
import { Input, Button, Radio, Checkbox, message } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import product1 from "@/Data/Demo/product-2-1.png";
import product2 from "@/Data/Demo/product-2-3.png";
import product3 from "@/Data/Demo/product-2-4.png";

const EasyCheckout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");

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
          className="mb-6 rounded border border-primaryBlue bg-[#E6EFFF] px-4 py-3 text-center text-primaryBlue"
        >
          {paymentMethod === "cash" ? (
            <>
              অর্ডার সংক্রান্ত যেকোনো প্রয়োজনে কথা বলুন আমাদের কাস্টমার সার্ভিস
              প্রতিনিধির সাথে - <strong>09678148148</strong>
            </>
          ) : (
            <>
              অনলাইন পেমেন্ট সংক্রান্ত সহায়তার জন্য হেল্পলাইন -{" "}
              <strong>09678148148</strong>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Payment Method */}
      <div className="flex w-full gap-4">
        {/* left-side */}
        <div className="w-1/2">
          <p className="text-xl font-medium md:text-2xl">Payment Method</p>

          <div className="mt-5 flex w-[90%] justify-evenly rounded border border-primaryBlue bg-[#E6EFFF] px-3 py-2 transition-all duration-500">
            <button
              className={`flex items-center gap-2 rounded px-3 py-1.5 font-medium transition-all duration-300 ${
                paymentMethod === "cash"
                  ? "bg-primary text-white"
                  : "text-black hover:bg-slate-50 hover:text-primary"
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
                  ? "bg-primary text-white"
                  : "text-black hover:bg-slate-50 hover:text-primary"
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
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input placeholder="Full Name" required />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <Input placeholder="Phone Number" required />
                  <Button type="primary">Verify</Button>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <Input.TextArea placeholder="Address" required />
              </div>

              <Checkbox required>
                I have read and agree to the{" "}
                <a href="#" className="text-primary">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary">
                  Privacy Policy
                </a>
              </Checkbox>

              <Button type="primary" className="mt-2">
                Confirm Order
              </Button>
            </form>
          </div>
        </div>

        {/* right side */}
        <div className="w-1/2 md:pl-[10%]">
          <h2 className="mb-3 text-lg font-semibold">Your Order</h2>

          {[
            {
              name: "iPhone 16 Pro",
              variant: "128GB, AUS, Black Titanium",
              price: 132500,
              image: product1,
            },
            {
              name: "Galaxy A56 5G",
              variant: "Graphite, 8/128GB",
              price: 43000,
              image: product2,
            },
            {
              name: "Xiaomi Pad 7",
              variant: "Black, 8/256GB, Without Book Cover",
              price: 45500,
              image: product3,
            },
          ].map((item, idx) => (
            <div
              key={idx}
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
                <div className="font-semibold text-black">{item.price}</div>

                <div className="flex">
                  <button
                    // onClick={() => decreaseQty(item.id)}
                    className="bg-primary px-1.5 py-1 text-white opacity-80 transition-all duration-300 hover:opacity-100"
                  >
                    <MinusOutlined />
                  </button>
                  <p className="border border-primary px-2 text-xl text-black opacity-80 ">
                    0
                  </p>
                  <button
                    // onClick={() => increaseQty(item.id)}
                    className="bg-primary px-1.5 py-1 text-white opacity-80 transition-all duration-300 hover:opacity-100"
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
              <span>BDT 221000</span>
            </div>
            <div className="flex justify-between text-primary">
              <span>Delivery Charge</span>
              <span>will be added</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-black">
              <span>Total</span>
              <span>BDT 221000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasyCheckout;
