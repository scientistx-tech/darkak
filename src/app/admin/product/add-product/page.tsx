"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  useDeleteSubSubCategoryMutation,
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetSubSubCategoriesQuery,
} from "@/redux/services/admin/adminCategoryApis";
import { useGetBrandsQuery } from "@/redux/services/admin/adminBrandApis";
import {
  useCreateProductMutation,
  useGetProductAttributesQuery,
  useUploadImagesMutation,
} from "@/redux/services/admin/adminProductApis";
import axios from "axios";
import { log } from "util";
import Image from "next/image";
import { toast } from "react-toastify";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const CustomEditor = dynamic(
  () => import("@/app/admin/components/CustomEditor"),
  { ssr: false },
);

// --- Type Definitions ---
type DeliveryInfo = {
  delivery_time: string;
  delivery_charge: string;
  delivery_time_outside: string;
  delivery_charge_outside: string;
  return_days: string;
  multiply?: string;
};

type AttributeOption = {
  title: string;
  image?: string;
  price?: number | string;
  stock?: number | string;
  key?: string;
  sku?: string;
};

type AttributeItem = {
  attributeId?: string;
  title?: string;
  options: AttributeOption[];
};

type DiscountType = "flat" | "percentage";

type ProductFormData = {
  title: string;
  short_description: string;
  meta_title: string;
  meta_image: string;
  video_link: string;
  thumbnail: string;
  price: string;
  discount_type: string;
  discount: string;
  tax_amount: string;
  tax_type: string;
  available: string;
  warranty: string;
  region: string;
  stock: string;
  minOrder: string;
  unit: string;
  code: string;
  specification: string;
  description: string;
  warranty_details: string;
  categoryId: string;
  subCategoryId: string;
  subSubCategoryId: string;
  brandId: string;
  keywords: string[];
  images: string[];
  delivery_info: DeliveryInfo;
  items: AttributeItem[];
};

export default function ProductForm() {
  const [formData, setFormData] = useState<
    Omit<ProductFormData, "keywords"> & { keywords: string }
  >({
    title: "",
    short_description: "",
    meta_title: "",
    meta_image: "",
    video_link: "",
    thumbnail: "",
    price: "",
    discount_type: "flat",
    discount: "",
    tax_amount: "",
    tax_type: "include",
    available: "in-stock",
    warranty: "",
    region: "BD",
    stock: "",
    minOrder: "1",
    unit: "kg",
    code: "",
    specification: "",
    description: "",
    warranty_details: "",
    categoryId: "",
    subCategoryId: "",
    subSubCategoryId: "",
    brandId: "",
    keywords: "",
    images: [],
    delivery_info: {
      delivery_time: "",
      delivery_charge: "",
      delivery_time_outside: "",
      delivery_charge_outside: "",
      return_days: "",
    },
    items: [],
  });
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [productSKU, setProductSKU] = useState("5Y5LMO");
  const [multiplyShipping, setMultiplyShipping] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [imagesUploading, setImagesUploading] = useState(false);
  const [metaImageUploading, setMetaImageUploading] = useState(false);

  const [currentTab, setCurrentTab] = useState<string>("desc");

  // load all categories, sub categories, sub sub categories and brands
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();

  const {
    data: subCategoriesData,
    isLoading: isSubCategoriesLoading,
    error: subCategoriesError,
    refetch: refetchSubCategories,
  } = useGetSubCategoriesQuery();
  const {
    data: subSubCategoriesData,
    isLoading: isSubSubCategoriesLoading,
    error: subSubCategoriesError,
    refetch: refetchSubSubCategories,
  } = useGetSubSubCategoriesQuery();
  const { data: brandsData } = useGetBrandsQuery();
  const { data: attributesData } = useGetProductAttributesQuery({});
  const [uploadImages] = useUploadImagesMutation();
  const [createProduct] = useCreateProductMutation();

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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

  const handleEditorChange =
    (field: keyof ProductFormData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setProductSKU(code);
    setFormData((prev) => ({ ...prev, code }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "images" | "thumbnail" | "meta_image" = "images",
  ) => {
    e.preventDefault && e.preventDefault();

    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      if (type === "images") {
        // Upload all images in one request
        setImagesUploading(true);
        const imgForm = new FormData();
        files.forEach((file) => imgForm.append("images", file));
        const res = await uploadImages(imgForm).unwrap();
        console.log(res, "res");

        const uploadedUrls = res || [];
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadedUrls],
        }));
      } else {
        // Upload single file for thumbnail or meta_image

        if (type === "thumbnail") {
          setThumbnailUploading(true);
          const imgForm = new FormData();
          imgForm.append("images", files[0]);
          const res = await uploadImages(imgForm).unwrap();
          const url = res[0];
          setFormData((prev) => ({ ...prev, thumbnail: url }));
        } else if (type === "meta_image") {
          setMetaImageUploading(true);
          const imgForm = new FormData();
          imgForm.append("images", files[0]);
          const res = await uploadImages(imgForm).unwrap();
          const url = res[0];
          console.log(url, "url");
          setFormData((prev) => ({ ...prev, meta_image: url }));
        }
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setThumbnailUploading(false);
      setMetaImageUploading(false);
      setImagesUploading(false);
      e.target.value = ""; // Reset input
    }
  };

  // Import DiscountType at the top of your file if not already imported
  // import type { DiscountType } from 'path-to-discount-type-definition';

  const handleSubmit = async () => {
    const payload = {
      title: formData.title,
      code: formData.code || productSKU,
      short_description: formData.short_description,
      meta_title: formData.meta_title,
      meta_image: formData.meta_image,
      video_link: formData.video_link,
      thumbnail: formData.thumbnail,
      price: formData.price, // keep as string
      discount_type: formData.discount_type as DiscountType,
      discount: formData.discount || "0",
      tax_amount: formData.tax_amount || "0",
      tax_type: formData.tax_type,
      available: formData.available,
      warranty: formData.warranty,
      region: formData.region,
      stock: formData.stock || "0",
      minOrder: formData.minOrder || "1",
      unit: formData.unit,
      specification: formData.specification,
      description: formData.description,
      warranty_details: formData.warranty_details,
      categoryId: formData.categoryId,
      subCategoryId: formData.subCategoryId,
      subSubCategoryId: formData.subSubCategoryId,
      brandId: formData.brandId,
      keywords: formData.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      images: formData.images,
      delivery_info: {
        delivery_time: formData.delivery_info.delivery_time,
        delivery_charge: formData.delivery_info.delivery_charge,
        delivery_time_outside: formData.delivery_info.delivery_time_outside,
        delivery_charge_outside: formData.delivery_info.delivery_charge_outside,
        return_days: formData.delivery_info.return_days,
        multiply: multiplyShipping ? "true" : "false",
      },
      items: formData.items.map((item) => {
        const attr = attributesData?.data.find(
          (a: { id: string; title: string }) => a.id === item.attributeId,
        );
        return {
          attributeId: attr?.id,
          title: attr?.title || item.title || "",
          options: item.options.map((opt) => ({
            title: opt.title,
            price: parseFloat((opt.price ?? "0").toString()),
            stock: parseInt((opt.stock ?? "0").toString()),
            sku: `${productSKU}-${opt.title}`,
          })),
        };
      }),
    };

    console.log("Prepared Payload:", payload);
    // Send payload to API
    try {
      const res = await createProduct(payload).unwrap();
      console.log(res, "pro res");
      toast.success("Successfully Product created");
      router.push("/admin/product/product-list");
    } catch (error) {}
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
              name="title"
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
            <textarea
              name="short_description"
              placeholder="Short Description"
              value={formData.short_description}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
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
            <select
              name="categoryId"
              onChange={handleChange}
              value={formData.categoryId}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option>Select category</option>
              {categoriesData &&
                categoriesData?.data?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat?.title}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sub Category
            </label>
            <select
              name="subCategoryId"
              onChange={handleChange}
              value={formData.subCategoryId}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option>Select Sub Category</option>
              {subCategoriesData &&
                subCategoriesData?.data?.map((subCat) => (
                  <option key={subCat.id} value={subCat.id}>
                    {subCat?.title}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sub Sub Category
            </label>
            <select
              name="subSubCategoryId"
              onChange={handleChange}
              value={formData.subSubCategoryId}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option>Select Sub Sub Category</option>
              {subSubCategoriesData &&
                subSubCategoriesData?.data?.map((subSubCat) => (
                  <option key={subSubCat.id} value={subSubCat.id}>
                    {subSubCat?.title}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand <span className="text-red-500">*</span>
            </label>
            <select
              name="brandId"
              onChange={handleChange}
              value={formData.brandId}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option>Select Brand</option>
              {brandsData &&
                brandsData?.data?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand?.title}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product SKU <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1 flex items-center gap-2">
              <input
                type="text"
                name="code"
                className="w-full rounded-md border border-gray-300 p-2"
                value={formData.code}
                onChange={handleChange}
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
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option value="kg">KilloGram</option>
              <option value="gm">Gram</option>
              <option value="litre">Litre</option>
              <option value="piece">Piece</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Status <span className="text-red-500">*</span>
            </label>
            <select
              name="available"
              onChange={handleChange}
              value={formData.available}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option value="in-stock">In Stock</option>
              <option value="pre-order">Pre Order</option>
              <option value="online-order">Online Order</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Warranty <span className="text-red-500">*</span>
            </label>
            <select
              name="warranty"
              value={formData.warranty}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option value="darkak">Darkak</option>
              <option value="official">Official</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Region <span className="text-red-500">*</span>
            </label>
            <select
              name="region"
              onChange={handleChange}
              value={formData.region}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option value="BD">BD</option>
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
            name="keywords"
            onChange={handleChange}
            value={formData.keywords}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter tags"
          />
        </div>
      </div>

      {/* delivery info */}
      <div className="mt-5 space-y-6 rounded-lg border bg-white p-6 shadow">
        <h2 className="text-lg font-semibold">Delivery setup</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Time <span className="text-red-500">*</span>
            </label>
            <input
              name="delivery_time"
              type="string"
              value={formData.delivery_info.delivery_time}
              onChange={handleDeliveryChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Charge <span className="text-red-500">*</span>
            </label>
            <input
              name="delivery_charge"
              type="string"
              value={formData.delivery_info.delivery_charge}
              onChange={handleDeliveryChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Time Outside <span className="text-red-500">*</span>
            </label>
            <input
              name="delivery_time_outside"
              type="string"
              value={formData.delivery_info.delivery_time_outside}
              onChange={handleDeliveryChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Charge Outside <span className="text-red-500">*</span>
            </label>
            <input
              name="delivery_charge_outside"
              type="string"
              value={formData.delivery_info.delivery_charge_outside}
              onChange={handleDeliveryChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Retrun Days <span className="text-red-500">*</span>
            </label>
            <input
              name="return_days"
              type="string"
              value={formData.delivery_info.return_days}
              onChange={handleDeliveryChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>
      </div>

      {/* pricing and others */}
      <div className="mt-5 space-y-6 rounded-lg border bg-white p-6 shadow">
        <h2 className="text-lg font-semibold">Pricing & others</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Unit price <span className="text-red-500">*</span>{" "}
            </label>
            <input
              name="price"
              type="number"
              placeholder="Unit price"
              value={formData.price}
              onChange={handleChange}
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
              name="minOrder"
              value={formData.minOrder}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Current stock qty <span className="text-red-500">*</span>{" "}
              <span className="text-gray-400">ⓘ</span>
            </label>
            <input
              name="stock"
              value={formData.stock}
              type="number"
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Discount Type <span className="text-red-500">*</span>{" "}
              <span className="text-gray-400">ⓘ</span>
            </label>
            <select
              name="discount_type"
              value={formData.discount_type}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
            >
              <option value="flat">Flat</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Discount amount ($) <span className="text-red-500">*</span>{" "}
              <span className="text-gray-400">ⓘ</span>
            </label>
            <input
              name="discount"
              value={formData.discount}
              type="number"
              onChange={handleChange}
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
              name="tax_amount"
              value={formData.tax_amount}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Tax Type <span className="text-red-500">*</span>{" "}
            </label>
            <select
              name="tax_type"
              value={formData.tax_type}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
            >
              <option value="include">Include with product</option>
              <option value="exclude">Exclude from product</option>
            </select>
          </div>
        </div>

        {/* <div>
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
        </div> */}
      </div>

      {/* thumbnail and images */}
      <div className="mt-5 flex flex-col gap-6 md:flex-row">
        {/* Thumbnail Upload */}
        <div className="flex-1 rounded-lg border bg-white p-4 shadow">
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Product thumbnail <span className="text-red-500">*</span>
          </label>
          <p className="mb-2 text-xs text-blue-600">Ratio 1:1 (500 x 500 px)</p>
          <div className="relative flex h-32 items-center justify-center rounded-md border border-dashed hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={(e) => handleImageUpload(e, "thumbnail")}
              style={{ zIndex: 1 }}
            />
            <div className="relative z-10 text-center text-sm text-gray-500">
              {formData.thumbnail ? (
                <div className="flex flex-row items-center gap-2">
                  <Image
                    className="rounded object-cover"
                    src={formData.thumbnail}
                    alt="thumbnail"
                    width={150}
                    height={150}
                    priority
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData((prev) => ({ ...prev, thumbnail: "" }));
                    }}
                    className="mt-2 rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                    style={{ zIndex: 20, position: "relative" }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-blue-600">
                    {thumbnailUploading ? (
                      <p className="mt-3">Uploading...</p>
                    ) : (
                      <p>Click to Upload</p>
                    )}
                  </p>
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
              name="images"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={(e) => handleImageUpload(e, "images")}
            />
            <div className="relative z-10 w-full text-center text-sm text-gray-500">
              {formData.images.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-2">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="group relative">
                      <Image
                        src={img}
                        alt={`Product image ${idx + 1}`}
                        width={80}
                        height={80}
                        className="rounded border object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== idx),
                          }));
                        }}
                        className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-80 hover:opacity-100"
                        style={{ zIndex: 10 }}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-blue-600">
                    {imagesUploading ? (
                      <p className="mt-3">Uploading...</p>
                    ) : (
                      <p>Click to Upload</p>
                    )}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* product video */}
      <div className="mt-5 space-y-6 rounded-lg border bg-white p-6 shadow">
        <h2 className="text-lg font-semibold">Product Video</h2>

        <div className="">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Youtube video link{" "}
              <span className="text-blue-500">
                (Optional please provide embed link not direct link.)
              </span>
            </label>
            <input
              type="string"
              name="video_link"
              value={formData.video_link}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
            />
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
                value={attribute.attributeId || ""}
                onChange={(e) => {
                  const updatedItems = [...formData.items];
                  updatedItems[attributeIndex].attributeId = e.target.value; // <-- store id
                  setFormData((prev) => ({ ...prev, items: updatedItems }));
                }}
                className="w-1/3 rounded-md border border-gray-300 p-2"
              >
                <option value="">Select Attribute</option>
                {attributesData &&
                  attributesData?.data?.map(
                    (attribute: { id: string; title: string }) => (
                      <option key={attribute.id} value={attribute.id}>
                        {attribute?.title}
                      </option>
                    ),
                  )}
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
                  attributeId: "", // <-- initialize attributeId
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

      {/* meta section */}
      <div className="mt-5 space-y-6 rounded-lg border bg-white p-6 shadow">
        <h2 className="text-lg font-semibold">Meta Section</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Meta Title
            </label>
            <input
              name="meta_title"
              type="string"
              value={formData.meta_title}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>
          <div className="flex-1 rounded-lg">
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Meta Image
            </label>
            <p className="mb-2 text-xs text-blue-600">
              Ratio 1:1 (500 x 500 px)
            </p>
            <div className="relative flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed hover:bg-gray-50">
              <input
                type="file"
                accept="image/*"
                name="meta_image"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={(e) => handleImageUpload(e, "meta_image")}
              />
              <div className="relative z-10 text-center text-sm text-gray-500">
                {formData.meta_image ? (
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      className="rounded object-cover"
                      src={formData.meta_image}
                      alt="meta_image"
                      width={150}
                      height={150}
                      priority
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData((prev) => ({ ...prev, meta_image: "" }));
                      }}
                      className="mt-2 rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                      style={{ zIndex: 20, position: "relative" }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-blue-600">
                      {metaImageUploading ? (
                        <p className="mt-3">Uploading...</p>
                      ) : (
                        <p>Click to Upload</p>
                      )}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* desc, specification and warraties */}
      <div className="mt-5 rounded-lg border bg-white p-6">
        {/* tabs */}
        <div>
          <span
            onClick={() => setCurrentTab("desc")}
            className={`cursor-pointer rounded px-6 py-2 ${currentTab === "desc" && "border-2 border-blue"}`}
          >
            Description
          </span>
          <span
            onClick={() => setCurrentTab("spec")}
            className={`cursor-pointer rounded px-6 py-2 ${currentTab === "spec" && "border-2 border-blue"}`}
          >
            Specifications
          </span>
          <span
            onClick={() => setCurrentTab("warrn")}
            className={`cursor-pointer rounded px-6 py-2 ${currentTab === "warrn" && "border-2 border-blue"}`}
          >
            Warranties
          </span>
        </div>

        {/* content */}

        <div className="mt-5">
          {currentTab === "desc" ? (
            <div className="flex flex-col gap-2">
              <label htmlFor="description">
                Description
                {`( ${currentLanguage === "en" ? "EN" : "BD"})`}
              </label>
              <CustomEditor
                value={formData.description}
                onChange={handleEditorChange("description")}
              />
            </div>
          ) : currentTab === "spec" ? (
            <div className="flex flex-col gap-2">
              <label htmlFor="specification">
                Specification
                {`( ${currentLanguage === "en" ? "EN" : "BD"})`}
              </label>
              <CustomEditor
                value={formData.description}
                onChange={handleEditorChange("specification")}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label htmlFor="warranty_details">
                warranty_details
                {`( ${currentLanguage === "en" ? "EN" : "BD"})`}
              </label>
              <CustomEditor
                value={formData.description}
                onChange={handleEditorChange("warranty_details")}
              />
            </div>
          )}
        </div>
      </div>

      <div className="text- mt-5">
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded bg-blue-600 px-4 py-2 text-white shadow"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
