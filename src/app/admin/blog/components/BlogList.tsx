'use client';
import React, { useState } from 'react';
import { Switch, Modal, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Image, { StaticImageData } from 'next/image';

import img from '@/Data/Demo/thumb-1920-831859.jpg';

const { confirm } = Modal;

interface Blog {
  id: number;
  title: string;
  image: StaticImageData | string;
  writer: string;
  date: string;
  published: boolean;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 1,
      title: 'The Future of AI',
      image: img,
      writer: 'Tasnim Akash',
      date: 'Aug 20, 2025',
      published: true,
    },
    {
      id: 2,
      title: 'Exploring Nature with Tech',
      image: '/blog2.jpg',
      writer: 'Shakib Hossen',
      date: 'Aug 18, 2025',
      published: false,
    },
    {
      id: 3,
      title: 'Another Blog Post',
      image: '/blog3.jpg',
      writer: 'Shakib Hossen',
      date: 'Aug 18, 2025',
      published: false,
    },
    {
      id: 4,
      title: 'The Future of AI',
      image: img,
      writer: 'Tasnim Akash',
      date: 'Aug 20, 2025',
      published: true,
    },
  ]);

  const handlePublishToggle = (id: number) => {
    setBlogs((prev) =>
      prev.map((blog) => (blog.id === id ? { ...blog, published: !blog.published } : blog))
    );
  };

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: 'Are you sure you want to delete this blog?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      },
    });
  };

  return (
    <div className="mt-10 w-full rounded-xl bg-white p-6 shadow-lg">
      
      <table className="min-w-full mt-5 border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700">
            <th className="px-4 py-3 text-sm font-semibold">SL</th>
            <th className="px-4 py-3 text-sm font-semibold">Blog Image & Title</th>
            <th className="px-4 py-3 text-sm font-semibold">Info</th>
            <th className="px-4 py-3 text-sm font-semibold">Published</th>
            <th className="px-4 py-3 text-sm font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
              <td className="flex items-center gap-3 px-4 py-3">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={150}
                  height={150}
                  className="rounded-md object-cover"
                />
                <span className="text-gray-800">{blog.title}</span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                <p>
                  Writer: <span className="font-medium">{blog.writer}</span>
                </p>
                <p>Date: {blog.date}</p>
              </td>
              <td className="px-4 py-3">
                <Switch checked={blog.published} onChange={() => handlePublishToggle(blog.id)} />
              </td>
              <td className="flex gap-3 px-4 py-3">
                <button className="rounded-md bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-600">
                  <EditOutlined />
                </button>
                <button
                  onClick={() => showDeleteConfirm(blog.id)}
                  className="rounded-md bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
                >
                  <DeleteOutlined />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        <Pagination current={1} pageSize={5} total={blogs.length} showSizeChanger={false} />
      </div>
    </div>
  );
}
