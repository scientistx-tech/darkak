'use client';

import React, { useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetSingleProductDetailsQuery } from '@/redux/services/admin/adminProductApis';
import { useCreatePosDataMutation, useGetPosDataQuery } from '../posApiServices';
import { Card, Select, InputNumber, Modal, Typography, Space, Divider, Input } from 'antd';
import Barcode from 'react-barcode';
import Loader from '@/components/shared/Loader';
import { useReactToPrint } from 'react-to-print';
import { VariantItem } from '../type';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import { Key, Printer, PrinterIcon } from 'lucide-react';

const { Title, Text } = Typography;

export default function Page() {
  const query = useSearchParams();
  const productId = query.get('productId');
  const { data, isLoading } = useGetSingleProductDetailsQuery(productId);
  const {
    data: posData,
    isLoading: posLoading,
    refetch,
  } = useGetPosDataQuery({
    id: parseInt(productId as string),
  });
  const [createData, { isLoading: createDataLoading }] = useCreatePosDataMutation();

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState<number>(1);
  const [barcodes, setBarcodes] = useState<string[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [code, setCode] = useState('');
  console.log(parseInt(productId as string));

  // ref for print
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef: printRef });

  if (isLoading || posLoading) return <Loader />;

  const product = data?.product;
  const labelVariants = data?.label_variants || [];

  // Group variants by item (e.g. Color, Size, RAM)
  const groupedVariants: Record<string, any[]> = {};
  labelVariants.forEach((lv: any) => {
    if (!groupedVariants[lv.item.title]) {
      groupedVariants[lv.item.title] = [];
    }
    groupedVariants[lv.item.title].push(lv.option);
  });

  const handleGenerate = async () => {
    if (!product) return;
    if (product?.items?.length !== Object.keys(selectedVariants).length) {
      return toast.warn('Please select all variants');
    }
    if (!code) return toast.warn("Product code can't be empty!");
    try {
      const res = await createData({
        code: code,
        productId: parseInt(productId as string),
        label_variants: Object.entries(selectedVariants).map(([key, val]) => ({
          itemId: parseInt(key), // key is string → convert to number
          optionId: parseInt(val), // val is string → convert to number
        })),
      }).unwrap();
      refetch();
      let arr = [];
      arr.push(res.code);
      setBarcodes(arr);
      setPreviewVisible(true);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCode(code);
  };
  return (
    <div className="p-5">
      <Card>
        <Title level={4}>{product?.title}</Title>
        <Text type="secondary">SKU: {product?.code}</Text>

        <Divider />

        <Space direction="vertical" style={{ width: '100%' }}>
          {/* Render Select for each variant group */}
          <div className="space-y-4 text-2xl">Variants</div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {product?.items.map((item: VariantItem) => (
              <Select
                key={item.id}
                style={{ width: '100%' }}
                placeholder={`Select ${item.title}`}
                onChange={(val) => setSelectedVariants((prev) => ({ ...prev, [item.id]: val }))}
              >
                {item.options.map((opt) => (
                  <Select.Option key={opt.id} value={opt.id}>
                    {opt.title}
                  </Select.Option>
                ))}
              </Select>
            ))}
            <div className="relative">
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="product code..."
                maxLength={7}
                minLength={6}
              />
              <button
                onClick={generateCode}
                className="absolute right-0 top-0 whitespace-nowrap rounded bg-blue-100 p-0.5 text-xs text-blue-600"
              >
                Generate code
              </button>
            </div>
          </div>

          <Button loading={createDataLoading} onClick={handleGenerate}>
            Generate Barcode
          </Button>
        </Space>
        <Divider />
        <div className="w-full">
          <Button
            onClick={() => {
              setBarcodes(posData?.map((d) => d.code) || []);
              setPreviewVisible(true);
            }}
            className="flex"
            Icon={<PrinterIcon />}
          >
            Print All
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {posData?.map((data) => (
            <div
              className="relative flex flex-col gap-2 rounded-md bg-blue-100 p-2 text-gray-6"
              key={data.id}
            >
              <p>
                Product Code: <b>{data.code}</b>
              </p>
              {data.label_variants.map((doc) => (
                <p key={doc.id}>
                  {doc.item.title}: <b>{doc.option.title}</b>
                </p>
              ))}
              <Barcode
                value={data.code}
                className="w-[123px]"
                height={40}
                width={1.2}
                displayValue={false}
                margin={0}
              />
              <button
                onClick={() => {
                  let arr = [];
                  arr.push(data.code);
                  setBarcodes(arr);
                  setPreviewVisible(true);
                }}
                className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-300 text-white hover:bg-purple-300"
              >
                <Printer />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Barcode Print Preview */}
      <Modal
        title="Barcode Preview"
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        width={900}
        footer={[
          <Button className="mx-2" key="print" onClick={handlePrint}>
            Print Only Barcodes
          </Button>,
          <Button className="mx-2 bg-red-400" key="close" onClick={() => setPreviewVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {/* reference div for printing */}
        <div ref={printRef} className="print-area items-center justify-center gap-6">
          {barcodes.map((b) => (
            <div key={b} className="label items-center">
              <div className="text-center text-xs font-bold">{b || 'N/A'}</div>

              <Barcode
                value={b || 'N/A'}
                className="w-[123px]"
                height={40}
                width={1.2}
                displayValue={false}
                margin={0}
              />
            </div>
          ))}
        </div>
      </Modal>

      {/* Print CSS */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden; /* hide everything else */
            align-items: center;
            justify-content: center;
            display: flex;
          }

          .print-area,
          .print-area * {
            visibility: visible; /* show only print div */
          }
          .print-area {
            display: flex;
            flex-wrap: wrap;
            gap: 0px;
            align-items: center;
            justify-content: center;
          }

          .label {
            width: 3.5cm;
            height: 2.5cm;
            padding: 2px;
            border: 1px dashed #ddd;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 10px;

            /* prevent labels from breaking across pages */
            break-inside: avoid;
            page-break-inside: avoid;
            page-break-after: auto;
          }
        }
      `}</style>
    </div>
  );
}
