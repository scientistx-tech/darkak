"use client";

import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function AddSlider() {
  const [title, setTitle] = useState("");
  const [offerName, setOfferName] = useState("");
  const [details, setDetails] = useState("");
  const [productId, setProductId] = useState("");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewBanner(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!title || !offerName || !details || !productId || !bannerFile) {
      alert("Please fill in all fields and upload a banner image.");
      return;
    }

    // Dummy payload submission (can be replaced with actual API call)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("offer_name", offerName);
    formData.append("details", details);
    formData.append("productId", productId);
    formData.append("banner", bannerFile);

    console.log("Slider Submitted:", {
      title,
      offerName,
      details,
      productId,
      bannerFile,
    });
  };

  return (
    <div className=" mx-auto mt-6 rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Slider</h2>

      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Offer Name"
        value={offerName}
        onChange={(e) => setOfferName(e.target.value)}
      />
      <Input
        placeholder="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <Input
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleBannerChange}
        className="mt-3"
      />
      {previewBanner && (
        <img
          src={previewBanner}
          alt="Banner Preview"
          className="mt-3 h-40 w-full object-cover rounded"
        />
      )}

      <div className="mt-4">
        <Button onClick={handleSubmit}>Submit Slider</Button>
      </div>
    </div>
  );
}

export default AddSlider;
