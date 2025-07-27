'use client';

import React, { useRef, useState } from 'react';
import AsyncSelect from 'react-select/async';
import Image from 'next/image';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

export default function WatchBanner() {
  const [productId, setProductId] = useState('');
  const [bannerType, setBannerType] = useState('');
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [thumbAlt, setThumbAlt] = useState('');
  const [thumbImage, setThumbImage] = useState<File | null>(null);
  const [previewThumb, setPreviewThumb] = useState<string | null>(null);
  const [banners, setBanners] = useState<any[]>([]);

  const thumbInputRef = useRef<HTMLInputElement>(null);

  const loadProductOptions = async (inputValue: string) => {
    return [
      { value: '1', label: 'Luxury Watch' },
      { value: '2', label: 'Sport Watch' },
      { value: '3', label: 'Smart Watch' },
    ].filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const loadBannerOptions = async (inputValue: string) => {
    return [
      { value: '1', label: 'Casual Watch' },
      { value: '2', label: 'Premium Watch' },
    ].filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()));
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
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!title || !shortDescription || !previewThumb) {
      alert('Please fill all fields and upload an image.');
      return;
    }

    const newBanner = {
      id: Date.now(),
      productId,
      bannerType,
      title,
      shortDescription,
      thumbAlt,
      thumbImage: previewThumb,
    };

    setBanners((prev) => [...prev, newBanner]);

    // Reset fields
    setProductId('');
    setBannerType('');
    setTitle('');
    setShortDescription('');
    setThumbAlt('');
    setThumbImage(null);
    setPreviewThumb(null);
    if (thumbInputRef.current) thumbInputRef.current.value = '';
  };

  const handleDelete = (id: number) => {
    setBanners((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      {/* Form Section */}
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
              styles={{
                container: (base) => ({ ...base, height: '50px' }),
                control: (base) => ({ ...base, height: '50px' }),
              }}
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
          <div className="h-[50px] w-full">
            <AsyncSelect
              cacheOptions
              loadOptions={loadBannerOptions}
              onChange={(option: any) => setBannerType(option?.value || '')}
              placeholder="Select Banner"
              isClearable
              styles={{
                container: (base) => ({ ...base, height: '50px' }),
                control: (base) => ({ ...base, height: '50px' }),
              }}
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="mt-5">
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

        {/* Submit */}
        <div className="mt-6">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>

      {/* Banner List Section */}
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Banner List</h2>
        {banners.length === 0 ? (
          <p>No banners added yet.</p>
        ) : (
          <div className="grid gap-4">
            {banners.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between border rounded-lg p-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.thumbImage}
                    alt={item.thumbAlt}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.shortDescription}</p>
                    <p className="text-sm text-gray-600">{item.bannerType}</p>
                  </div>
                </div>
                <div className="mt-3 md:mt-0 flex gap-2">
                  <Button  onClick={() => alert('Edit Coming Soon')}>
                    Edit
                  </Button>
                  <Button className=" bg-red-500 hover:bg-red-600"  onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
