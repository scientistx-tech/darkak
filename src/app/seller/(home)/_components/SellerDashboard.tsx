'use client';
import { useDashboardDataQuery } from '@/redux/services/admin/adminDashboard';
import React, { useState } from 'react';
import { BarChart3, BarChart4, ArrowUp, ArrowDown } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ModeratorLandingPage from '@/app/admin/(home)/components/ModeratorDashboard';
import FinancialCards from '@/app/admin/(home)/components/FinancialCards';
import SummaryCards from '@/app/admin/(home)/components/SummaryCards';
import OrderStatusCards from '@/app/admin/(home)/components/OrderStatusCards';
import TopCustomers from '@/app/admin/(home)/components/TopCustomers';
import EarningStatistics from '@/app/admin/(home)/components/EarningStatistics';
import MostPopularStores from '@/app/admin/(home)/components/MostPopularStores';
import TopSellingProducts from '@/app/admin/(home)/components/TopSellingProducts';
import OrderStatistics from '@/app/admin/(home)/components/OrderStatistics';

const SellerDashboard: React.FC = () => {
  const { data, isLoading, error } = useDashboardDataQuery({});
  const [orderPeriod, setOrderPeriod] = useState<'year' | 'month' | 'week'>('year');
  const [earningPeriod, setEarningPeriod] = useState<'year' | 'month' | 'week'>('year');

  const user = useSelector((state: RootState) => state.auth.user);

  if (isLoading)
    return (
      <div className="p-8">
        <div className="mb-4 h-8 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="mb-2 h-6 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="mb-6 h-4 w-1/4 animate-pulse rounded bg-gray-100" />
        <div className="mb-4 h-32 w-full animate-pulse rounded bg-gray-100" />
        <div className="mb-4 h-32 w-full animate-pulse rounded bg-gray-100" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="h-40 w-full animate-pulse rounded bg-gray-100" />
          <div className="h-40 w-full animate-pulse rounded bg-gray-100" />
          <div className="h-40 w-full animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    );
  if (error)
    return <div className="p-8 text-center text-red-500">Error loading dashboard data</div>;
  if (!data) return <div className="p-8 text-center">No data available</div>;

  if (!user?.isAdmin && user?.isModerator) {
    return <ModeratorLandingPage />;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-1 text-2xl font-semibold dark:text-white">Welcome Seller</h1>
        <p className="text-gray-600 dark:text-gray-200">
          Monitor your business analytics and statistics.
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold dark:text-white">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          Business Analytics
        </h2>
        <div className="text-right">
          <h3 className="text-sm font-medium text-gray-500 dark:text-white">Overall statistics</h3>
        </div>
      </div>

      {/* Financial Cards */}
      <FinancialCards
        toalInhouseEarning={data.toalInhouseEarning}
        deliveryCharge={data.deliveryCharge}
        pendingAmount={data.pendingAmount}
        totalTax={data.totalTax}
      />

      {/* Summary Cards */}
      <SummaryCards
        totalOrder={data.totalOrder}
        totalStore={data.totalStore}
        totalProduct={data.totalProduct}
        totalCustomer={data.totalCustomer}
      />

      {/* Order Status Cards */}
      <OrderStatusCards ordersCount={data.ordersCount} />

      {/* Charts Section */}
      <div className="mt-6">
        {/* Order Statistics */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-dark">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-md flex items-center gap-2 font-semibold dark:text-white">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              Order Statistics
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setOrderPeriod('year')}
                className={`rounded px-2 py-1 text-xs ${orderPeriod === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'}`}
              >
                This Year
              </button>
              <button
                onClick={() => setOrderPeriod('month')}
                className={`rounded px-2 py-1 text-xs ${orderPeriod === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'}`}
              >
                This Month
              </button>
              <button
                onClick={() => setOrderPeriod('week')}
                className={`rounded px-2 py-1 text-xs ${orderPeriod === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'}`}
              >
                This Week
              </button>
            </div>
          </div>
          <OrderStatistics period={orderPeriod} />
        </div>

        {/* User Overview */}
        {/* <div className="rounded-lg bg-white p-4 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-md font-semibold">User Overview</h3>
            <div className="flex space-x-2">
              <button className="rounded bg-blue-600 px-2 py-1 text-xs text-white">
                This Year
              </button>
              <button className="rounded bg-gray-100 px-2 py-1 text-xs">
                This Month
              </button>
              <button className="rounded bg-gray-100 px-2 py-1 text-xs">
                This Week
              </button>
            </div>
          </div>
          <UserOverview />
        </div> */}
      </div>

      {/* Earning Statistics */}
      <div className="mt-6 rounded-lg bg-white p-4 shadow dark:bg-white/20">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-md flex items-center gap-2 font-semibold dark:text-white">
            <BarChart4 className="h-4 w-4 text-blue-600" />
            Earning Statistics
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setEarningPeriod('year')}
              className={`rounded px-2 py-1 text-xs ${earningPeriod === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'}`}
            >
              This Year
            </button>
            <button
              onClick={() => setEarningPeriod('month')}
              className={`rounded px-2 py-1 text-xs ${earningPeriod === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'}`}
            >
              This Month
            </button>
            <button
              onClick={() => setEarningPeriod('week')}
              className={`rounded px-2 py-1 text-xs ${earningPeriod === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'}`}
            >
              This Week
            </button>
          </div>
        </div>
        <EarningStatistics period={earningPeriod} />
      </div>

      {/* Bottom Sections */}
      {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <TopCustomers customers={data.topCustomers} />
        <MostPopularStores stores={data.mostPopularStore} />
        <TopSellingProducts products={data.topSellingProduct} />
      </div> */}
    </div>
  );
};

export default SellerDashboard;
