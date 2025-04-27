"use client";

import React from "react";
import { FaUserSecret, FaShieldAlt, FaDatabase, FaHandshake, FaEnvelope } from "react-icons/fa";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-16 px-6">
      <div className="mx-auto max-w-5xl bg-white/70 backdrop-blur-lg rounded-3xl p-10 shadow-2xl space-y-12 animate-fade-in-up">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-[#102a43]">Privacy Policy</h1>
          <p className="text-gray-600">Your privacy matters to us at <span className="font-bold text-primaryBlue">Darkak</span></p>
        </div>

        <div className="border-b border-gray-300"></div>

        {/* Sections */}
        <section className="space-y-12 text-gray-800">
          
          {/* 1. Introduction */}
          <div id="Introduction" className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-[#334e68]">
              <FaUserSecret className="text-primaryBlue" /> Introduction
            </h2>
            <p>
              At <span className="font-bold text-primaryBlue">Darkak</span>, we are committed to protecting your personal information and your right to privacy. 
              This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
            </p>
          </div>

          {/* 2. Information Collection */}
          <div id="InformationCollection" className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-[#334e68]">
              <FaDatabase className="text-primaryBlue" /> Information We Collect
            </h2>
            <p>
              We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products, when you participate in activities, or otherwise contact us.
            </p>
          </div>

          {/* 3. How We Use Information */}
          <div id="HowWeUse" className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-[#334e68]">
              <FaShieldAlt className="text-primaryBlue" /> How We Use Your Information
            </h2>
            <p>
              We use personal information collected via our Website for a variety of business purposes such as to:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Fulfill and manage your orders.</li>
                <li>Send administrative information to you.</li>
                <li>Deliver targeted advertising to you.</li>
                <li>Protect our Services and prevent fraud.</li>
              </ul>
            </p>
          </div>

          {/* 4. Sharing Your Information */}
          <div id="SharingInformation" className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-[#334e68]">
              <FaHandshake className="text-primaryBlue" /> Sharing Your Information
            </h2>
            <p>
              We only share information with your consent, to comply with laws, to protect your rights, or to fulfill business obligations. We never sell your personal data to third parties.
            </p>
          </div>

          {/* 5. Contact Us */}
          <div id="ContactUs" className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-[#334e68]">
              <FaEnvelope className="text-primaryBlue" /> Contact Us
            </h2>
            <p>
              If you have any questions or comments about this Privacy Policy, you may email us at{" "}
              <a href="mailto:support@darkak.com" className="text-primaryBlue underline">support@darkak.com</a>.
            </p>
          </div>
          
        </section>
      </div>
    </div>
  );
}
