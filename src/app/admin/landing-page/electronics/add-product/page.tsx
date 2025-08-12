'use client';

import React, { useState, useRef, useCallback } from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Image from 'next/image';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useLazyGetProductsQuery,
  useUploadImagesMutation,
} from '@/redux/services/admin/adminProductApis';
import { useCreateElectronicsProductMutation } from '../electronics-slider/adminElectronicsApis';

export default function AddProductPage() {
  const [productId, setProductId] = useState('');
  const [shortTitle, setShortTitle] = useState('');
  const [type, setType] = useState<'casual' | 'premium' | ''>('');

  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [thumbAlt, setThumbAlt] = useState('');
  const [previewThumb, setPreviewThumb] = useState<string | null>(null);

  const [additionalFile, setAdditionalFile] = useState<File | null>(null);
  const [additionalAlt, setAdditionalAlt] = useState('');
  const [previewAdditional, setPreviewAdditional] = useState<string | null>(null);

  const thumbInputRef = useRef<HTMLInputElement>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [triggerGetProducts] = useLazyGetProductsQuery();
  const [uploadImages] = useUploadImagesMutation();
  const [createProduct] = useCreateElectronicsProductMutation();

  const loadProductOptions = useCallback(
    async (inputValue: string) => {
      if (!inputValue) return [];

      try {
        const result = await triggerGetProducts({ search: inputValue }).unwrap();

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

  const handleImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File) => void,
    setPreview: (preview: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (
      !productId ||
      !shortTitle ||
      !thumbFile ||
      !thumbAlt ||
      !additionalFile ||
      !additionalAlt ||
      !type
    ) {
      toast.error('All fields are required.');
      return;
    }

    const toastId = toast.loading('Uploading images...');

    try {
      // Upload thumbnail image
      const thumbForm = new FormData();
      thumbForm.append('images', thumbFile);
      const thumbRes = await uploadImages(thumbForm).unwrap();
      const thumbnail = thumbRes[0];

      // Upload additional image
      const addForm = new FormData();
      addForm.append('images', additionalFile);
      const addRes = await uploadImages(addForm).unwrap();
      const additional = addRes[0];

      // Now send JSON product data
      const payload = {
        productId: Number(productId),
        title: shortTitle,
        type,
        thumbnail,
        thumbnail_alt: thumbAlt,
        additional,
        additional_alt: additionalAlt,
      };

      await createProduct(payload).unwrap();

      toast.update(toastId, {
        render: 'Product created successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      // Reset form
      setProductId('');
      setShortTitle('');
      setType('');
      setThumbFile(null);
      setThumbAlt('');
      setPreviewThumb(null);
      setAdditionalFile(null);
      setAdditionalAlt('');
      setPreviewAdditional(null);
      if (thumbInputRef.current) thumbInputRef.current.value = '';
      if (addInputRef.current) addInputRef.current.value = '';
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: 'Failed to create product!',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Add Electronics Product</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AsyncSelect
          cacheOptions
          loadOptions={loadProductOptions}
          onChange={(option: any) => setProductId(option?.value || '')}
          placeholder="Select Product"
          isClearable
          styles={{
            container: (base) => ({ ...base, height: '50px' }),
            control: (base) => ({ ...base, height: '50px' }),
          }}
        />
        <Input
          placeholder="Short Title"
          value={shortTitle}
          onChange={(e) => setShortTitle(e.target.value)}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'casual' | 'premium')}
          className="h-[50px] w-full rounded border border-gray-300 px-3"
        >
          <option value="">Select Type</option>
          <option value="casual">Everyday Use Electronics</option>
          <option value="premium">Travel & Adventure Electronics</option>
        </select>
      </div>

      {/* Thumbnail */}
      <div className="mt-6">
        <p className="mb-1 font-medium">Thumbnail Image</p>
        <Input
          placeholder="Thumbnail Alt Tag"
          value={thumbAlt}
          onChange={(e) => setThumbAlt(e.target.value)}
          className="mb-2"
        />
        <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-50">
          {previewThumb ? (
            <div className="relative h-full w-full">
              <Image
                src={previewThumb}
                alt="Thumbnail"
                className="h-full w-full rounded-lg object-contain py-3"
                width={300}
                height={300}
              />
              <button
                type="button"
                onClick={() => {
                  setThumbFile(null);
                  setPreviewThumb(null);
                  if (thumbInputRef.current) thumbInputRef.current.value = '';
                }}
                className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Image src="/images/icon/icon-image.png" width={30} height={30} alt="upload" />
              <p className="mt-2 text-sm text-gray-500">Upload Thumbnail Image</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageSelect(e, setThumbFile, setPreviewThumb)}
            ref={thumbInputRef}
            className="hidden"
          />
        </label>
      </div>

      {/* Additional */}
      <div className="mt-6">
        <p className="mb-1 font-medium">Additional Image</p>
        <Input
          placeholder="Additional Image Alt Tag"
          value={additionalAlt}
          onChange={(e) => setAdditionalAlt(e.target.value)}
          className="mb-2"
        />
        <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-50">
          {previewAdditional ? (
            <div className="relative h-full w-full">
              <Image
                src={previewAdditional}
                alt="Additional"
                className="h-full w-full rounded-lg object-contain py-3"
                width={300}
                height={300}
              />
              <button
                type="button"
                onClick={() => {
                  setAdditionalFile(null);
                  setPreviewAdditional(null);
                  if (addInputRef.current) addInputRef.current.value = '';
                }}
                className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Image src="/images/icon/icon-image.png" width={30} height={30} alt="upload" />
              <p className="mt-2 text-sm text-gray-500">Upload Additional Image</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageSelect(e, setAdditionalFile, setPreviewAdditional)}
            ref={addInputRef}
            className="hidden"
          />
        </label>
      </div>

      {/* Submit */}
      <div className="mt-6">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}
