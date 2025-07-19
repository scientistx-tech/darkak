'use client';
import { useGetSeoPageDataQuery } from '@/redux/services/admin/adminFAQApi';
import axios from 'axios';
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
const BASE_URL = 'https://api.darkak.com.bd/api';
import Cookies from 'js-cookie';
import Loader from '@/components/shared/Loader';
import EditorHTML from '@/components/EditorHTML';

export default function ContentCart() {
  const [mainContent, setMainContent] = useState('');
  const specificationEditor = useRef<any>(null);
  const { data, isLoading, refetch } = useGetSeoPageDataQuery('explore');
  const [loading, setLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMainContent(e.target.value);
  };
  useEffect(() => {
    if (data && data?.data?.content) setMainContent(data?.data?.content);
  }, [data]);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        type: 'explore',
        meta_title: data.data.meta_title,
        meta_description: data.data.meta_description,
        meta_keywords: data.data.meta_keywords,
        meta_image: data.data.meta_image,
        meta_alt: data.data.meta_alt,
        content: mainContent,
        faq: data.data.faq,
      };

      await axios.post(`${BASE_URL}/admin/page/update-seo`, payload, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      refetch();

      toast.success('SEO settings updated!');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to update SEO');
    } finally {
      setLoading(false);
    }
  };
  if (isLoading) return <Loader />;
  return (
    <div className="mt-6">
      <div className="w-full">
        <label className="block font-medium text-gray-700">Main Content:</label>
        <EditorHTML
          value={mainContent}
          onChange={(newContent) => {
            setMainContent(newContent);
          }}
        />

        <p className="mt-1 flex w-full justify-between text-sm text-gray-500">
          <span>Description should be between 100–300 characters.</span>
          <span
            className={`ml-2 ${
              mainContent.length >= 100 && mainContent.length <= 300
                ? 'text-green-600'
                : 'text-red-500'
            }`}
          >
            {mainContent.length} chars
          </span>
        </p>
      </div>

      {/* Save Button */}
      <button
        disabled={loading}
        onClick={handleSubmit}
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
      >
        {loading ? 'Laoding..' : 'Save Content'}
      </button>
    </div>
  );
}
