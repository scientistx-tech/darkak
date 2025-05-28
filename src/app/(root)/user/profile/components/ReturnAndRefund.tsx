"use client";

import {
  useAddReturnRequestMutation,
  useGetMyOrdersQuery,
} from "@/redux/services/client/order";
import {
  useUploadMultipleImagesMutation,
  useUploadVideosMutation,
} from "@/redux/services/userApis";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ReturnAndRefund() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1000);
  const {
    data: orders,
    isLoading,
    isError,
  } = useGetMyOrdersQuery({ page, limit });
  const [addReturnRequest, { isLoading: isSubmitting }] =
    useAddReturnRequestMutation();

  const [imageUploading, setImageUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [uploadImages] = useUploadMultipleImagesMutation();
  const [uploadVideos] = useUploadVideosMutation();
  const [selectedOrder, setSelectedOrder] = useState("");
  const [reason, setReason] = useState("");
  const [returnMethod, setReturnMethod] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    let tempImages: File[] = [...images];
    let tempVideo = video;
    let errorMessage = "";

    const newImages: File[] = [];
    let newVideo: File | null = null;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        if (tempImages.length + newImages.length < 5) {
          newImages.push(file);
        } else {
          errorMessage = "You can upload maximum 5 images & 1 video.";
        }
      } else if (file.type.startsWith("video/")) {
        if (!tempVideo && !newVideo) {
          newVideo = file;
        } else {
          errorMessage = "Only 1 video allowed.";
        }
      }
    });

    // Upload images
    if (newImages.length > 0) {
      setImageUploading(true);
      try {
        const formData = new FormData();
        newImages.forEach((img) => formData.append("images", img));
        const res: any = await uploadImages(formData).unwrap();

        const uploadedURLs = res || [];

        setImages((prev) => [...prev, ...newImages]);
        setImageURLs((prev) => [...prev, ...uploadedURLs]);
      } catch (err) {
        toast.error("Image upload failed");
      }
      setImageUploading(false);
    }

    // Upload video
    if (newVideo) {
      setVideoUploading(true);
      try {
        const formData = new FormData();
        formData.append("videos", newVideo);
        const res: any = await uploadVideos(formData).unwrap();
        // console.log(res);

        const videoUploadedURL = res;
        if (videoUploadedURL) {
          setVideo(newVideo);
          setVideoURL(videoUploadedURL);
        }
      } catch (err) {
        toast.error("Video upload failed");
      }
      setVideoUploading(false);
    }

    if (errorMessage) setUploadError(errorMessage);
    else setUploadError(null);

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const removeVideo = () => {
    setVideo(null);
  };
  const handleSubmitRequest = async () => {
    if (!selectedOrder || !reason || !returnMethod) {
      toast.error("Please complete all fields.");
      return;
    }

    try {
      const payload = {
        returened_method: returnMethod,
        message: reason,
        orderItemId: Number(selectedOrder),
        files: {
          images: imageURLs,
          videos: videoURL ? [videoURL] : [],
        },
      };

      await addReturnRequest(payload).unwrap();
      toast.success("Return request submitted successfully!");

      // Reset state after successful submission
      setSelectedOrder("");
      setReason("");
      setReturnMethod("");
      setImages([]);
      setVideo(null);
      setImageURLs([]);
      setVideoURL(null);
      setUploadError(null);
    } catch (err: any) {
      toast.error("Failed to submit return request");
      console.error(err);
    }
  };
  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white/30 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl sm:p-10">
      <h2 className="mb-10 text-center text-4xl font-extrabold text-blue-900 drop-shadow-md">
        Return & Refund Request
      </h2>

      {/* Order Dropdown */}
      <div className="mb-6">
        <label className="mb-2 block text-lg font-semibold text-gray-700">
          Select Order
        </label>
        <select
          value={selectedOrder}
          onChange={(e) => setSelectedOrder(e.target.value)}
          className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 transition focus:ring-2 focus:ring-blue-300"
        >
          <option value="">-- Choose an Order --</option>
          {orders?.data.map((order) => (
            <option key={order.id} value={order.orderId}>
              {order.product.title} (
              {new Date(order.order.date).toLocaleDateString()})
            </option>
          ))}
        </select>
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label className="mb-2 block text-lg font-semibold text-gray-700">
          Upload Image(s) or Video
        </label>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
          className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2"
        />

        {/* Image Previews */}
        {imageURLs.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {imageURLs.map((url, idx) => (
              <div
                key={idx}
                className="relative h-24 w-24 overflow-hidden rounded-xl shadow-lg"
              >
                <img
                  src={url}
                  alt={`uploaded-${idx}`}
                  className="h-full w-full object-cover transition duration-200 hover:scale-105"
                />
                <button
                  onClick={() => {
                    const updated = [...imageURLs];
                    updated.splice(idx, 1);
                    setImageURLs(updated);
                  }}
                  className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        {imageUploading && (
          <p className="mt-2 text-sm text-blue-700">Uploading images...</p>
        )}

        {/* Video Preview */}
        {videoURL && (
          <div className="relative mt-4 w-full overflow-hidden rounded-xl shadow-lg sm:w-64">
            <video src={videoURL} controls className="w-full rounded-xl" />
            <button
              onClick={() => {
                setVideoURL(null);
                setVideo(null);
              }}
              className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600"
            >
              <FaTimes size={12} />
            </button>
          </div>
        )}
        {videoUploading && (
          <p className="mt-2 text-sm text-blue-700">Uploading video...</p>
        )}
      </div>

      {/* Reason */}
      <div className="mb-6">
        <label className="mb-2 block text-lg font-semibold text-gray-700">
          Reason for Return
        </label>
        <textarea
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full resize-none rounded-xl border border-blue-200 bg-white px-4 py-3 focus:ring-2 focus:ring-blue-300"
          placeholder="Write the reason you want to return the product..."
        />
      </div>

      {/* Return Method */}
      <div className="mb-6">
        <label className="mb-2 block text-lg font-semibold text-gray-700">
          Return Method
        </label>
        <select
          value={returnMethod}
          onChange={(e) => setReturnMethod(e.target.value)}
          className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 focus:ring-2 focus:ring-blue-300"
        >
          <option value="">-- Choose a Method --</option>
          <option value="pick-up">Courier Pickup</option>
          <option value="drop-off">Drop-off at Store</option>
        </select>
      </div>

      {/* Info Box */}
      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-100 px-5 py-4 text-sm text-blue-900 shadow-inner sm:text-base">
        <strong>Note:</strong> You will receive a coupon equal to your order
        value. It can be used as a discount on your next purchase.
      </div>

      {/* Submit Button */}
      <button
        disabled={!selectedOrder || !reason || !returnMethod || isSubmitting}
        className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-6 py-3 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-400"
        onClick={handleSubmitRequest}
      >
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </button>
    </div>
  );
}
