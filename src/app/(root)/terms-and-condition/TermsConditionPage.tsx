"use client";

import React from "react";
import {
  FaFileContract,
  FaShoppingCart,
  FaUndoAlt,
  FaLock,
  FaEdit,
  FaPhoneAlt,
  FaUserShield,
} from "react-icons/fa";

export default function TermsConditionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] px-6 py-16">
      <div className="animate-fade-in-up mx-auto max-w-5xl space-y-12 rounded-3xl bg-white/70 p-10 shadow-2xl backdrop-blur-lg">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold text-[#102a43] md:text-5xl">
            Terms & Conditions
          </h1>
          <p className="text-gray-600">
            Effective from April 2025 | Welcome to{" "}
            <span className="font-bold text-primaryBlue">Darkak</span>
          </p>
        </div>

        {/* Table of Contents */}
        <div className="space-y-2 text-center text-gray-700">
          <p className="font-semibold">Quick Navigation:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Introduction",
              "Use of Our Website",
              "Orders & Payments",
              "Return & Refund",
              "Intellectual Property",
              "Changes to Terms",
              "Contact Us",
            ].map((item, index) => (
              <a
                key={index}
                href={`#${item.replace(/\s+/g, "")}`}
                className="text-primaryBlue transition hover:underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="border-b border-gray-300"></div>

        {/* Sections */}
        <section className="space-y-12 text-gray-800">
          {/* 1 */}
          <div id="Introduction" className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#334e68] md:text-3xl">
              <FaFileContract className="text-primaryBlue" /> Introduction
            </h2>
            <p>
              Welcome to{" "}
              <span className="font-bold text-primaryBlue">Darkak</span>! By
              accessing or using our platform, you agree to be legally bound by
              these Terms and Conditions. Kindly read carefully before using our
              services.
            </p>
          </div>

          {/* 2 */}
          <div id="UseofOurWebsite" className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#334e68] md:text-3xl">
              <FaUserShield className="text-primaryBlue" /> Use of Our Website
            </h2>
            <p>
              By using Darkak, you agree not to misuse our services or violate
              any laws. You are responsible for keeping your account information
              confidential.
            </p>
          </div>

          {/* 3 */}
          <div id="Orders&Payments" className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#334e68] md:text-3xl">
              <FaShoppingCart className="text-primaryBlue" /> Orders & Payments
            </h2>
            <p>
              All orders are subject to availability and price confirmation. We
              reserve the right to cancel any order at our discretion.
            </p>
          </div>

          {/* 4 */}
          <div id="Return&Refund" className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#334e68] md:text-3xl">
              <FaUndoAlt className="text-primaryBlue" /> Return & Refund
            </h2>
            <p>
              Darkak offers a 7-day return policy for eligible products.
              Returned items must be unused and in their original packaging for
              refunds to be processed.
            </p>
          </div>

          {/* 5 */}
          <div id="IntellectualProperty" className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#334e68] md:text-3xl">
              <FaLock className="text-primaryBlue" /> Intellectual Property
            </h2>
            <p>
              All website content, including text, graphics, logos, and images,
              belongs to Darkak. Unauthorized reproduction is prohibited.
            </p>
          </div>

          {/* 6 */}
          <div id="ChangestoTerms" className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#334e68] md:text-3xl">
              <FaEdit className="text-primaryBlue" /> Changes to Terms
            </h2>
            <p>
              We reserve the right to update or modify these Terms and
              Conditions without prior notice. Please check periodically for
              updates.
            </p>
          </div>

          {/* 7 */}
          <div id="ContactUs" className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#334e68] md:text-3xl">
              <FaPhoneAlt className="text-primaryBlue" /> Contact Us
            </h2>
            <p>
              For any questions regarding these Terms and Conditions, please
              reach out to us at{" "}
              <a
                href="mailto:info@darkak.com.bd"
                className="text-primaryBlue underline"
              >
                info@darkak.com.bd
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
