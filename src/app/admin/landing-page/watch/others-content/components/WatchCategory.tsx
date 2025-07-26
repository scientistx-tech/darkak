'use client';

import React, { useRef, useState } from 'react';
import AsyncSelect from 'react-select/async';
import Image from 'next/image';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

export default function WatchCategory() {
  const [form, setForm] = useState({
    title: '',
    alt: '',
    subCategory: '',
  });

  const [topImg, setTopImg] = useState<File | null>(null);
  const [topPreview, setTopPreview] = useState<string | null>(null);
  const topRef = useRef<HTMLInputElement>(null);

  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

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

  const loadOptions = async (inputValue: string) => {
    const results = [
      { value: 'luxury', label: 'Luxury Watches' },
      { value: 'sports', label: 'Sports Watches' },
    ];

    return results.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const handleSubmit = () => {
    const newCategory = {
      title: form.title,
      alt: form.alt,
      subCategory: form.subCategory,
      image: topPreview,
    };

    if (editIndex !== null) {
      const updated = [...categoryList];
      updated[editIndex] = newCategory;
      setCategoryList(updated);
      setEditIndex(null);
    } else {
      setCategoryList([...categoryList, newCategory]);
    }

    // Clear form
    setForm({ title: '', alt: '', subCategory: '' });
    setTopImg(null);
    setTopPreview(null);
    if (topRef.current) topRef.current.value = '';
  };

  const handleEdit = (index: number) => {
    const item = categoryList[index];
    setForm({
      title: item.title,
      alt: item.alt,
      subCategory: item.subCategory,
    });
    setTopPreview(item.image);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const filtered = categoryList.filter((_, i) => i !== index);
    setCategoryList(filtered);
    // Reset form if editing the deleted one
    if (editIndex === index) {
      setEditIndex(null);
      setForm({ title: '', alt: '', subCategory: '' });
      setTopPreview(null);
    }
  };

  return (
    <div>
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold">Add Watch Sub Category For Landing Page</h2>

        <div className="mt-5">
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-1">
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              onChange={(option: any) => {
                setForm((prev) => ({ ...prev, subCategory: option?.value || '' }));
              }}
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
              {editIndex !== null ? 'Update Category' : 'Submit Category'}
            </Button>
          </div>
        </div>
      </div>

      {/* Category List Section */}
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Watch Category List</h2>

        <div className="space-y-4">
          {categoryList.length === 0 ? (
            <p className="text-gray-500">No categories added yet.</p>
          ) : (
            categoryList.map((item, index) => (
              <div
                key={index}
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
                    <p className="text-sm text-gray-500">Sub: {item.subCategory}</p>
                  </div>
                </div>
                <div className="flex gap-2">
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
