'use client';

import React, { useEffect, useState } from 'react';
import { PlusOutlined, MinusOutlined, CheckOutlined } from '@ant-design/icons';
import { Input, Button, notification, Checkbox, Modal } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import product1 from '@/Data/Demo/product-2-1.png';
import product2 from '@/Data/Demo/product-2-3.png';
import product3 from '@/Data/Demo/product-2-4.png';
import SendButton from '@/components/Button/SendButton';
import {
  useDeleteCartMutation,
  useGetMyCartQuery,
  useUpdateCartMutation,
} from '@/redux/services/client/myCart';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useOrderCartProductsMutation,
  useOrderSingleProductMutation,
} from '@/redux/services/client/checkout';
import { setCart } from '@/redux/slices/authSlice';
import { BD_Division, BD_District } from '@/Data/addressData';
import { useCheckCouponCodeMutation } from '@/redux/services/client/applyCoupon';

const initialProducts = [
  {
    id: 1,
    name: 'iPhone 16 Pro',
    variant: '128GB, AUS, Black Titanium',
    price: 132500,
    image: product1,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Galaxy A56 5G',
    variant: 'Graphite, 8/128GB',
    price: 43000,
    image: product2,
    quantity: 1,
  },
  {
    id: 3,
    name: 'Xiaomi Pad 7',
    variant: 'Black, 8/256GB, Without Book Cover',
    price: 45500,
    image: product3,
    quantity: 1,
  },
];

const CartCheckout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [division, setDivision] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [area, setArea] = useState('');
  const [agree, setAgree] = useState(true);
  const [checkoutItems, setCheckoutItems] = useState<any>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<any>({});

  const [deleteCart] = useDeleteCartMutation();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [cartUpdate] = useUpdateCartMutation();
  const [applyCoupon] = useCheckCouponCodeMutation();

  const user = useSelector((state: RootState) => state.auth.user);

  const { data, isLoading, isError, refetch } = useGetMyCartQuery();
  const [createOrder] = useOrderCartProductsMutation();

  // ✅ Load checkout_items from localStorage when component mounts
  useEffect(() => {
    const storedItems = localStorage.getItem('checkout_items');
    console.log('stored items', storedItems);

    if (storedItems) {
      setCheckoutItems(JSON.parse(storedItems));
    } else {
      router.push('/cart'); // redirect if nothing in storage
    }

    // ✅ Clear on browser unload
    const handleBeforeUnload = () => {
      localStorage.removeItem('checkout_items');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);

  // ✅ Clear on route change (SPA navigation)
  useEffect(() => {
    // When pathname changes, check and clear localStorage if needed
    if (!pathname.includes('checkout')) {
      localStorage.removeItem('checkout_items');
    }
  }, [pathname]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  // For right side

  const updateQuantity = (id: number, type: 'inc' | 'dec') => {
    console.log('id', id, 'type', type);
    const updated = checkoutItems.map((item: any) => {
      if (item.id === id) {
        let newQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
        handleUpdate(id, newQty);
        return { ...item, quantity: newQty < 1 ? 1 : newQty };
      }
      return item;
    });
    setCheckoutItems(updated);
  };
  const handleUpdate = async (id: number, quantity: number) => {
    try {
      await cartUpdate({ id, quantity }).unwrap(); // call API with ID
    } catch (error) {
      console.error('Delete failed:', error);
      // Optional: show toast or notification
      toast.error('Failed to update!');
    }
  };
  const subtotal = checkoutItems.reduce((acc: number, item: any) => {
    const price = item.product?.price ?? 0;
    const discount = item.product?.discount ?? 0;
    const discountType = item.product?.discount_type ?? 'flat';

    let finalPrice = price;

    if (discountType === 'percentage') {
      finalPrice = price - (price * discount) / 100;
    } else if (discountType === 'flat') {
      finalPrice = price - discount;
    }

    return acc + finalPrice * item.quantity;
  }, 0);
  console.log('cartitem', checkoutItems);

  const handleCheckout = async () => {
    const productIds = checkoutItems.map((item: any) => item.id);
    const payload = {
      userId: user?.id,
      name: fullName,
      email,
      phone,
      division,
      district,
      sub_district: subDistrict,
      area,
      paymentType: 'cod',
      cartIds: productIds,
      deliveryFee: district === 'Dhaka' ? 60 : 120,
      order_type: !checkoutItems[0].product?.user?.isSeller ? 'in-house' : 'vendor',
    };
    try {
      const res = await createOrder(payload).unwrap();

      dispatch(setCart(Math.random()));
      toast.success(res?.message || 'Order placed successfully!');
      router.push(`/order-placed/${res?.order?.orderId}`);
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  };

  // For dependent district dropdown using addressData.ts
  const divisionOptions = BD_Division.divisions;
  const districtOptions = division
    ? BD_District.districts.filter(
        (d) => d.division_id === divisionOptions.find((div) => div.name === division)?.id
      )
    : [];

  const handleApplyCoupon = async () => {
    const visitorId = localStorage.getItem('visitorId');
    const productIds = checkoutItems.map((item: any) => item.productId);

    const payload: {
      total: number;
      userId?: number;
      productIds: number[];
      visitorId: string;
    } = {
      total: subtotal,
      productIds: productIds,
      visitorId: visitorId || 'saa-adas-as',
    };

    if (user && user?.id) {
      payload.userId = Number(user?.id);
    }

    console.log('payload ofr coupon', payload);

    try {
      const res = await applyCoupon({
        code: couponCode,
        data: payload,
      }).unwrap();
      toast.success(res?.message || 'Coupon Applied');
      setCouponDiscount(res?.coupon);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  console.log('coupon', couponDiscount);

  return (
    <div className="px-2 py-6 md:container md:mx-auto md:px-4 xl:px-6">
      {/* Animated Info Alert */}
      <AnimatePresence mode="wait">
        <motion.div
          key={paymentMethod}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="mb-6 rounded border border-primaryBlue bg-[#E6EFFF] px-2 py-1.5 text-center text-primaryBlue md:px-4 md:py-3"
        >
          {paymentMethod === 'cash' ? (
            <>
              অর্ডার সংক্রান্ত যেকোনো প্রয়োজনে কথা বলুন আমাদের কাস্টমার সার্ভিস প্রতিনিধির সাথে -{' '}
              <strong> 01915665089</strong>
            </>
          ) : (
            <>
              অনলাইন পেমেন্ট সংক্রান্ত সহায়তার জন্য হেল্পলাইন - <strong> 01915665089</strong>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Payment Method */}
      <div className="flex w-full flex-col gap-4 p-4 md:flex-row md:p-0">
        {/* left-side */}
        <div className="w-full md:w-1/2">
          {contextHolder}
          <p className="text-xl font-medium md:text-2xl">Payment Method</p>

          <div className="mt-5 flex w-full justify-evenly rounded border border-primaryBlue bg-[#E6EFFF] px-2 py-1 transition-all duration-500 md:w-[90%] md:px-3 md:py-2">
            <button
              className={`flex items-center gap-2 rounded px-3 py-1 font-medium transition-all duration-300 md:px-3 md:py-1.5 ${
                paymentMethod === 'cash'
                  ? 'bg-primaryBlue text-white'
                  : 'text-black hover:bg-slate-50 hover:text-primaryBlue'
              }`}
              onClick={() => setPaymentMethod('cash')}
            >
              {paymentMethod === 'cash' && <CheckOutlined className="text-xl" />}
              Cash on Delivery
            </button>

            <button
              className={`flex items-center gap-2 rounded px-3 py-1.5 font-medium transition-all duration-300 ${
                paymentMethod === 'online'
                  ? 'bg-primaryBlue text-white'
                  : 'text-black hover:bg-slate-50 hover:text-primaryBlue'
              }`}
              // onClick={() => setPaymentMethod("online")}
            >
              {paymentMethod === 'online' && <CheckOutlined className="text-xl" />}
              Online Payment
            </button>
          </div>

          <div className="mt-5 md:mt-10">
            <h2 className="mb-3 text-lg font-semibold">Billing Details</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Full Name */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Full Name <span className="text-primaryBlue">*</span>
                </label>
                <Input
                  placeholder="Full Name"
                  className="border border-primaryBlue px-3 py-2"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {/* Email */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email Address <span className="text-primaryBlue">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="border border-primaryBlue px-3 py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Phone Number <span className="text-primaryBlue">*</span>
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Phone Number"
                      className="border border-primaryBlue px-3 py-2"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {/* Division */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Division <span className="text-primaryBlue">*</span>
                  </label>
                  <select
                    className="w-full rounded border border-primaryBlue px-3 py-2"
                    value={division}
                    onChange={(e) => {
                      setDivision(e.target.value);
                      setDistrict(''); // reset district when division changes
                    }}
                    required
                  >
                    <option value="">Select Division</option>
                    {divisionOptions.map((div) => (
                      <option key={div.id} value={div.name}>
                        {div.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    District <span className="text-primaryBlue">*</span>
                  </label>
                  <select
                    className="w-full rounded border border-primaryBlue px-3 py-2"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                    disabled={!division}
                  >
                    <option value="">
                      {division ? 'Select District' : 'Select Division First'}
                    </option>
                    {districtOptions.map((dist) => (
                      <option key={dist.id} value={dist.name}>
                        {dist.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {/* Sub-district */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Sub-district / Upazila <span className="text-primaryBlue">*</span>
                  </label>
                  <Input
                    placeholder="e.g., Dhanmondi"
                    className="border border-primaryBlue px-3 py-2"
                    value={subDistrict}
                    onChange={(e) => setSubDistrict(e.target.value)}
                    required
                  />
                </div>

                {/* Delivery Area */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Delivery Area / Address <span className="text-primaryBlue">*</span>
                  </label>
                  <Input
                    placeholder="e.g., House #12, Road #5"
                    className="border border-primaryBlue px-3 py-2"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Additional Address Notes <span className="text-primaryBlue">*</span>
                </label>
                <Input.TextArea
                  placeholder="Additional address details"
                  className="border border-primaryBlue px-3 py-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {/* Agreement Checkbox */}
              <Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} required>
                I have read and agree to the{' '}
                <button onClick={showModal} className="text-primaryBlue">
                  Terms and Conditions
                </button>{' '}
                and{' '}
                <button onClick={showModal2} className="text-primaryBlue">
                  Privacy Policy
                </button>
              </Checkbox>
            </form>

            <div className="mt-5 hidden md:block">
              <button
                className="rounded-full bg-blue-950 px-6 py-2 text-white"
                onClick={handleCheckout}
              >
                Order
              </button>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full md:w-1/2 md:pl-[10%]">
          <h2 className="mb-0 mt-5 text-lg font-semibold md:mb-3">Your Order</h2>

          {checkoutItems?.map((item: any) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 border-b pb-3 pt-3"
            >
              <Image
                src={item.product.thumbnail}
                alt={item.product.title}
                width={64}
                height={64}
                className="rounded"
              />
              <div className="flex-1">
                <div className="text-sm font-semibold">{item?.product?.title}</div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {item?.cart_items &&
                    item?.cart_items.map((cart_item: any, i: number) => (
                      <div key={i} className="text-xs text-blue-600">
                        {cart_item?.option?.title}
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="font-semibold text-black">
                  {(() => {
                    const price = item?.product?.price ?? 0;
                    const discount = item?.product?.discount ?? 0;
                    const discountType = item?.product?.discount_type ?? 'flat';
                    let finalPrice = price;

                    if (discountType === 'percentage') {
                      finalPrice = price - (price * discount) / 100;
                    } else if (discountType === 'flat') {
                      finalPrice = price - discount;
                    }

                    return finalPrice * item.quantity;
                  })()}
                </div>

                <div className="flex">
                  <button
                    onClick={() => updateQuantity(item.id, 'dec')}
                    className="bg-primaryBlue px-1.5 py-1 text-white opacity-80 transition-all duration-300 hover:opacity-100"
                  >
                    <MinusOutlined />
                  </button>
                  <p className="w-[30px] border border-primaryBlue text-center text-xl text-black opacity-80">
                    {item.quantity}
                  </p>
                  <button
                    onClick={() => updateQuantity(item.id, 'inc')}
                    className="bg-primaryBlue px-1.5 py-1 text-white opacity-80 transition-all duration-300 hover:opacity-100"
                  >
                    <PlusOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {couponDiscount?.id ? (
            <p className="animate-bounce py-3 text-right font-bold text-teal-400">Coupon Applied</p>
          ) : (
            <div className="mt-3 flex items-center gap-2">
              <Input
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon Code"
                className="flex-1"
              />
              <Button onClick={handleApplyCoupon} type="primary">
                Apply
              </Button>
            </div>
          )}

          <div className="mt-5 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>BDT {subtotal}</span>
            </div>
            <div className="flex justify-between text-primaryBlue">
              <span>Delivery Charge</span>
              <span>will be added</span>
            </div>
            {couponDiscount?.id && (
              <div className="flex justify-between text-primaryBlue">
                <span>Coupon Discount</span>
                <span>{`-${couponDiscount?.discount_type === 'flat' ? 'Tk' : ''} ${couponDiscount?.discount_amount}${couponDiscount?.discount_type === 'percentage' ? '%' : ''} `}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-semibold text-black">
              <span>Total</span>
              <span>
                BDT{' '}
                {couponDiscount?.id
                  ? couponDiscount?.discount_type === 'flat'
                    ? subtotal - couponDiscount?.discount_amount
                    : subtotal - subtotal * (couponDiscount?.discount_amount / 100)
                  : subtotal}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 block md:hidden">
          <button
            className="w-full rounded-full bg-blue-950 px-6 py-2 text-white"
            onClick={handleCheckout}
          >
            Order
          </button>
        </div>
      </div>

      <Modal
        title="Terms and Conditions - Darkak"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <p>
          By placing an order on <strong>Darkak</strong>, you agree to our terms and conditions.
          Please review the following before completing your purchase.
        </p>
        <p>
          All orders are subject to availability and confirmation of the order price. We reserve the
          right to refuse or cancel any order at our discretion.
        </p>
        <p>
          Once your order is placed, you will receive an order confirmation. Shipping times may vary
          based on your location and selected delivery method.
        </p>
        <p>
          Please ensure your shipping information is accurate. Darkak is not responsible for orders
          delivered to incorrect addresses provided by the customer.
        </p>
        <p>
          For any return, refund, or cancellation, please review our dedicated policies listed on
          our website or contact customer support.
        </p>
      </Modal>

      <Modal
        title="Privacy Policy - Darkak"
        open={isModalOpen2}
        onCancel={handleCancel2}
        footer={false}
      >
        <p>
          <strong>Darkak</strong> values your privacy. We collect your personal data during checkout
          to process your order and provide support.
        </p>
        <p>
          The data collected includes your name, shipping address, contact details, and payment
          method. This information is securely stored and never shared with third parties without
          your consent.
        </p>
        <p>
          We may use your contact details to send order updates or promotional offers. You can opt
          out at any time.
        </p>
        <p>
          By continuing with your order, you consent to our privacy practices. For more details,
          please refer to the full Privacy Policy page.
        </p>
      </Modal>
    </div>
  );
};

export default CartCheckout;
