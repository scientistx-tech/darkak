'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DatePicker, Input, Select, Button } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

export interface FilterValues {
  paymentType?: string;
  transactionId?: string;
  phoneNumber?: string;
  dateRange?: [string, string];
}

export default function OnlineFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname()
  const [filters, setFilters] = useState<FilterValues>({
    paymentType: searchParams.get('paymentType') || undefined,
    transactionId: searchParams.get('tranId') || undefined,
    phoneNumber: searchParams.get('phone') || undefined,
    dateRange: searchParams.get('dateFrom') && searchParams.get('dateTo')
      ? [searchParams.get('dateFrom')!, searchParams.get('dateTo')!]
      : undefined,
  });

  const updateUrl = (newFilters: FilterValues, page = 1) => {
    const params = new URLSearchParams();
    if (newFilters.paymentType) params.set('paymentType', newFilters.paymentType);
    if (newFilters.transactionId) params.set('tranId', newFilters.transactionId);
    if (newFilters.phoneNumber) params.set('phone', newFilters.phoneNumber);
    if (newFilters.dateRange) {
      params.set('dateFrom', newFilters.dateRange[0]);
      params.set('dateTo', newFilters.dateRange[1]);
    }
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = () => updateUrl(filters, 1);
  const handleReset = () => {
    setFilters({});
    updateUrl({}, 1);
  };

  return (
    <div className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">
      {/* Payment Type */}
      <Select
        placeholder="Payment Type"
        value={filters.paymentType}
        onChange={(value) => setFilters(f => ({ ...f, paymentType: value }))}
        allowClear
        style={{ width: 200 }}
      >
        <Option value="cod">Cash on Delivery</Option>
        <Option value="online">Online</Option>
        <Option value="pos">POS</Option>
      </Select>

      {/* Transaction ID */}
      <Input
        placeholder="Transaction ID"
        value={filters.transactionId}
        onChange={e => setFilters(f => ({ ...f, transactionId: e.target.value }))}
        style={{ width: 200 }}
      />

      {/* Phone */}
      <Input
        placeholder="Phone"
        value={filters.phoneNumber}
        onChange={e => setFilters(f => ({ ...f, phoneNumber: e.target.value }))}
        style={{ width: 200 }}
      />

      {/* Date Range */}
      <RangePicker
        value={filters.dateRange ? [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])] : null}
        onChange={(dates, dateStrings) => setFilters(f => ({ ...f, dateRange: dateStrings as [string, string] }))}
      />

      <Button onClick={handleSearch}>Search</Button>
      <Button onClick={handleReset} danger>Reset</Button>
    </div>
  );
}
