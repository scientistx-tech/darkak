"use client";

import React, { useState } from "react";

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
        image: string;
        price: number;
        details: string;
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
        options: [],
      },
    ],
  });

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
    <div className="mx-auto w-full space-y-6 p-6">
      <div className="rounded-xl border p-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            name="short_description"
            placeholder="Short Description"
            value={formData.short_description}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            name="offerPrice"
            placeholder="Offer Price"
            value={formData.offerPrice}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            name="brandId"
            placeholder="Brand ID"
            value={formData.brandId}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            name="categoryId"
            placeholder="Category ID"
            value={formData.categoryId}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            name="keywords"
            placeholder="Keywords (comma separated)"
            value={formData.keywords}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            name="available"
            placeholder="Availability (in-stock, pre-order...)"
            value={formData.available}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            name="warranty"
            placeholder="Warranty (official, darkak)"
            value={formData.warranty}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            name="region"
            placeholder="Region (BD, US, IN)"
            value={formData.region}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            name="minOrder"
            placeholder="Min Order"
            value={formData.minOrder}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            name="code"
            placeholder="Product Code"
            value={formData.code}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            name="images"
            placeholder="Image URL"
            value={formData.images[0]}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, images: [e.target.value] }))
            }
            className="rounded border p-2"
          />
          <textarea
            name="specification"
            placeholder="Specification (HTML)"
            value={formData.specification}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <textarea
            name="description"
            placeholder="Description (HTML)"
            value={formData.description}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <textarea
            name="warranty_details"
            placeholder="Warranty Details (HTML)"
            value={formData.warranty_details}
            onChange={handleChange}
            className="rounded border p-2"
          />
        </div>
      </div>

      <div className="mt-6 space-y-6 rounded-xl border bg-white p-6">
        <h2 className="text-lg font-semibold">
          Product Items (e.g., Size, Color)
        </h2>
        {formData.items.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className="space-y-4 rounded-xl border bg-gray-50 p-4"
          >
            <input
              type="text"
              placeholder="Item Title (e.g., Size, Color)"
              value={item.title}
              onChange={(e) => {
                const items = [...formData.items];
                items[itemIndex].title = e.target.value;
                setFormData({ ...formData, items });
              }}
              className="w-full rounded-md border px-3 py-2"
            />

            {item.options.map((option, optIndex) => (
              <div
                key={optIndex}
                className="grid grid-cols-4 items-center gap-4"
              >
                <input
                  type="text"
                  placeholder="Option Title (e.g., S, M)"
                  value={option.title}
                  onChange={(e) => {
                    const items = [...formData.items];
                    items[itemIndex].options[optIndex].title = e.target.value;
                    setFormData({ ...formData, items });
                  }}
                  className="rounded-md border px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={option.image}
                  onChange={(e) => {
                    const items = [...formData.items];
                    items[itemIndex].options[optIndex].image = e.target.value;
                    setFormData({ ...formData, items });
                  }}
                  className="rounded-md border px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={option.price}
                  onChange={(e) => {
                    const items = [...formData.items];
                    items[itemIndex].options[optIndex].price = Number(
                      e.target.value,
                    );
                    setFormData({ ...formData, items });
                  }}
                  className="rounded-md border px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Details"
                  value={option.details}
                  onChange={(e) => {
                    const items = [...formData.items];
                    items[itemIndex].options[optIndex].details = e.target.value;
                    setFormData({ ...formData, items });
                  }}
                  className="rounded-md border px-3 py-2"
                />
              </div>
            ))}

            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const items = [...formData.items];
                  items[itemIndex].options.push({
                    title: "",
                    image: "",
                    price: 0,
                    details: "",
                  });
                  setFormData({ ...formData, items });
                }}
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                + Add Option
              </button>
              <button
                type="button"
                onClick={() => {
                  const items = [...formData.items];
                  items.splice(itemIndex, 1);
                  setFormData({ ...formData, items });
                }}
                className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Remove Item
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              items: [...formData.items, { title: "", options: [] }],
            })
          }
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          + Add Item
        </button>
      </div>

      <div className="rounded-xl border p-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="delivery_charge"
            placeholder="Delivery Charge"
            value={formData.delivery_info.delivery_charge}
            onChange={handleDeliveryChange}
            className="rounded border p-2"
          />
          <input
            name="delivery_time"
            placeholder="Delivery Time"
            value={formData.delivery_info.delivery_time}
            onChange={handleDeliveryChange}
            className="rounded border p-2"
          />
          <input
            name="delivery_charge_outside"
            placeholder="Outside Delivery Charge"
            value={formData.delivery_info.delivery_charge_outside}
            onChange={handleDeliveryChange}
            className="rounded border p-2"
          />
          <input
            name="delivery_time_outside"
            placeholder="Outside Delivery Time"
            value={formData.delivery_info.delivery_time_outside}
            onChange={handleDeliveryChange}
            className="rounded border p-2"
          />
          <input
            name="return_days"
            placeholder="Return Days"
            value={formData.delivery_info.return_days}
            onChange={handleDeliveryChange}
            className="rounded border p-2"
          />
        </div>
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
