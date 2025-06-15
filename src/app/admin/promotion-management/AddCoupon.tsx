import {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetSubSubCategoriesQuery,
} from "@/redux/services/admin/adminCategoryApis";
import {
  useCreateCuponMutation,
  useUpdateCouponMutation,
} from "@/redux/services/admin/adminCuponApis";
import { useGetCustomersListQuery } from "@/redux/services/admin/adminCustomerList";
import { useGetAllVendorsQuery } from "@/redux/services/admin/adminVendorApis";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import Image from "next/image";

const couponTypes = ["on-purchase", "free-delivery", "first-order"];
const couponBearers = ["admin", "vendor"];
const vendors = ["Vendor A", "Vendor B"]; // replace with API data
const customers = ["Customer A", "Customer B", "Customer C", "Customer D"]; // replace with API data
const discountTypes = ["flat", "percentage"];

const generateCode = () => Math.random().toString(36).substring(2, 12);

type FormDataType = {
  couponType: string;
  title: string;
  code: string;
  bearer: string;
  vendor: string;
  customer: number[];
  limit: string;
  totalLimit: string;
  appliedLevel: string;
  categoryId?: string;
  subCategoryId?: string;
  subSubCategoryId?: string;
  discountType: string;
  discountAmount: string;
  minPurchase: string;
  startDate: string;
  endDate: string;
};

const AddCoupon = ({
  isEditable,
  refetch,
}: {
  isEditable: {
    status: boolean;
    value: {};
  };
  setIsEditable: ({ status, value }: { status: boolean; value: {} }) => void;
  refetch: () => void;
}) => {
  const [formData, setFormData] = useState<FormDataType>({
    couponType: "",
    title: "",
    code: generateCode(),
    bearer: "",
    vendor: "",
    customer: [],
    limit: "",
    totalLimit: "",
    appliedLevel: "",
    categoryId: "",
    subCategoryId: "",
    subSubCategoryId: "",
    discountType: "Amount",
    discountAmount: "",
    minPurchase: "",
    startDate: "",
    endDate: "",
  });

  const [selectedAppliedLevel, setSelectedAppliedLevel] = useState<string>("");

  // redux hooks
  const {
    data: vendorsData,
    isLoading: loadingVendors,
    error: errorVendors,
    refetch: refetchVendors,
  } = useGetAllVendorsQuery({});
  const { data: customersData } = useGetCustomersListQuery({});
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useGetCategoriesQuery({});

  const {
    data: subCategoriesData,
    isLoading: isSubCategoriesLoading,
    error: subCategoriesError,
    refetch: refetchSubCategories,
  } = useGetSubCategoriesQuery({});
  const {
    data: subSubCategoriesData,
    isLoading: isSubSubCategoriesLoading,
    error: subSubCategoriesError,
    refetch: refetchSubSubCategories,
  } = useGetSubSubCategoriesQuery({});
  const [createCupon] = useCreateCuponMutation();
  const [updateCoupon] = useUpdateCouponMutation();

  useEffect(() => {
    if (isEditable.status && isEditable.value) {
      const doc = isEditable.value as any;
      setFormData({
        couponType: doc.type || "",
        title: doc.title || "",
        code: doc.code || generateCode(),
        bearer: doc.bearer === "admin" ? "admin" : "vendor",
        vendor: doc.sellerId ? String(doc.sellerId) : "",
        customer: Array.isArray(doc.coupon_user)
          ? doc.coupon_user.map((cu: any) => cu.userId)
          : [],
        limit: doc.limit ? String(doc.limit) : "",
        totalLimit: doc.use_limit ? String(doc.use_limit) : "",
        appliedLevel: doc.categoryId
          ? "category"
          : doc.subCategoryId
            ? "subCategory"
            : doc.subSubCategoryId
              ? "subSubCategory"
              : "",
        categoryId: doc.categoryId ? String(doc.categoryId) : "",
        subCategoryId: doc.subCategoryId ? String(doc.subCategoryId) : "",
        subSubCategoryId: doc.subSubCategoryId
          ? String(doc.subSubCategoryId)
          : "",
        discountType: doc.discount_type || "Amount",
        discountAmount: doc.discount_amount ? String(doc.discount_amount) : "",
        minPurchase: doc.min_purchase ? String(doc.min_purchase) : "",
        startDate: doc.start_date ? doc.start_date.slice(0, 10) : "",
        endDate: doc.end_date ? doc.end_date.slice(0, 10) : "",
      });
    }
    // eslint-disable-next-line
  }, [isEditable]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e.target.name === "customer") {
      const selected = Array.from(
        (e.target as HTMLSelectElement).selectedOptions,
      ).map((opt) => opt.value);
      setFormData({ ...formData, customer: selected.map(Number) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: { [key: string]: any } = {
      type: formData.couponType,
      title: formData.title,
      code: formData.code,
      bearer: formData.bearer === "admin" ? "admin" : "seller",
      limit: formData.limit,
      use_limit: formData.totalLimit,
      discount_type: formData.discountType,
      discount_amount: formData.discountAmount
        ? Number(formData.discountAmount)
        : 0,
      min_purchase: Number(formData.minPurchase),
      start_date: formData.startDate,
      end_date: formData.endDate,
    };

    if (formData.customer.length > 0) {
      payload.userIds = formData.customer;
    }

    if (formData.bearer === "vendor") {
      payload.sellerId = formData.vendor;
    }
    if (formData.appliedLevel === "category") {
      payload.categoryId = formData.categoryId;
    } else if (formData.appliedLevel === "subCategory") {
      payload.subCategoryId = formData.subCategoryId;
    } else {
      payload.subSubCategoryId = formData.subSubCategoryId;
    }

    console.log("payload", payload);
    try {
      if (isEditable.status) {
        const res = await updateCoupon(payload).unwrap();
        toast.success(res?.message || "Successfully Updated Cupon");
      } else {
        const res = await createCupon(payload).unwrap();
        toast.success(res?.message || "Successfully Create Cupon");
      }
      refetch();
      handleReset();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handleReset = () => {
    setFormData({
      couponType: "",
      title: "",
      code: generateCode(),
      bearer: "",
      vendor: "",
      customer: [],
      limit: "",
      totalLimit: "",
      appliedLevel: "",
      categoryId: "",
      subCategoryId: "",
      subSubCategoryId: "",
      discountType: "Amount",
      discountAmount: "",
      minPurchase: "",
      startDate: "",
      endDate: "",
    });
  };
  return (
    <div className="mt-5 flex flex-col gap-5 lg:flex-row">
      {/* form */}
      <div className="w-[70%]">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 rounded bg-white p-6 shadow md:grid-cols-3"
        >
          <div className="flex flex-col gap-1">
            <label>Coupon type</label>
            <select
              name="couponType"
              value={formData.couponType}
              onChange={handleChange}
              className="w-full rounded border p-2"
            >
              <option>Select coupon type</option>
              {couponTypes.map((type) => (
                <option className="capitalize" key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label>Coupon title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded border p-2"
              placeholder="Title"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>
              Coupon Code{" "}
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, code: generateCode() })
                }
                className="ml-2 text-blue-500"
              >
                Generate code
              </button>
            </label>
            <input
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Coupon bearer</label>
            <select
              name="bearer"
              value={formData.bearer}
              onChange={handleChange}
              className="w-full rounded border p-2"
            >
              <option>Select coupon bearer</option>
              {couponBearers.map((b) => (
                <option className="capitalize" key={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {formData.bearer === "vendor" && (
            <div className="flex flex-col gap-1">
              <label>Vendor</label>
              <select
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className="w-full rounded border p-2"
              >
                <option>Select vendor</option>
                {vendorsData?.vendors?.map((v: any) => (
                  <option key={v.id} value={v?.id}>
                    {v?.store_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label>Customer</label>
            <select
              name="customer"
              onChange={(e) => {
                const selected = e.target.value;
                if (selected && !formData.customer.includes(Number(selected))) {
                  setFormData({
                    ...formData,
                    customer: [...formData.customer, Number(selected)],
                  });
                }
              }}
              className="w-full rounded border p-2"
              value="" // prevent it from sticking to a value
            >
              <option value="">All</option>
              {customersData?.data?.map((c: any) => (
                <option key={c?.id} value={c?.id}>
                  {c?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label>Applied Level</label>
            <select
              name="appliedLevel"
              value={formData.appliedLevel}
              onChange={handleChange}
              className="w-full rounded border p-2"
            >
              <option>Select Applied Level</option>
              <option value="category">Category Level</option>
              <option value="subCategory">Sub Category Level</option>
              <option value="subSubCategory">Sub Sub Category Level</option>
            </select>
          </div>

          {formData.appliedLevel === "category" ? (
            <div className="flex flex-col gap-1">
              <label>Select Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full rounded border p-2"
              >
                <option>Select Category</option>
                {categoriesData?.data?.map((cat: any) => (
                  <option key={cat?.id} value={cat?.id}>
                    {cat?.title}
                  </option>
                ))}
              </select>
            </div>
          ) : formData.appliedLevel === "subCategory" ? (
            <div className="flex flex-col gap-1">
              <label>Select Sub Category</label>
              <select
                name="subCategoryId"
                value={formData.subCategoryId}
                onChange={handleChange}
                className="w-full rounded border p-2"
              >
                <option>Select Sub Category</option>
                {subCategoriesData?.data?.map((sCat: any) => (
                  <option key={sCat?.id} value={sCat?.id}>
                    {sCat?.title}
                  </option>
                ))}
              </select>
            </div>
          ) : formData.appliedLevel === "subSubCategory" ? (
            <div className="flex flex-col gap-1">
              <label>Sub Sub Category</label>
              <select
                name="subSubCategoryId"
                value={formData.subSubCategoryId}
                onChange={handleChange}
                className="w-full rounded border p-2"
              >
                <option>Select Sub Sub Category</option>
                {subSubCategoriesData?.data?.map((sSubCat: any) => (
                  <option key={sSubCat?.id} value={sSubCat?.id}>
                    {sSubCat?.title}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            ""
          )}

          <div className="flex flex-col gap-1">
            <label>Limit for same user</label>
            <input
              name="limit"
              value={formData.limit}
              onChange={handleChange}
              className="w-full rounded border p-2"
              placeholder="Ex: 10"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Total Use</label>
            <input
              name="totalLimit"
              value={formData.totalLimit}
              onChange={handleChange}
              className="w-full rounded border p-2"
              placeholder="Ex: 100"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Discount type</label>
            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              className="w-full rounded border p-2"
            >
              <option value="">Select Type</option>
              {discountTypes.map((type) => (
                <option className="capitalize" key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label>Discount Amount</label>
            <input
              name="discountAmount"
              value={formData.discountAmount}
              onChange={handleChange}
              className="w-full rounded border p-2"
              placeholder="Ex: 500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Minimum purchase ($)</label>
            <input
              name="minPurchase"
              value={formData.minPurchase}
              onChange={handleChange}
              className="w-full rounded border p-2"
              placeholder="Ex: 100"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Start date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Expire date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="col-span-1 mt-4 flex justify-end gap-2 md:col-span-3">
            <button
              type="button"
              onClick={handleReset}
              className="rounded bg-gray-200 px-4 py-2"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="w-[30%] rounded bg-white p-3 shadow-3">
        {/* affected customer */}
        <div className="">
          <h2 className="text-lg font-medium">Affected Customer List</h2>
          {formData.customer.length <= 0 ? (
            <p className="mt-3 font-medium">
              Coupon will applicable for all customers.
            </p>
          ) : (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.customer.map((id) => {
                const customer = customersData?.data?.find(
                  (c: any) => Number(c.id) === Number(id),
                );
                return (
                  <span
                    key={id}
                    className="flex items-center gap-1 rounded bg-gray-200 px-2 py-1 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={customer?.image || "/images/icon/icon_user.png"}
                        alt={`customer${id}`}
                        width={20}
                        height={20}
                      />
                      <p>{customer?.name || "Unknown"}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          customer: formData.customer.filter((c) => c !== id),
                        })
                      }
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* applied cat */}
      </div>
    </div>
  );
};

export default AddCoupon;
