'use client';

import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm, Pagination, Space, Modal, Select, Tag } from 'antd';

import { SearchOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Option } = Select;

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  time: string;
  status: 'Unseen' | 'Processing' | 'Replied';
}

const generateDummyData = (): ContactMessage[] => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    phone: `0171${Math.floor(1000000 + Math.random() * 9000000)}`,
    message: `This is a message from customer ${i + 1} about a serious issue regarding the product delivery and more...jhjkhkjhkhkhkhkhkhkhkjhkjehtgkjdfhgklj'dfhgkjdfhg;kdfjhgkjdfshgkhgdfhg;kljdfg dfkg kdfjgbuiodfhgjdf gdf gujdfgiufdhgiufdhg;ifuh`,
    time: new Date().toISOString(),
    status: 'Unseen',
  }));
};

export default function AdminContactPage() {
  const [data, setData] = useState<ContactMessage[]>(generateDummyData());
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const pageSize = 10;

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleView = (record: ContactMessage) => {
    setSelectedMessage(record);
    setIsModalVisible(true);
  };

  const handleStatusChange = (value: ContactMessage['status']) => {
    if (selectedMessage) {
      const updated = data.map((msg) =>
        msg.id === selectedMessage.id ? { ...msg, status: value } : msg
      );
      setData(updated);
      setSelectedMessage({ ...selectedMessage, status: value });
    }
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
      dataIndex: 'time',
      key: 'time',
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: ContactMessage['status']) => (
        <Tag color={status === 'Replied' ? 'green' : status === 'Processing' ? 'blue' : 'default'}>
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
      <Table dataSource={currentData} columns={columns} rowKey="id" pagination={false} bordered />

      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        <Pagination
          current={currentPage}
          total={filteredData.length}
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
                  {new Date(selectedMessage.time).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="mb-1 text-gray-500">Message</p>
              <p className=" rounded-md bg-gray-100 p-3 text-gray-800">
                {selectedMessage.message}
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="mb-1 text-gray-500">Status</p>
              <Select
                value={selectedMessage.status}
                style={{ width: '100%' }}
                onChange={handleStatusChange}
                className="w-full"
              >
                <Option value="Unseen">🟡 Unseen</Option>
                <Option value="Processing">🔵 Processing</Option>
                <Option value="Replied">🟢 Replied</Option>
              </Select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
