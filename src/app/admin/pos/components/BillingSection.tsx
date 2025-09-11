'use client';

import React, { useEffect, useState } from 'react';
import { Input, Select, Button, Modal, Form, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { IWishlistItem } from '../type';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const { Option } = Select;

type ProductSectionProps = {
  cart: {
    productId: number;
    title: string;
    stock: number;
    totalPrice: number;
    quantity: number;
    ae_sku_attr?: string;
    options: {
      optionId: number;
      itemId: number;
    }[];
  }[];
  addToCart: (
    product: {
      productId: number;
      title: string;
      stock: number;
      totalPrice: number;
      ae_sku_attr?: string;
      options?: { optionId: number; itemId: number }[];
    },
    quantity?: number
  ) => void;
  removeFromCart: (productId: number, options?: { optionId: number; itemId: number }[]) => void;
  resetCart: () => void;
  setCart: React.Dispatch<
    React.SetStateAction<
      {
        productId: number;
        title: string;
        stock: number;
        totalPrice: number;
        quantity: number;
        ae_sku_attr?: string;
        options: {
          optionId: number;
          itemId: number;
        }[];
      }[]
    >
  >;
};

export default function BillingSection({
  cart,
  removeFromCart,
  resetCart,
  setCart,
  addToCart
}: ProductSectionProps) {
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'offline'>('offline');
  const [openHoldModal, setOpenHoldModal] = useState(false);
  const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);
  const [openExtraDiscount, setOpenExtraDiscount] = useState(false);
  const [openCouponDiscount, setOpenCouponDiscount] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>();
  const [extraDiscount, setExtraDiscount] = useState<number>(0);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const token = useSelector((s: RootState) => s.auth.token)

  const customer = [
    { value: '', label: 'Walking Customer' },
    { value: 'xyz', label: 'Mr. XYZ' },
    { value: 'akash', label: 'Md. Akash' },
  ];

  const filterOption = (input: string, option?: { children: React.ReactNode }) =>
    String(option?.children).toLowerCase().includes(input.toLowerCase());

  const handleQtyChange = (index: number, qty: number) => {
    const updated = [...cart];
    updated[index].quantity = qty;
    setCart(updated);
  };

  const getSubtotal = () => cart.reduce((total, p) => total + p.quantity * p.totalPrice, 0);

  const handlePlaceOrder = () => {
    message.success('Order placed successfully!');
  };

  const handleCancelOrder = () => {
    message.warning('Order has been canceled.');
  };

  const handleAddCustomer = async () => {

  }

  useEffect(() => {
    let buffer = "";
    let timer: NodeJS.Timeout;

    const handleKeydown = (e: KeyboardEvent) => {
      // Ignore special keys
      if (
        e.key === "Shift" ||
        e.key === "Control" ||
        e.key === "Alt" ||
        e.key === "CapsLock" ||
        e.key === "NumLock" ||
        e.key === "Tab"
      ) {
        return;
      }

      // Reset buffer if no input for 300ms
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        buffer = "";
      }, 300);

      if (e.key === "Enter") {
        if (buffer.length > 0) {
          console.log("Scanned Code:", buffer);
          fetchProduct(buffer);
          buffer = "";
        }
      } else {
        buffer += e.key;
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);


  const fetchProduct = async (code: string) => {
    const tId = toast.loading("Barcode scanning....")
    try {
      const res = await fetch(`https://api.darkak.com.bd/api/admin/pos/barcode/${code}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // replace with your token
        },
      }); // API endpoint
      const product = await res.json() as IWishlistItem
      if (!product.product.stock) {
        toast.update(tId, {
          render: "Product is stock out",
          isLoading: false,
          autoClose: 3000,
          type: "error"
        })
        return
      }
      toast.update(tId, {
        render: "Added to cart",
        isLoading: false,
        autoClose: 3000,
        type: "success"
      })

      const price = product?.product?.price ?? 0;
      const discount = product?.product?.discount ?? 0;
      const discountType = product?.product?.discount_type ?? 'flat';

      let finalPrice = price;

      if (discountType === 'percentage') {
        finalPrice = price - (price * discount) / 100;
      } else if (discountType === 'flat') {
        finalPrice = price - discount;
      }
      const optionprice =
        product?.label_variants?.reduce((acc, val) => acc + (val.option.price || 0), 0)

      const subTotal = (finalPrice + optionprice)

      addToCart({
        productId: product.id,
        stock: product.product.stock,
        title: product.product.title,
        totalPrice: subTotal,
        options: [{
          itemId: product.label_variants?.[0]?.itemId,
          optionId: product?.label_variants?.[0]?.optionId
        }]
      })
      return product
    } catch (err: any) {
      console.error("Product not found", err);
      toast.update(tId, {
        render: "Failed to add product",
        isLoading: false,
        autoClose: 3000,
        type: "error"
      })
    }
  };


  return (
    <>
      <div className="mt-5 rounded-lg bg-white p-4 shadow-sm">
        {/* <div className="mb-4 flex w-full justify-end">
          <Button
            onClick={() => setOpenHoldModal(true)}
            type="default"
            className="border-blue-600 text-blue-600"
          >
            View All Hold Orders <span className="ml-2 text-red-500">0</span>
          </Button>
        </div> */}

        <div className="mb-4 flex w-full flex-1 items-center justify-between gap-8">
          <Select
            showSearch
            allowClear
            value={selectedCustomer}
            placeholder="Select Customer"
            className="w-full"
            onChange={(value) => setSelectedCustomer(value)}
            filterOption={filterOption}
          >
            {customer.map((cat) => (
              <Option key={cat.value} value={cat.value}>
                {cat.label}
              </Option>
            ))}
          </Select>

          <Button
            onClick={() => setOpenAddCustomerModal(true)}
            type="primary"
            className="bg-green-600 hover:bg-green-700"
          >
            Add New Customer
          </Button>
        </div>

        <div className="mb-4 flex w-full flex-1 items-end justify-between">
          <div className="w-1/2">
            <p className="font-medium text-black">Customer Information</p>
            <p>
              <span className="mr-5 text-black">Name:</span>Mr. XYZ
            </p>
            <p>
              <span className="mr-4 text-black">Phone:</span>0123456789
            </p>
          </div>
          <Button danger onClick={resetCart}>
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-4 border-b py-2 font-semibold text-gray-700">
          <div>Item</div>
          <div>Qty</div>
          <div>Price</div>
          <div>Delete</div>
        </div>

        {cart?.map((item, idx) => (
          <div key={idx} className="grid grid-cols-4 items-center border-b py-2">
            <div className="truncate">{item.title}</div>

            <div className="flex items-center gap-2 rounded-md border px-2 py-1">
              <button
                onClick={() => handleQtyChange(idx, Math.max(1, item.quantity - 1))}
                className="px-2 text-lg"
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleQtyChange(idx, Math.min(item.quantity + 1, item.stock))}
                disabled={item.quantity >= item.stock} // disable when max reached
                className={`px-2 text-lg ${item.quantity >= item.stock ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                +
              </button>
            </div>

            <div className="font-medium text-gray-700">
              ৳{(item.quantity * item.totalPrice).toFixed(2)}
            </div>
            <div>
              <Button
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => removeFromCart(item.productId, item.options)}
              />
            </div>
          </div>
        ))}

        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Sub Total :</span>
            <span>৳{getSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Product Discount :</span>
            <span>৳0.00</span>
          </div>
          <div className="flex justify-between">
            <span>Extra Discount :</span>
            <span className="flex items-center gap-1">
              ৳{extraDiscount.toFixed(2)}{' '}
              <button onClick={() => setOpenExtraDiscount(true)}>
                <EditOutlined className="text-blue-500" />
              </button>
            </span>
          </div>
          <div className="flex justify-between">
            <span>Coupon Discount :</span>
            <span className="flex items-center gap-1">
              ৳{couponDiscount.toFixed(2)}{' '}
              <button onClick={() => setOpenCouponDiscount(true)}>
                <EditOutlined className="text-blue-500" />
              </button>
            </span>
          </div>
          <div className="flex justify-between">
            <span>Tax :</span>
            <span>৳0.00</span>
          </div>
          <div className="flex justify-between font-semibold text-black">
            <span>Total :</span>
            <span>৳{(getSubtotal() - extraDiscount - couponDiscount).toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700">Paid By:</p>
          <div className="flex gap-3">
            {['offline'].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method as 'online' | 'offline')}
                className={`rounded-md border px-4 py-2 text-sm font-medium transition ${paymentMethod === method
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Button danger className="w-1/2 py-2" onClick={handleCancelOrder}>
            Cancel Order
          </Button>
          <Button type="primary" className="w-1/2 py-2" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </div>
      </div>

      {/* View All Hold Orders */}
      <Modal
        title="View All Hold Orders"
        open={openHoldModal}
        onCancel={() => setOpenHoldModal(false)}
        footer={null}
      >
        <p>Hold orders list will be displayed here.</p>
      </Modal>

      {/* Add New Customer */}
      <Modal
        title="Add New Customer"
        open={openAddCustomerModal}
        onCancel={() => setOpenAddCustomerModal(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={async (values) => {
            console.log('Customer Info:', values);
            message.success('Customer added!');
            setOpenAddCustomerModal(false);
          }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'First name is required' }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Last name is required' }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </div>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: false, message: 'Email is required' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: 'Phone number is required' }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>



          <Form.Item rules={[{ required: true, message: 'Address is required' }]}
            label="Address" name="address">
            <Input.TextArea placeholder="Enter address" rows={3} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save Customer
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Extra Discount */}
      <Modal
        title="Update Discount"
        open={openExtraDiscount}
        onCancel={() => setOpenExtraDiscount(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log('Discount Type:', values.type);
            console.log('Discount Value:', values.value);
            message.success(
              `Discount of ${values.value}${values.type === 'percentage' ? '%' : '৳'} applied!`
            );
            setOpenExtraDiscount(false);
          }}
        >
          <Form.Item
            label="Discount Type"
            name="type"
            initialValue="amount"
            rules={[{ required: true, message: 'Please select a discount type' }]}
          >
            <Select>
              <Select.Option value="amount">Amount</Select.Option>
              <Select.Option value="percentage">Percentage</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Discount Value"
            name="value"
            rules={[{ required: true, message: 'Please enter a discount value' }]}
          >
            <Input placeholder="Enter discount value" type="number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Apply Discount
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Coupon Discount */}
      <Modal
        title="Coupon Discount"
        open={openCouponDiscount}
        onCancel={() => setOpenCouponDiscount(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log('Applied Coupon:', values.coupon);
            message.success(`Coupon "${values.coupon}" applied!`);
            setOpenCouponDiscount(false);
          }}
        >
          <Form.Item
            label="Enter Coupon Code"
            name="coupon"
            rules={[{ required: true, message: 'Please enter a coupon code' }]}
          >
            <Input placeholder="e.g. SAVE10" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Apply Coupon
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

