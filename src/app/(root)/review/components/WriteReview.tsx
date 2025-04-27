"use client";

import React, { useState } from "react";
import { FaStar, FaUpload, FaTimes } from "react-icons/fa";
import Link from "next/link";

export default function WriteReview() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    let tempImages = [...images];
    let tempVideo = video;
    let errorMessage = "";

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        if (tempImages.length < 5) {
          tempImages.push(file);
        } else {
          errorMessage = "You can upload maximum 5 images & 1 video.";
        }
      } else if (file.type.startsWith("video/")) {
        if (!tempVideo) {
          tempVideo = file;
        } else {
          errorMessage = "Only 1 video allowed.";
        }
      }
    });

    setImages(tempImages);
    setVideo(tempVideo);
    setUploadError(errorMessage ? errorMessage : null);

    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (uploadError && updated.length < 5) setUploadError(null);
      return updated;
    });
  };

  const handleRemoveVideo = () => {
    setVideo(null);
    if (uploadError) setUploadError(null);
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
        Write a Review
      </h2>

      {/* Rating */}
      <div className="mb-6 text-center">
        <p className="mb-2 text-lg font-semibold text-gray-600">Rating:</p>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((index) => (
            <FaStar
              key={index}
              className={`h-8 w-8 cursor-pointer transition ${
                (hoverRating || rating) >= index
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => setHoverRating(index)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
      </div>

      {/* Upload Picture/Video */}
      <div className="mb-4 flex flex-col items-center">
        <label
          htmlFor="upload"
          className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-primaryBlue hover:bg-blue-50"
        >
          <FaUpload className="h-6 w-6 text-gray-400" />
          <p className="mt-1 text-xs text-gray-400">Picture/Video</p>
        </label>
        <input
          id="upload"
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="mb-4 text-center text-xs text-red-500">
          {uploadError}
        </div>
      )}

      {/* Selected Files Preview */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {images.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(img)}
              alt="preview"
              className="h-20 w-20 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
            >
              <FaTimes className="h-3 w-3" />
            </button>
          </div>
        ))}
        {video && (
          <div className="relative">
            <video
              src={URL.createObjectURL(video)}
              className="h-20 w-20 rounded-lg object-cover"
              controls
            />
            <button
              type="button"
              onClick={handleRemoveVideo}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
            >
              <FaTimes className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {/* <div className="w-full mb-2 flex justify-center">
        <p className="text-[12px] text-gray-500">Max 5 images & 1 video allowed.</p>
      </div> */}

      {/* Form Inputs */}
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Name (Public)"
          className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-primaryBlue focus:outline-none"
        />
        <textarea
          placeholder="Your Review goes here..."
          rows={4}
          className="w-full resize-none rounded-md border border-gray-300 p-3 text-sm focus:border-primaryBlue focus:outline-none"
        ></textarea>

        <p className="pt-2 text-xs leading-relaxed text-gray-400">
          How we use your data: We&apos;ll only contact you about the review you
          left, and only if necessary. By submitting your review, you agree to
          our terms, privacy and content policies.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <Link
            href="/profile"
            className="flex w-32 items-center justify-center rounded-full border border-primaryBlue py-2 text-primaryBlue transition hover:bg-primaryBlue hover:text-white"
          >
            <p>Cancel</p>
          </Link>
          <button
            type="submit"
            className="w-32 rounded-full bg-primaryBlue py-2 text-white transition hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
