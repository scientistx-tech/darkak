'use client';

import React, { useState } from 'react';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { toast } from 'react-toastify';
import {
  useCreateTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetTestimonialsQuery,
  useUpdateTestimonialMutation,
} from './adminTestimonialApis';

export default function BagTestimonial() {
  const [form, setForm] = useState({
    rating: 5,
    text: '',
    name: '',
    address: '',
  });
  const [editId, setEditId] = useState<number | null>(null);

  const { data, refetch, isLoading } = useGetTestimonialsQuery(undefined);
  const [createTestimonial] = useCreateTestimonialMutation();
  const [updateTestimonial] = useUpdateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const testimonials = data?.data || [];

  const handleSubmit = async () => {
    const payload = {
      rate: form.rating,
      message: form.text,
      name: form.name,
      area: form.address,
    };

    const toastId = toast.loading(editId ? 'Updating...' : 'Creating...');

    try {
      if (editId !== null) {
        await updateTestimonial({ id: editId, ...payload }).unwrap();
        toast.update(toastId, {
          render: 'Updated successfully',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        await createTestimonial(payload).unwrap();
        toast.update(toastId, {
          render: 'Created successfully',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });
      }

      setForm({ rating: 5, text: '', name: '', address: '' });
      setEditId(null);
      refetch();
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.data?.message || 'Operation failed',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async (id: number) => {
    const toastId = toast.loading('Deleting...');
    try {
      await deleteTestimonial(id).unwrap();
      toast.update(toastId, {
        render: 'Deleted successfully',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
      refetch();
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.data?.message || 'Delete failed',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleEdit = (t: any) => {
    setForm({
      rating: t.rate,
      text: t.message,
      name: t.name,
      address: t.area,
    });
    setEditId(t.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Form */}
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">
          {editId ? 'Edit Bag Testimonial' : 'Add Bag Testimonial'}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium">Rating (1–5)</label>
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              className="w-full rounded border p-2"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Review Text"
            placeholder="Enter review..."
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
          />
          <Input
            label="Name"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Address"
            placeholder="Your address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <Button onClick={handleSubmit}>
            {editId ? 'Update Testimonial' : 'Add Testimonial'}
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="mt-6 w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-bold text-gray-800">✨ Bag Testimonial List</h2>

        {isLoading ? (
          <p className="text-sm text-gray-500">Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-sm text-gray-500">No testimonials added yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {testimonials.map((t: any) => (
              <div
                key={t.id}
                className="relative rounded-xl border border-gray-100 bg-gray-50 p-5 shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute right-3 top-3 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                  ⭐ {t.rate}/5
                </div>

                <p className="mb-3 text-base italic text-gray-700">{t.message}</p>

                <div className="text-sm text-gray-600">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs">{t.area}</p>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-blue-700"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded-lg bg-red-500 px-3 py-1 text-sm font-medium text-white transition hover:bg-red-600"
                    onClick={() => handleDelete(t.id)}
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
