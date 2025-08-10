'use client';

import React, { useCallback, useRef, useState } from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Image from 'next/image';
import AsyncSelect from 'react-select/async';
import {
  useGetProductsQuery,
  useLazyGetProductsQuery,
} from '@/redux/services/admin/adminProductApis';
import {
  useCreateBagSliderMutation,
  useDeleteBagSliderMutation,
  useGetBagSlidersQuery,
  useUpdateBagSliderMutation,
} from './adminBagApis';

import { message, Spin } from 'antd';
import { toast } from 'react-toastify';

export default function BagSliderPage() {
  const [productId, setProductId] = useState('');
  const [productLabel, setProductLabel] = useState('');
  const [title, setTitle] = useState('');
  const [offerName, setOfferName] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: productData, isLoading: productLoading } = useGetProductsQuery(
    searchTerm ? { search: searchTerm } : {}
  );
  const { data: sliders = [], refetch, isLoading } = useGetBagSlidersQuery();
const [createSlider] = useCreateBagSliderMutation();
const [updateSlider] = useUpdateBagSliderMutation();
const [deleteSlider] = useDeleteBagSliderMutation();

  const [triggerGetProducts] = useLazyGetProductsQuery();

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setProductId('');
    setProductLabel('');
    setTitle('');
    setOfferName('');
    setImageAlt('');
    setImageFile(null);
    setPreviewImage(null);
    setEditIndex(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!productId || !title || !offerName || !imageAlt) {
      toast.error('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('title', title);
    formData.append('offer_name', offerName);
    formData.append('alt', imageAlt);
    if (imageFile) formData.append('image', imageFile);

    const toastId = toast.loading('Saving slider...');
    try {
      if (editIndex !== null) {
        const sliderId = sliders[editIndex].id;
        await updateSlider({ id: Number(sliderId), data: formData }).unwrap();
        toast.update(toastId, {
          render: 'Slider updated!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        await createSlider(formData).unwrap();
        toast.update(toastId, {
          render: 'Slider created!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
      }
      refetch();
      resetForm();
    } catch (err) {
      toast.update(toastId, {
        render: 'Failed to save slider!',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async (index: number) => {
    const id = sliders[index].id;
    const toastId = toast.loading('Deleting slider...');

    try {
      await deleteSlider(id).unwrap();
      toast.update(toastId, {
        render: 'Slider deleted!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
      refetch();
      if (editIndex === index) resetForm();
    } catch (err) {
      toast.update(toastId, {
        render: 'Delete failed!',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleEdit = (index: number) => {
    const item = sliders[index];
    setEditIndex(index);
    setProductId(item.product?.id?.toString() || '');
    setProductLabel(item.product?.title || '');
    setTitle(item.title);
    setOfferName(item.offer_name);
    setImageAlt(item.alt);
    setPreviewImage(item.image);
  };

  return (
    <div className="w-full">
      {/* Create/Edit Form */}
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          {editIndex !== null ? 'Edit' : 'Add'} Bag Slider
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-[50px] w-full">
            <AsyncSelect
              cacheOptions
              loadOptions={loadProductOptions}
              onChange={(option: any) => {
                setProductId(option?.value || '');
                setProductLabel(option?.label || '');
              }}
              placeholder="Select Product"
              isClearable
              value={productId ? { value: productId, label: productLabel } : null}
              styles={{
                container: (base) => ({ ...base, height: '50px' }),
                control: (base) => ({ ...base, height: '50px' }),
              }}
            />
          </div>
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input
            placeholder="Offer Name"
            value={offerName}
            onChange={(e) => setOfferName(e.target.value)}
          />
          <Input
            placeholder="Image Alt Tag"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div
          className="mt-6"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) {
              setImageFile(file);
              const reader = new FileReader();
              reader.onloadend = () => setPreviewImage(reader.result as string);
              reader.readAsDataURL(file);
            }
          }}
        >
          <label
            htmlFor="file-upload"
            className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-50"
          >
            {previewImage ? (
              <div className="relative h-full w-full">
                <Image
                  src={previewImage}
                  alt="Preview"
                  className="h-full w-full rounded-lg object-contain py-3"
                  width={300}
                  height={300}
                />
                <button
                  type="button"
                  onClick={resetForm}
                  className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Image width={30} height={30} src="/images/icon/icon-image.png" alt="image-icon" />
                <p className="mt-2 text-sm text-gray-500">
                  Drag and drop an image, or <span className="text-blue-500">Upload</span>
                </p>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
          </label>
        </div>

        <div className="mt-6">
          <Button onClick={handleSubmit}>{editIndex !== null ? 'Update' : 'Submit'}</Button>
        </div>
      </div>

      {/* Watch Slider List */}
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Bag Slider List</h2>

        <Spin spinning={isLoading}>
          {sliders.length === 0 ? (
            <p className="text-gray-500">No sliders added yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {sliders.map((item: any, index: number) => (
                <div
                  key={item.id}
                  className="relative rounded border p-4 shadow transition hover:shadow-md"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={300}
                    height={200}
                    className="mb-2 h-40 w-full rounded object-contain"
                  />
                  <div className="text-sm">
                    <p>
                      <strong>Title:</strong> {item.title}
                    </p>
                    <p>
                      <strong>Offer:</strong> {item.offer_name}
                    </p>
                    <p>
                      <strong>Alt:</strong> {item.alt}
                    </p>
                  </div>
                  <div className="mt-3 flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Spin>
      </div>
    </div>
  );
}
