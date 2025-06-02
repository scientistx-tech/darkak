import React, { useState } from "react";
import * as Yup from "yup";
import { DatePicker } from "./DatePicker";
import AsyncSelect from "react-select/async";
import { useGetProductsQuery } from "@/redux/services/admin/adminProductApis";
import { useGetCustomersListQuery } from "@/redux/services/admin/adminCustomerList";

interface ReviewFilterSectionProps {
  setQueryParams: ({}) => void;
}

export const ReviewFilterSection: React.FC<ReviewFilterSectionProps> = ({
  setQueryParams,
}) => {
  const [formData, setFormData] = useState({
    productId: "",
    userId: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [productId, setProductId] = useState("");

  const {
    data: productData,
    isLoading: productLoading,
    error,
    refetch: productRefetch,
  } = useGetProductsQuery(searchTerm ? { search: searchTerm } : {});
  const {
    data: customerList,
    isLoading: customerLoading,
    error: customerError,
    refetch: customerRefetch,
  } = useGetCustomersListQuery({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const loadProductOptions = async (inputValue: string) => {
    setSearchTerm(inputValue);
    // Wait for Redux to update productData
    return (productData?.data || [])
      .slice(0, 10)
      .map((p: any) => ({ value: p.id, label: p.title }));
  };

  const handleFilter = () => {
    // Filter out keys with empty string values
    const filteredParams = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== ""),
    );
    setQueryParams(filteredParams);
  };

  const handleReset = () => {
    setFormData({
      productId: "",
      userId: "",
      status: "",
      startDate: "",
      endDate: "",
    });
    setErrors({});
    setProductId("");
    setQueryParams({});
  };

  console.log(formData, "filter data");

  return (
    <div className="space-4 mb-4 grid w-full grid-cols-1 gap-2 rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="flex w-full flex-col space-y-1">
        <label className="text-sm font-medium">Product</label>
        <AsyncSelect
          cacheOptions
          defaultOptions={(productData?.data || [])
            .slice(0, 10)
            .map((p: any) => ({ value: p.id, label: p.title }))}
          loadOptions={loadProductOptions}
          value={
            productId
              ? {
                  value: productId,
                  label:
                    productData?.data?.find((p: any) => p.id === productId)
                      ?.title || "Selected Product",
                }
              : null
          }
          onChange={(option: any) => {
            setProductId(option?.value || "");
            handleInputChange("productId", option.value);
            if (!option) setSearchTerm("");
          }}
          placeholder="Select Product"
          isClearable
          className="w-full bg-gray-4"
          styles={{
            container: (base) => ({ ...base, height: "50px" }),
            control: (base) => ({ ...base, height: "50px" }),
          }}
        />
      </div>
      <div className="flex w-full flex-col space-y-1">
        <label className="text-sm font-medium">Customer</label>
        <select
          className={`h-[50px] rounded border p-2 text-sm ${errors.customer ? "border-red-500" : ""}`}
          value={formData.userId}
          onChange={(e) => handleInputChange("userId", e.target.value)}
        >
          <option value="">All customer</option>
          {customerList?.data?.map((customer: any, i: number) => (
            <option key={customer?.id} value={customer?.id}>
              {customer?.name}
            </option>
          ))}
        </select>
        {errors.customer && (
          <p className="text-xs text-red-500">{errors.customer}</p>
        )}
      </div>
      {/* <div className="flex w-full flex-col space-y-1">
        <label className="text-sm font-medium">Choose Status</label>
        <select
          className={`h-[50px] rounded border p-2 text-sm ${errors.status ? "border-red-500" : ""}`}
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
      </div> */}
      <div className="flex w-full flex-col space-y-1">
        <label className="text-sm font-medium">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={(e) => handleInputChange("startDate", e.target.value)}
          className={`h-[50px] rounded border p-2 text-sm ${errors.status ? "border-red-500" : ""}`}
        />
      </div>
      <div className="flex w-full flex-col space-y-1">
        <label className="text-sm font-medium">End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={(e) => handleInputChange("endDate", e.target.value)}
          className={`h-[50px] rounded border p-2 text-sm ${errors.status ? "border-red-500" : ""}`}
        />
      </div>

      <div className="flex items-end space-x-2">
        <button
          className="rounded border px-6 py-2 text-sm"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          onClick={handleFilter}
          className="rounded bg-blue-600 px-6 py-2 text-sm text-white"
        >
          Filter
        </button>
      </div>
    </div>
  );
};
