"use client";
import {
  useGetSingleProductDetailsQuery,
  useUpdateProductMutation,
} from "@/redux/services/admin/adminProductApis";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
import { FaTrashAlt } from "react-icons/fa";
import AsyncSelect from "react-select/async";
import { useSelector } from "react-redux";

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
  meta_description: string;
  meta_keywords: string;
  video_link: string;
  thumbnail: string;
  price: string;
  discount_type: string;
  discount: string;
  tax_amount: string;
  tax_type: string;
  available: string;
  warranty: string;
  warranty_time: string;
  region: string;
  stock: string;
  minOrder: string;
  unit: string;
  code: string;
  drafted: boolean;
  specification: string;
  description: string;
  warranty_details: string;
  categoryId: string;
  subCategoryId: string;
  subSubCategoryId: string;
  brandId: string;
  keywords: string;
  images: string[];
  delivery_info: DeliveryInfo;
  items: AttributeItem[];
};

const countryCodes = [
  "AF",
  "AL",
  "DZ",
  "AS",
  "AD",
  "AO",
  "AI",
  "AQ",
  "AG",
  "AR",
  "AM",
  "AW",
  "AU",
  "AT",
  "AZ",
  "BS",
  "BH",
  "BD",
  "BB",
  "BY",
  "BE",
  "BZ",
  "BJ",
  "BM",
  "BT",
  "BO",
  "BA",
  "BW",
  "BR",
  "BN",
  "BG",
  "BF",
  "BI",
  "KH",
  "CM",
  "CA",
  "CV",
  "CF",
  "TD",
  "CL",
  "CN",
  "CO",
  "KM",
  "CG",
  "CD",
  "CR",
  "CI",
  "HR",
  "CU",
  "CY",
  "CZ",
  "DK",
  "DJ",
  "DM",
  "DO",
  "EC",
  "EG",
  "SV",
  "GQ",
  "ER",
  "EE",
  "ET",
  "FJ",
  "FI",
  "FR",
  "GA",
  "GM",
  "GE",
  "DE",
  "GH",
  "GR",
  "GD",
  "GT",
  "GN",
  "GW",
  "GY",
  "HT",
  "HN",
  "HU",
  "IS",
  "IN",
  "ID",
  "IR",
  "IQ",
  "IE",
  "IL",
  "IT",
  "JM",
  "JP",
  "JO",
  "KZ",
  "KE",
  "KI",
  "KR",
  "KW",
  "KG",
  "LA",
  "LV",
  "LB",
  "LS",
  "LR",
  "LY",
  "LI",
  "LT",
  "LU",
  "MG",
  "MW",
  "MY",
  "MV",
  "ML",
  "MT",
  "MH",
  "MR",
  "MU",
  "MX",
  "FM",
  "MD",
  "MC",
  "MN",
  "ME",
  "MA",
  "MZ",
  "MM",
  "NA",
  "NR",
  "NP",
  "NL",
  "NZ",
  "NI",
  "NE",
  "NG",
  "NO",
  "OM",
  "PK",
  "PW",
  "PA",
  "PG",
  "PY",
  "PE",
  "PH",
  "PL",
  "PT",
  "QA",
  "RO",
  "RU",
  "RW",
  "KN",
  "LC",
  "VC",
  "WS",
  "SM",
  "ST",
  "SA",
  "SN",
  "RS",
  "SC",
  "SL",
  "SG",
  "SK",
  "SI",
  "SB",
  "SO",
  "ZA",
  "ES",
  "LK",
  "SD",
  "SR",
  "SE",
  "CH",
  "SY",
  "TW",
  "TJ",
  "TZ",
  "TH",
  "TL",
  "TG",
  "TO",
  "TT",
  "TN",
  "TR",
  "TM",
  "UG",
  "UA",
  "AE",
  "GB",
  "US",
  "UY",
  "UZ",
  "VU",
  "VA",
  "VE",
  "VN",
  "YE",
  "ZM",
  "ZW",
];

const ProductEdit = () => {
  const params = useParams();
  const { id } = params;
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    short_description: "",
    meta_title: "",
    meta_image: "",
    meta_description: "",
    meta_keywords: "",
    video_link: "",
    thumbnail: "",
    price: "",
    discount_type: "",
    discount: "",
    tax_amount: "",
    tax_type: "",
    available: "",
    warranty: "",
    warranty_time: "",
    region: "",
    stock: "",
    minOrder: "",
    unit: "",
    code: "",
    specification: "",
    description: "",
    warranty_details: "",
    categoryId: "",
    subCategoryId: "",
    subSubCategoryId: "",
    brandId: "",
    keywords: "",
    drafted: false,
    images: [],
    delivery_info: {
      delivery_time: "",
      delivery_charge: "",
      delivery_time_outside: "",
      delivery_charge_outside: "",
      return_days: "",
      multiply: "",
    } as DeliveryInfo,
    items: [],
  });
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [productSKU, setProductSKU] = useState("5Y5LMO");
  const [multiplyShipping, setMultiplyShipping] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [imagesUploading, setImagesUploading] = useState(false);
  const [metaImageUploading, setMetaImageUploading] = useState(false);
  const [optionImageUploading, setOptionImageUploading] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("desc");
  const [selectedBrand, setSelectedBrand] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);

  // load all categories, sub categories, sub sub categories and brands
  const { data: categoriesData } = useGetCategoriesQuery({});
  const { data: subCategoriesData } = useGetSubCategoriesQuery({});
  const { data: subSubCategoriesData } = useGetSubSubCategoriesQuery({});
  const { data: brandsData } = useGetBrandsQuery({});
  const { data: attributesData } = useGetProductAttributesQuery({});
  const {
    data: productData,
    error,
    isLoading,
    refetch,
  } = useGetSingleProductDetailsQuery(id);
  const [uploadImages] = useUploadImagesMutation();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct, { isLoading: loadingUpadate }] =
    useUpdateProductMutation();

  const router = useRouter();
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    if (productData?.product) {
      const p = productData.product;
      setFormData({
        title: p.title,
        short_description: p.short_description,
        meta_title: p.meta_title,
        meta_image: p.meta_image,
        meta_description: p.meta_description,
        meta_keywords: p.keywords.map((k: any) => k.key).join(","),
        video_link: p.video_link,
        thumbnail: p.thumbnail,
        price: String(p.price),
        discount_type: p.discount_type,
        discount: String(p.discount),
        tax_amount: String(p.tax_amount),
        tax_type: p.tax_type,
        available: p.available,
        warranty: p.warranty,
        warranty_time: p.warranty_time || "",
        region: p.region,
        stock: String(p.stock),
        minOrder: String(p.minOrder),
        unit: p.unit,
        code: p.code,
        specification: p.specification,
        description: p.description,
        warranty_details: p.warranty_details,
        categoryId: String(p.categoryId),
        subCategoryId: String(p.subCategoryId),
        subSubCategoryId: String(p.subSubCategoryId),
        brandId: String(p.brandId),
        keywords: p.keywords.map((k: any) => k.key).join(","),
        images: p.Image.map((img: any) => img.url),
        delivery_info: {
          delivery_time: p.delivery_info.delivery_time,
          delivery_charge: String(p.delivery_info.delivery_charge),
          delivery_time_outside: p.delivery_info.delivery_time_outside,
          delivery_charge_outside: String(
            p.delivery_info.delivery_charge_outside,
          ),
          return_days: String(p.delivery_info.return_days),
          multiply: p.delivery_info.multiply ? "true" : "false",
        },
        items: p.items.map((item: any) => ({
          attributeId: String(item.id),
          title: item.title,
          options: item.options
            .filter((opt: any) => opt.productId === p.id) // Filter correct product
            .map((opt: any) => ({
              title: opt.title,
              price: opt.price,
              stock: opt.stock,
              sku: opt.sku,
              image: opt.image,
            })),
        })),
        drafted: p.drafted,
      });
      setProductSKU(p.code); // Optional
      setMultiplyShipping(p.delivery_info.multiply);

      // Set initial selected values for AsyncSelects
      setSelectedBrand(
        p.brandId
          ? {
              value: String(p.brandId),
              label:
                brandsData?.data?.find(
                  (b: any) => String(b.id) === String(p.brandId),
                )?.title || "",
            }
          : null,
      );
      setSelectedCategory(
        p.categoryId
          ? {
              value: String(p.categoryId),
              label:
                categoriesData?.data?.find(
                  (c: any) => String(c.id) === String(p.categoryId),
                )?.title || "",
            }
          : null,
      );
      setSelectedSubCategory(
        p.subCategoryId
          ? {
              value: String(p.subCategoryId),
              label:
                subCategoriesData?.data?.find(
                  (sc: any) => String(sc.id) === String(p.subCategoryId),
                )?.title || "",
            }
          : null,
      );
      setSelectedSubSubCategory(
        p.subSubCategoryId
          ? {
              value: String(p.subSubCategoryId),
              label:
                subSubCategoriesData?.data?.find(
                  (ssc: any) => String(ssc.id) === String(p.subSubCategoryId),
                )?.title || "",
            }
          : null,
      );
    }
  }, [
    productData,
    brandsData,
    categoriesData,
    subCategoriesData,
    subSubCategoriesData,
  ]);

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
    type: "images" | "thumbnail" | "meta_image" | "option_image" = "images",
    attributeIndex?: number,
    optionIndex?: number,
  ) => {
    e.preventDefault && e.preventDefault();

    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      if (
        type === "option_image" &&
        attributeIndex !== undefined &&
        optionIndex !== undefined
      ) {
        // Upload image for a specific option
        setOptionImageUploading(true);
        const imgForm = new FormData();
        imgForm.append("images", files[0]);
        const res = await uploadImages(imgForm).unwrap();
        const url = res[0];
        setFormData((prev) => {
          const updatedItems = [...prev.items];
          updatedItems[attributeIndex].options[optionIndex].image = url;
          return { ...prev, items: updatedItems };
        });
      } else if (type === "images") {
        // Upload all images in one request
        setImagesUploading(true);
        const imgForm = new FormData();
        files.forEach((file) => imgForm.append("images", file));
        const res = await uploadImages(imgForm).unwrap();

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
          setFormData((prev) => ({ ...prev, meta_image: url }));
        }
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setThumbnailUploading(false);
      setMetaImageUploading(false);
      setImagesUploading(false);
      setOptionImageUploading(false);
      e.target.value = ""; // Reset input
    }
  };

  const handleSubmit = async (isDraft: boolean) => {
    if (
      !formData.title ||
      !formData.short_description ||
      !formData.meta_title ||
      !formData.meta_image ||
      !formData.thumbnail ||
      !formData.price ||
      !formData.unit ||
      !formData.categoryId ||
      !formData.subCategoryId ||
      !formData.subSubCategoryId ||
      !formData.brandId ||
      !formData.keywords ||
      !formData.delivery_info.delivery_time ||
      !formData.delivery_info.delivery_charge ||
      !formData.delivery_info.delivery_time_outside ||
      !formData.delivery_info.delivery_charge_outside ||
      !formData.delivery_info.return_days
    ) {
      toast.error("Filled all required field first");
      return;
    }
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
      warranty_time: formData.warranty_time,
      region: formData.region,
      stock: formData.stock || "0",
      minOrder: formData.minOrder || "1",
      unit: formData.unit,
      specification: formData.specification,
      description: formData.description,
      warranty_details: formData.warranty_details,
      meta_description: formData.meta_description,
      meta_keywords: formData.meta_keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      categoryId: formData.categoryId,
      subCategoryId: formData.subCategoryId,
      subSubCategoryId: formData.subSubCategoryId,
      drafted: isDraft,
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
      items: formData.items.map((item) => ({
        attributeId: item.attributeId || "",
        title: item.title || "",
        options: item.options.map((opt) => ({
          ...opt,
          price:
            typeof opt.price === "string" ? parseFloat(opt.price) : opt.price,
          stock:
            typeof opt.stock === "string" ? parseInt(opt.stock) : opt.stock,
          sku:
            opt.sku !== undefined
              ? String(opt.sku)
              : opt.stock !== undefined
                ? String(opt.stock)
                : "",
          image: opt.image || "",
        })),
      })),
    };

    // Send payload to API
    try {
      await updateProduct({
        id: productData.product.id,
        data: payload,
      }).unwrap();
      toast.success("Product updated successfully");
      router.push("/admin/product/product-list");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message);
    }
  };

  const loadBrandOptions = async (inputValue: string) => {
    const res = await fetch(
      `https://api.darkak.com.bd/api/admin/brand/get?search=${inputValue}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const json = await res.json();
    return json.data.map((item: any) => ({
      value: item.id,
      label: item.title,
    }));
  };

  const loadCategoryOptions = async (inputValue: string) => {
    const res = await fetch(
      `https://api.darkak.com.bd/api/admin/category/create?search=${inputValue}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const json = await res.json();
    return json.data.map((item: any) => ({
      value: item.id,
      label: item.title,
    }));
  };

  const loadSubCategoryOptions = async (inputValue: string) => {
    const res = await fetch(
      `https://api.darkak.com.bd/api/admin/category/sub-category?search=${inputValue}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const json = await res.json();
    return json.data.map((item: any) => ({
      value: item.id,
      label: item.title,
    }));
  };

  const loadSubSubCategoryOptions = async (inputValue: string) => {
    const res = await fetch(
      `https://api.darkak.com.bd/api/admin/category/sub-sub-category?search=${inputValue}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const json = await res.json();
    return json.data.map((item: any) => ({
      value: item.id,
      label: item.title,
    }));
  };

  return (
    <div className="mx-auto w-full">
      <h1 className="mb-4 flex items-center gap-2 text-xl font-bold">
        🛍️ Edit Product
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
              Product Name {`( ${currentLanguage === "en" ? "EN" : "BD"})`}{" "}
              <span className="text-red-500">*</span>
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
              Description {`( ${currentLanguage === "en" ? "EN" : "BD"})`}{" "}
              <span className="text-red-500">*</span>
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
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadCategoryOptions}
              value={selectedCategory}
              onChange={(option) => {
                setSelectedCategory(option);
                setFormData((prev) => ({
                  ...prev,
                  categoryId: option?.value || "",
                }));
              }}
              placeholder="Select Category"
              isClearable
              styles={{
                container: (base) => ({
                  ...base,
                  height: "40px",
                  marginTop: "0.25rem",
                }),
                control: (base) => ({ ...base, height: "40px" }),
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sub Category <span className="text-red-500">*</span>
            </label>
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadSubCategoryOptions}
              value={selectedSubCategory}
              onChange={(option) => {
                setSelectedSubCategory(option);
                setFormData((prev) => ({
                  ...prev,
                  subCategoryId: option?.value || "",
                }));
              }}
              placeholder="Select Sub Category"
              isClearable
              styles={{
                container: (base) => ({
                  ...base,
                  height: "40px",
                  marginTop: "0.25rem",
                }),
                control: (base) => ({ ...base, height: "40px" }),
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sub Sub Category <span className="text-red-500">*</span>
            </label>
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadSubSubCategoryOptions}
              value={selectedSubSubCategory}
              onChange={(option) => {
                setSelectedSubSubCategory(option);
                setFormData((prev) => ({
                  ...prev,
                  subSubCategoryId: option?.value || "",
                }));
              }}
              placeholder="Select Sub Sub Category"
              isClearable
              styles={{
                container: (base) => ({
                  ...base,
                  height: "40px",
                  marginTop: "0.25rem",
                }),
                control: (base) => ({ ...base, height: "40px" }),
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand <span className="text-red-500">*</span>
            </label>
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadBrandOptions}
              value={selectedBrand}
              onChange={(option) => {
                setSelectedBrand(option);
                setFormData((prev) => ({
                  ...prev,
                  brandId: option?.value || "",
                }));
              }}
              placeholder="Select Brand"
              isClearable
              styles={{
                container: (base) => ({
                  ...base,
                  height: "40px",
                  marginTop: "0.25rem",
                }),
                control: (base) => ({ ...base, height: "40px" }),
              }}
            />
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
              Warranty
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
              Warranty Time
            </label>
            <div className="relative mt-1 flex items-center gap-2">
              <input
                type="text"
                name="warranty_time"
                className="w-full rounded-md border border-gray-300 p-2"
                value={formData.warranty_time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Region
            </label>
            <select
              name="region"
              onChange={handleChange}
              value={formData.region}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              {countryCodes.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
            Search tags
            <span className="text-red-500">*</span>
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
              type="number"
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
              type="number"
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
              Minimum order quantity
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
              Current stock quantity
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
              Discount Type
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
              Discount amount
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
              Tax amount (%)
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
              Tax Type
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
                  updatedItems[attributeIndex].attributeId = e.target.value;
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
                className="rounded bg-red-50 px-4 py-2 text-red-700 hover:bg-red-100"
              >
                Remove Attribute
              </button>
            </div>

            {/* Attribute Options */}
            {attribute.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="mt-4 flex items-center gap-4 rounded-md border border-gray-3 p-2"
              >
                <div className="flex w-full flex-col gap-4">
                  {/* title,price,stock */}
                  <div className="flex items-center gap-4">
                    <div className="flex w-full flex-col gap-1">
                      <label htmlFor="option_title">Option Title</label>
                      <input
                        type="text"
                        placeholder="Option Title"
                        value={option.title}
                        onChange={(e) => {
                          const updatedItems = [...formData.items];
                          updatedItems[attributeIndex].options[
                            optionIndex
                          ].title = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            items: updatedItems,
                          }));
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
                          updatedItems[attributeIndex].options[
                            optionIndex
                          ].price = parseFloat(e.target.value);
                          setFormData((prev) => ({
                            ...prev,
                            items: updatedItems,
                          }));
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
                          updatedItems[attributeIndex].options[
                            optionIndex
                          ].stock = parseFloat(e.target.value);
                          setFormData((prev) => ({
                            ...prev,
                            items: updatedItems,
                          }));
                        }}
                        className="w-full rounded-md border border-gray-300 p-2"
                      />
                    </div>
                    <div className="flex w-full flex-col gap-1">
                      <label htmlFor="item_sku">Code</label>
                      <input
                        type="string"
                        placeholder="sku"
                        value={option.sku}
                        onChange={(e) => {
                          const updatedItems = [...formData.items];
                          updatedItems[attributeIndex].options[
                            optionIndex
                          ].sku = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            items: updatedItems,
                          }));
                        }}
                        className="w-full rounded-md border border-gray-300 p-2"
                      />
                    </div>
                  </div>
                  {/*  image */}
                  <div className="flex items-center gap-4">
                    <div className="flex w-full flex-col gap-1">
                      <label htmlFor="option_image">Option Image</label>
                      <div className="relative flex h-20 w-full items-center justify-center rounded-md border border-dashed hover:bg-gray-50">
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 cursor-pointer opacity-0"
                          onChange={(e) =>
                            handleImageUpload(
                              e,
                              "option_image",
                              attributeIndex,
                              optionIndex,
                            )
                          }
                          style={{ zIndex: 1 }}
                        />
                        <div className="relative z-10 text-center text-sm text-gray-500">
                          {option.image ? (
                            <div className="flex flex-row items-center gap-1">
                              <Image
                                className="rounded object-cover"
                                src={option.image}
                                alt="option"
                                width={60}
                                height={60}
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updatedItems = [...formData.items];
                                  updatedItems[attributeIndex].options[
                                    optionIndex
                                  ].image = "";
                                  setFormData((prev) => ({
                                    ...prev,
                                    items: updatedItems,
                                  }));
                                }}
                                className="mt-1 rounded bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600"
                                style={{ zIndex: 20, position: "relative" }}
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <>
                              <p className="text-blue-600">
                                {optionImageUploading ? (
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

                <button
                  onClick={() => {
                    const updatedItems = [...formData.items];
                    updatedItems[attributeIndex].options.splice(optionIndex, 1);
                    setFormData((prev) => ({ ...prev, items: updatedItems }));
                  }}
                  className=""
                >
                  <FaTrashAlt className="text-xl text-red-600 hover:text-red-500" />
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
              className="mt-4 rounded border border-blue-700 bg-blue-50 px-4 py-2 text-blue-700 hover:bg-blue-100"
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
                  attributeId: "", // <-- always present!
                  title: "",
                  options: [],
                },
              ],
            }));
          }}
          className="rounded border-2 border-green-500 bg-green-50 px-4 py-2 text-green-700 hover:bg-green-100"
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
              Meta Title <span className="text-red-500">*</span>
            </label>
            <input
              name="meta_title"
              type="text"
              value={formData.meta_title}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
              maxLength={70}
            />
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Title should be between 50-60 characters.
              </span>
              <span
                className={`text-xs font-semibold ${
                  formData.meta_title.length < 50 ||
                  formData.meta_title.length > 60
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {formData.meta_title.length} chars
              </span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Meta Description <span className="text-red-500">*</span>
            </label>
            <input
              name="meta_description"
              type="text"
              value={formData.meta_description}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
              maxLength={180}
            />
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Description should be between 150-160 characters.
              </span>
              <span
                className={`text-xs font-semibold ${
                  formData.meta_description.length < 150 ||
                  formData.meta_description.length > 160
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {formData.meta_description.length} chars
              </span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Meta Keywords <span className="text-red-500">*</span>
            </label>
            <input
              name="meta_keywords"
              type="string"
              value={formData.meta_keywords}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>
          <div className="flex-1 rounded-lg">
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Meta Image <span className="text-red-500">*</span>
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
                key={currentTab}
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
                key={currentTab}
                value={formData.specification}
                onChange={handleEditorChange("specification")}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label htmlFor="warranty_details">
                Warranty details
                {`( ${currentLanguage === "en" ? "EN" : "BD"})`}
              </label>
              <CustomEditor
                key={currentTab}
                value={formData.warranty_details}
                onChange={handleEditorChange("warranty_details")}
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-3">
        {/* <button
          type="button"
          onClick={() => handleSubmit(true)}
          className="rounded bg-yellow-600 px-4 py-2 text-white shadow"
          disabled={
            imagesUploading ||
            metaImageUploading ||
            thumbnailUploading ||
            optionImageUploading
          }
        >
          Draft
        </button> */}
        <button
          type="button"
          onClick={() => handleSubmit(false)}
          className="rounded bg-blue-600 px-4 py-2 text-white shadow"
          disabled={
            imagesUploading ||
            metaImageUploading ||
            thumbnailUploading ||
            optionImageUploading
          }
        >
          {loadingUpadate ? "Updating.." : "Update"}
        </button>
        {/* <button
          type="button"
          // onClick={handleSubmit}
          className="cursor-not-allowed rounded bg-teal-600 px-4 py-2 text-white shadow"
          disabled={
            imagesUploading ||
            metaImageUploading ||
            thumbnailUploading ||
            optionImageUploading
          }
        >
          Schedule
        </button> */}
      </div>
    </div>
  );
};

export default ProductEdit;
