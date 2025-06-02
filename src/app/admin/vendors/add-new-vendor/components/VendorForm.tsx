"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useUploadImagesMutation } from "@/redux/services/admin/adminProductApis";
import { useCreateVendorMutation } from "@/redux/services/admin/adminVendorApis";
import Image from "next/image";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

type VendorFormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  shop_name: string;
  shop_address: string;
  shop_logo: string;
  shop_banner: string;
  image?: string;
  whats_app_link?: string;
};

const VendorForm = () => {
  const [formData, setFormData] = useState<VendorFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    shop_name: "",
    shop_address: "",
    shop_logo: "",
    shop_banner: "",
    image: "",
    whats_app_link: "",
  });

  const [shopLogoUploading, setShopLogoUploading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [shopBannerUploading, setShopBannerUploading] = useState(false);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  const [createVendor] = useCreateVendorMutation();
  const [uploadImages] = useUploadImagesMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "shop_logo" | "shop_banner" | "image" = "image",
  ) => {
    e.preventDefault && e.preventDefault();

    console.log("hello");

    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      if (type === "shop_logo") {
        console.log("hello1111", type);
        // Upload image for a specific option
        setShopLogoUploading(true);
        const imgForm = new FormData();
        imgForm.append("images", files[0]);
        const res = await uploadImages(imgForm).unwrap();
        const url = res[0];
        // VendorFormData does not have 'items', so just set shop_logo
        setFormData((prev) => ({
          ...prev,
          shop_logo: url,
        }));
      } else if (type === "shop_banner") {
        // Upload all images in one request
        setShopBannerUploading(true);
        const imgForm = new FormData();
        files.forEach((file) => imgForm.append("images", file));
        const res = await uploadImages(imgForm).unwrap();
        const uploadedUrls = res[0] || [];
        setFormData((prev) => ({
          ...prev,
          shop_banner: uploadedUrls,
        }));
      } else {
        // Upload single file for thumbnail or meta_image

        if (type === "image") {
          setImageUploading(true);
          const imgForm = new FormData();
          imgForm.append("images", files[0]);
          const res = await uploadImages(imgForm).unwrap();
          const url = res[0];
          setFormData((prev) => ({ ...prev, image: url }));
        }
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setShopLogoUploading(false);
      setShopBannerUploading(false);
      setImageUploading(false);
      e.target.value = ""; // Reset input
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await createVendor(formData).unwrap();
      toast.success(res?.message || "Vendor created successfully!");
      router.push("/admin/vendors/vendor-list");
      setLogoPreview(null);
      setBannerPreview(null);
      setImagePreview(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create vendor.");
    }
  };

  console.log("data", formData);

  return (
    <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Shop Name</label>
        <input
          name="shop_name"
          value={formData.shop_name}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Shop Address</label>
        <input
          name="shop_address"
          value={formData.shop_address}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Shop Logo */}

      <div>
        <label className="mb-2 inline text-sm font-semibold text-gray-700">
          Shop logo <span className="text-red-500">* </span>
        </label>
        <p className="mb-2 inline text-xs text-blue-600">
          Ratio 1:1 (400 x 400 px)
        </p>
        <div className="relative mt-1 flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed hover:bg-gray-50">
          <input
            type="file"
            accept="image/*"
            name="shop_logo"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => handleImageUpload(e, "shop_logo")}
          />
          <div className="relative z-10 text-center text-sm text-gray-500">
            {formData.shop_logo ? (
              <div className="flex flex-row items-center gap-2">
                <Image
                  className="rounded object-cover"
                  src={formData.shop_logo}
                  alt="shop_logo"
                  width={150}
                  height={150}
                  priority
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData((prev) => ({ ...prev, shop_logo: "" }));
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
                  {shopLogoUploading ? (
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

      {/* Shop Banner */}
      <div>
        <label className="mb-2 inline text-sm font-semibold text-gray-700">
          Shop Banner <span className="text-red-500">* </span>
        </label>
        <p className="mb-2 inline text-xs text-blue-600">
          Ratio 1:1 (1300 x 600 px)
        </p>
        <div className="relative mt-1 flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed hover:bg-gray-50">
          <input
            type="file"
            accept="image/*"
            name="shop_banner"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => handleImageUpload(e, "shop_banner")}
          />
          <div className="relative z-10 text-center text-sm text-gray-500">
            {formData.shop_banner ? (
              <div className="flex flex-row items-center gap-2">
                <Image
                  className="rounded object-cover"
                  src={formData.shop_banner}
                  alt="shop_banner"
                  width={150}
                  height={150}
                  priority
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData((prev) => ({ ...prev, shop_banner: "" }));
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
                  {shopBannerUploading ? (
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

      {/* Optional Image */}
      <div>
        <label className="mb-2 inline text-sm font-semibold text-gray-700">
          Vendor Image <span className="text-red-500">* </span>
        </label>
        <p className="mb-2 inline text-xs text-blue-600">
          Ratio 1:1 (400 x 400 px)
        </p>
        <div className="relative mt-1 flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed hover:bg-gray-50">
          <input
            type="file"
            accept="image/*"
            name="image"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => handleImageUpload(e, "image")}
          />
          <div className="relative z-10 text-center text-sm text-gray-500">
            {formData.image ? (
              <div className="flex flex-row items-center gap-2">
                <Image
                  className="rounded object-cover"
                  src={formData.image}
                  alt="image"
                  width={150}
                  height={150}
                  priority
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData((prev) => ({ ...prev, image: "" }));
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
                  {imageUploading ? (
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

      <div>
        <label className="mb-2 block text-sm font-medium">WhatsApp Link</label>
        <textarea
          name="whats_app_link"
          value={formData.whats_app_link}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="md:col-span-2">
        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={shopLogoUploading || shopBannerUploading || imageUploading}
          className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Add Vendor
        </button>
      </div>
    </form>
  );
};

export default VendorForm;
