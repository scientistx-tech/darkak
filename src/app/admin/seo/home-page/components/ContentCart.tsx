import EditorHTML from '@/components/EditorHTML';
import {
  useGetPageContentQuery,
  useUpdatePageContentMutation,
} from '@/redux/services/admin/adminContentApi';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

interface FormData {
  content: string;
  header_first_title: string;
  header_second_title: string;
  footer_title: string;
}

const ContentCart: React.FC = () => {
  const { data, isLoading } = useGetPageContentQuery();
  const [updatePageContent, { isLoading: isUpdating }] = useUpdatePageContentMutation();
  const specificationEditor = useRef<any>(null);
  const [formData, setFormData] = useState<FormData>({
    content: '',
    header_first_title: '',
    header_second_title: '',
    footer_title: '',
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Character validation
  const getValidationClass = (value: string, min: number, max: number) => {
    if (value.length < min || value.length > max) {
      return 'text-red-500';
    }
    return 'text-green-600';
  };

  // Submit data
  const handleSubmit = async () => {
    try {
      await updatePageContent(formData).unwrap();
      toast.success('Content updated successfully!');
    } catch (err) {
      console.error(err);

      toast.error('failed to update');
    }
  };

  // if (isLoading) {
  //   return <div className="p-6 text-center">Loading content...</div>;
  // }

  return (
    <div>
      <div className="mt-5 space-y-6 rounded-lg border bg-white p-6 shadow">
        <h2 className="text-lg font-semibold"> Update Content</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Content */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Main Content <span className="text-red-500">*</span>
            </label>
            <EditorHTML
              value={formData.content}
              onChange={(newContent) => {
                setFormData((d) => ({ ...d, content: newContent }));
              }}
            />

            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Content should be between 100–300 characters.
              </span>
              <span
                className={`text-xs font-semibold ${getValidationClass(
                  formData.content,
                  100,
                  300
                )}`}
              >
                {formData.content.length} chars
              </span>
            </div>
          </div>

          {/* Header First Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              First Title <span className="text-red-500">*</span>
            </label>
            <input
              name="header_first_title"
              type="text"
              value={formData.header_first_title}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
              maxLength={60}
            />
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs text-gray-500">Should be 20–60 characters.</span>
              <span
                className={`text-xs font-semibold ${getValidationClass(
                  formData.header_first_title,
                  20,
                  60
                )}`}
              >
                {formData.header_first_title.length} chars
              </span>
            </div>
          </div>

          {/* Header Second Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Second Title <span className="text-red-500">*</span>
            </label>
            <input
              name="header_second_title"
              type="text"
              value={formData.header_second_title}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
              maxLength={60}
            />
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs text-gray-500">Should be 20–60 characters.</span>
              <span
                className={`text-xs font-semibold ${getValidationClass(
                  formData.header_second_title,
                  20,
                  60
                )}`}
              >
                {formData.header_second_title.length} chars
              </span>
            </div>
          </div>

          {/* Footer Title */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Footer Title <span className="text-red-500">*</span>
            </label>
            <input
              name="footer_title"
              type="text"
              value={formData.footer_title}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
              maxLength={80}
            />
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs text-gray-500">Should be 20–80 characters.</span>
              <span
                className={`text-xs font-semibold ${getValidationClass(
                  formData.footer_title,
                  20,
                  80
                )}`}
              >
                {formData.footer_title.length} chars
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 text-right">
          <button
            onClick={handleSubmit}
            disabled={isUpdating}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {isUpdating ? 'Updating...' : 'Update Content'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCart;
