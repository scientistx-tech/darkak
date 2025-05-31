import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useUploadImagesMutation } from "@/redux/services/admin/adminProductApis";
import { useCreateVendorMutation } from "@/redux/services/admin/adminVendorApis";

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

const ImageUploadField = ({
  name,
  control,
  label,
  preview,
  setPreview,
  uploadImageFile,
  required = true,
}: {
  name: keyof VendorFormData;
  control: any;
  label: string;
  preview: string | null;
  setPreview: (url: string) => void;
  uploadImageFile: any;
  required?: boolean;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={required ? { required: `${label} is required` } : {}}
      render={({ field: { onChange, ref }, fieldState: { error } }) => (
        <div>
          <label className="block text-sm font-medium">{label}</label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const formData = new FormData();
              formData.append("images", file);
              try {
                const res = await uploadImageFile(formData).unwrap();
                const imageUrl = res?.data?.url;
                if (imageUrl) {
                  onChange(imageUrl);
                  setPreview(imageUrl);
                }
              } catch (err) {
                toast.error("Upload failed");
              }
            }}
            className="mt-1 w-full rounded-md border px-3 py-2"
            ref={ref}
          />
          {error && <p className="text-sm text-red-500">{error.message}</p>}
          {preview && (
            <img
              src={preview}
              alt={`${label} Preview`}
              className="mt-2 h-24 w-full rounded border object-cover"
            />
          )}
        </div>
      )}
    />
  );
};

const VendorForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<VendorFormData>();

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [uploadImageFile] = useUploadImagesMutation();
  const [createVendor] = useCreateVendorMutation();

  const onSubmit = async (data: VendorFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone", data.phone);
      formData.append("shop_name", data.shop_name);
      formData.append("shop_address", data.shop_address);
      formData.append("whats_app_link", data.whats_app_link || "");
      formData.append("shop_logo", data.shop_logo);
      formData.append("shop_banner", data.shop_banner);
      if (data.image) formData.append("image", data.image);

      const res = await createVendor(formData).unwrap();
      toast.success(res?.message || "Vendor created successfully!");
      reset();
      setLogoPreview(null);
      setBannerPreview(null);
      setImagePreview(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create vendor.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          {...register("phone", { required: "Phone is required" })}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Shop Name</label>
        <input
          {...register("shop_name", { required: "Shop name is required" })}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.shop_name && (
          <p className="text-sm text-red-500">{errors.shop_name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Shop Address</label>
        <input
          {...register("shop_address", {
            required: "Shop address is required",
          })}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.shop_address && (
          <p className="text-sm text-red-500">{errors.shop_address.message}</p>
        )}
      </div>

      {/* Shop Logo */}
      <ImageUploadField
        name="shop_logo"
        label="Shop Logo"
        control={control}
        preview={logoPreview}
        setPreview={setLogoPreview}
        uploadImageFile={uploadImageFile}
      />

      {/* Shop Banner */}
      <ImageUploadField
        name="shop_banner"
        label="Shop Banner"
        control={control}
        preview={bannerPreview}
        setPreview={setBannerPreview}
        uploadImageFile={uploadImageFile}
      />

      {/* Optional Image */}
      <ImageUploadField
        name="image"
        label="Image"
        control={control}
        preview={imagePreview}
        setPreview={setImagePreview}
        uploadImageFile={uploadImageFile}
        required={false}
      />

      <div className="md:col-span-2">
        <label className="block text-sm font-medium">WhatsApp Link</label>
        <input
          {...register("whats_app_link")}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          {isSubmitting ? "Submitting..." : "Add Vendor"}
        </button>
      </div>
    </form>
  );
};

export default VendorForm;
