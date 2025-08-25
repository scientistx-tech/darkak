import React from 'react';
import BlogView from './BlogView';

export default function page() {
  return (
    <div>
      <div className="h-[65px] w-full md:h-[109px]" />

      <div className="container mx-auto flex flex-col gap-y-5 px-2 md:px-4">
        <BlogView />
      </div>
    </div>
  );
}
