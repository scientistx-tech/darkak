'use client';
import React, { memo, useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './tools';

interface EditorProps {
    data?: OutputData;
    onChange: (data: OutputData) => void;
    editorblock: string;
}

const Editor: React.FC<EditorProps> = ({ data, onChange, editorblock }) => {
    const editorRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        if (!editorRef.current) {
            const editor = new EditorJS({
                holder: editorblock,
                tools: EDITOR_JS_TOOLS,
                data: data,
                async onChange(api) {
                    const savedData = await api.saver.save();
                    onChange(savedData);
                },
            });

            editorRef.current = editor;
        }

        return () => {
            if (editorRef.current && typeof editorRef.current.destroy === 'function') {
                editorRef.current.isReady
                    .then(() => {
                        editorRef.current?.destroy();
                        editorRef.current = null;
                    })
                    .catch((error) => console.error('Error cleaning up EditorJS:', error));
            }
        };
    }, [editorblock,data,onChange]);

    return <div id={editorblock} />;
};

export default memo(Editor);