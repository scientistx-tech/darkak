"use client";
import React, { useEffect, useState } from "react";
import { Table, Checkbox, Button, message, Input } from "antd";
import EditorHTML from "@/components/EditorHTML"; // your custom editor
import dayjs from "dayjs";

// ✅ Define a type for your customer
interface Customer {
  name: string;
  email: string;
  phone?: string;
  dob?: string; // ISO date string e.g. "1995-08-20"
}

export default function EmailForm() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [subject, setSubject] = useState<string>("");
  const [mainContent, setMainContent] = useState<string>("");

  // ✅ Mock customer data
  useEffect(() => {
    const mockCustomers: Customer[] = [
      { name: "John Doe", email: "john@example.com", phone: "01711111111", dob: "1995-08-20" },
      { name: "Jane Smith", email: "jane@example.com", phone: "01822222222" }, // no dob
      { name: "David Lee", email: "david@example.com", dob: "1990-01-05" },
      { name: "Sarah Connor", email: "sarah@example.com", phone: "01933333333", dob: "1988-12-15" },
    ];
    setCustomers(mockCustomers);
  }, []);

  // ✅ Table columns
  const columns = [
    {
      title: "Select",
      dataIndex: "email",
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
    {
      title: "Customer Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (phone?: string) => phone || "N/A",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      render: (dob?: string) => (dob ? dayjs(dob).format("DD/MM/YYYY") : "N/A"),
    },
  ];

  // ✅ Handle send
  const handleSend = () => {
    if (!subject.trim()) {
      message.error("Please enter an email subject!");
      return;
    }

    if (!mainContent.trim()) {
      message.error("Please write email content!");
      return;
    }

    if (selectedEmails.length === 0) {
      message.error("Please select at least one email!");
      return;
    }

    console.log("📧 Sending email to:", selectedEmails);
    console.log("📌 Subject:", subject);
    console.log("📝 Content:", mainContent);

    message.success(
      `Email campaign started! (${selectedEmails.length} recipients)`
    );
  };

  return (
    <div className="w-full rounded-md bg-white shadow-md p-4">
      {/* ✅ Select All / Clear Buttons */}
      <div className="mb-3 flex gap-2">
        <Button
          type="primary"
          onClick={() => setSelectedEmails(customers.map((c) => c.email))}
        >
          Select All
        </Button>
        <Button onClick={() => setSelectedEmails([])}>Clear Selection</Button>
      </div>

      {/* ✅ Customers Table */}
      <Table<Customer>
        rowKey="email"
        dataSource={customers}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />

      {/* ✅ Email Subject */}
      <div className="mt-5">
        <h3 className="font-semibold mb-2">Email Subject</h3>
        <Input
          placeholder="Enter email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      {/* ✅ Email Writing Box */}
      <div className="mt-5">
        <h3 className="font-semibold mb-2">Write Body</h3>
        <EditorHTML
          value={mainContent}
          onChange={(newContent) => setMainContent(newContent)}
        />
      </div>

      {/* ✅ Send Button */}
      <div className="mt-4 text-right">
        <Button type="primary" onClick={handleSend}>
          Send Email
        </Button>
      </div>
    </div>
  );
}
