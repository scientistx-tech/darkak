"use client";
import React, { useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

// ✅ Define type for email record
interface EmailRecord {
  id: number;
  date: string;
  email: string;
  subject: string;
  body: string;
}

export default function EmailList() {
  // ✅ Mock Data
  const [emails, setEmails] = useState<EmailRecord[]>([
    {
      id: 1,
      date: "2025-09-16 10:30 AM",
      email: "john@example.com",
      subject: "Welcome to our store",
      body: "Hi John, thanks for signing up!",
    },
    {
      id: 2,
      date: "2025-09-16 11:45 AM",
      email: "jane@example.com",
      subject: "Exclusive Offer!",
      body: "Hi Jane, enjoy 20% off on your next order.",
    },
  ]);

  // ✅ Delete handler
  const handleDelete = (id: number) => {
    setEmails((prev) => prev.filter((item) => item.id !== id));
    message.success("Email deleted!");
  };

  // ✅ Table Columns
  const columns = [
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Customer Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      render: (text: string) =>
        text.length > 40 ? text.substring(0, 40) + "..." : text,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: EmailRecord) => (
        <Popconfirm
          title="Delete Email?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="w-full rounded-md bg-white shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3">📩 Sent Emails</h2>
      <Table
        rowKey="id"
        dataSource={emails}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
