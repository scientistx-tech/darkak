'use client';

import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm, Pagination, Space, Modal, Select, Tag } from 'antd';

import { SearchOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import baseApi from '@/redux/baseApi';
import { toast } from 'react-toastify';
import Loader from '@/components/shared/Loader';

const { Option } = Select;

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: 'pending' | 'replied' | 'processing';
}

export const adminContactUs = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContactUsList: builder.query<{ data: ContactMessage[]; totalPage: number }, any>({
      query: (params) => {
        const query = new URLSearchParams(params);
        return `/admin/contact/get?${query}`;
      },
    }),
    updateContactStatus: builder.mutation<
      any,
      { id: number; body: { status: 'pending' | 'replied' | 'processing' } }
    >({
      query: (query) => ({
        url: `/admin/contact/status/${query.id}`,
        method: 'PUT',
        body: query.body,
      }),
    }),
    deleteContact: builder.mutation<any, number>({
      query: (id) => ({
        url: `/admin/contact/delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetContactUsListQuery,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,
} = adminContactUs;

export default function AdminContactPage() {
  const pageSize = 10;
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading } = useGetContactUsListQuery({
    page: currentPage,
    limit: pageSize,
    search: search,
  });
  const [deleteApi] = useDeleteContactMutation();
  const [updateApi] = useUpdateContactStatusMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await deleteApi(id).unwrap();
      toast.success('Successful');
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handleView = (record: ContactMessage) => {
    setSelectedMessage(record);
    setIsModalVisible(true);
  };

  const handleStatusChange = async (value: ContactMessage['status'], id: number) => {
    setSelectedMessage((prev) => (prev ? { ...prev, status: value } : null));

    try {
      await updateApi({ id: id, body: { status: value } }).unwrap();
      toast.success('Successful');
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const columns = [
    {
      title: 'SL',
      key: 'sl',
      render: (_: any, __: ContactMessage, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Contact Info',
      key: 'contact',
      render: (record: ContactMessage) => (
        <>
          <div>{record.email}</div>
          <div>{record.phone}</div>
        </>
      ),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (message: string) => {
        const words = message.split(' ');
        return words.length > 4 ? words.slice(0, 4).join(' ') + '...' : message;
      },
    },
    {
      title: 'Time & Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: ContactMessage['status']) => (
        <Tag color={status === 'replied' ? 'green' : status === 'processing' ? 'blue' : 'default'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: ContactMessage) => (
        <Space>
          <Button size="large" onClick={() => handleView(record)}>
            <EyeOutlined className="text-[20px]" />
          </Button>

          <Popconfirm
            title="Are you sure to delete this message?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="large">
              <DeleteOutlined className="text-[20px]" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading) return <Loader />;

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Contact Us Messages</h2>

      {/* Search */}
      <Space className="mb-4">
        <Input
          placeholder="Search by name, email, or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          allowClear
        />
      </Space>

      {/* Table */}
      <Table dataSource={data?.data} columns={columns} rowKey="id" pagination={false} bordered />

      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        <Pagination
          current={currentPage}
          total={data?.totalPage || 1}
          pageSize={pageSize}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>

      <Modal
        title={<div className="text-xl font-semibold text-primary">Customer Message Details</div>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        className="rounded-xl"
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium text-gray-800">{selectedMessage.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{selectedMessage.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">{selectedMessage.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Time</p>
                <p className="font-medium text-gray-800">
                  {new Date(selectedMessage.date).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="mb-1 text-gray-500">Message</p>
              <p className="rounded-md bg-gray-100 p-3 text-gray-800">{selectedMessage.message}</p>
            </div>

            <div className="border-t pt-4">
              <p className="mb-1 text-gray-500">Status</p>
              <Select
                value={selectedMessage.status}
                style={{ width: '100%' }}
                onChange={(e) => handleStatusChange(e, selectedMessage?.id || 0)}
                className="w-full"
              >
                <Option value="pending">🟡 Unseen</Option>
                <Option value="processing">🔵 Processing</Option>
                <Option value="replied">🟢 Replied</Option>
              </Select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
