// components/EditorHTML.tsx
'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect, useMemo } from 'react';

// Dynamically import JoditEditor (important!)
const JoditEditor = dynamic(() => import('jodit-pro-react'), { ssr: false });

interface Props {
  value: string;
  onChange: (d: string) => void;
}

export default function EditorHTML({ value, onChange }: Props) {
  const config = useMemo(
    () => ({
      readonly: false,
      spellcheck: false,
      askBeforePasteHTML: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
      placeholder: 'Start writing warranty details',
      height: 450,
      toolbar: true,
    }),
    []
  );

  return (
    <div className="editor-wrapper">
      <JoditEditor
        config={config}
        value={value}
        onChange={(newContent: string) => {
          if (newContent !== value) {
            onChange(newContent);
          }
        }}
      />
    </div>
  );
}
