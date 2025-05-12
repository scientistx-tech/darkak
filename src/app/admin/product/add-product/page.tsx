"use client";
import React, { useState } from "react";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import Select from "../../components/Select";
import Keywords from "../../components/Keywords";

import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import TabSection from "../components/TabSection";

// 1️⃣ Define Types
type Option = {
  image?: string;
  title: string;
  price?: number;
  details?: string;
};

type Item = {
  title: string;
  options: Option[];
};

type DeliveryInfo = {
  delivery_charge_outside: number;
  delivery_time_outside: string;
  delivery_charge: number;
  delivery_time: string;
  return_days?: number;
};

type Product = {
  delivery_info: DeliveryInfo;
  keywords: string[];
  brandId: number;
  categoryId: number;
  price: number;
  short_description: string;
  title: string;
  code?: string;
  offerPrice?: number;
  available?: "in-stock" | "online-order" | "pre-order";
  warranty?: "official" | "darkak";
  region?: "BD" | "US" | "IN";
  stock?: number;
  minOrder?: number;
  images: string[];
  specification?: string;
  description?: string;
  warranty_details?: string;
  items?: Item[];
};

// 2️⃣ Component
const AddProductPage: React.FC = () => {
  const [formData, setFormData] = useState<Product>({
    delivery_info: {
      delivery_charge_outside: 20,
      delivery_time_outside: "2 days",
      delivery_charge: 10,
      delivery_time: "1 days",
      return_days: 1,
    },
    keywords: ["fish", "orange"],
    brandId: 4,
    categoryId: 1,
    price: 20.22,
    short_description: "",
    title: "",
    code: "",
    offerPrice: 19,
    available: "in-stock",
    warranty: "darkak",
    region: "BD",
    stock: 100,
    minOrder: 1,
    images: ["https://i.ibb.co.com/jkG7p4BT/giant-242118.jpg"],
    specification: "<p>ok</p>",
    description: "<p>ok</p>",
    warranty_details: "<p>ok</p>",
    items: [
      {
        title: "Size",
        options: [
          { title: "S", price: 0, image: "", details: "" },
          { title: "M", price: 0, image: "", details: "" },
        ],
      },
    ],
  });

  const handleChange = (field: keyof Product, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (
    parent: keyof Product,
    child: keyof DeliveryInfo,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] as DeliveryInfo),
        [child]: value,
      },
    }));
  };

  // Handle image upload

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const [keywords, setKeywords] = useState<string[]>([]); // Stores the list of keywords
  const [keywordsInput, setKeywordsInput] = useState(""); // Stores the current input for keywords

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.endsWith(",")) {
      const newKeyword = input.slice(0, -1).trim();
      if (newKeyword && !keywords.includes(newKeyword)) {
        setKeywords((prev) => [...prev, newKeyword]);
      }
      setKeywordsInput("");
    } else {
      setKeywordsInput(input);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && keywordsInput.trim()) {
      e.preventDefault();
      const newKeyword = keywordsInput.trim();
      if (!keywords.includes(newKeyword)) {
        setKeywords((prev) => [...prev, newKeyword]);
      }
      setKeywordsInput("");
    } else if (e.key === "Backspace" && !keywordsInput && keywords.length > 0) {
      setKeywords((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = async () => {};

  const [isOpen, setIsOpen] = useState(false); // State to toggle visibility
  const toggleSection = () => setIsOpen((prev) => !prev); // Toggle function

  return (
    <div className="mx-auto space-y-4 bg-white p-4">
      <h1 className="text-2xl font-bold">Add Product&apos;s</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          placeholder="Title"
          label="Product Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <Input
          placeholder="Price"
          label="Product Price"
          type="number"
          value={formData.price}
          onChange={(e) => handleChange("price", parseFloat(e.target.value))}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          placeholder="Offer Price"
          label="Offer Price (Optional)"
          type="number"
          value={formData.offerPrice}
          onChange={(e) =>
            handleChange("offerPrice", parseFloat(e.target.value))
          }
        />

        <Input
          placeholder="Code"
          label="Product Code (Optional)"
          value={formData.code}
          onChange={(e) => handleChange("code", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          placeholder="Stock"
          label="Stock (Optional)"
          type="number"
          value={formData.stock}
          onChange={(e) => handleChange("stock", parseInt(e.target.value))}
        />
        <Input
          placeholder="Min Order"
          label="Minimum Order"
          type="number"
          value={formData.minOrder}
          onChange={(e) => handleChange("minOrder", parseInt(e.target.value))}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Select Availability (Optional)"
          options={[
            { value: "in-stock", label: "In Stock" },
            { value: "online-order", label: "Online-Order" },
            { value: "pre-order", label: "Pre-Order" },
          ]}
        />

        <Select
          label="Select Category (Optional)"
          options={[
            { value: "", label: "Select Category" },
            { value: "category-1", label: "category-1" },
            { value: "category-2", label: "category-2" },
            { value: "category-3", label: "category-3" },
            { value: "category-4", label: "category-4" },
            { value: "category-5", label: "category-5" },
            { value: "category-6", label: "category-6" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Warranty (Optional)"
          options={[
            { value: "", label: "No Warranty" },
            { value: "official", label: "Official" },
            { value: "darkak", label: "Darkak" },
          ]}
        />

        <Select
          label="Select Region (Optional)"
          options={[
            { value: "BD", label: "Bangladesh" },
            { value: "CN", label: "China" },
            { value: "USA", label: "United States" },
          ]}
        />
      </div>

      <Keywords
        label="Product Keywords"
        value={keywords}
        onChange={setKeywords}
        required={false}
        className="mb-4"
      />

      <Textarea
        placeholder="Short Description"
        label="Short Description (Optional)"
        value={formData.short_description}
        onChange={(e) => handleChange("short_description", e.target.value)}
      />

      {/* Image Upload Section */}
      <h3 className="font-bold">Product Images</h3>

      {/* File Input */}
      <div className="mb-4">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input file-input-bordered"
        />
      </div>

      {/* Display Uploaded Images */}
      <div className="flex flex-wrap gap-2">
        {formData.images.map((img, index) => (
          <div key={index} className="relative mb-2 flex items-center gap-2">
            <img
              src={img}
              alt={`preview-${index}`}
              className="h-16 w-16 rounded object-cover md:h-26 md:w-26"
            />

            {/* Remove Button */}
            <button
              type="button"
              className="absolute right-0 top-0 rounded bg-white px-3 py-1 text-red-600 hover:bg-red-100"
              onClick={() => removeImage(index)}
            >
              &#10005; {/* Cross icon */}
            </button>
          </div>
        ))}
      </div>

      {/* Delivery Info */}
      <h3 className="font-bold">Delivery Info</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          placeholder="Delivery Charge"
          label="Delivery Charge"
          type="number"
          value={formData.delivery_info.delivery_charge}
          onChange={(e) =>
            handleNestedChange(
              "delivery_info",
              "delivery_charge",
              parseFloat(e.target.value),
            )
          }
        />
        <Input
          placeholder="Delivery Time"
          label="Delivery Time"
          value={formData.delivery_info.delivery_time}
          onChange={(e) =>
            handleNestedChange("delivery_info", "delivery_time", e.target.value)
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          placeholder="Outside Delivery Charge"
          label="Outside Delivery Charge"
          type="number"
          value={formData.delivery_info.delivery_charge_outside}
          onChange={(e) =>
            handleNestedChange(
              "delivery_info",
              "delivery_charge_outside",
              parseFloat(e.target.value),
            )
          }
        />
        <Input
          placeholder="Outside Delivery Time"
          label="Outside Delivery Time"
          value={formData.delivery_info.delivery_time_outside}
          onChange={(e) =>
            handleNestedChange(
              "delivery_info",
              "delivery_time_outside",
              e.target.value,
            )
          }
        />
      </div>

      {/* Add items */}
      <div className="w-full">
        {/* Button to toggle the section */}
        <button
          onClick={toggleSection}
          className="flex w-full items-center justify-between rounded-md bg-primary px-5 py-2 text-white"
        >
          <h3 className="font-bold">Add Items (Optional)</h3>
          {/* Change the icon based on the state */}
          {isOpen ? <FaAngleUp /> : <FaAngleDown />}
        </button>

        {/* Div that opens or closes slowly */}
        <div
          className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input placeholder="Items Size" label="Items Size" />
            <Input placeholder="Items Price" label="Items Price" />
          </div>

          <div className="mt-3">
            <Input placeholder="Items Details" label="Items Details" />
          </div>

          <div className="mt-3 flex w-full justify-end">
            <Button>Add Items</Button>
          </div>
        </div>
      </div>

      {/* TabSection */}
      <TabSection />

      {/* Submit Button */}
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AddProductPage;
