'use client';
import React, { useEffect, useState, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default function SeoCart() {
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [altTag, setAltTag] = useState('');
  const [metaImage, setMetaImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'https://api.darkak.com.bd/api';

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/public/page-seo/category`) ///will cahnge type "category","about"
      .then((res) => {
        const data = res.data?.data;
        setMetaTitle(data?.meta_title || '');
        setMetaDescription(data?.meta_description || '');
        setKeywords(data?.meta_keywords || []);
        setAltTag(data?.meta_alt || '');
        setMetaImage(data?.meta_image || null);
      })
      .catch(() => toast.error('Failed to fetch SEO data'))
      .finally(() => setLoading(false));
  }, []);

  const handleKeywordAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && keywordInput.trim()) {
      e.preventDefault();
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      setMetaImage(URL.createObjectURL(uploaded));
      setFile(uploaded);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    let uploadedUrl = metaImage;

    try {
      if (file) {
        const formData = new FormData();
        formData.append('images', file);

        const uploadRes = await axios.post(`${BASE_URL}/user/upload-multiple-images`, formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });
        uploadedUrl = uploadRes.data?.[0];
      }

      const payload = {
        type: 'category',
        meta_title: metaTitle,
        meta_description: metaDescription,
        meta_keywords: keywords,
        meta_image: uploadedUrl,
        meta_alt: altTag,
      };

      await axios.post(`${BASE_URL}/admin/page/update-seo`, payload, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      toast.success('SEO settings updated!');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to update SEO');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="rounded-lg border bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Meta Section</h2>

        <div className="mb-6 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="block font-medium text-gray-700">
              Meta Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              disabled={loading}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2"
            />
            <p className="flex justify-between text-sm text-gray-500">
              <span>Title: 50–60 characters</span>
              <span
                className={
                  metaTitle.length >= 50 && metaTitle.length <= 60
                    ? 'text-green-600'
                    : 'text-red-500'
                }
              >
                {metaTitle.length} chars
              </span>
            </p>
          </div>

          <div className="w-full xl:w-1/2">
            <label className="block font-medium text-gray-700">
              Meta Keywords <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap items-center gap-2 rounded-md border border-gray-300 p-2">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-700"
                >
                  {keyword}
                  <button onClick={() => removeKeyword(index)} className="font-bold text-red-500">
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeywordAdd}
                placeholder="Type and press Enter or ,"
                className="flex-grow px-2 py-1 focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="block font-medium text-gray-700">
              Meta Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={4}
              disabled={loading}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2"
            />
            <p className="flex justify-between text-sm text-gray-500">
              <span>Description: 150–160 characters</span>
              <span
                className={
                  metaDescription.length >= 150 && metaDescription.length <= 160
                    ? 'text-green-600'
                    : 'text-red-500'
                }
              >
                {metaDescription.length} chars
              </span>
            </p>
          </div>

          <div className="w-full xl:w-1/2">
            <label className="block font-medium text-gray-700">
              Meta Image <span className="text-red-500">*</span>{' '}
              <span className="text-sm text-gray-500">(Ratio 1:1 — 500x500px)</span>
            </label>
            <div className="relative mt-2 rounded-md border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-500">
              <label className="cursor-pointer">
                {metaImage ? (
                  <div className="relative inline-block">
                    <img
                      src={metaImage}
                      alt="Meta Preview"
                      className="mx-auto h-32 rounded-md object-cover"
                    />
                    <button
                      onClick={() => {
                        setMetaImage(null);
                        setFile(null);
                      }}
                      type="button"
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
                  onChange={handleImageUpload}
                  disabled={loading}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <label className="block font-medium text-gray-700">
            Alt Tag <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={altTag}
            onChange={(e) => setAltTag(e.target.value)}
            disabled={loading}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2"
          />
        </div>
      </div>

      <button
        className={`mt-4 rounded-md px-4 py-2 text-white ${loading ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save SEO Settings'}
      </button>
    </div>
  );
}
