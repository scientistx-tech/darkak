import React, { useState } from "react";
import * as Yup from "yup";
import { ImageInput } from "./ImageInput";

const vendorSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNumber: Yup.string()
    .matches(/^\+880\d{10}$/, "Phone number must be in +880XXXXXXXXXX format")
    .required("Phone Number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
  shopName: Yup.string().required("Shop Name is required"),
  shopAddress: Yup.string().required("Shop Address is required"),
});

export const VendorForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    shopName: "",
    shopAddress: "",
    vendorImage: null as File | null,
    shopLogo: null as File | null,
    shopBanner: null as File | null,
  });
  const [previews, setPreviews] = useState({
    vendorImage: null as string | null,
    shopLogo: null as string | null,
    shopBanner: null as string | null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
    setPreviews((prev) => ({
      ...prev,
      [field]: file ? URL.createObjectURL(file) : null,
    }));
  };

  const handleSubmit = async () => {
    try {
      await vendorSchema.validate(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          shopName: formData.shopName,
          shopAddress: formData.shopAddress,
        },
        { abortEarly: false },
      );
      console.log("Vendor Data:", formData);
      setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      shopName: "",
      shopAddress: "",
      vendorImage: null,
      shopLogo: null,
      shopBanner: null,
    });
    setPreviews({
      vendorImage: null,
      shopLogo: null,
      shopBanner: null,
    });
    setErrors({});
  };

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-6">
        <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
          Vendor Information
        </h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-black dark:text-white">
              First name
            </label>
            <input
              type="text"
              placeholder="Ex: Jhone"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className={`rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-black dark:text-white">
              Last name
            </label>
            <input
              type="text"
              placeholder="Ex: Doe"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className={`rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-black dark:text-white">
              Phone number
            </label>
            <input
              type="text"
              placeholder="Ex: +8801710000000"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className={`rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
                errors.phoneNumber ? "border-red-500" : ""
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          <ImageInput
            label="Vendor Image (Ratio 1:1)"
            onChange={(file) => handleFileChange("vendorImage", file)}
            preview={previews.vendorImage}
            imageRatio="1:1"
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
          Account Information
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="Ex: jhone@company.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-black dark:text-white">
              Password (minimum 8 characters)
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-black dark:text-white">
              Confirm password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className={`rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
          Shop Information
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-black dark:text-white">
              Shop name
            </label>
            <input
              type="text"
              placeholder="Ex: Jhon"
              value={formData.shopName}
              onChange={(e) => handleInputChange("shopName", e.target.value)}
              className={`rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
                errors.shopName ? "border-red-500" : ""
              }`}
            />
            {errors.shopName && (
              <p className="text-xs text-red-500">{errors.shopName}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-black dark:text-white">
              Shop address
            </label>
            <input
              type="text"
              placeholder="Ex: Doe"
              value={formData.shopAddress}
              onChange={(e) => handleInputChange("shopAddress", e.target.value)}
              className={`rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
                errors.shopAddress ? "border-red-500" : ""
              }`}
            />
            {errors.shopAddress && (
              <p className="text-xs text-red-500">{errors.shopAddress}</p>
            )}
          </div>
          <ImageInput
            label="Shop Logo (Ratio 1:1)"
            onChange={(file) => handleFileChange("shopLogo", file)}
            preview={previews.shopLogo}
            imageRatio="1:1"
          />
        </div>
        <div className="mt-4">
          <ImageInput
            label="Shop Banner (Ratio 4:1 (2000 x 500 px))"
            onChange={(file) => handleFileChange("shopBanner", file)}
            preview={previews.shopBanner}
            imageRatio="4:1"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          className="rounded-[10px] border border-gray-300 bg-white p-2 text-sm text-black hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="rounded-[10px] bg-blue-600 p-2 text-sm text-white hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
