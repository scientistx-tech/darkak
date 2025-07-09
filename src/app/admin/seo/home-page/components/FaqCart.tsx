'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Form, Input, Modal, Button, Popconfirm, message } from 'antd';
import {
  useGetFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from '@/redux/services/admin/adminFAQApi';
import { toast } from 'react-toastify';
import Loading from '@/app/loading';

interface FaqType {
  id: number;
  question: string;
  answer: string;
  date: string;
}

const FaqManager = () => {
  const { data, isLoading, refetch } = useGetFaqQuery();
  const [createFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqType | null>(null);

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
        toast.success('FAQ updated');
      } else {
        await createFaq(payload).unwrap();
        toast.success('FAQ created');
      }

      setModalOpen(false);
      refetch();
      form.resetFields();
    } catch (err) {
      message.error('Something went wrong');
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-md bg-white p-4 shadow-md dark:bg-dark">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark dark:text-white">FAQ Management</h2>
        <Button type="primary" onClick={handleAddClick}>
          Add FAQ
        </Button>
      </div>

      <div className="overflow-x-auto rounded border dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Answer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.faq?.map((faq: FaqType) => (
              <TableRow key={faq.id}>
                <TableCell>{faq.question}</TableCell>
                <TableCell>{faq.answer}</TableCell>
                <TableCell>{new Date(faq.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="small" onClick={() => handleEditClick(faq)}>
                      Edit
                    </Button>
                    <Popconfirm
                      title="Are you sure to delete this FAQ?"
                      onConfirm={() => handleDelete(faq.id)}
                    >
                      <Button size="small" danger>
                        Delete
                      </Button>
                    </Popconfirm>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && <Loading />}
      </div>

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
  );
};

export default FaqManager;
