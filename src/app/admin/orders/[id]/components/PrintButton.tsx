// components/PrintButton.tsx
"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderInvoicePDF from "./OrderInvoicePDF";
import Image from "next/image";

export default function PrintButton({ orderDetails }: { orderDetails: any }) {
  return (
    <PDFDownloadLink
      document={<OrderInvoicePDF orderDetails={orderDetails} />}
      fileName={`invoice_order_${orderDetails?.id}.pdf`}
    >
      {({ loading }) => (
        <button className="rounded-md border-2 border-blue-500 bg-blue-200 px-6 py-2 text-black transition duration-300 hover:bg-blue-800 hover:text-white">
          {loading ? (
            "Generating..."
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src="/images/icon/icon_print.png"
                alt="print-btn"
                width={20}
                height={20}
              />
              <p>Download Invoice</p>
            </div>
          )}
        </button>
      )}
    </PDFDownloadLink>
  );
}
