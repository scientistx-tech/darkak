'use client';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

export default function SeoCart() {
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [altTag, setAltTag] = useState('');
  const [metaImage, setMetaImage] = useState<string | null>(null);

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
    const file = e.target.files?.[0];
    if (file) setMetaImage(URL.createObjectURL(file));
  };

  return (
    <div>
      {/* SEO Form */}
      <div className="rounded-lg border bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Meta Section</h2>

        {/* Meta Title & Keywords */}
        <div className="mb-6 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="block font-medium text-gray-700">
              Meta Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
            <p className="flex w-full justify-between text-sm text-gray-500">
              <span>Title should be between 50–60 characters.</span>
              <span
                className={`ml-2 ${
                  metaTitle.length >= 50 && metaTitle.length <= 60
                    ? 'text-green-600'
                    : 'text-red-500'
                }`}
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
              />
            </div>
          </div>
        </div>

        {/* Meta Description & Image */}
        <div className="mb-6 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="block font-medium text-gray-700">
              Meta Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            ></textarea>
            <p className="flex w-full justify-between text-sm text-gray-500">
              <span>Description should be between 150–160 characters.</span>
              <span
                className={`ml-2 ${
                  metaDescription.length >= 150 && metaDescription.length <= 160
                    ? 'text-green-600'
                    : 'text-red-500'
                }`}
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
                      onClick={() => setMetaImage(null)}
                      className="absolute right-0 top-0 -mr-2 -mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
                      type="button"
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
                />
              </label>
            </div>
          </div>
        </div>

        {/* Alt Tag */}
        <div className="mb-5">
          <label className="block font-medium text-gray-700">
            Alt Tag <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={altTag}
            onChange={(e) => setAltTag(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <div>
        <button
          className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
          onClick={() => alert('SEO settings saved!')}
        >
          Save SEO Settings
        </button>
      </div>
    </div>
  );
}
