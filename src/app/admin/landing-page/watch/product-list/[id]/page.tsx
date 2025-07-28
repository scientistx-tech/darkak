'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useLazyGetProductsQuery,
  useUploadImagesMutation,
} from '@/redux/services/admin/adminProductApis';
import {
  useGetWatchProductByIdQuery,
  useUpdateWatchProductMutation,
} from '../../watch-slider/watchSliderApi';
import Input from '@/app/admin/components/Input';
import { Button } from '@/components/ui-elements/button';
import { useParams } from 'next/navigation';
import Loader from '@/components/shared/Loader';

export default function AddProductPage() {
  const [productId, setProductId] = useState('');
  const [shortTitle, setShortTitle] = useState('');
  const [type, setType] = useState<'casual' | 'premium' | ''>('');
  const { id } = useParams();
  const { data, isLoading } = useGetWatchProductByIdQuery(id as string);

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
  const [createProduct] = useUpdateWatchProductMutation();
  const [selectedProduct, setSelectedProduct] = useState<any>();

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
    if (!productId || !shortTitle || !thumbAlt || !additionalAlt || !type) {
      toast.error('All fields are required.');
      return;
    }

    const toastId = toast.loading('Processing...');

    try {
      let thumbnail = undefined;
      let additional = undefined;

      // Upload thumbnail image if exists
      if (thumbFile) {
        const thumbForm = new FormData();
        thumbForm.append('images', thumbFile);
        const thumbRes = await uploadImages(thumbForm).unwrap();
        thumbnail = thumbRes[0];
      }

      // Upload additional image if exists
      if (additionalFile) {
        const addForm = new FormData();
        addForm.append('images', additionalFile);
        const addRes = await uploadImages(addForm).unwrap();
        additional = addRes[0];
      }

      // Build payload
      const payload: any = {
        productId: Number(productId),
        title: shortTitle,
        type,
        thumbnail_alt: thumbAlt,
        additional_alt: additionalAlt,
      };

      if (thumbnail) payload.thumbnail = thumbnail;
      if (additional) payload.additional = additional;

      await createProduct({ body: payload, id: id }).unwrap();

      toast.update(toastId, {
        render: 'Product update successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      if (thumbInputRef.current) thumbInputRef.current.value = '';
      if (addInputRef.current) addInputRef.current.value = '';
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: 'Failed to update product!',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (data) {
      const product = data.data;
      setProductId(product?.productId);
      setSelectedProduct({ label: product?.product?.title, value: product?.product?.id });
      setType(product?.type);
      setShortTitle(product?.title);
      setThumbAlt(product?.thumbnail_alt);
      setPreviewThumb(product?.thumbnail);
      setAdditionalAlt(product?.additional_alt);
      setPreviewAdditional(product?.additional);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Add Product Info</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        <Input
          placeholder="Short Title"
          value={shortTitle}
          onChange={(e: any) => setShortTitle(e.target.value)}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'casual' | 'premium')}
          className="h-[50px] w-full rounded border border-gray-300 px-3"
        >
          <option value="">Select Type</option>
          <option value="casual">Casual</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      {/* Thumbnail */}
      <div className="mt-6">
        <p className="mb-1 font-medium">Thumbnail Image</p>
        <Input
          placeholder="Thumbnail Alt Tag"
          value={thumbAlt}
          onChange={(e: any) => setThumbAlt(e.target.value)}
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
          onChange={(e: any) => setAdditionalAlt(e.target.value)}
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
        <Button label="Update" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
