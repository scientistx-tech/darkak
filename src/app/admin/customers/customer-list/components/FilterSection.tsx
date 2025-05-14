import { useState } from "react";
import * as Yup from "yup";
import { DateRangePicker } from "./DateRangePicker";

const filterSchema = Yup.object().shape({
  orderDateRange: Yup.string()
    .matches(
      /^\d{2}\/\d{2}\/\d{4}-\d{2}\/\d{2}\/\d{4}$/,
      "Order Date must be in DD/MM/YYYY-DD/MM/YYYY format",
    )
    .required("Order Date is required"),
  joiningDateRange: Yup.string()
    .matches(
      /^\d{2}\/\d{2}\/\d{4}-\d{2}\/\d{2}\/\d{4}$/,
      "Joining Date must be in DD/MM/YYYY-DD/MM/YYYY format",
    )
    .required("Joining Date is required"),
  customerStatus: Yup.string()
    .oneOf(["Active", "Inactive"], "Select a valid status")
    .required("Customer Status is required"),
  sortBy: Yup.string()
    .oneOf(["Name (A-Z)", "Name (Z-A)"], "Select a valid sort option")
    .required("Sort By is required"),
  chooseFirst: Yup.string()
    .matches(
      /^\*?\d+$/,
      "Choose First must be a number, optionally starting with *",
    )
    .required("Choose First is required"),
});

export const FilterSection: React.FC = () => {
  const [formData, setFormData] = useState({
    orderDateRange: "",
    joiningDateRange: "",
    customerStatus: "",
    sortBy: "",
    chooseFirst: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFilter = async () => {
    try {
      await filterSchema.validate(formData, { abortEarly: false });
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
      <DateRangePicker
        label="Order Date"
        onChange={(value) => handleInputChange("orderDateRange", value)}
        value={formData.orderDateRange}
        error={errors.orderDateRange}
      />
      <DateRangePicker
        label="Customer Joining Date"
        onChange={(value) => handleInputChange("joiningDateRange", value)}
        value={formData.joiningDateRange}
        error={errors.joiningDateRange}
      />
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Customer Status</label>
        <select
          className={`rounded border p-2 text-sm ${
            errors.customerStatus ? "border-red-500" : ""
          }`}
          value={formData.customerStatus}
          onChange={(e) => handleInputChange("customerStatus", e.target.value)}
        >
          <option value="">Select status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        {errors.customerStatus && (
          <p className="text-xs text-red-500">{errors.customerStatus}</p>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Sort By</label>
        <select
          className={`rounded border p-2 text-sm ${
            errors.sortBy ? "border-red-500" : ""
          }`}
          value={formData.sortBy}
          onChange={(e) => handleInputChange("sortBy", e.target.value)}
        >
          <option value="">Select Customer sorting order</option>
          <option>Name (A-Z)</option>
          <option>Name (Z-A)</option>
        </select>
        {errors.sortBy && (
          <p className="text-xs text-red-500">{errors.sortBy}</p>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Choose First</label>
        <input
          type="text"
          placeholder="Ex: *100"
          className={`rounded border p-2 text-sm ${
            errors.chooseFirst ? "border-red-500" : ""
          }`}
          value={formData.chooseFirst}
          onChange={(e) => handleInputChange("chooseFirst", e.target.value)}
        />
        {errors.chooseFirst && (
          <p className="text-xs text-red-500">{errors.chooseFirst}</p>
        )}
      </div>
      <div className="flex items-end space-x-2">
        <button
          className="rounded border p-2 text-sm"
          onClick={() =>
            setFormData({
              orderDateRange: "",
              joiningDateRange: "",
              customerStatus: "",
              sortBy: "",
              chooseFirst: "",
            })
          }
        >
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
