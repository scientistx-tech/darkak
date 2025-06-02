"use client";
import RequireAccess from "@/components/Layouts/RequireAccess";
import { ReviewFilterSection } from "./components/ReviewFilterSection";
import { ReviewTable } from "./components/ReviewTable";
import { useGetCustomerReviewsQuery } from "@/redux/services/admin/adminCustomerList";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const CustomerReviews: React.FC = () => {
  const { data, isLoading, error, refetch } = useGetCustomerReviewsQuery({});
  return (
    <RequireAccess permission="customer-review">
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h1 className="mb-4 text-xl font-bold">
          Customer Reviews <span className="text-blue-500">23</span>
        </h1>
        <ReviewFilterSection />
        <ReviewTable
          data={data?.reviews}
          isLoading={isLoading}
          error={error as FetchBaseQueryError}
          refetch={refetch}
        />
      </div>
    </RequireAccess>
  );
};

export default CustomerReviews;
