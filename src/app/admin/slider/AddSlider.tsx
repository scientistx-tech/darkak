"use client";

import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "react-select";
import Image from "next/image";

function AddSlider() {
  const [title, setTitle] = useState("");
  const [offerName, setOfferName] = useState("");
  const [details, setDetails] = useState("");
  const [productId, setProductId] = useState("");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);

  // Example product options
  const productOptions = [
    { value: "1", label: "T-shirt - ID 1" },
    { value: "2", label: "Sneakers - ID 2" },
    { value: "3", label: "Saree - ID 3" },
    { value: "4", label: "Watch - ID 4" },
  ];

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
    <div className="mx-auto mt-6 max-w-xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Add New Slider</h2>

      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-3"
      />
      <Input
        placeholder="Offer Name"
        value={offerName}
        onChange={(e) => setOfferName(e.target.value)}
        className="mb-3"
      />
      <Input
        placeholder="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="mb-3"
      />
      <Input
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="mb-3"
      />

      {/* Product selector */}
      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Select Product
        </label>
        <Select
          options={productOptions}
          onChange={(selected) => setProductId(selected?.value || "")}
          placeholder="Search and select a product"
        />
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleBannerChange}
        className="mt-3"
      />
      {previewBanner && (
        <Image
          width={150}
          height={150}
          src={previewBanner}
          alt="Banner Preview"
          className="mt-3 h-40 w-full rounded object-cover"
        />
      )}

      <div className="mt-4">
        <Button onClick={handleSubmit}>Submit Slider</Button>
      </div>
    </div>
  );
}

export default AddSlider;
