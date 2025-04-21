"use client";

import React, { useState } from "react";
import { notification } from "antd";

import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (
    type: "success" | "error" | "warning",
    message: string,
    description: string,
  ) => {
    api[type]({
      message,
      description,
    });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = () => {
    if (!name || !email || !phone || !message) {
      openNotification(
        "warning",
        "Incomplete Form",
        "Please fill out all required fields.",
      );
      return;
    }

    if (!validateEmail(email)) {
      openNotification(
        "error",
        "Invalid Email",
        "Please enter a valid email address.",
      );
      return;
    }

    openNotification(
      "success",
      "Signup Successful",
      "You have successfully signed up!",
    );

    console.log({ name, email, phone, message });

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="w-full">
      {contextHolder}

      <div className="flex w-full flex-col pb-5 pt-5 md:flex-row md:pb-20 md:pt-20">
        {/* Left Section */}
        <div className="flex w-full flex-col items-start justify-start md:w-[50%]">
          {/* <p className="mb-4 text-xl font-medium text-secondary md:text-2xl">
            <span className="text-primary">Contact</span> Info.
          </p>

          <div className="mt-3 flex items-center justify-center gap-3 md:mt-5">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary">
              <FaEnvelope className="text-xl text-secondary" />
            </div>

            <p className="text-xl text-secondary">info@darkak.com.bd</p>
          </div>

          <div className="mt-3 flex items-center justify-center gap-3 md:mt-5">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary">
              <FaPhoneAlt className="text-xl text-secondary" />
            </div>

            <p className="text-xl text-secondary">01915665089</p>
          </div>

          <div className="mt-3 flex items-center justify-center gap-3 md:mt-5">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary">
              <FaMapMarkerAlt className="text-xl text-secondary" />
            </div>

            <p className="text-xl text-secondary">Upashahar , Bogura -5800</p>
          </div> */}
        </div>

        {/* Right Section - Form */}
        <div className="flex w-full mt-10 md:mt-0 flex-col items-center bg-white p-6 md:w-[50%] rounded-md">
          <p className="mb-4 text-xl font-medium text-secondary md:text-2xl">
            <span className="text-primary">Drop</span> Us a Line
          </p>

          {/* Name Input */}
          <div className="relative mt-3 w-[90%] md:mt-5">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer block w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              required
            />
            <label
              htmlFor="name"
              className={`absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-400 ${name ? "top-[-2px] bg-white px-1 text-sm text-primary" : ""}`}
            >
              Name
            </label>
          </div>

          {/* Email Input */}
          <div className="relative mt-3 w-[90%] md:mt-5">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer block w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              required
            />
            <label
              htmlFor="email"
              className={`absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-400 ${email ? "top-[-2px] bg-white px-1 text-sm text-primary" : ""}`}
            >
              Email
            </label>
          </div>

          {/* Phone Input */}
          <div className="relative mt-3 w-[90%] md:mt-5">
            <input
              type="number"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="peer block w-full rounded border border-gray-300 bg-white px-3 py-2 leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              required
            />
            <label
              htmlFor="phone"
              className={`absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-400 ${phone ? "top-[-2px] bg-white px-1 text-sm text-primary" : ""}`}
            >
              Phone
            </label>
          </div>

          {/* Message Textarea */}
          <div className="relative mt-3 w-[90%] md:mt-5">
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="peer block h-[150px] w-full resize-none rounded border border-gray-300 bg-white px-3 py-2 leading-[1.6] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              required
            />
            <label
              htmlFor="message"
              className={`absolute left-3 top-3 text-gray-600 transition-all duration-200 ease-out peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 ${message ? "top-[-10px] bg-white px-1 text-sm text-primary" : ""}`}
            >
              Message
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSignup}
            className="mt-5 w-[50%] rounded-3xl border border-primary bg-primary py-2 text-xl font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-primary md:w-[40%]"
          >
            Send
          </button>
        </div>
      </div>

      {/* Map Fields */}
      <div className="tablet:mb-16 mb-8 h-auto w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.9617163564317!2d89.35674171069608!3d24.865157094978088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc55a840699313%3A0xe2ae75d2bf57142f!2sUposhohor%20Bazar!5e0!3m2!1sen!2sbd!4v1742903838097!5m2!1sen!2sbd"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl shadow-xl"
        />
      </div>
    </div>
  );
};

export default ContactPage;
