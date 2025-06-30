'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Modal, Button } from 'antd';
import { useGetPageBannerQuery } from '@/redux/services/admin/adminBannerApi';
import BannerForm from './Banner';
 // Adjust the import path if needed

const BannerTable = () => {
  const { data, isLoading, error, refetch } = useGetPageBannerQuery(undefined);
  const banners = data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <div className="overflow-x-auto rounded-md border p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">All Banners</h2>
        <Button type="primary" onClick={showModal}>
          Add Banner
        </Button>
      </div>

      {isLoading ? (
        <p>Loading banners...</p>
      ) : error ? (
        <p>Error loading banners.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 font-medium text-gray-700">Image</th>
              <th className="px-4 py-2 font-medium text-gray-700">Type</th>
              <th className="px-4 py-2 font-medium text-gray-700">Title</th>
              <th className="px-4 py-2 font-medium text-gray-700">Details</th>
              <th className="px-4 py-2 font-medium text-gray-700">Product</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {banners.map((banner: any) => (
              <tr key={banner._id}>
                <td className="px-4 py-2">
                  {banner.image ? (
                    <Image
                      src={banner.image}
                      alt="Banner"
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-4 py-2 capitalize">{banner.type}</td>
                <td className="px-4 py-2">{banner.title}</td>
                <td className="px-4 py-2">{banner.details}</td>
                <td className="px-4 py-2">{banner?.productId || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Ant Design Modal with BannerForm inside */}
      <Modal
        title="Add New Banner"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      
      >
        <BannerForm
            onSuccess={() => {
                handleCancel();  // ✅ Close the modal
                refetch();       // ✅ Optionally reload banner list
              }} />
      </Modal>
    </div>
  );
};

export default BannerTable;
