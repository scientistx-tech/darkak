import React from 'react';

export default function page() {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1>Blog List</h1>

        <button className="rounded-md border-2 border-primaryBlue px-4 py-2 text-primaryBlue">
          Add Blog
        </button>
      </div>
    </div>
  );
}
