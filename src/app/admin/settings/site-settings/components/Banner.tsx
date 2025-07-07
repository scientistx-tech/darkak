'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useGetProductsQuery, useUploadImagesMutation } from '@/redux/services/admin/adminProductApis';
import { useUpdatePageBannerMutation } from '@/redux/services/admin/adminBannerApi';
// import { useUploadImagesMutation } from '@/redux/services/admin/adminProductApis';
// import { useCreateBannerMutation } from '@/redux/services/admin/adminBannerApis'; // <- You create this API

type BannerFormData = {
  type: string;
  title: string;
  details: string;
  image: string;
  productId:string
};
type Props = {
  onSuccess: () => void;
};
const BannerForm = ({ onSuccess }: Props) => {
  const queryParams = { limit: "1000" }; // Adjust as needed
  const {
    data: productData,
    isLoading: loadingProducts,
    error: productError,
  } = useGetProductsQuery(queryParams);
  console.log('Product data = ', productData);
  const [formData, setFormData] = useState<BannerFormData>({
    type: 'featured',
    title: '',
    details: '',
    image: '',
    productId: ' ',
  });

  const [imageUploading, setImageUploading] = useState(false);

  const [uploadImages] = useUploadImagesMutation();
  const [updateBanner] = useUpdatePageBannerMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'productId' ? Number(value) : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      setImageUploading(true);
      const imgForm = new FormData();
      imgForm.append('images', files[0]);
      const res = await uploadImages(imgForm).unwrap();
      const url = res[0];
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      const res = await updateBanner(formData).unwrap();
      toast.success(res?.message || 'Banner created successfully!');
      // ✅ Reset form
      setFormData({
        type: 'featured',
        title: '',
        details: '',
        image: '',
        productId: '',
      });

      // ✅ Call onSuccess to close modal
      onSuccess();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create banner.');
    }
  };

  return (
    <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="block text-sm font-medium">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="featured">Featured</option>
          <option value="most_visited"> Most visited</option>
          <option value="best_selling">Best Selling</option>
          <option value="new_arrival">New Arrival</option>
          <option value="todays_deal">Todays Deal</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium">Details</label>
        <textarea
          name="details"
          rows={4}
          value={formData.details}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* product Id */}
      <div>
        <label className="block text-sm font-medium">Select Product</label>
        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a product</option>
          {loadingProducts && <option>Loading products...</option>}
          {productError && <option>Error loading products</option>}
          {productData?.data?.map((product: any) => (
            <option key={product.id} value={product.id}>
              {product.title}
            </option>
          ))}
        </select>
      </div>

      {/* Image Upload */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Banner Image <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1 flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed hover:bg-gray-50">
          <input
            type="file"
            accept="image/*"
            name="image"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => handleImageUpload(e)}
          />
          <div className="relative z-10 text-center text-sm text-gray-500">
            {formData.image ? (
              <div className="flex flex-row items-center gap-2">
                <Image
                  className="rounded object-cover"
                  src={formData.image}
                  alt="Banner"
                  width={150}
                  height={150}
                  priority
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData((prev) => ({ ...prev, image: '' }));
                  }}
                  className="mt-2 rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="text-blue-600">{imageUploading ? 'Uploading...' : 'Click to upload'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={imageUploading}
          className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Create Banner
        </button>
      </div>
    </form>
  );
};

export default BannerForm;
