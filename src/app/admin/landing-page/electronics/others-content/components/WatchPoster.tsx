'use client';

export const watchPosterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrUpdatePoster: builder.mutation({
      query: (data) => ({
        url: `/admin/electronics/poster/create`,
        method: 'POST',
        body: data,
      }),
    }),
    getPoster: builder.query({
      query: () => `/admin/electronics/poster`,
    }),
  }),
});

export const { useCreateOrUpdatePosterMutation, useGetPosterQuery } = watchPosterApi;

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Image from 'next/image';
import AsyncSelect from 'react-select/async';
import {
  useLazyGetProductsQuery,
  useUploadImagesMutation,
} from '@/redux/services/admin/adminProductApis';
import { toast } from 'react-toastify';
import baseApi from '@/redux/baseApi';
import Loader from '@/components/shared/Loader';

export default function WatchPoster() {
  const [productId, setProductId] = useState('');
  const [triggerGetProducts] = useLazyGetProductsQuery();
  const [createOrUpdatePoster] = useCreateOrUpdatePosterMutation();
  const [form, setForm] = useState({
    topTitle: '',
    topDesc: '',
    topAlt: '',
    posterTitle: '',
    posterDesc: '',
    posterAlt: '',
  });

  const loadProductOptions = useCallback(
    async (inputValue: string) => {
      if (!inputValue) return [];

      try {
        // Call the API with search term
        const result = await triggerGetProducts({ search: inputValue }).unwrap();

        // Map to select options format
        return (result?.data || []).map((p: any) => ({
          value: p.id,
          label: p.title,
        }));
      } catch (error) {
        console.error('Failed to load products', error);
        return [];
      }
    },
    [triggerGetProducts]
  );

  const [topImg, setTopImg] = useState<File | null>(null);
  const [topPreview, setTopPreview] = useState<string | null>(null);
  const topRef = useRef<HTMLInputElement>(null);
  const [posterImg, setPosterImg] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>();
  const posterRef = useRef<HTMLInputElement>(null);
  const [uploadImages] = useUploadImagesMutation();
  const {
    data: posterData,
    isLoading: loadingPoster,
    refetch,
  } = useGetPosterQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading('Uploading image...');

    try {
      setImage(file);

      const imgForm = new FormData();
      imgForm.append('images', file);

      const res = await uploadImages(imgForm).unwrap();
      const url = res[0];

      setPreview(url);

      toast.update(toastId, {
        render: 'Image uploaded successfully',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
    } catch (err: any) {
      console.error('Image upload failed', err);

      toast.update(toastId, {
        render: err?.data?.message || 'Image upload failed',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });

      // Optionally reset image/preview
      setImage(null);
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!productId) return toast.error('Please select a product.');
    if (!topPreview) return toast.error('Top image is required.');
    if (!posterPreview) return toast.error('Poster image is required.');

    const payload = {
      top_title: form.topTitle,
      top_description: form.topDesc,
      top_image: topPreview,
      top_alt: form.topAlt,
      poster_title: form.posterTitle,
      poster_description: form.posterDesc,
      poster_image: posterPreview,
      poster_alt: form.posterAlt,
      productId: Number(productId),
    };

    const toastId = toast.loading('Submitting poster...');

    try {
      await createOrUpdatePoster(payload).unwrap();

      toast.update(toastId, {
        render: 'Poster saved successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
      refetch();
      // Optional: Reset form
      setTopImg(null);
      setPosterImg(null);
      if (topRef.current) topRef.current.value = '';
      if (posterRef.current) posterRef.current.value = '';
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.data?.message || 'Failed to save poster',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  useEffect(() => {
    if (posterData) {
      setForm({
        topTitle: posterData.top_title || '',
        topDesc: posterData.top_description || '',
        topAlt: posterData.top_alt || '',
        posterTitle: posterData.poster_title || '',
        posterDesc: posterData.poster_description || '',
        posterAlt: posterData.poster_alt || '',
      });
      setSelectedProduct({ label: posterData.product.title, value: posterData.productId });
      setProductId(String(posterData.productId));
      setTopPreview(posterData.top_image);
      setPosterPreview(posterData.poster_image);
    }
  }, [posterData]);
  if (loadingPoster) return <Loader />;
  return (
    <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Electronics Poster Setup</h2>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <AsyncSelect
          cacheOptions
          loadOptions={loadProductOptions}
          onChange={(option: any) => {
            setProductId(option?.value || '');
            setSelectedProduct(option);
          }}
          placeholder="Select Product"
          isClearable
          value={selectedProduct}
          styles={{
            container: (base) => ({ ...base, height: '50px' }),
            control: (base) => ({ ...base, height: '50px' }),
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Top Title"
          name="topTitle"
          value={form.topTitle}
          onChange={handleTextChange}
          placeholder="Enter Top Title"
        />
        <Input
          label="Top Description"
          name="topDesc"
          value={form.topDesc}
          onChange={handleTextChange}
          placeholder="Enter Top Description"
        />
      </div>

      {/* Top Image */}
      <div className="mt-6">
        <Input
          label="Top Image Alt Text"
          name="topAlt"
          value={form.topAlt}
          onChange={handleTextChange}
          placeholder="Enter Alt Tag for Top Image"
          className="mb-2"
        />

        <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-50">
          {topPreview ? (
            <div className="relative h-full w-full">
              <Image
                src={topPreview}
                alt="Top Image"
                className="h-full w-full rounded-lg object-contain py-3"
                width={300}
                height={300}
              />
              <button
                type="button"
                onClick={() => {
                  setTopImg(null);
                  setTopPreview(null);
                  if (topRef.current) topRef.current.value = '';
                }}
                className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Image src="/images/icon/icon-image.png" width={30} height={30} alt="upload" />
              <p className="mt-2 text-sm text-gray-500">Upload Top Image</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e, setTopImg, setTopPreview)}
            ref={topRef}
            className="hidden"
          />
        </label>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Poster Title"
          name="posterTitle"
          value={form.posterTitle}
          onChange={handleTextChange}
          placeholder="Enter Poster Title"
        />
        <Input
          label="Poster Description"
          name="posterDesc"
          value={form.posterDesc}
          onChange={handleTextChange}
          placeholder="Enter Poster Description"
        />
      </div>

      {/* Poster Image */}
      <div className="mt-6">
        <Input
          label="Poster Image Alt Text"
          name="posterAlt"
          value={form.posterAlt}
          onChange={handleTextChange}
          placeholder="Enter Alt Tag for Poster Image"
          className="mb-2"
        />

        <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-50">
          {posterPreview ? (
            <div className="relative h-full w-full">
              <Image
                src={posterPreview}
                alt="Poster Image"
                className="h-full w-full rounded-lg object-contain py-3"
                width={300}
                height={300}
              />
              <button
                type="button"
                onClick={() => {
                  setPosterImg(null);
                  setPosterPreview(null);
                  if (posterRef.current) posterRef.current.value = '';
                }}
                className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Image src="/images/icon/icon-image.png" width={30} height={30} alt="upload" />
              <p className="mt-2 text-sm text-gray-500">Upload Poster Image</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e, setPosterImg, setPosterPreview)}
            ref={posterRef}
            className="hidden"
          />
        </label>
      </div>

      <div className="mt-6">
        <Button onClick={handleSubmit}>Submit Poster</Button>
      </div>
    </div>
  );
}
