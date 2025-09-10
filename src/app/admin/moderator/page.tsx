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
import { useRouter } from 'next/navigation';
import AddModeratorModal from './AddModeratorModal';
import {
  useDeleteModeratorMutation,
  useGetAllModeratorQuery,
  useUpdateModeratorStatusMutation,
} from '@/redux/services/admin/adminModeratorApis';
import { Skeleton } from '@/components/ui/skeleton';
import * as Switch from '@radix-ui/react-switch';
import { toast } from 'react-toastify';
import RequireAccess from '@/components/Layouts/RequireAccess';
import { Modal } from 'antd';

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

const Page = () => {
  const [openAddModeratorModal, setOpenAddModeratorCourierModal] = useState(false);
  const [isEditable, setIsEditable] = useState<{
    status: boolean;
    value: { id: number; moderator_access: { access: string }[] };
  }>({
    status: false,
    value: { id: 0, moderator_access: [] },
  });
  const router = useRouter();

  const { data: moderatorsData, isLoading, error, refetch } = useGetAllModeratorQuery({});
  const [deleteModerator] = useDeleteModeratorMutation();
  const [changeModeratorStatus] = useUpdateModeratorStatusMutation();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedModerator, setSelectedModerator] = useState<any>(null);

  return (
    <RequireAccess permission="moderator">
      <div className="text-slate-950">
        <h2 className="text-2xl font-bold">Moderator</h2>
        <p>Split the works of Admin.</p>

        <div className="mt-10 rounded-lg bg-white p-6 shadow-md">
          {/* button */}
          <div className="flex items-center justify-end">
            <div className="">
              <button
                onClick={() => setOpenAddModeratorCourierModal(true)}
                className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                <p>+</p>
                <span>Add Moderator</span>
              </button>
            </div>
          </div>

          <div className="my-8">
            <Table>
              <TableHeader>
                <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Access List</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={6}>
                        <Skeleton className="h-8" />
                      </TableCell>
                    </TableRow>
                  ))}

                {!isLoading && moderatorsData?.data?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No scripts found.
                    </TableCell>
                  </TableRow>
                ) : (
                  moderatorsData?.data?.map((doc: any) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc?.name}</TableCell>
                      <TableCell>{doc?.email}</TableCell>
                      <TableCell>
                        {new Date(doc?.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TableCell>

                      <TableCell>
                        <div className="flex flex-col gap-2">
                          {Object.entries(groupedAccessList).map(([category, accesses]) => {
                            // Filter which accesses this moderator has for this category
                            const moderatorAccesses = doc?.moderator_access
                              ?.map((a: any) => a.access)
                              .filter((a: string) => accesses.includes(a));

                            if (!moderatorAccesses || moderatorAccesses.length === 0) return null;

                            return (
                              <div key={category}>
                                <p className="text-sm font-semibold text-gray-700">{category}</p>
                                <div className="flex flex-wrap gap-1">
                                  {moderatorAccesses.map((access: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="rounded bg-teal-100 px-2 py-0.5 text-base text-teal-700"
                                    >
                                      {access}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Switch.Root
                          checked={!doc?.isBlocked}
                          onCheckedChange={async (checked) => {
                            try {
                              const res = await changeModeratorStatus(doc.id).unwrap();
                              refetch();
                              toast.success(res?.message || 'Moderator Status Updated!');
                            } catch (err: any) {
                              toast.error(
                                err?.data?.message || 'Failed to Update Moderator status'
                              );
                            }
                          }}
                          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
                        >
                          <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
                        </Switch.Root>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={async () => {
                              setOpenAddModeratorCourierModal(true);
                              setIsEditable({ status: true, value: doc });
                            }}
                            // disabled={isDeleting}
                            className="text-blue-600 hover:underline"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => {
                              setSelectedModerator(doc);
                              setOpenDeleteModal(true);
                            }}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <AddModeratorModal
          openAddModeratorModal={openAddModeratorModal}
          setOpenAddModeratorCourierModal={setOpenAddModeratorCourierModal}
          refetch={refetch}
          isEditable={isEditable}
          setIsEditable={setIsEditable}
        />
      </div>

      <Modal
        title="Confirm Delete"
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        footer={[
          <button
            key="cancel"
            onClick={() => setOpenDeleteModal(false)}
            className="rounded bg-gray-200 px-4 py-1 hover:bg-gray-300"
          >
            Cancel
          </button>,
          <button
            key="delete"
            onClick={async () => {
              try {
                await deleteModerator(selectedModerator.id).unwrap();
                refetch();
                toast.success('Moderator Deleted Successfully');
                setOpenDeleteModal(false);
              } catch (error: any) {
                toast.error(error?.data?.message || 'Failed to delete moderator');
              }
            }}
            className="ml-5 rounded bg-red-600 px-4 py-1 text-white hover:bg-red-700"
          >
            Delete
          </button>,
        ]}
      >
        <p>
          Are you sure you want to delete <b>{selectedModerator?.name}</b>?
        </p>
      </Modal>
    </RequireAccess>
  );
};

export default Page;
