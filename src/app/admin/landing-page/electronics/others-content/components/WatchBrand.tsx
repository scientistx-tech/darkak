'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import AsyncSelect from 'react-select/async';
import Button from '../../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useAddWatchBrandMutation,
  useDeleteWatchBrandMutation,
  useGetWatchBrandsQuery,
  useUpdateWatchBrandMutation,
} from './adminElectronicsBrandApis';

export default function WatchBrand() {
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [brandImage, setBrandImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: brandList, refetch } = useGetWatchBrandsQuery({});
  const [addWatchBrand] = useAddWatchBrandMutation();
  const [updateWatchBrand] = useUpdateWatchBrandMutation();
  const [deleteWatchBrand] = useDeleteWatchBrandMutation();
  const token = useSelector((state: any) => state.auth.token);

  const resetForm = () => {
    setSelectedBrand(null);
    setBrandImage(null);
    setPreview(null);
    setEditId(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleAddOrUpdate = async () => {
    if (!selectedBrand) return toast.error('Please select a brand');

    const formData = { brandId: selectedBrand.value };

    const toastId = toast.loading(editId ? 'Updating...' : 'Adding...');

    try {
      if (editId) {
        await updateWatchBrand({ id: editId, formData }).unwrap();
        toast.update(toastId, {
          render: 'Brand updated successfully',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        await addWatchBrand(formData).unwrap();
        toast.update(toastId, {
          render: 'Brand added successfully',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });
      }
      resetForm();
      refetch();
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.data?.message || 'Operation failed',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async (id: number) => {
    const toastId = toast.loading('Deleting...');
    try {
      await deleteWatchBrand(id).unwrap();
      toast.update(toastId, {
        render: 'Brand deleted',
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

  const loadBrandOptions = async (inputValue: string) => {
    const res = await fetch(
      `https://api.darkak.com.bd/api/admin/brand/get?search=${inputValue || ''}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();
    return json.data.map((item: any) => ({
      value: item.id,
      label: item.title,
    }));
  };

  return (
    <div>
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Add Electronics Brand</h2>

        <div className="grid grid-cols-1 gap-4">
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadBrandOptions}
            value={selectedBrand}
            onChange={(option) => setSelectedBrand(option)}
            placeholder="Select Brand"
            isClearable
            styles={{
              container: (base) => ({ ...base, height: '50px' }),
              control: (base) => ({ ...base, height: '50px' }),
            }}
          />

          <Button onClick={handleAddOrUpdate}>{editId ? 'Update Brand' : 'Add Brand'}</Button>
        </div>
      </div>

      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h3 className="text-md mb-2 font-semibold">Brand List</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {brandList?.data?.map((brand: any) => (
            <div
              key={brand.id}
              className="relative rounded-lg border p-4 shadow transition hover:shadow-lg"
            >
              <Image
                src={brand.brand?.icon || '/fallback.jpg'}
                alt={brand.brand?.name}
                width={400}
                height={400}
                className="mb-2 h-24  object-contain"
              />
              <p className="text-center font-medium">{brand.brand?.name}</p>
              <div className="absolute right-2 top-2 flex gap-2">
                <button
                  onClick={() => handleDelete(brand.id)}
                  className="aspect-square h-8 w-8 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
