'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import AsyncSelect from 'react-select/async';
import Image from 'next/image';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { toast } from 'react-toastify';
import { useLazyGetProductsQuery } from '@/redux/services/admin/adminProductApis';
import baseApi from '@/redux/baseApi';

export const bagBannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBagBanners: build.query<any, void>({
      query: () => '/admin/bag/banner',
    }),
    createOrUpdateBagBanners: build.mutation<any, FormData>({
      query: (formData) => ({
        url: '/admin/bag/banner/create',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useGetBagBannersQuery, useCreateOrUpdateBagBannersMutation } = bagBannerApi;

export default function BagBanner() {
  const [productId, setProductId] = useState('');
  const [bannerType, setBannerType] = useState('');
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [thumbAlt, setThumbAlt] = useState('');
  const [thumbImage, setThumbImage] = useState<File | null>(null);
  const [previewThumb, setPreviewThumb] = useState<string | null>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const { data: bannersData = [], refetch } = useGetBagBannersQuery();
  const [createOrUpdateBanner, { isLoading }] = useCreateOrUpdateBagBannersMutation();
  const [triggerGetProducts] = useLazyGetProductsQuery();

  const loadProductOptions = useCallback(
    async (inputValue: string) => {
      if (!inputValue) return [];
      try {
        const result = await triggerGetProducts({ search: inputValue }).unwrap();
        return (result?.data || []).map((p: any) => ({ value: p.id, label: p.title }));
      } catch (error) {
        console.error('Failed to load products', error);
        return [];
      }
    },
    [triggerGetProducts]
  );

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!title || !shortDescription || !thumbAlt || !bannerType || !productId || !thumbImage) {
      return toast.error('Please fill all fields and upload an image.');
    }

    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('type', bannerType);
    formData.append('title', title);
    formData.append('description', shortDescription);
    formData.append('alt', thumbAlt);
    if (thumbImage) formData.append('image', thumbImage);

    try {
      await createOrUpdateBanner(formData).unwrap();
      toast.success('Banner saved successfully!');
      refetch();
      setProductId('');
      setBannerType('');
      setTitle('');
      setShortDescription('');
      setThumbAlt('');
      setThumbImage(null);
      setPreviewThumb(null);
      if (thumbInputRef.current) thumbInputRef.current.value = '';
    } catch (error) {
      console.log(error);
      toast.error('Failed to save banner.');
    }
  };

  return (
    <div>
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold">Add Banner For Landing Page</h2>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-[50px] w-full">
            <AsyncSelect
              cacheOptions
              loadOptions={loadProductOptions}
              onChange={(option: any) => setProductId(option?.value || '')}
              placeholder="Select Product"
              isClearable
            />
          </div>
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            placeholder="Short Description"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />

          <select
            value={bannerType}
            onChange={(e) => setBannerType(e.target.value)}
            className="h-[50px] w-full rounded border border-gray-300 px-3"
          >
            <option value="">Select Banner Type</option>
            <option value="casual">Casual Bag</option>
            <option value="premium">Premium Bag</option>
          </select>
        </div>

        <div className="mt-5">
          <Input
            placeholder="Thumbnail Alt Tag"
            value={thumbAlt}
            onChange={(e) => setThumbAlt(e.target.value)}
            className="mb-2"
          />
          <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed">
            {previewThumb ? (
              <div className="relative h-full w-full">
                <Image
                  src={previewThumb}
                  alt="Thumbnail"
                  className="h-full w-full object-contain py-3"
                  width={300}
                  height={300}
                />
                <button
                  type="button"
                  onClick={() => {
                    setThumbImage(null);
                    setPreviewThumb(null);
                    if (thumbInputRef.current) thumbInputRef.current.value = '';
                  }}
                  className="absolute right-2 top-2 bg-red-500 px-2 py-1 text-xs text-white"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Image src="/images/icon/icon-image.png" width={30} height={30} alt="upload" />
                <p className="mt-2 text-sm text-gray-500">Upload Thumbnail Image</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImage(e, setThumbImage, setPreviewThumb)}
              ref={thumbInputRef}
              className="hidden"
            />
          </label>
        </div>

        <div className="mt-6">
          <Button onClick={handleSubmit} disabled={isLoading}>
            Submit
          </Button>
        </div>
      </div>

      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Banner List</h2>
        {bannersData?.data?.length === 0 ? (
          <p>No banners found.</p>
        ) : (
          <div className="grid gap-4">
            {bannersData?.data?.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col items-start justify-between rounded-lg border p-4 md:flex-row md:items-center"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-sm text-gray-600">
                      {item.type === 'casual'
                        ? 'Casual Bag'
                        : item.type === 'premium'
                          ? 'Premium Bag'
                          : item.type}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
