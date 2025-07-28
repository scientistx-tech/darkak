'use client';

import React, { useRef, useState } from 'react';
import AsyncSelect from 'react-select/async';
import Image from 'next/image';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useCreateWatchCategoryMutation,
  useDeleteWatchCategoryMutation,
  useGetWatchCategoriesQuery,
  useUpdateWatchCategoryMutation,
} from './adminWatchCategoryApis';
import Loader from '@/components/shared/Loader';

export default function WatchCategory() {
  const token = useSelector((state: any) => state.auth.token);

  const [form, setForm] = useState({
    title: '',
    alt: '',
    subCategory: '',
  });

  const [topImg, setTopImg] = useState<File | null>(null);
  const [topPreview, setTopPreview] = useState<string | null>(null);
  const topRef = useRef<HTMLInputElement>(null);

  const [editId, setEditId] = useState<number | null>(null);

  const { data: categoryData, isLoading, refetch } = useGetWatchCategoriesQuery({});
  const [addWatchCategory] = useCreateWatchCategoryMutation();
  const [editWatchCategory] = useUpdateWatchCategoryMutation();
  const [deleteWatchCategory] = useDeleteWatchCategoryMutation();
  const [subCategory, setSubCategory] = useState<any>();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: (file: File | null) => void,
    setPreview: (url: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setForm({ title: '', alt: '', subCategory: '' });
    setTopImg(null);
    setTopPreview(null);
    setEditId(null);
    setSubCategory(undefined);
    if (topRef.current) topRef.current.value = '';
  };

  const loadSubCategoryOptions = async (inputValue: string) => {
    const res = await fetch(
      `https://api.darkak.com.bd/api/admin/category/sub-category?search=${inputValue}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();
    return json?.data?.map((item: any) => ({
      value: item.id,
      label: item.title,
    }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.subCategory) {
      toast.error('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('alt', form.alt);
    formData.append('subCategoryId', form.subCategory);
    if (topImg) formData.append('image', topImg);
    const toastId = toast.loading(editId ? 'Updating...' : 'Submitting...');
    try {
      if (editId === null) {
        await addWatchCategory(formData).unwrap();
        toast.update(toastId, {
          render: 'Category added',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        await editWatchCategory({ id: editId, data: formData }).unwrap();
        toast.update(toastId, {
          render: 'Category updated',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });
      }
      refetch();
      resetForm();
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.data?.message || 'Something went wrong',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleEdit = (item: any) => {
    setForm({
      title: item.title,
      alt: item.alt,
      subCategory: item.subCategoryId,
    });
    setSubCategory({ label: item?.subCategory?.title, value: item.subCategoryId });
    setTopPreview(item.image); // image already uploaded
    setEditId(item.id); // for conditional update
    window?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    const toastId = toast.loading('Deleting category...');

    try {
      await deleteWatchCategory(id).unwrap();
      toast.update(toastId, {
        render: 'Category deleted',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
      if (editId === id) resetForm();
      refetch();
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.data?.message || 'Delete failed',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  };
  if (isLoading) return <Loader />;
  return (
    <div>
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold">Add Watch Sub Category For Landing Page</h2>

        <div className="mt-5">
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-1">
            <AsyncSelect
              cacheOptions
              loadOptions={loadSubCategoryOptions}
              onChange={(option: any) => {
                setForm((prev) => ({ ...prev, subCategory: option?.value || '' }));
                setSubCategory(option);
              }}
              value={subCategory}
              placeholder="Select Sub Category"
              isClearable
              styles={{
                container: (base) => ({ ...base, height: '50px' }),
                control: (base) => ({ ...base, height: '50px' }),
              }}
            />

            <Input
              label="Title"
              name="title"
              value={form.title}
              onChange={handleTextChange}
              placeholder="Enter Top Title"
            />
          </div>

          <div className="mt-6">
            <Input
              label="Image Alt Text"
              name="alt"
              value={form.alt}
              onChange={handleTextChange}
              placeholder="Enter Alt Tag"
              className="mb-2"
            />

            <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-50">
              {topPreview ? (
                <div className="relative h-full w-full">
                  <Image
                    src={topPreview}
                    alt="Category Image"
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

          <div className="mt-5">
            <Button onClick={handleSubmit}>
              {editId !== null ? 'Update Category' : 'Submit Category'}
            </Button>
          </div>
        </div>
      </div>

      {/* Category List Section */}
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Watch Category List</h2>

        <div className="space-y-4">
          {categoryData?.data?.length === 0 ? (
            <p className="text-gray-500">No categories added yet.</p>
          ) : (
            categoryData?.data?.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded border p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={60}
                      height={60}
                      className="rounded object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">Sub: {item.subCategoryId}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
