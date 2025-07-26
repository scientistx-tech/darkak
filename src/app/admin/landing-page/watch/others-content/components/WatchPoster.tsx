'use client';

import React, { useState, useRef } from 'react';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Image from 'next/image';
import AsyncSelect from 'react-select/async';

export default function WatchPoster() {
  const [productId, setProductId] = useState('');
  const [form, setForm] = useState({
    topTitle: '',
    topDesc: '',
    topAlt: '',
    posterTitle: '',
    posterDesc: '',
    posterAlt: '',
  });

  const loadProductOptions = async (inputValue: string) => {
    return [
      { value: '1', label: 'Luxury Watch' },
      { value: '2', label: 'Sport Watch' },
      { value: '3', label: 'Smart Watch' },
    ].filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const [topImg, setTopImg] = useState<File | null>(null);
  const [topPreview, setTopPreview] = useState<string | null>(null);
  const topRef = useRef<HTMLInputElement>(null);

  const [posterImg, setPosterImg] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const posterRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = () => {
    console.log({
      ...form,
      topImg,
      posterImg,
    });
    alert('Submitted! Check console for output.');
  };

  return (
    <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Watch Poster Setup</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
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
