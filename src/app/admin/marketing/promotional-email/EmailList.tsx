'use client';
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, message, Tooltip } from 'antd';
import { EyeOutlined, CloseOutlined } from '@ant-design/icons';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

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
  const [limit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [openEmail, setOpenEmail] = useState<EmailRecord | null>(null); // ✅ for modal
  const token = useSelector((s: RootState) => s.auth.token);

  // ✅ Fetch emails
  const fetchEmails = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.darkak.com.bd/api/admin/user/send-mail-list?page=${pageNum - 1}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          next: {
            tags: ['SENDS'],
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        setEmails(data.data || []);
        setTotal(data.totalPage * limit || 0);
      } else {
        message.error(data.message || 'Failed to fetch emails');
      }
    } catch (error) {
      console.error('❌ Error fetching emails:', error);
      message.error('Failed to fetch emails');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails(page);
  }, [page]);

  const columns = [
    {
      title: 'Date & Time',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) =>
        new Date(date).toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true, // set false for 24h
        }),
    },
    {
      title: 'Customer Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Email Body',
      dataIndex: 'body',
      key: 'body',
      render: (text: string, record: EmailRecord) => {
        // ✅ Strip HTML tags
        const plainText = text.replace(/<[^>]+>/g, '');
        return (
          <div className="flex items-center gap-2">
            <span>{plainText.length > 40 ? plainText.substring(0, 40) + '...' : plainText}</span>
            <Tooltip title="View Full">
              <Button size="small" icon={<EyeOutlined />} onClick={() => setOpenEmail(record)} />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full rounded-md bg-white p-4 shadow-md">
      <h2 className="mb-3 text-lg font-semibold">📩 Sent Emails</h2>
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

      {/* ✅ Full Email Modal */}
      <Modal
        title={openEmail?.subject || 'Email Preview'}
        open={!!openEmail}
        onCancel={() => setOpenEmail(null)}
        footer={[
          <Button key="close" icon={<CloseOutlined />} onClick={() => setOpenEmail(null)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {openEmail && (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: openEmail.body }} />
        )}
      </Modal>
    </div>
  );
}
