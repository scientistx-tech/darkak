"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const couponTypes = ["Percentage", "Fixed"];
const couponBearers = ["Admin", "Vendor"];
const vendors = ["Vendor A", "Vendor B"]; // replace with API data
const customers = ["Customer A", "Customer B", "Customer A", "Customer B"]; // replace with API data
const discountTypes = ["Amount", "Percentage"];

const generateCode = () => Math.random().toString(36).substring(2, 12);

const Page = () => {
  type FormDataType = {
    couponType: string;
    title: string;
    code: string;
    bearer: string;
    vendor: string;
    customer: string[];
    limit: string;
    discountType: string;
    discountAmount: string;
    minPurchase: string;
    startDate: string;
    endDate: string;
  };

  const [formData, setFormData] = useState<FormDataType>({
    couponType: "",
    title: "",
    code: generateCode(),
    bearer: "",
    vendor: "",
    customer: [],
    limit: "",
    discountType: "Amount",
    discountAmount: "",
    minPurchase: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e.target.name === "customer") {
      const selected = Array.from(
        (e.target as HTMLSelectElement).selectedOptions,
      ).map((opt) => opt.value);
      setFormData({ ...formData, customer: selected });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/coupons", formData);
      alert("Coupon created!");
    } catch (err) {
      alert("Error creating coupon");
    }
  };

  console.log("formda", formData);

  const handleReset = () => {
    setFormData({
      couponType: "",
      title: "",
      code: generateCode(),
      bearer: "",
      vendor: "",
      customer: [],
      limit: "",
      discountType: "Amount",
      discountAmount: "",
      minPurchase: "",
      startDate: "",
      endDate: "",
    });
  };
  return (
    <div className="text-slate-900">
      <div className="flex items-center gap-x-1">
        <Image
          src="/images/icon/icon_cupon.png"
          alt="cupon_icon"
          width={20}
          height={20}
        />
        <p className="text-xl font-bold">Cupon Setup</p>
      </div>

      {/* add / eidt form */}
      <div className="mt-5 flex flex-col gap-5 lg:flex-row">
        {/* form */}
        <div className="w-[70%]">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 rounded bg-white p-6 shadow md:grid-cols-3"
          >
            <div>
              <label>Coupon type</label>
              <select
                name="couponType"
                value={formData.couponType}
                onChange={handleChange}
                className="w-full rounded border p-2"
              >
                <option>Select coupon type</option>
                {couponTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Coupon title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded border p-2"
                placeholder="Title"
              />
            </div>

            <div>
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

            <div>
              <label>Coupon bearer</label>
              <select
                name="bearer"
                value={formData.bearer}
                onChange={handleChange}
                className="w-full rounded border p-2"
              >
                <option>Select coupon bearer</option>
                {couponBearers.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Vendor</label>
              <select
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className="w-full rounded border p-2"
              >
                <option>Select vendor</option>
                {vendors.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Customer</label>
              <select
                name="customer"
                // multiple
                value={formData.customer}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map(
                    (opt) => opt.value,
                  );
                  setFormData({ ...formData, customer: selected });
                }}
                className="w-full rounded border p-2"
                // size={Math.max(3, customers.length)} // dropdown height, optional
              >
                {customers.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Limit for same user</label>
              <input
                name="limit"
                value={formData.limit}
                onChange={handleChange}
                className="w-full rounded border p-2"
                placeholder="Ex: 10"
              />
            </div>

            <div>
              <label>Discount type</label>
              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className="w-full rounded border p-2"
              >
                {discountTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Discount Amount</label>
              <input
                name="discountAmount"
                value={formData.discountAmount}
                onChange={handleChange}
                className="w-full rounded border p-2"
                placeholder="Ex: 500"
              />
            </div>

            <div>
              <label>Minimum purchase ($)</label>
              <input
                name="minPurchase"
                value={formData.minPurchase}
                onChange={handleChange}
                className="w-full rounded border p-2"
                placeholder="Ex: 100"
              />
            </div>

            <div>
              <label>Start date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
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
          <h2 className="text-lg font-medium">Affected Customer List</h2>
        </div>
      </div>

      {/* data table */}
      <div className="mt-10 rounded-lg bg-white p-6 shadow-md">
        {/* button */}
        <div className="flex items-center justify-between">
          <span>Cupon List 21</span>
          <div>
            <input
              type="text"
              placeholder="Search by title or Cupon code"
              className="w-fit rounded-md border-2 border-gray-3 px-6 py-2 outline-none"
            />
          </div>
        </div>

        <div className="my-8 text-slate-900">
          <Table>
            <TableHeader>
              <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
                <TableHead>SL</TableHead>
                <TableHead>Cupon</TableHead>
                <TableHead>Cupon Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>User Limit</TableHead>
                <TableHead>Discount Bearer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* <TableBody>
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <Skeleton className="h-8" />
                    </TableCell>
                  </TableRow>
                ))}

              {!isLoading && data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No scripts found.
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((doc: any) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc?.name}</TableCell>
                    <TableCell>{doc?.type}</TableCell>
                    <TableCell>{doc?.location}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          doc?.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {doc?.active ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(doc?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            router.push(
                              `/admin/analytics/edit-script/${doc.id}`,
                            );
                          }}
                          disabled={isDeleting}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            await deleteScript(doc.id)
                              .unwrap()
                              .then(() => refetch())
                              .catch((error) => {
                                console.error("Failed to delete script", error);
                              });
                          }}
                          disabled={isDeleting}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody> */}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
