'use client'
import { useGetHomeContentQuery } from '@/redux/services/client/homeContentApi';
import React from 'react';
  
const ContentSection = () => {
  const { data: home } = useGetHomeContentQuery();
    return (
        <div className="rounded-xl bg-blue-50 px-4 py-8 text-center">
        <h2 className="text-lg text-black font-medium">{home?.content?.content} </h2>
        </div>
    );
};

export default ContentSection;