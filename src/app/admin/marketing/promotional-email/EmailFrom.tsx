'use client';
import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Button, Input, Select } from 'antd';
import EditorHTML from '@/components/EditorHTML'; // your custom editor
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';

interface Customer {
  name: string;
  email: string;
  phone?: string;
  date: string; // API returns createdAt or order date
}

export default function EmailForm() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [subject, setSubject] = useState<string>('');
  const [mainContent, setMainContent] = useState<string>('');
  const token = useSelector((s: RootState) => s.auth.token);
  const [loading, setLoading] = useState<boolean>(false); // ✅ Loading state
  // pagination + filter
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [sort, setSort] = useState<'user' | 'order'>('user');

  // ✅ Fetch customers from API
  const fetchCustomers = async (pageNum = 1, sortBy = sort) => {
    try {
      const res = await fetch(
        `https://api.darkak.com.bd/api/admin/user/mail-list?page=${pageNum - 1}&limit=${limit}&sort=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          next: {
            tags: ['EMAILS'],
          },
        }
      );
      const data = await res.json();

      // ✅ Remove duplicates by email
      const uniqueCustomers = (data.data || []).reduce((acc: Customer[], curr: Customer) => {
        if (!acc.find((c) => c.email === curr.email)) {
          acc.push(curr);
        }
        return acc;
      }, []);

      setCustomers(uniqueCustomers);
      setTotalPage(data.totalPage || 0);
    } catch (err) {
      console.error('❌ Error fetching customers:', err);
      toast.error('Failed to fetch customer list');
    }
  };

  useEffect(() => {
    fetchCustomers(page, sort);
  }, [page, sort]);

  // ✅ Table columns
  const columns = [
    {
      title: 'Select',
      dataIndex: 'email',
      render: (email: string) => (
        <Checkbox
          checked={selectedEmails.includes(email)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedEmails([...selectedEmails, email]);
            } else {
              setSelectedEmails(selectedEmails.filter((em) => em !== email));
            }
          }}
        />
      ),
    },
    { title: 'Customer Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (phone?: string) => phone || 'N/A',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date: string) => (date ? dayjs(date).format('DD/MM/YYYY') : 'N/A'),
    },
  ];

  // ✅ Handle send email
  const handleSend = async () => {
    if (!subject.trim()) {
      toast.error('Please enter an email subject!');
      return;
    }
    if (!mainContent.trim()) {
      toast.error('Please write email content!');
      return;
    }
    if (selectedEmails.length === 0) {
      toast.error('Please select at least one email!');
      return;
    }
    setLoading(true); // ✅ Start loading
    try {
      const res = await fetch('https://api.darkak.com.bd/api/admin/user/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          emails: selectedEmails,
          subject,
          body: mainContent,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success(`Email sent to ${result.sended?.count || selectedEmails.length} users`);
      } else {
        toast.error(result.toast || 'Failed to send emails');
      }
    } catch (err) {
      console.error('❌ Error sending emails:', err);
      toast.error('Failed to send emails');
    } finally {
      setSelectedEmails([]);
      setSubject('');
      setMainContent('');
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-md bg-white p-4 shadow-md">
      {/* ✅ Filter for sort */}
      <div className="mb-3 flex items-center gap-4">
        <span className="font-medium">Sort By:</span>
        <Select
          value={sort}
          style={{ width: 150 }}
          onChange={(value) => {
            setSort(value);
            setPage(1);
          }}
          options={[
            { label: 'Users', value: 'user' },
            { label: 'Orders', value: 'order' },
          ]}
        />
      </div>

      {/* ✅ Select All / Clear */}
      <div className="mb-3 flex gap-2">
        <Button type="primary" onClick={() => setSelectedEmails(customers.map((c) => c.email))}>
          Select All
        </Button>
        <Button onClick={() => setSelectedEmails([])}>Clear Selection</Button>
      </div>

      {/* ✅ Customers Table */}
      <Table<Customer>
        rowKey="email"
        dataSource={customers}
        columns={columns}
        pagination={{
          current: page,
          pageSize: limit,
          total: totalPage * limit,
          onChange: (p) => setPage(p),
        }}
      />

      {/* ✅ Subject Input */}
      <div className="mt-5">
        <h3 className="mb-2 font-semibold">Email Subject</h3>
        <Input
          placeholder="Enter email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      {/* ✅ Email Editor */}
      <div className="mt-5">
        <h3 className="mb-2 font-semibold">Write Body</h3>
        <EditorHTML value={mainContent} onChange={setMainContent} />
      </div>

      {/* ✅ Send Button */}
      <div className="mt-4 text-right">
        <Button disabled={loading} type="primary" onClick={handleSend}>
          {loading ? 'Please wait..' : 'Send Email'}
        </Button>
      </div>
    </div>
  );
}
