import React, { useState } from "react";
import * as Yup from "yup";
import { DatePicker } from "./DatePicker";

export const ReviewFilterSection: React.FC = () => {
  const [formData, setFormData] = useState({
    product: "",
    customer: "",
    status: "",
    dateFilter: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Yup validation schema
  const filterSchema = Yup.object().shape({
    product: Yup.string()
      .oneOf(
        ["Leather Ladies Bag", "Product not found"],
        "Select a valid product",
      )
      .required("Product is required"),
    customer: Yup.string()
      .oneOf(
        ["All customer", "Robert Downey", "Devid Jack"],
        "Select a valid customer",
      )
      .required("Customer is required"),
    status: Yup.string()
      .oneOf(["Active", "Inactive"], "Select a valid status")
      .required("Status is required"),
    dateFilter: Yup.string()
      .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
      .required("Date is required"),
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFilter = async () => {
    try {
      await filterSchema.validate(formData, { abortEarly: false });
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
    setFormData({ product: "", customer: "", status: "", dateFilter: "" });
    setErrors({});
  };

  return (
    <div className="mb-4 flex space-x-4 rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Products</label>
        <select
          className={`rounded border p-2 text-sm ${errors.product ? "border-red-500" : ""}`}
          value={formData.product}
          onChange={(e) => handleInputChange("product", e.target.value)}
        >
          <option value="">Select Product</option>
          <option value="Leather Ladies Bag">Leather Ladies Bag</option>
          <option value="Product not found">Product not found</option>
        </select>
        {errors.product && (
          <p className="text-xs text-red-500">{errors.product}</p>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Customer</label>
        <select
          className={`rounded border p-2 text-sm ${errors.customer ? "border-red-500" : ""}`}
          value={formData.customer}
          onChange={(e) => handleInputChange("customer", e.target.value)}
        >
          <option value="">All customer</option>
          <option value="Robert Downey">Robert Downey</option>
          <option value="Devid Jack">Devid Jack</option>
        </select>
        {errors.customer && (
          <p className="text-xs text-red-500">{errors.customer}</p>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Choose Status</label>
        <select
          className={`rounded border p-2 text-sm ${errors.status ? "border-red-500" : ""}`}
          value={formData.status}
          onChange={(e) => handleInputChange("status", e.target.value)}
        >
          <option value="">-Select status-</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {errors.status && (
          <p className="text-xs text-red-500">{errors.status}</p>
        )}
      </div>
      <DatePicker
        label="Date Wise Filter"
        onChange={(value) => handleInputChange("dateFilter", value)}
        value={formData.dateFilter}
        error={errors.dateFilter}
      />
      <div className="flex items-end space-x-2">
        <button className="rounded border p-2 text-sm" onClick={handleReset}>
          Reset
        </button>
        <button
          className="rounded bg-blue-600 p-2 text-sm text-white"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>
    </div>
  );
};
