'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import AsyncSelect from 'react-select/async';
import Button from '../../../../components/Button';

interface Brand {
  name: string;
  image: string;
}

export default function WatchBrand() {
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandImage, setBrandImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAddBrand = () => {
    if (selectedBrand && preview) {
      const newBrand = {
        name: selectedBrand.label,
        image: preview,
      };
      setBrands([...brands, newBrand]);
      setSelectedBrand(null);
      setPreview(null);
      setBrandImage(null);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBrandImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDelete = (index: number) => {
    const updated = [...brands];
    updated.splice(index, 1);
    setBrands(updated);
  };

  const loadOptions = (inputValue: string, callback: any) => {
    const options = [
      { label: 'Rolex', value: 'rolex' },
      { label: 'Fossil', value: 'fossil' },
      { label: 'Casio', value: 'casio' },
      { label: 'Seiko', value: 'seiko' },
    ];

    const filtered = options.filter((opt) =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtered);
  };

  return (
    <div>
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Add Watch Brand</h2>

        <div className="grid grid-cols-1 gap-4">
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            value={selectedBrand}
            onChange={(option) => setSelectedBrand(option)}
            placeholder="Select Brand"
            isClearable
            styles={{
              container: (base) => ({ ...base, height: '50px' }),
              control: (base) => ({ ...base, height: '50px' }),
            }}
          />
        </div>

        <Button onClick={handleAddBrand} className="mt-4">
          Add Brand
        </Button>
      </div>

      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h3 className="text-md mb-2 font-semibold">Brand List</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="relative rounded-lg border p-4 shadow transition hover:shadow-lg"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                width={100}
                height={100}
                className="mb-2 h-24 w-24 object-contain"
              />
              <p className="text-center font-medium">{brand.name}</p>
              <button
                onClick={() => handleDelete(index)}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                title="Delete"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
