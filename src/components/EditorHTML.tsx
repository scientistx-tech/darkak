'use client';
import JoditEditor from "jodit-pro-react";
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  value: string;
  onChange: (d: string) => void;
}

export default function EditorHTML({ value, onChange }: Props) {
  const ref = useRef<any>(null);
 
  return (
    <JoditEditor
      ref={ref}
      config={{
        askBeforePasteHTML: false,
        uploader: {
          insertImageAsBase64URI: true,
        },
        placeholder: 'Start writing warranty details',
        height: '450px',
        toolbar: true,
      }}
      value={value}
      // onChange={(newContent) => setContent(newContent)}
      onBlur={(newContent) => {
        if (newContent !== value) {
          //console.log(newContent)
          onChange(newContent);
        }
      }}
    />
  );
}
