'use client';
import JoditEditor from 'jodit-react';
import React, { useState, ChangeEvent, useRef } from 'react';

export default function ContentCart() {
  const [mainContent, setMainContent] = useState('');
  const [header1, setHeader1] = useState('');
  const [header2, setHeader2] = useState('');
  const [footerTitle, setFooterTitle] = useState('');
  const specificationEditor = useRef<any>(null);

  const handleSave = () => {
    if (
      mainContent.length < 100 ||
      mainContent.length > 300 ||
      header1.length < 20 ||
      header1.length > 60 ||
      header2.length < 20 ||
      header2.length > 60 ||
      footerTitle.length < 20 ||
      footerTitle.length > 60
    ) {
      alert('Please make sure all fields are within their required character limits.');
    } else {
      alert('Content saved successfully!');
    }
  };

  return (
    <div className="mt-6">
      {/* Main Content */}
      <div className="w-full">
        <label className="block font-medium text-gray-700">
          Main Content <span className="text-red-500">*</span>
        </label>

        <JoditEditor
          ref={specificationEditor}
          config={{
            askBeforePasteHTML: false,
            defaultActionOnPaste: 'insert_only_text',
            uploader: {
              insertImageAsBase64URI: true,
            },
            placeholder: 'Start writing specification',
            height: '450px',
            toolbar: true,
          }}
          value={mainContent}
          onBlur={(newContent) => {
            setMainContent(newContent);
          }}
        />
        <p className="mt-1 flex justify-between text-sm text-gray-500">
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

      {/* Headers */}
      <div className="mb-6 mt-6 flex flex-col gap-6 xl:flex-row">
        {/* Header 1 */}
        <div className="w-full xl:w-1/2">
          <label className="block font-medium text-gray-700">
            Header 1st Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={header1}
            onChange={(e) => setHeader1(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
          <p className="flex justify-between text-sm text-gray-500">
            <span>Title should be between 20–60 characters.</span>
            <span
              className={`ml-2 ${
                header1.length >= 20 && header1.length <= 30 ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {header1.length} chars
            </span>
          </p>
        </div>

        {/* Header 2 */}
        <div className="w-full xl:w-1/2">
          <label className="block font-medium text-gray-700">
            Header 2nd Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={header2}
            onChange={(e) => setHeader2(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
          <p className="flex justify-between text-sm text-gray-500">
            <span>Title should be between 20–60 characters.</span>
            <span
              className={`ml-2 ${
                header2.length >= 20 && header2.length <= 30 ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {header2.length} chars
            </span>
          </p>
        </div>
      </div>

      {/* Footer Title */}
      <div className="w-full">
        <label className="block font-medium text-gray-700">
          Footer Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={footerTitle}
          onChange={(e) => setFooterTitle(e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        <p className="flex justify-between text-sm text-gray-500">
          <span>Title should be between 20–60 characters.</span>
          <span
            className={`ml-2 ${
              footerTitle.length >= 20 && footerTitle.length <= 60
                ? 'text-green-600'
                : 'text-red-500'
            }`}
          >
            {footerTitle.length} chars
          </span>
        </p>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
      >
        Save Content
      </button>
    </div>
  );
}
