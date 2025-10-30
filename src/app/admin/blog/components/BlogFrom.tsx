'use client';

import React, { useState } from 'react';
import EditorHTML from '@/components/EditorHTML';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { message } from 'antd';
import Image from 'next/image';


import { useGetBlogCreateMutation } from '../adminBlogApi';
import { useUploadImagesMutation } from '@/redux/services/admin/adminProductApis';

export default function BlogFrom() {
  const [messageApi, contextHolder] = message.useMessage();
  const [createBlog, { isLoading }] = useGetBlogCreateMutation();

  const [uploadFile] = useUploadImagesMutation();

  const [formData, setFormData] = useState({
    writerName: '',
    blogTitle: '',
    thambleImage: null as File | null,
    metaImage: null as File | null,
    description: '',
    metaTitle: '',
    metaKeywords: '',
    metaDescription: '',
    imageAlt: '',
    pageContent: '',
    faqs: [{ question: '', answer: '' }],
  });

  // Previews
  const [thamblePreview, setThamblePreview] = useState<string | null>(null);
  const [metaPreview, setMetaPreview] = useState<string | null>(null);

  // Handle Thumbnail Upload
  const handleThambleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, thambleImage: file });
      setThamblePreview(URL.createObjectURL(file));
    }
  };

  // Handle Meta Image Upload
  const handleMetaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, metaImage: file });
      setMetaPreview(URL.createObjectURL(file));
    }
  };

  // handle FAQ add/remove
  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }],
    }));
  };

  const handleRemoveFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleCreate = async () => {
    // Validation
    if (!formData.writerName.trim()) {
      return messageApi.error('Writer name is required');
    }
    if (!formData.blogTitle.trim()) {
      return messageApi.error('Blog title is required');
    }
    if (!formData.thambleImage) {
      return messageApi.error('Thumbnail image is required');
    }
    if (!formData.description.trim()) {
      return messageApi.error('Description is required');
    }
    if (!formData.metaTitle.trim()) {
      return messageApi.error('Meta title is required');
    }
    if (!formData.metaDescription.trim()) {
      return messageApi.error('Meta description is required');
    }
    if (!formData.metaImage) {
      return messageApi.error('Meta image is required');
    }
    if (!formData.imageAlt.trim()) {
      return messageApi.error('Meta image alt text is required');
    }

    try {
      // ⬇️ Upload thumbnail
      const thumbnailForm = new FormData();
      thumbnailForm.append('images', formData.thambleImage);
      const thumbnailRes = await uploadFile(thumbnailForm).unwrap();
      const thumbnailUrl = thumbnailRes?.[0]; // depends on API response

      // ⬇️ Upload meta image
      const metaForm = new FormData();
      metaForm.append('images', formData.metaImage);
      const metaRes = await uploadFile(metaForm).unwrap();
      const metaUrl = metaRes?.[0];

      // ⬇️ Build payload
      const payload = {
        name: formData.writerName,
        title: formData.blogTitle,
        thumbnail: thumbnailUrl,
        description: formData.description,
        meta_title: formData.metaTitle,
        meta_description: formData.metaDescription,
        meta_keywords: {
          keywords: formData.metaKeywords.split(',').map((k) => k.trim()), // ✅ convert string → array
        },
        meta_image: metaUrl,
        meta_alt: formData.imageAlt,
        content: formData.pageContent,
        faq: {
          faq: formData.faqs,
        },
      };

      // ⬇️ Call API
      const res = await createBlog(payload).unwrap();
      messageApi.success('Blog created successfully!');
      console.log('Blog created:', res);

      // Reset form
      setFormData({
        writerName: '',
        blogTitle: '',
        thambleImage: null,
        metaImage: null,
        description: '',
        metaTitle: '',
        metaKeywords: '',
        metaDescription: '',
        imageAlt: '',
        pageContent: '',
        faqs: [{ question: '', answer: '' }],
      });
      setThamblePreview(null);
      setMetaPreview(null);
    } catch (error: any) {
      messageApi.error(error?.data?.message || 'Failed to create blog');
      console.error('Create blog error:', error);
    }
  };

  return (
    <div className="w-full">
      {contextHolder}
      {/* Blog Info */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold">Blog Info</h2>

        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Writer Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Writer Name</label>
              <input
                type="text"
                value={formData.writerName}
                onChange={(e) => setFormData({ ...formData, writerName: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter writer name"
              />
            </div>

            {/* Blog Title */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Blog Title</label>
              <input
                type="text"
                value={formData.blogTitle}
                onChange={(e) => setFormData({ ...formData, blogTitle: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter blog title"
              />
            </div>
          </div>
          {/* Thamble Image (Banner) */}
          <div className="w-full">
            <label className="block font-medium text-gray-700">
              Thumbnail Image (Banner) <span className="text-sm text-gray-500">(1200x600px)</span>
            </label>
            <div className="relative mt-2 rounded-md border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-500">
              <label className="cursor-pointer">
                {thamblePreview ? (
                  <div className="relative inline-block">
                    <Image
                      src={thamblePreview}
                      alt="Thumbnail Preview"
                      className="mx-auto h-40 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, thambleImage: null });
                        setThamblePreview(null);
                      }}
                      className="absolute right-0 top-0 -mr-2 -mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <span className="text-blue-600 hover:underline">Click to Upload</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThambleUpload}
                />
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
            <EditorHTML
              value={formData.description}
              onChange={(newContent) => setFormData((d) => ({ ...d, description: newContent }))}
            />
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="mt-10 rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold">Meta Info</h2>

        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Meta Title */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Meta Title (50–60 chars)
                </label>

                <p
                  className={`mt-1 text-sm font-medium ${
                    formData.metaTitle.length >= 50 && formData.metaTitle.length <= 60
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {formData.metaTitle.length} / 60
                </p>
              </div>

              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter meta title"
              />
            </div>

            {/* Meta Keywords */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Meta Keywords</label>
              <input
                type="text"
                value={formData.metaKeywords}
                onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
          </div>

          {/* Meta Description */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Meta Description (150–160 chars)
              </label>
              <p
                className={`mt-1 text-sm font-medium ${
                  formData.metaDescription.length >= 150 && formData.metaDescription.length <= 160
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {formData.metaDescription.length} / 160
              </p>
            </div>
            <textarea
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter meta description"
            />
          </div>

          {/* Meta Image */}
          <div className="w-full">
            <label className="block font-medium text-gray-700">
              Meta Image <span className="text-red-500">*</span>{' '}
              <span className="text-sm text-gray-500">(Ratio 1:1 — 500x500px)</span>
            </label>
            <div className="relative mt-2 rounded-md border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-500">
              <label className="cursor-pointer">
                {metaPreview ? (
                  <div className="relative inline-block">
                    <Image
                      src={metaPreview}
                      alt="Meta Preview"
                      className="mx-auto h-32 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, metaImage: null });
                        setMetaPreview(null);
                      }}
                      className="absolute right-0 top-0 -mr-2 -mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <span className="text-blue-600 hover:underline">Click to Upload</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleMetaUpload}
                />
              </label>
            </div>
          </div>

          {/* Image Alt */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Image Alt Tag</label>
            <input
              type="text"
              value={formData.imageAlt}
              onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter image alt text"
            />
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div className="mt-10 rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold">SEO Section</h2>

        {/* Page Content */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">Page Content</label>
          <EditorHTML
            value={formData.pageContent}
            onChange={(newContent) => setFormData((d) => ({ ...d, pageContent: newContent }))}
          />
        </div>

        {/* FAQs */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">FAQs</h3>
          {formData.faqs.map((faq, index) => (
            <div key={index} className="relative mb-4 rounded-lg border bg-gray-50 p-4">
              <div className="grid w-[97%] grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) => {
                    const newFaqs = [...formData.faqs];
                    newFaqs[index].question = e.target.value;
                    setFormData({ ...formData, faqs: newFaqs });
                  }}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) => {
                    const newFaqs = [...formData.faqs];
                    newFaqs[index].answer = e.target.value;
                    setFormData({ ...formData, faqs: newFaqs });
                  }}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {formData.faqs.length > 1 && (
                <button
                  onClick={() => handleRemoveFaq(index)}
                  className="absolute right-4 top-2 mt-5 text-xl text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}

          <button
            onClick={handleAddFaq}
            className="flex items-center gap-2 rounded-md bg-primaryBlue px-4 py-2 text-white transition hover:bg-primaryBlue/90"
          >
            <FaPlus /> Add More FAQ
          </button>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8 text-right">
        <button
          onClick={handleCreate}
          disabled={isLoading}
          className="rounded-lg bg-primaryBlue px-6 py-3 font-medium text-white shadow transition hover:bg-primaryBlue/90"
        >
          {isLoading ? 'Publishing...' : 'Publish Blog'}
        </button>
      </div>
    </div>
  );
}
