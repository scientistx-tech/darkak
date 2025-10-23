'use client';
import React, { useState } from 'react';
import { DatePicker, Input, Select, Button } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

// Define a strong filter type
export interface FilterValues {
  paymentType?: string;
  transactionId?: string;
  phoneNumber?: string;
  dateRange?: [string, string];
}

export interface OnlineFilterProps {
  onFilterChange?: (filters: FilterValues) => void;
}

const OnlineFilter: React.FC<OnlineFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterValues>({
    paymentType: undefined,
    transactionId: undefined,
    phoneNumber: undefined,
    dateRange: undefined,
  });

  const handleChange = <K extends keyof FilterValues>(key: K, value: FilterValues[K]) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const handleReset = () => {
    const resetFilters: FilterValues = {
      paymentType: undefined,
      transactionId: undefined,
      phoneNumber: undefined,
      dateRange: undefined,
    };
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  return (
    <div className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-5 mt-5 flex w-full items-end justify-evenly gap-4">
        {/* Payment Type */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Payment Type</label>
          <Select
            placeholder="Select Payment Type"
            value={filters.paymentType}
            onChange={(value) => handleChange('paymentType', value)}
            allowClear
            style={{ width: 200 }}
            size="large"
          >
            <Option value="MasterCard">MasterCard</Option>
            <Option value="Visa Card">Visa Card</Option>
            <Option value="Mobile Banking">Mobile Banking</Option>
          </Select>
        </div>

        {/* Transaction ID */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Transaction ID</label>
          <Input
            placeholder="Enter Transaction ID"
            value={filters.transactionId}
            onChange={(e) => handleChange('transactionId', e.target.value)}
            style={{ width: 200 }}
            size="large"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Phone Number</label>
          <Input
            placeholder="Enter Phone Number"
            value={filters.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            style={{ width: 200 }}
            size="large"
          />
        </div>

        {/* Date Range */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Date Range</label>
          <RangePicker
            value={
              filters.dateRange ? [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])] : null
            }
            onChange={(dates, dateStrings) =>
              handleChange('dateRange', dateStrings as [string, string])
            }
            size="large"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Action Button</label>
          <div className="mt-1 flex gap-2">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => onFilterChange?.(filters)}
              size="large"
            >
              Search
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleReset} size="large" danger>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineFilter;
