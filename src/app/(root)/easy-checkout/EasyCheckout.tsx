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
              অনলাইন পেমেন্ট সংক্রান্ত সহায়তার জন্য হেল্পলাইন - <strong>09678148148</strong>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Payment Method */}
      <div className="flex w-full gap-4">
        <div className="w-1/2">
          <p className="text-xl font-medium md:text-2xl">Payment Method</p>

          <div className="w-[90%] mt-5 px-3 py-2 flex justify-evenly rounded border border-primaryBlue bg-[#E6EFFF] transition-all duration-500">
            <button
              className={`flex items-center px-3 py-1.5 rounded gap-2 font-medium transition-all duration-300 ${
                paymentMethod === "cash"
                  ? "bg-primary text-white"
                  : "text-black hover:text-primary hover:bg-slate-50"
              }`}
              onClick={() => setPaymentMethod("cash")}
            >
              {paymentMethod === "cash" && <CheckOutlined className="text-xl" />}
              Cash on Delivery
            </button>

            <button
              className={`flex items-center px-3 py-1.5 rounded gap-2 font-medium transition-all duration-300 ${
                paymentMethod === "online"
                  ? "bg-primary text-white"
                  : "text-black hover:text-primary hover:bg-slate-50"
              }`}
              onClick={() => setPaymentMethod("online")}
            >
              {paymentMethod === "online" && <CheckOutlined className="text-xl" />}
              Online Payment
            </button>
          </div>
        </div>

        <div className="w-1/2">Right</div>
      </div>
    </div>
  );
};

export default EasyCheckout;
