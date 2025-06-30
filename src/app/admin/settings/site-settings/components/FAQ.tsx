'use client';

import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  useGetFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from '@/redux/services/admin/adminFAQApi';
import { toast } from 'react-toastify';


type FaqType = {
  id: number;
  question: string;
  answer: string;
  date: string;
};

const FaqManager = () => {
  const { data, isLoading, refetch } = useGetFaqQuery();
  const [createFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqType | null>(null);
console.log("Faq =",data)
  const handleAddClick = () => {
    setEditingFaq(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEditClick = (faq: FaqType) => {
    setEditingFaq(faq);
    form.setFieldsValue(faq);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFaq(id).unwrap();
      message.success('FAQ deleted');
      refetch();
    } catch {
      message.error('Failed to delete FAQ');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        date: new Date().toISOString(),
      };

      if (editingFaq) {
        await updateFaq({ id: editingFaq.id, data: values }).unwrap();
        // message.success('FAQ updated');
        toast.success('FAQ updated');
      } else {
        await createFaq(payload).unwrap();
        // message.success('FAQ created');
          toast.success('FAQ updated');
      }

      setModalOpen(false);
      refetch();
      form.resetFields();
    } catch (err) {
      message.error('Something went wrong');
    }
  };

  const columns: ColumnsType<FaqType> = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: FaqType) => (
        <div className="flex gap-2">
          <Button
            size="small"
            color="cyan"
            variant="outlined"
            onClick={() => handleEditClick(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this FAQ?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">FAQ Management</h2>
          <Button type="primary" onClick={handleAddClick}>
            Add FAQ
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data?.faq || []}
          rowKey="id"
          loading={isLoading}
          bordered
          pagination={{ pageSize: 8 }}
          scroll={{ x: 'max-content' }}
          className="w-full overflow-x-auto"
        />

        <Modal
          title={editingFaq ? 'Update FAQ' : 'Create FAQ'}
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          onOk={handleSubmit}
          okText={editingFaq ? 'Update' : 'Create'}
        >
          <Form layout="vertical" form={form}>
            <Form.Item
              name="question"
              label="Question"
              rules={[{ required: true, message: 'Please enter a question' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="answer"
              label="Answer"
              rules={[{ required: true, message: 'Please enter an answer' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default FaqManager;
