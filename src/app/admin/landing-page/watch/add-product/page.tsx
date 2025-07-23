'use client';

import React, { useState, useRef } from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Image from 'next/image';
import AsyncSelect from 'react-select/async';

export default function AddProductPage() {
  const [productId, setProductId] = useState('');
  const [shortTitle, setShortTitle] = useState('');

  const [thumbImage, setThumbImage] = useState<File | null>(null);
  const [thumbAlt, setThumbAlt] = useState('');
  const [previewThumb, setPreviewThumb] = useState<string | null>(null);

  const [additionalImage, setAdditionalImage] = useState<File | null>(null);
  const [additionalAlt, setAdditionalAlt] = useState('');
  const [previewAdditional, setPreviewAdditional] = useState<string | null>(null);

  const thumbInputRef = useRef<HTMLInputElement>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  const loadProductOptions = async (inputValue: string) => {
    return [
      { value: '1', label: 'Luxury Watch' },
      { value: '2', label: 'Sport Watch' },
      { value: '3', label: 'Smart Watch' },
    ].filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log({
      productId,
      shortTitle,
      thumbImage,
      thumbAlt,
      additionalImage,
      additionalAlt,
    });
    alert('Submitted! Check console.');
  };

  return (
    <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Add Product Info</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="h-[50px] w-full">
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

        <Input
          placeholder="Short Title"
          value={shortTitle}
          onChange={(e) => setShortTitle(e.target.value)}
        />
      </div>

      {/* Thumbnail Upload */}
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
                  setThumbImage(null);
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
            onChange={(e) => handleImage(e, setThumbImage, setPreviewThumb)}
            ref={thumbInputRef}
            className="hidden"
          />
        </label>
      </div>

      {/* Additional Image Upload */}
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
                  setAdditionalImage(null);
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
            onChange={(e) => handleImage(e, setAdditionalImage, setPreviewAdditional)}
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
