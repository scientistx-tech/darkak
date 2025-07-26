'use client';

import React, { useEffect, useState } from 'react';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

interface Testimonial {
  id: number;
  rating: number;
  text: string;
  name: string;
  address: string;
}

export default function WatchTestimonial() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<Omit<Testimonial, 'id'>>({
    rating: 5,
    text: '',
    name: '',
    address: '',
  });
  const [editId, setEditId] = useState<number | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('watch_testimonials');
    if (saved) {
      setTestimonials(JSON.parse(saved));
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('watch_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  const handleSubmit = () => {
    if (!form.text || !form.name || !form.address) return;

    if (editId !== null) {
      // Edit mode
      const updated = testimonials.map((t) =>
        t.id === editId ? { id: editId, ...form } : t
      );
      setTestimonials(updated);
      setEditId(null);
    } else {
      // Add mode
      const newTestimonial: Testimonial = {
        id: Date.now(),
        ...form,
      };
      setTestimonials([newTestimonial, ...testimonials]);
    }

    setForm({ rating: 5, text: '', name: '', address: '' });
  };

  const handleDelete = (id: number) => {
    const filtered = testimonials.filter((t) => t.id !== id);
    setTestimonials(filtered);
  };

  const handleEdit = (id: number) => {
    const selected = testimonials.find((t) => t.id === id);
    if (selected) {
      setForm({
        rating: selected.rating,
        text: selected.text,
        name: selected.name,
        address: selected.address,
      });
      setEditId(id);
    }
  };

  return (
    <div>
      {/* Form Section */}
      <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          {editId ? 'Edit Testimonial' : 'Add Testimonial'}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 font-medium">Rating (1–5)</label>
            <select
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: Number(e.target.value) })
              }
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

     {/* List Section */}
<div className="mt-6 w-full rounded-2xl bg-white p-6 shadow-lg border border-gray-200">
  <h2 className="text-xl font-bold text-gray-800 mb-6">✨ Testimonial List</h2>

  {testimonials.length === 0 ? (
    <p className="text-gray-500 text-sm">No testimonials added yet. Be the first to share!</p>
  ) : (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {testimonials.map((t) => (
        <div
          key={t.id}
          className="relative rounded-xl border border-gray-100 bg-gray-50 p-5 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
            ⭐ {t.rating}/5
          </div>

          <p className="text-gray-700 text-base mb-3 italic">"{t.text}"</p>

          <div className="text-sm text-gray-600">
            <p className="font-semibold">{t.name}</p>
            <p className="text-xs">{t.address}</p>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              className="px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              onClick={() => handleEdit(t.id)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
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
