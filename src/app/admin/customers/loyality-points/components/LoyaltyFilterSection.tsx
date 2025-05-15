import { useState } from "react";
import { DatePicker } from "./DatePicker";
import * as Yup from "yup";

const loyaltyFilterSchema = Yup.object().shape({
  fromDate: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "From Date must be in MM/DD/YYYY format")
    .required("From Date is required"),
  toDate: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "To Date must be in MM/DD/YYYY format")
    .required("To Date is required"),
  customer: Yup.string()
    .oneOf(["All", "Devid Jack"], "Select a valid customer")
    .required("Customer is required"),
});

export const LoyaltyFilterSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    customer: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFilter = async () => {
    try {
      await loyaltyFilterSchema.validate(formData, { abortEarly: false });
      console.log("Filter Data:", formData);
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

  return (
    <div className="mb-4 flex space-x-4 rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <DatePicker
        label=""
        onChange={(value) => handleInputChange("fromDate", value)}
        value={formData.fromDate}
        error={errors.fromDate}
      />
      <DatePicker
        label=""
        onChange={(value) => handleInputChange("toDate", value)}
        value={formData.toDate}
        error={errors.toDate}
      />
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium"></label>
        <select
          className={`rounded border p-2 text-sm ${errors.customer ? "border-red-500" : ""}`}
          value={formData.customer}
          onChange={(e) => handleInputChange("customer", e.target.value)}
        >
          <option value="">All</option>
          <option value="Devid Jack">Devid Jack</option>
        </select>
        {errors.customer && (
          <p className="text-xs text-red-500">{errors.customer}</p>
        )}
      </div>
      <div className="flex items-end">
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
