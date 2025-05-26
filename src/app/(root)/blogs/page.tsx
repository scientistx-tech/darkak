import React from 'react'
import BlogsPage from './BlogsPage'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Blogs"
};
export default function page() {
  return (
    <div>
      <div className="h-[65px] md:h-[109px] w-full"/>
      <BlogsPage />
    </div>
  )
}
