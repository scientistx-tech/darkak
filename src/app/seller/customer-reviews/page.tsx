"use client";
import RequireAccess from "@/components/Layouts/RequireAccess";
import { ReviewFilterSection } from "./components/ReviewFilterSection";
import { ReviewTable } from "./components/ReviewTable";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useGetCustomerReviewsSellerQuery } from "@/redux/services/seller/sellerCustomerReviews";

const CustomerReviews: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [queryParams, setQueryParams] = useState<{}>({});
  const { data, isLoading, error, refetch } = useGetCustomerReviewsSellerQuery({
    ...queryParams,
    ...(searchTerm !== "" ? { search: searchTerm } : {}),
  });
  return (
    <RequireAccess permission="customer-review">
      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h1 className="mb-4 text-xl font-bold">
          Customer Reviews{" "}
          <span className="text-blue-500">{data?.reviews?.length || 0}</span>
        </h1>
        <ReviewFilterSection setQueryParams={setQueryParams} />
        <ReviewTable
          data={data?.reviews}
          isLoading={isLoading}
          error={error as FetchBaseQueryError}
          refetch={refetch}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </RequireAccess>
  );
};

export default CustomerReviews;
