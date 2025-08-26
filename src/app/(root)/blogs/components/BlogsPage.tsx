'use client';

import BlogsCart from '@/components/shared/BlogsCart';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Loader from '@/components/shared/Loader';

interface Blog {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  name: string; // writer name (from API `name`)
  slug: string;
}

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.darkak.com.bd/api/public/blogs?page=${page}&limit=${limit}`
      );
      const data = await res.json();

      setBlogs(data.blogs || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Blogs grid */}
      <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <Loader />
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogsCart
              key={blog.id}
              link={`/blogs/${blog.slug}`}
              image={blog.thumbnail}
              writerName={blog.name}
              date={new Date(blog.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
              title={blog.title}
              description={blog.description.replace(/<[^>]*>?/gm, '')} // strip HTML
            />
          ))
        ) : (
          <p className="col-span-full text-center">No blogs found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination current={page} pageSize={limit} total={total} onChange={(p) => setPage(p)} />
      </div>
    </div>
  );
};

export default BlogsPage;
