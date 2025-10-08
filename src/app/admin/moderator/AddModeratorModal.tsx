import { useCreateDeliveryMutation } from '@/redux/services/admin/adminCourierApis';
import {
  useCreateModeratorMutation,
  useUpdateModeratorAccessMutation,
} from '@/redux/services/admin/adminModeratorApis';
import { useUpdateOrderStatusMutation } from '@/redux/services/admin/adminOrderApis';
import { Modal } from 'antd';
import { EmailAuthCredential } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const accessList = [
  'dashboard',
  'pos',
  'product-management',
  'order-all',
  'order-pending',
  'pre-order',
  'order-confirm',
  'order-packaging',
  'order-out-for-delivery',
  'order-delivered',
  'order-returned',
  'order-failed-to-deliver',
  'order-cancelled',
  'refund-request',
  'refund-pending',
  'refund-approved',
  'refund-under-review',
  'refund-refunded',
  'refund-rejected',
  'category',
  'sub-category',
  'sub-sub-category',
  'add-brand',
  'brand-list',
  'attribute',
  'product-list',
  'product-add',
  'bulk-product',
  'restock-product',
  'slider-banner',
  'ali-express-add-product',
  'ali-express-product-list',
  'ali-express-order-list',
  'ali-express-order-all',
  'ali-express-order-pending',
  'ali-express-pre-order',
  'ali-express-order-confirm',
  'ali-express-order-packaging',
  'ali-express-order-out-for-delivery',
  'ali-express-order-delivered',
  'ali-express-order-returned',
  'ali-express-order-failed-to-deliver',
  'ali-express-order-cancelled',
  'customer-list',
  'customer-review',
  'live-message',
  'vendor',
  'add-vendor',
  'vendor-list',
  'vendor-requested-products',
  'vendor-approved-products',
  'vendor-rejected-products',
  'vendor-restock-request',
  'subscriber',
  'moderator',
  'contact',
  'chat',
  'coupon',
  'landing-pages',
  'watch',
  'watch-slider',
  'watch-add-product',
  'watch-product-list',
  'watch-others-content',
  'bag',
  'bag-slider',
  'bag-add-product',
  'bag-product-list',
  'bag-others-content',
  'electronics',
  'electronics-slider',
  'electronics-add-product',
  'electronics-product-list',
  'electronics-others-content',
  'settings',
  'seo',
  'home-seo',
  'category-seo',
  'explore-seo',
  'product-seo',
  'blogs-seo',
  'vendor-seo',
  'contact-us-seo',
  'checkout-seo',
  'about-us-seo',
  'private-policy-seo',
  'terms-condition-seo',
  'return-refund-policy-seo',
  'faq-seo',
  'signup-seo',
  'login-seo',
  'forgot-password-seo',
  'moderator-login-seo',
  'blog',
  'sitemap',
  'redirection',
  'analytics',
  'marketing',
];

const groupedAccessList: Record<string, string[]> = {
  General: ['dashboard', 'pos', 'product-management'],
  OrdersManagement: [
    'order-all',
    'order-pending',
    'pre-order',
    'order-confirm',
    'order-packaging',
    'order-out-for-delivery',
    'order-delivered',
    'order-returned',
    'order-failed-to-deliver',
    'order-cancelled',
  ],
  RefundRequest: [
    'refund-request',
    'refund-pending',
    'refund-approved',
    'refund-under-review',
    'refund-refunded',
    'refund-rejected',
  ],
  ProductsManagement: [
    'category',
    'sub-category',
    'sub-sub-category',
    'add-brand',
    'brand-list',
    'attribute',
    'product-list',
    'product-add',
    'bulk-product',
    'restock-product',
    'slider-banner',
  ],
  AliExpress: [
    'ali-express-add-product',
    'ali-express-product-list',
    'ali-express-order-list',
    'ali-express-order-all',
    'ali-express-order-pending',
    'ali-express-pre-order',
    'ali-express-order-confirm',
    'ali-express-order-packaging',
    'ali-express-order-out-for-delivery',
    'ali-express-order-delivered',
    'ali-express-order-returned',
    'ali-express-order-failed-to-deliver',
    'ali-express-order-cancelled',
  ],
  Customer: ['customer-list', 'customer-review'],
  Vendor: [
    'vendor',
    'add-vendor',
    'vendor-list',
    'vendor-requested-products',
    'vendor-approved-products',
    'vendor-rejected-products',
    'vendor-restock-request',
  ],
  UserManagement: ['subscriber', 'moderator', 'contact', 'chat'],
  PromotionManagement: ['coupon'],
  LandingPageWatch: [
    'watch',
    'watch-slider',
    'watch-add-product',
    'watch-product-list',
    'watch-others-content',
  ],

  LandingPageBag: [
    'bag',
    'bag-slider',
    'bag-add-product',
    'bag-product-list',
    'bag-others-content',
  ],
  LandingPageElectronics: [
    'electronics',
    'electronics-slider',
    'electronics-add-product',
    'electronics-product-list',
    'electronics-others-content',
  ],
  PageSEO: [
    'seo',
    'home-seo',
    'category-seo',
    'explore-seo',
    'product-seo',
    'blogs-seo',
    'vendor-seo',
    'contact-us-seo',
    'checkout-seo',
    'about-us-seo',
    'private-policy-seo',
    'terms-condition-seo',
    'return-refund-policy-seo',
    'faq-seo',
    'signup-seo',
    'login-seo',
    'forgot-password-seo',
    'moderator-login-seo',
  ],
  Others: ['settings', 'blog', 'sitemap', 'redirection', 'analytics'],
};

const AddModeratorModal = ({
  openAddModeratorModal,
  setOpenAddModeratorCourierModal,
  refetch,
  isEditable,
  setIsEditable,
}: {
  openAddModeratorModal: boolean;
  setOpenAddModeratorCourierModal: (value: boolean) => void;
  refetch: () => void;
  isEditable: {
    status: boolean;
    value: { id: number; moderator_access: { access: string }[] };
  };
  setIsEditable: ({
    status,
    value,
  }: {
    status: boolean;
    value: { id: number; moderator_access: { access: string }[] };
  }) => void;
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedAccessList, setSelectedAccessList] = useState<string[]>([]);
  const [confirmAddModeratorLoading, setConfirmAddModeratorLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  console.log('isEditable', isEditable);

  console.log('selectedList', selectedAccessList);

  // redux hooks
  const [createModerator] = useCreateModeratorMutation();
  const [updateModeratorAccess] = useUpdateModeratorAccessMutation();

  useEffect(() => {
    const filteredList = Array.isArray(isEditable?.value?.moderator_access)
      ? isEditable.value.moderator_access
          .map((access: any) => access.access)
          .filter((ac: string) => ac)
      : [];
    setSelectedAccessList(filteredList);

    console.log('fil', filteredList);
  }, [isEditable]);

  const handleAddModeratorModalOk = async () => {
    setConfirmAddModeratorLoading(true);

    try {
      if (isEditable?.status) {
        // Prepare payload
        const payload = {
          accessList: selectedAccessList,
        };
        const id = isEditable?.status && isEditable?.value?.id;
        const res = await updateModeratorAccess({
          id: Number(id),
          data: payload,
        }).unwrap();
        toast.success(res?.message || 'Successfully Update Moderator Access');
      } else {
        // Prepare payload
        const payload = {
          name: fullName,
          email: email,
          password,
          accessList: selectedAccessList,
        };
        const res = await createModerator(payload).unwrap();
        toast.success(res?.message || 'Successfully Created Moderator');
      }
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setConfirmAddModeratorLoading(false);
      setOpenAddModeratorCourierModal(false);
      setIsEditable({
        status: false,
        value: { id: 0, moderator_access: [{ access: '' }] },
      });
    }
  };

  const handleAddModeratorModalCancel = () => {
    setOpenAddModeratorCourierModal(false);
    setIsEditable({
      status: false,
      value: { id: 0, moderator_access: [{ access: '' }] },
    });
  };

  return (
    <Modal
      title={`${isEditable?.status ? 'Edit' : 'Add New'} Moderator ${isEditable?.status ? 'Access' : ''}`}
      open={openAddModeratorModal}
      onOk={handleAddModeratorModalOk}
      confirmLoading={confirmAddModeratorLoading}
      onCancel={handleAddModeratorModalCancel}
    >
      <div className="space-y-4">
        {!isEditable?.status && (
          <>
            {' '}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900">Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded border p-2 text-slate-900"
                type="text"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border p-2 text-slate-900"
                type="email"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900">Password</label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border p-2 pr-10 text-slate-900"
                  type={showPassword ? 'text' : 'password'}
                  name=""
                  id=""
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-900">
            Accessable Section
          </label>

          {/* Show selected items as tags */}
          <div className="mb-2 flex flex-wrap gap-2">
            {selectedAccessList.length === 0 ? (
              <span className="text-xs text-gray-500">No section selected</span>
            ) : (
              selectedAccessList.map((ac) => (
                <span
                  key={ac}
                  className="flex items-center gap-1 rounded bg-gray-200 px-2 py-1 text-xs"
                >
                  {ac}
                  <button
                    type="button"
                    className="ml-1 text-red-500 hover:text-red-700"
                    onClick={() =>
                      setSelectedAccessList(selectedAccessList.filter((item) => item !== ac))
                    }
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Dropdown for picking one and pushing to array */}
          <select
            className="w-full rounded border p-2 text-slate-900"
            value=""
            onChange={(e) => {
              const selected = e.target.value;
              if (selected && !selectedAccessList.includes(selected)) {
                setSelectedAccessList([...selectedAccessList, selected]);
              }
              e.target.value = '';
            }}
          >
            <option value="">Select Section</option>

            {Object.entries(groupedAccessList).map(([category, items]) => (
              <optgroup key={category} label={category}>
                {items
                  .filter((ac) => !selectedAccessList.includes(ac))
                  .map((ac) => (
                    <option key={ac} value={ac}>
                      {ac.replace(/-/g, ' ')}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default AddModeratorModal;
