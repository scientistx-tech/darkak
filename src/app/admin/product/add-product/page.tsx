"use client";
import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

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
    short_description: "This is short description",
    title: "New Product",
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

  const handleSubmit = async () => {};

  return (
    <div className="mx-auto space-y-4 bg-white p-4">
      <Input
        placeholder="Title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <Input
        placeholder="Short Description"
        value={formData.short_description}
        onChange={(e) => handleChange("short_description", e.target.value)}
      />
      <Input
        placeholder="Price"
        type="number"
        value={formData.price}
        onChange={(e) => handleChange("price", parseFloat(e.target.value))}
      />
      <Input
        placeholder="Offer Price"
        type="number"
        value={formData.offerPrice}
        onChange={(e) => handleChange("offerPrice", parseFloat(e.target.value))}
      />
      <Input
        placeholder="Stock"
        type="number"
        value={formData.stock}
        onChange={(e) => handleChange("stock", parseInt(e.target.value))}
      />
      <Input
        placeholder="Min Order"
        type="number"
        value={formData.minOrder}
        onChange={(e) => handleChange("minOrder", parseInt(e.target.value))}
      />
      <Input
        placeholder="Region"
        value={formData.region}
        onChange={(e) => handleChange("region", e.target.value)}
      />
      <Input
        placeholder="Warranty"
        value={formData.warranty}
        onChange={(e) => handleChange("warranty", e.target.value)}
      />
      <Input
        placeholder="Availability"
        value={formData.available}
        onChange={(e) => handleChange("available", e.target.value)}
      />
      <Input
        placeholder="Keywords (comma-separated)"
        value={formData.keywords.join(",")}
        onChange={(e) =>
          handleChange(
            "keywords",
            e.target.value.split(",").map((k) => k.trim()),
          )
        }
      />
      <h3 className="font-bold">Product Images</h3>
      {formData.images.map((img, index) => (
        <div key={index} className="mb-2 flex items-center gap-2">
          <Input
            placeholder={`Image URL ${index + 1}`}
            value={img}
            onChange={(e) => {
              const newImages = [...formData.images];
              newImages[index] = e.target.value;
              handleChange("images", newImages);
            }}
          />
          {img && (
            <img
              src={img}
              alt={`preview-${index}`}
              className="h-16 w-16 rounded object-cover"
            />
          )}
          <Button
            
            type="button"
            onClick={() => {
              const newImages = formData.images.filter((_, i) => i !== index);
              handleChange("images", newImages);
            }}
          >
            Remove
          </Button>
        </div>
      ))}

      {/* Delivery Info */}
      <h3 className="font-bold">Delivery Info</h3>
      <Input
        placeholder="Delivery Charge"
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
        value={formData.delivery_info.delivery_time}
        onChange={(e) =>
          handleNestedChange("delivery_info", "delivery_time", e.target.value)
        }
      />
      <Input
        placeholder="Outside Delivery Charge"
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
        value={formData.delivery_info.delivery_time_outside}
        onChange={(e) =>
          handleNestedChange(
            "delivery_info",
            "delivery_time_outside",
            e.target.value,
          )
        }
      />

      {/* Submit Button */}
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AddProductPage;
