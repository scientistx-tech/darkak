// components/PrintButton.tsx
'use client';

import { pdf, PDFDownloadLink } from '@react-pdf/renderer';
import OrderInvoicePDF from './OrderInvoicePDF';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdFileDownload } from 'react-icons/md';
import { Loader } from 'lucide-react';

export async function fetchBase64Image(url: string): Promise<string> {
  try {
    const apiUrl = `/api/image?url=${encodeURIComponent(url)}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data.base64Image || '';
  } catch (error) {
    console.error('Failed to fetch base64 image', error);
    return '';
  }
}

export default function MiniButton({ orderDetails }: { orderDetails: any }) {
  //console.log('orderDetails print', orderDetails);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imagesBase64, setImagesBase64] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadImages() {
      const map: Record<string, string> = {};
      for (const item of orderDetails.order_items) {
        if (item.product?.thumbnail) {
          map[item.product.title] = await fetchBase64Image(item.product.thumbnail);
        }
      }
      setImagesBase64(map);
    }
    loadImages();
  }, [orderDetails]);

  if (Object.keys(imagesBase64).length === 0) return <Loader />;
  return (
    <PDFDownloadLink
      document={<OrderInvoicePDF imagesBase64={imagesBase64} orderDetails={orderDetails} />}
      fileName={`invoice_order_${orderDetails?.id}.pdf`}
    >
      {({ loading }) => (
        <button className="rounded-full bg-teal-100 p-1 text-base text-teal-700 hover:bg-teal-50">
          <MdFileDownload />
        </button>
      )}
    </PDFDownloadLink>
  );
}
