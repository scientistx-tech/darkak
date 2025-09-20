"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface EmailRecord {
  id: number;
  date: string;
  email: string;
  subject: string;
  body: string;
}

export default function EmailList() {
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const token = useSelector((s: RootState) => s.auth.token)

  // ✅ Fetch emails
  const fetchEmails = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.darkak.com.bd/api/admin/user/send-mail-list?page=${pageNum - 1}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        next: {
          tags: ["SENDS"]
        }
      }
      );
      const data = await res.json();

      if (res.ok) {
        setEmails(data.data || []);
        setTotal(data.totalPage * limit || 0);
      } else {
        message.error(data.message || "Failed to fetch emails");
      }
    } catch (error) {
      console.error("❌ Error fetching emails:", error);
      message.error("Failed to fetch emails");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails(page);
  }, [page]);


  const columns = [
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleString(),
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
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_: any, record: EmailRecord) => (
    //     <Popconfirm
    //       title="Delete Email?"
    //       onConfirm={() => handleDelete(record.id)}
    //       okText="Yes"
    //       cancelText="No"
    //     >
    //       <Button danger icon={<DeleteOutlined />} />
    //     </Popconfirm>
    //   ),
    // },
  ];

  return (
    <div className="w-full rounded-md bg-white shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3">📩 Sent Emails</h2>
      <Table<EmailRecord>
        rowKey="id"
        dataSource={emails}
        columns={columns}
        loading={loading}
        pagination={{
          current: page,
          pageSize: limit,
          total,
          onChange: (p) => setPage(p),
        }}
      />
    </div>
  );
}
