import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

export interface LogisticsAddress {
    address: string;
    city: string;
    country: string;
    full_name: string;
    province: string;
    contact_person: string;
    zip: number;
  }
  
  export interface OrderItem {
    quantity: number;
    ae_sku_attr: string | null;
    product: {
      aliexpress_id: string;
    };
  }
  
  interface CustomModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: (address: LogisticsAddress, item: OrderItem) => void;
    orderItem: OrderItem | null;
    orderId: string;
    itemId: number;
  }

const CreateOrderModal: React.FC<CustomModalProps> = ({
    isOpen,
    onCancel,
    onSubmit,
    orderItem,
    orderId,
    itemId,
  }) => {
    const [form] = Form.useForm();
  
    const handleFinish = (values: Omit<LogisticsAddress, 'city' | 'province'>) => {
      const finalValues: LogisticsAddress = {
        ...values,
        city: 'Dhaka',
        province: 'BD',
      };
  
      if (orderItem) {
        onSubmit(finalValues, orderItem);
      }
  
      form.resetFields();
    };
  
    return (
      <Modal title="Order Form" open={isOpen} onCancel={onCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="full_name" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="contact_person" label="Contact Person" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="country" label="Country" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="zip" label="ZIP Code" rules={[{ required: true }]}>
            <Input  />
          </Form.Item>
     
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Order
            </Button>
          </Form.Item>
        </Form>
      </Modal>
  );
};

export default CreateOrderModal;
