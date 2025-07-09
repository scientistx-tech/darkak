'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Form, Input, Modal, Button, Popconfirm, message } from 'antd';
import { useGetSeoPageDataQuery } from '@/redux/services/admin/adminFAQApi';
import { toast } from 'react-toastify';
import Loading from '@/app/loading';
import axios from 'axios';
import Cookies from 'js-cookie';
const BASE_URL = 'https://api.darkak.com.bd/api';
interface FaqType {
  id: number;
  question: string;
  answer: string;
  date: string;
}

const FaqCart = () => {
  const { data, isLoading, refetch } = useGetSeoPageDataQuery('category');
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqType | null>(null);
  const [loading, setLoading] = useState(false);
  const [faq, setFaq] = useState<any[]>([]);

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
  useEffect(() => {
    if (data && Array.isArray(data?.data?.faq?.faq)) setFaq(data?.data?.faq?.faq);
  }, [data]);

  const handleDelete = async (indexToDelete: number) => {
    try {
      const updatedFaq = faq.filter((_, i) => i !== indexToDelete);
      setFaq(updatedFaq); // Update UI immediately

      const payload = {
        type: 'category',
        meta_title: data.data.meta_title,
        meta_description: data.data.meta_description,
        meta_keywords: data.data.meta_keywords,
        meta_image: data.data.meta_image,
        meta_alt: data.data.meta_alt,
        content: data.data.content || '<p></p>',
        faq: { faq: updatedFaq },
      };

      await axios.post(`${BASE_URL}/admin/page/update-seo`, payload, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      message.success('FAQ deleted');
      refetch();
    } catch (err) {
      message.error('Failed to delete FAQ');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();

      let newFaqList = [...faq];

      if (!editingFaq) {
        const newFaq = { id: Date.now(), ...values };
        newFaqList.push(newFaq);
      } else {
        newFaqList = newFaqList.map((item) =>
          item.id === editingFaq.id ? { ...item, ...values } : item
        );
      }

      // Update both local state and remote data
      setFaq(newFaqList);

      const payload = {
        type: 'category',
        meta_title: data.data.meta_title,
        meta_description: data.data.meta_description,
        meta_keywords: data.data.meta_keywords,
        meta_image: data.data.meta_image,
        meta_alt: data.data.meta_alt,
        content: data.data.content || '<p></p>',
        faq: { faq: newFaqList },
      };

      await axios.post(`${BASE_URL}/admin/page/update-seo`, payload, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      setModalOpen(false);
      refetch();
      form.resetFields();
      toast.success('SEO settings updated!');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to update SEO');
    } finally {
      setLoading(false);
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
            {faq?.map((faq: FaqType, i: number) => (
              <TableRow key={i}>
                <TableCell>{faq.question}</TableCell>
                <TableCell>{faq.answer}</TableCell>
                <TableCell>{new Date(faq.id).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="small" onClick={() => handleEditClick(faq)}>
                      Edit
                    </Button>
                    <Popconfirm
                      title="Are you sure to delete this FAQ?"
                      onConfirm={() => handleDelete(i)}
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

export default FaqCart;
