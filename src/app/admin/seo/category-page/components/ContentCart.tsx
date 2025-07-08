'use client';
import JoditEditor from 'jodit-react';
import React, { useState, ChangeEvent, useRef } from 'react';

export default function ContentCart() {
  const [mainContent, setMainContent] = useState('');
  const specificationEditor = useRef<any>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMainContent(e.target.value);
  };

  const handleSave = () => {
    if (mainContent.length >= 100 && mainContent.length <= 300) {
      alert('Main content saved!');
    } else {
      alert('Content must be between 100 and 300 characters.');
    }
  };

  return (
    <div className="mt-6">
      <div className="w-full">
        <label className="block font-medium text-gray-700">Main Content:</label>
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
        onClick={handleSave}
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
      >
        Save Content
      </button>
    </div>
  );
}
