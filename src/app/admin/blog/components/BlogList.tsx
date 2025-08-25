'use client';
import React, { useState } from 'react';
import { Switch, Modal, Pagination, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import {
  useGetBlogListQuery,
  useGetBlogStatusChangeMutation,
  useGetBlogDeleteMutation,
} from '../adminBlogApi';
import Loader from '@/components/shared/Loader';
import { toast } from 'react-toastify';
import { LoaderCircle } from 'lucide-react';

export default function BlogList() {
  const [messageApi, contextHolder] = message.useMessage();

  const [page, setPage] = useState(1);
  const { data, error, isLoading, refetch } = useGetBlogListQuery({ page });
  const [getBlogStatusChange, { isLoading: pageLoading }] = useGetBlogStatusChangeMutation();
  const [getBlogDelete, { isLoading: deleteLoading }] = useGetBlogDeleteMutation();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  const handlePublishToggle = async (id: number) => {
    try {
      await getBlogStatusChange({ id }).unwrap();
      toast.success('Blog publish status updated');
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update publish status');
      console.error('Error updating publish status:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedBlogId) return;
    const hide = messageApi.loading('Deleting blog...', 0);
    try {
      await getBlogDelete({ id: selectedBlogId }).unwrap();
      hide();
      messageApi.success('Blog deleted successfully');
      refetch();
    } catch (error: any) {
      hide();
      messageApi.error(error?.data?.message || 'Failed to delete blog');
      console.error('Error deleting blog:', error);
    } finally {
      setDeleteModalVisible(false);
      setSelectedBlogId(null);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading blogs.</div>;

  return (
    <div className="mt-10 w-full rounded-xl bg-white p-6 shadow-lg">
      {contextHolder}
      <table className="mt-5 min-w-full border-collapse">
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
          {data?.data.map((blog, index) => (
            <tr key={blog.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
              <td className="flex items-center gap-3 px-4 py-3">
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <span className="text-gray-800">{blog.title}</span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                <p>
                  Writer: <span className="font-medium">{blog.name}</span>
                </p>
                <p>Date: {new Date(blog.date).toDateString()}</p>
              </td>
              <td className="px-4 py-3">
                {pageLoading ? (
                  <LoaderCircle />
                ) : (
                  <Switch checked={blog.published} onChange={() => handlePublishToggle(blog.id)} />
                )}
              </td>
              <td className="flex gap-3 px-4 py-3">
                <button className="rounded-md bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-600">
                  <EditOutlined />
                </button>
                <button
                  onClick={() => {
                    setSelectedBlogId(blog.id);
                    setDeleteModalVisible(true);
                  }}
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
        <Pagination
          current={page}
          pageSize={10}
          total={data?.totalPages || 1}
          showSizeChanger={false}
          onChange={setPage}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={handleDelete}
        confirmLoading={deleteLoading}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Yes, Delete"
        okType="danger"
        cancelText="No"
      >
        <p>Are you sure you want to delete this blog?</p>
      </Modal>
    </div>
  );
}
