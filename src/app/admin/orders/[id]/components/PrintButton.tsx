// components/PrintButton.tsx
'use client';

import { pdf, PDFDownloadLink } from '@react-pdf/renderer';
import OrderInvoicePDF from './OrderInvoicePDF';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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

export default function PrintButton({ orderDetails }: { orderDetails: any }) {
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

  const handlePreview = async () => {
   // console.log(orderDetails);
    const blob = await pdf(
      <OrderInvoicePDF imagesBase64={imagesBase64} orderDetails={orderDetails} />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    window.open(url, '_blank'); // open in a new tab
  };
  if (Object.keys(imagesBase64).length === 0) return <Loader/>
  return (
    <div className="flex gap-4">
      {/* Download button */}
      <PDFDownloadLink
        document={<OrderInvoicePDF imagesBase64={imagesBase64} orderDetails={orderDetails} />}
        fileName={`invoice_order_${orderDetails?.id}.pdf`}
      >
        {({ loading }) => (
          <button className="rounded-md border-2 border-blue-500 bg-blue-200 px-6 py-2 text-black transition duration-300 hover:bg-blue-800 hover:text-white">
            {loading ? (
              'Generating...'
            ) : (
              <div className="flex items-center gap-2">
                <Image src="/images/icon/icon_print.png" alt="print-btn" width={20} height={20} />
                <p>Download Invoice</p>
              </div>
            )}
          </button>
        )}
      </PDFDownloadLink>

      {/* Preview button */}
      <button
        onClick={handlePreview}
        className="rounded-md border-2 border-green-500 bg-green-200 px-6 py-2 text-black transition duration-300 hover:bg-green-800 hover:text-white"
      >
        Preview Invoice
      </button>
    </div>
  );
}
