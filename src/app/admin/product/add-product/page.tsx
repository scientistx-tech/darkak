"use client";

import React, { useState } from "react";
import CustomEditor from "../../components/CustomEditor";

export default function ProductForm() {
  const [formData, setFormData] = useState<{
    title: string;
    short_description: string;
    price: string;
    offerPrice: string;
    brandId: string;
    categoryId: string;
    keywords: string;
    available: string;
    warranty: string;
    region: string;
    stock: string;
    minOrder: string;
    code: string;
    images: string[];
    specification: string;
    description: string;
    warranty_details: string;
    delivery_info: {
      delivery_charge: string;
      delivery_time: string;
      delivery_charge_outside: string;
      delivery_time_outside: string;
      return_days: string;
    };
    items: {
      title: string;
      options: {
        title: string;
        price: number;
        stock: number;
      }[];
    }[];
  }>({
    title: "",
    short_description: "",
    price: "",
    offerPrice: "",
    brandId: "",
    categoryId: "",
    keywords: "",
    available: "in-stock",
    warranty: "",
    region: "",
    stock: "",
    minOrder: "",
    code: "",
    images: [""],
    specification: "",
    description: "",
    warranty_details: "",
    delivery_info: {
      delivery_charge: "",
      delivery_time: "",
      delivery_charge_outside: "",
      delivery_time_outside: "",
      return_days: "",
    },
    items: [
      {
        title: "",
        options: [
          {
            title: "",
            price: 0,
            stock: 0,
          },
        ],
      },
    ],
  });
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [productSKU, setProductSKU] = useState("5Y5LMO");
  const [multiplyShipping, setMultiplyShipping] = useState(false);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleAdditionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAdditionalImages(Array.from(e.target.files));
    }
  };

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setProductSKU(code);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeliveryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      delivery_info: { ...prev.delivery_info, [name]: value },
    }));
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      keywords: formData.keywords.split(",").map((k) => k.trim()),
    };
    console.log("Sending to backend:", payload);
    // axios.post('/api/products', payload)
  };

  return (
    <div className="mx-auto w-full">
      <h1 className="mb-4 flex items-center gap-2 text-xl font-bold">
        🛍️ Add Product
      </h1>

      {/* name and desc */}
      <div className="bg-white p-5">
        {/* language tabs */}
        <div className="mb-4 flex items-center gap-x-5">
          <div
            className={`${currentLanguage === "en" ? "border-b-2 border-blue-500 text-blue-500" : ""} flex cursor-pointer py-2 text-sm font-medium tracking-wider`}
            onClick={() => setCurrentLanguage("en")}
          >
            <button>English (EN)</button>
          </div>
          <div
            className={`${currentLanguage === "bn" ? "border-b-2 border-blue-500 text-blue-500" : ""} cursor-pointer py-2 text-sm font-medium tracking-wider`}
            onClick={() => setCurrentLanguage("bn")}
          >
            <button>Bengali (BD)</button>
          </div>
        </div>

        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="title">
              Product Name {`( ${currentLanguage === "en" ? "EN" : "BD"})`}
            </label>
            <input
              name=""
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="title">
              Description {`( ${currentLanguage === "en" ? "EN" : "BD"})`}
            </label>
            <CustomEditor />
          </div>
        </div>
      </div>

      {/* genereal info */}
      <div className="mt-5 space-y-6 rounded-lg border bg-white p-6 shadow">
        <h2 className="text-lg font-semibold">General setup</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 p-2">
              <option>Select category</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sub Category
            </label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 p-2">
              <option>Select Sub Category</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sub Sub Category
            </label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 p-2">
              <option>Select Sub Sub Category</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand <span className="text-red-500">*</span>
            </label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 p-2">
              <option>Select Brand</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product type <span className="text-red-500">*</span>
            </label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 p-2">
              <option>Physical</option>
              <option>Digital</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product SKU <span className="text-red-500">*</span>
              <span className="ml-1 cursor-help text-gray-400">ⓘ</span>
            </label>
            <div className="relative mt-1 flex items-center gap-2">
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 p-2"
                value={productSKU}
                onChange={(e) => setProductSKU(e.target.value)}
              />
              <button
                onClick={generateCode}
                className="absolute right-0 top-0 whitespace-nowrap rounded bg-blue-100 p-0.5 text-xs text-blue-600"
              >
                Generate code
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unit <span className="text-red-500">*</span>
            </label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 p-2">
              <option>kg</option>
              <option>g</option>
              <option>lbs</option>
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
            Search tags
            <span className="cursor-help text-gray-400">ⓘ</span>
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter tag"
          />
        </div>
      </div>

      {/* pricing and others */}
      <div className="mt-5 space-y-6 rounded-lg border bg-white p-6 shadow">
        <h2 className="text-lg font-semibold">Pricing & others</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Unit price <span className="text-red-500">*</span>{" "}
              <span className="text-gray-400">ⓘ</span>
            </label>
            <input
              type="number"
              placeholder="Unit price"
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Minimum order qty <span className="text-red-500">*</span>{" "}
              <span className="text-gray-400">ⓘ</span>
            </label>
            <input
              type="number"
              defaultValue={1}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Current stock qty <span className="text-red-500">*</span>{" "}
              <span className="text-gray-400">ⓘ</span>
            </label>
            <input
              type="number"
              defaultValue={0}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Discount Type <span className="text-red-500">*</span>{" "}
              <span className="text-gray-400">ⓘ</span>
            </label>
            <select className="mt-1 w-full rounded-md border p-2">
              <option value="flat">Flat</option>
              <option value="percent">Percent</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Discount amount ($) <span className="text-red-500">*</span>{" "}
              <span className="text-gray-400">ⓘ</span>
            </label>
            <input
              type="number"
              defaultValue={0}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Tax amount (%) <span className="text-red-500">*</span>{" "}
              <span className="text-gray-400">ⓘ</span>
            </label>
            <input
              type="number"
              defaultValue={0}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Tax calculation <span className="text-red-500">*</span>{" "}
              <span className="text-gray-400">ⓘ</span>
            </label>
            <select className="mt-1 w-full rounded-md border p-2">
              <option value="include">Include with product</option>
              <option value="exclude">Exclude from product</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Shipping cost ($) <span className="text-red-500">*</span>{" "}
              <span className="text-gray-400">ⓘ</span>
            </label>
            <input
              type="number"
              defaultValue={0}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
            Shipping cost multiply with quantity
            <span className="text-gray-400">ⓘ</span>
          </label>
          <div className="mt-2">
            <label className="inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={multiplyShipping}
                onChange={() => setMultiplyShipping(!multiplyShipping)}
              />
              <div className="peer relative h-6 w-11 rounded-full bg-gray-200 transition-all peer-checked:bg-blue-600 peer-focus:outline-none">
                <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* thumbnail and images */}
      <div className="mt-5 flex flex-col gap-6 md:flex-row">
        {/* Thumbnail Upload */}
        <div className="flex-1 rounded-lg border bg-white p-4 shadow">
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Product thumbnail <span className="text-red-500">*</span>
          </label>
          <p className="mb-2 text-xs text-blue-600">Ratio 1:1 (500 x 500 px)</p>
          <div className="relative flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={handleThumbnailChange}
            />
            <div className="text-center text-sm text-gray-500">
              {thumbnail ? (
                <p>{thumbnail.name}</p>
              ) : (
                <>
                  <p className="text-blue-600 underline">Click to upload</p>
                  <p className="text-xs">or drag and drop</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Additional Images Upload */}
        <div className="flex-[2] rounded-lg border bg-white p-4 shadow">
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Upload additional image
          </label>
          <p className="mb-2 text-xs text-blue-600">Ratio 1:1 (500 x 500 px)</p>
          <p className="mb-2 text-sm text-gray-600">
            Upload additional product images
          </p>
          <div className="relative flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              multiple
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={handleAdditionalChange}
            />
            <div className="text-center text-sm text-gray-500">
              {additionalImages.length > 0 ? (
                <p>{additionalImages.length} image(s) selected</p>
              ) : (
                <>
                  <p className="text-blue-600 underline">Click to upload</p>
                  <p className="text-xs">or drag and drop</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Attributes Section */}
      <div className="mt-5 space-y-6 rounded-lg border bg-white p-6 shadow">
        <h2 className="text-lg font-semibold">Product Attributes</h2>

        {formData.items.map((attribute, attributeIndex) => (
          <div key={attributeIndex} className="mb-4 border-b pb-4">
            {/* Attribute Title */}
            <div className="flex items-center gap-4">
              <select
                value={attribute.title}
                onChange={(e) => {
                  const updatedItems = [...formData.items];
                  updatedItems[attributeIndex].title = e.target.value;
                  setFormData((prev) => ({ ...prev, items: updatedItems }));
                }}
                className="w-1/3 rounded-md border border-gray-300 p-2"
              >
                <option value="">Select Attribute</option>
                <option value="Size">Size</option>
                <option value="Color">Color</option>
                <option value="Material">Material</option>
              </select>
              <button
                onClick={() => {
                  const updatedItems = [...formData.items];
                  updatedItems.splice(attributeIndex, 1);
                  setFormData((prev) => ({ ...prev, items: updatedItems }));
                }}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Remove Attribute
              </button>
            </div>

            {/* Attribute Options */}
            {attribute.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mt-4 flex items-center gap-4">
                <div className="flex w-full flex-col gap-1">
                  <label htmlFor="option_title">Option Title</label>
                  <input
                    type="text"
                    placeholder="Option Title"
                    value={option.title}
                    onChange={(e) => {
                      const updatedItems = [...formData.items];
                      updatedItems[attributeIndex].options[optionIndex].title =
                        e.target.value;
                      setFormData((prev) => ({ ...prev, items: updatedItems }));
                    }}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>

                <div className="flex w-full flex-col gap-1">
                  <label htmlFor="option_price">Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={option.price}
                    onChange={(e) => {
                      const updatedItems = [...formData.items];
                      updatedItems[attributeIndex].options[optionIndex].price =
                        parseFloat(e.target.value);
                      setFormData((prev) => ({ ...prev, items: updatedItems }));
                    }}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>

                <div className="flex w-full flex-col gap-1">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    placeholder="stock"
                    value={option.stock}
                    onChange={(e) => {
                      const updatedItems = [...formData.items];
                      updatedItems[attributeIndex].options[optionIndex].stock =
                        parseFloat(e.target.value);
                      setFormData((prev) => ({ ...prev, items: updatedItems }));
                    }}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>

                <button
                  onClick={() => {
                    const updatedItems = [...formData.items];
                    updatedItems[attributeIndex].options.splice(optionIndex, 1);
                    setFormData((prev) => ({ ...prev, items: updatedItems }));
                  }}
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Remove Option
                </button>
              </div>
            ))}

            {/* Add Option Button */}
            <button
              onClick={() => {
                const updatedItems = [...formData.items];
                updatedItems[attributeIndex].options.push({
                  title: "",
                  price: 0,
                  stock: 1,
                });
                setFormData((prev) => ({ ...prev, items: updatedItems }));
              }}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Add Option
            </button>
          </div>
        ))}

        {/* Add Attribute Button */}
        <button
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              items: [
                ...prev.items,
                {
                  title: "",
                  options: [],
                },
              ],
            }));
          }}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Add Attribute
        </button>
      </div>

      {/* Additional section for items with options can be added here */}

      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="rounded bg-blue-600 px-4 py-2 text-white shadow"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
