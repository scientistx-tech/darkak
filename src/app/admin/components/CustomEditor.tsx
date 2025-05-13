'use client'; // Required only in App Router

import React from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import licenseKey from '@/ckLicense';

const CustomEditor = () => {
    const cloud = useCKEditorCloud({
        version: '45.0.0',
        premium: true,
    });

    if (cloud.status === 'error') {
        return <div>Error!</div>;
    }

    if (cloud.status === 'loading') {
        return <div>Loading...</div>;
    }

    const {
        ClassicEditor,
        Essentials,
        Paragraph,
        Bold,
        Italic,
        Alignment,
        Font,
        Underline,
        Strikethrough,
        FontSize,
        FontFamily,
        FontColor,
        FontBackgroundColor,
    } = cloud.CKEditor;

    const { FormatPainter } = cloud.CKEditorPremiumFeatures;

    return (
        <CKEditor
            editor={ClassicEditor}
            data={'<p>Hello world!</p>'}
            config={{
                licenseKey: licenseKey, // Replace with your actual license key
                plugins: [
                    Essentials,
                    Paragraph,
                    Bold,
                    Italic,
                    Underline,
                    Strikethrough,
                    Font,
                    FontSize,
                    FontFamily,
                    FontColor,
                    FontBackgroundColor,
                    Alignment,
                    FormatPainter,
                ],
                toolbar: [
                    'undo',
                    'redo',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    '|',
                    'fontSize',
                    'fontFamily',
                    'fontColor',
                    'fontBackgroundColor',
                    '|',
                    'alignment',
                    '|',
                    'formatPainter',
                ],
            }}
        />
    );
};

export default CustomEditor;
