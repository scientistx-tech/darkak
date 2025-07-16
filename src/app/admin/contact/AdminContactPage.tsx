'use client';

import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm, Pagination, Space } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  time: string;
}

const generateDummyData = (): ContactMessage[] => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    phone: `0171${Math.floor(1000000 + Math.random() * 9000000)}`,
    message: `This is a message from customer ${i + 1}`,
    time: new Date().toISOString(),
  }));
};

export default function AdminContactPage() {
  const [data, setData] = useState<ContactMessage[]>(generateDummyData());
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.toLowerCase().includes(search.toLowerCase())
  );

  const currentData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = [
    {
      title: 'SL',
      key: 'sl',
      render: (_: any, __: ContactMessage, index: number) => (currentPage - 1) * pageSize + index + 1,
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
    },
    {
      title: 'Time & Date',
      dataIndex: 'time',
      key: 'time',
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: ContactMessage) => (
        <Popconfirm
          title="Are you sure to delete this message?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />} size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Contact Us Messages</h2>

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
      <Table
        dataSource={currentData}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
      />

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          current={currentPage}
          total={filteredData.length}
          pageSize={pageSize}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
