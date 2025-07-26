'use client';

import React, { useRef, useState } from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Image from 'next/image';
import AsyncSelect from 'react-select/async';

interface WatchSliderItem {
  id: string;
  productLabel: string;
  title: string;
  offerName: string;
  imageAlt: string;
  image: string;
}

export default function WatchSliderPage() {
  const [productId, setProductId] = useState('');
  const [productLabel, setProductLabel] = useState('');
  const [title, setTitle] = useState('');
  const [offerName, setOfferName] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [sliders, setSliders] = useState<WatchSliderItem[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadProductOptions = async (inputValue: string) => {
    return [
      { value: '1', label: 'Luxury Watch' },
      { value: '2', label: 'Sport Watch' },
      { value: '3', label: 'Smart Watch' },
    ].filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

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

  const handleSubmit = () => {
    if (!productId || !title || !offerName || !imageAlt || !previewImage) return;

    const newItem: WatchSliderItem = {
      id: Date.now().toString(),
      productLabel,
      title,
      offerName,
      imageAlt,
      image: previewImage,
    };

    if (editIndex !== null) {
      const updated = [...sliders];
      updated[editIndex] = newItem;
      setSliders(updated);
    } else {
      setSliders([...sliders, newItem]);
    }

    resetForm();
  };

  const handleEdit = (index: number) => {
    const item = sliders[index];
    setEditIndex(index);
    setProductId(item.id);
    setProductLabel(item.productLabel);
    setTitle(item.title);
    setOfferName(item.offerName);
    setImageAlt(item.imageAlt);
    setPreviewImage(item.image);
  };

  const handleDelete = (index: number) => {
    const updated = [...sliders];
    updated.splice(index, 1);
    setSliders(updated);
    if (editIndex === index) resetForm();
  };

  return (
    <div className="w-full">
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          {editIndex !== null ? 'Edit' : 'Add'} Watch Slider
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

        {/* Image Uploader */}
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
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Watch Slider List</h2>

        {sliders.length === 0 ? (
          <p className="text-gray-500">No sliders added yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {sliders.map((item, index) => (
              <div
                key={item.id}
                className="relative rounded border p-4 shadow transition hover:shadow-md"
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={300}
                  height={200}
                  className="mb-2 h-40 w-full object-contain rounded"
                />
                <div className="text-sm">
                  <p>
                    <strong>Product:</strong> {item.productLabel}
                  </p>
                  <p>
                    <strong>Title:</strong> {item.title}
                  </p>
                  <p>
                    <strong>Offer:</strong> {item.offerName}
                  </p>
                  <p>
                    <strong>Alt:</strong> {item.imageAlt}
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
      </div>
    </div>
  );
}
