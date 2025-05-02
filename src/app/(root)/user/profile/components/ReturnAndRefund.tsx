"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function ReturnAndRefund() {
  const [selectedOrder, setSelectedOrder] = useState("");
  const [reason, setReason] = useState("");
  const [returnMethod, setReturnMethod] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  const orders = [
    { id: "ORD123", name: "Winter Jacket", date: "March 25, 2024" },
    { id: "ORD124", name: "Sneakers", date: "April 2, 2024" },
  ];

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      if (file.type.startsWith("image/")) {
        if (images.length >= 5) {
          alert("You can upload a maximum of 5 images.");
          continue;
        }
        setImages((prev) => [...prev, file]);
      } else if (file.type.startsWith("video/")) {
        if (video) {
          alert("Only one video is allowed.");
          continue;
        }
        setVideo(file);
      }
    }
  };

  const removeImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const removeVideo = () => {
    setVideo(null);
  };

  return (
    <div className="mx-auto w-full max-w-3xl p-6 sm:p-10 rounded-3xl bg-white/30 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <h2 className="text-4xl text-center font-extrabold text-blue-900 mb-10 drop-shadow-md">
        Return & Refund Request
      </h2>

      {/* Order Dropdown */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Select Order</label>
        <select
          value={selectedOrder}
          onChange={(e) => setSelectedOrder(e.target.value)}
          className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 focus:ring-2 focus:ring-blue-300 transition"
        >
          <option value="">-- Choose an Order --</option>
          {orders.map((order) => (
            <option key={order.id} value={order.id}>
              {order.name} ({order.date})
            </option>
          ))}
        </select>
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Upload Image(s) or Video
        </label>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFiles}
          className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2"
        />

        {/* Image Previews */}
        {images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`img-${idx}`}
                  className="h-full w-full object-cover transition hover:scale-105 duration-200"
                />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Video Preview */}
        {video && (
          <div className="relative mt-4 w-full sm:w-64 rounded-xl overflow-hidden shadow-lg">
            <video
              src={URL.createObjectURL(video)}
              controls
              className="w-full rounded-xl"
            />
            <button
              onClick={removeVideo}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
            >
              <FaTimes size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Reason */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Reason for Return
        </label>
        <textarea
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 resize-none focus:ring-2 focus:ring-blue-300"
          placeholder="Write the reason you want to return the product..."
        />
      </div>

      {/* Return Method */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Return Method
        </label>
        <select
          value={returnMethod}
          onChange={(e) => setReturnMethod(e.target.value)}
          className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 focus:ring-2 focus:ring-blue-300"
        >
          <option value="">-- Choose a Method --</option>
          <option value="courier">Courier Pickup</option>
          <option value="dropoff">Drop-off at Store</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Info Box */}
      <div className="mb-6 rounded-xl bg-blue-100 px-5 py-4 text-blue-900 text-sm sm:text-base shadow-inner border border-blue-200">
        <strong>Note:</strong> You will receive a coupon equal to your order value. It can be used as a discount on your next purchase.
      </div>

      {/* Submit Button */}
      <button
        disabled={!selectedOrder || !reason || !returnMethod}
        className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-6 py-3 text-white font-semibold text-lg hover:opacity-90 transition disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
        onClick={() => alert("Return request submitted!")}
      >
        Submit Request
      </button>
    </div>
  );
}
